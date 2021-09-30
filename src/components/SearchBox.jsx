/*global kakao*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Card, Input } from 'antd';
import { useSelector } from 'react-redux';
import {
    AiFillCloseSquare,
    AiOutlineClose,
    AiOutlineLoading3Quarters,
    AiOutlineSearch,
} from 'react-icons/ai';
import SearchList from './SearchList';
import { getLocalSearchKeyword } from '../api/kakao';
import { setCenter, setMarker } from '../util/map';

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
            query: q,
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
        map: state.mapSetting.map,
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

    const queryCallApi = (q) => {
        if (!q) {
            onReset();
            return;
        }

        getLocalSearchKeyword(q)
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

    const handleSearch = (value) => {
        setQuery(value);
        setSuffix(<AiOutlineLoading3QuartersSpin />);
    };

    const onSelect = (selected, { text, data }) => {
        // console.log('query: ', query, ' , text:', text);
        setQuery(text);
        setSuffix(<AiOutlineClose onClick={allowClear} />);
        setVisible(true);
        if (query === text) setData(options);
        else
            getLocalSearchKeyword(text).then(({ data: { documents } }) =>
                setData(setResultList(text, documents))
            );

        // 해당 위치로 이동
        setCenter(kakaoMap, data.y, data.x);
        // 마커 표시
        setMarker(kakaoMap, data.y, data.x);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setVisible(true);
            // console.log('query: ', query, ' , value:', e.target.value);
            // console.log(options[0]?.query);
            // if (_.isEqual(options, data) && !_.isEmpty(options)) {
            if (!options[0]?.query && options[0]?.query === query) {
                setData(options);
            } else
                getLocalSearchKeyword(query).then(({ data: { documents } }) =>
                    setData(setResultList(query, documents))
                );
        }
    };

    const onReset = () => {
        setQuery('');
        setOptions([]);
        setSuffix(<AiOutlineSearch />);
    };

    const onClose = () => {
        setVisible(false);
    };

    const allowClear = () => onReset();

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
                        value={query}
                    >
                        <Input
                            suffix={suffix}
                            size="large"
                            onKeyDown={onKeyDown}
                        />
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
