/*global kakao*/
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    AiOutlineClose,
    AiOutlineLoading3Quarters,
    AiOutlineSearch,
} from 'react-icons/ai';

const StyledSearchBox = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    opacity: 0.9;
    width: 300px;
    height: 100px;
    border-radius: 10px;

    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 99;

    .option-container {
        display: flex;
        flex: 1;
        background: white;
        max-height: 480px;
    }

    .option-box {
        flex: 1;
        overflow-y: auto;
        max-height: 480px;
    }

    .option-item {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 5px 10px;

        span {
            font-size: 0.5rem;
        }

        &:hover {
            cursor: pointer;
            background: #d9d9d9;
        }
    }

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

const SearchBox_ = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapControl.map,
    }));
    const [openOptionContainer, setOpenOptionContainer] = useState(false);
    const [options, setOptions] = useState([]);
    const [suffix, setSuffix] = useState(<AiOutlineSearch />);
    const [query, setQuery] = useState('');

    const inputRef = useRef();

    const allowClear = () => {
        console.log('allowClear!');
        inputRef.current.state.value = '';
        onReset();
    };

    const queryCallApi = (q) => {
        setQuery(q);
        axios
            .get(
                `https://dapi.kakao.com//v2/local/search/keyword.json?query=${q}`, // 카페만 검색
                {
                    headers: {
                        Authorization:
                            'KakaoAK 6797801199c3b3d73ff33c7ca3edea88',
                    },
                }
            )
            .then(({ data: { documents } }) => {
                // console.log(documents);
                const isData = documents.length > 0 ? true : false;
                setOpenOptionContainer(isData);
                setOptions(isData ? documents : []);
                setSuffix(
                    isData ? (
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
    }, 300);

    const handleSearch = (e) => {
        setSuffix(<AiOutlineLoading3QuartersSpin />);
        debounce(e.target.value);
    };

    const onReset = () => {
        setQuery('');
        setOptions([]);
        setSuffix(<AiOutlineSearch />);
    };

    const onSelect = (e, option) => {
        // <Input.Search value={query} /> useState 로 하니까 렌더링할 때 꼬이는지 버벅거리고 value 지워짐
        // ref로 해결 !
        inputRef.current.state.value = option.place_name;
        setOpenOptionContainer(false);

        // 해당 위치로 이동
        const moveLatLng = new kakao.maps.LatLng(option.y, option.x);
        kakaoMap.setCenter(moveLatLng);
        // 마커 생성
        const marker = new kakao.maps.Marker({
            position: moveLatLng,
        });
        // 마커 표시
        marker.setMap(kakaoMap);
    };

    const onFocus = () => {
        if (query === inputRef.current.state.value)
            setOpenOptionContainer(true);
        else queryCallApi(inputRef.current.state.value);
    };

    return (
        <StyledSearchBox>
            <div style={{ display: 'flex' }}>
                {/*<Input.Search*/}
                <Input
                    suffix={suffix}
                    style={{ width: 300, padding: '10px' }}
                    size="large"
                    onChange={handleSearch}
                    ref={inputRef}
                    onFocus={onFocus}
                />
            </div>
            {openOptionContainer && (
                <div className="option-container">
                    <div className="option-box">
                        {options.map((option) => (
                            <div
                                className="option-item"
                                key={option.id}
                                onClick={(e) => onSelect(e, option)}
                            >
                                {option.place_name} <br />
                                <span>{option.road_address_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </StyledSearchBox>
    );
};

export default SearchBox_;
