/*global kakao*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Card, Drawer, Input } from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    AiFillCloseSquare,
    AiOutlineClose,
    AiOutlineLoading3Quarters,
    AiOutlineSearch,
} from 'react-icons/ai';
import SearchList from './SearchList';

const StyledSearchBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 350px;

    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;

    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const AiOutlineLoading3QuartersSpin = () => (
    <AiOutlineLoading3Quarters
        style={{
            width: '1.2rem',
            height: '1.2rem',
            animationName: 'rotate',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
        }}
    />
);

// options 셋팅
const setResultList = (q, resultList) =>
    resultList.map((result) => {
        return {
            key: `${result.id}`,
            data: result,
            value: `${result.id}`, // should be unique
            text: `${result.place_name}`,
            label: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>
                        {result.place_name} <br />
                        <span style={{ fontSize: '0.5rem' }}>
                            {result.road_address_name}
                        </span>
                    </span>
                </div>
            ),
        };
    });

const SearchBox = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapControl.map,
    }));
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [suffix, setSuffix] = useState(<AiOutlineSearch />);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            queryCallApi(query);
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const allowClear = () => onReset();
    const queryCallApi = (q) => {
        if (!q) {
            onReset();
            return;
        }
        axios
            .get(
                `https://dapi.kakao.com//v2/local/search/keyword.json?query=${q}`,
                {
                    headers: {
                        Authorization:
                            'KakaoAK 6797801199c3b3d73ff33c7ca3edea88',
                    },
                }
            )
            .then(({ data: { documents } }) => {
                const hasData = documents.length > 0 ? true : false;
                setOptions(hasData ? setResultList(q, documents) : []);
                setSuffix(
                    hasData ? (
                        <AiOutlineClose onClick={allowClear} />
                    ) : (
                        <AiOutlineSearch />
                    )
                );
            })
            .catch((e) => console.error('키워드 검색 에러!'));
    };

    const debounce = _.debounce((q) => {
        if (!q) {
            onReset();
            return;
        }
        queryCallApi(q);
    }, 500);

    const handleSearch = (value) => {
        setQuery(value);
        setSuffix(<AiOutlineLoading3QuartersSpin />);
        // debounce(value);
        // setState 가 실행되면 SearchBox 컴포넌트가 리렌더링 되므로
        // debounce(value) 효과를 주려면 useEffect 를 사용해야 됨
    };

    const onReset = () => {
        setQuery('');
        setOptions([]);
        setSuffix(<AiOutlineSearch />);
    };

    const onSelect = (selected, { text, data }) => {
        // console.log('selected: ', selected, ', text:', text);
        setQuery(text);
        setSuffix(<AiOutlineClose onClick={allowClear} />);
        setVisible(true);
        setData(options);

        // 해당 위치로 이동
        const moveLatLng = new kakao.maps.LatLng(data.y, data.x);
        kakaoMap.setCenter(moveLatLng);
        // 마커 생성
        const marker = new kakao.maps.Marker({
            position: moveLatLng,
        });
        // 마커 표시
        marker.setMap(kakaoMap);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onKeyDown = (e) => {
        if (e.keycode === 13) queryCallApi(query);
    };

    return (
        <>
            <StyledSearchBox>
                <Card
                    size="small"
                    title="REACT-KAKAO-MAP-TEST"
                    style={{ borderRadius: '10px' }}
                >
                    <AutoComplete
                        style={{
                            width: '100%',
                        }}
                        options={options}
                        onSelect={onSelect}
                        onChange={handleSearch}
                        onKeyDown={onKeyDown}
                        value={query}
                    >
                        <Input suffix={suffix} size="large" />
                    </AutoComplete>
                </Card>
            </StyledSearchBox>
            {visible && (
                <>
                    <SearchList data={data} />
                    <AiFillCloseSquare
                        style={{
                            position: 'absolute',
                            top: '125px',
                            left: '360px',
                            zIndex: 9999,
                            fontSize: '30px',
                        }}
                        className="drawer-close-custom"
                        onClick={onClose}
                    />
                </>
            )}
        </>
    );
};

export default SearchBox;
