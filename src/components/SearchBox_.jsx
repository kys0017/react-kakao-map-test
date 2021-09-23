/*global kakao*/
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Input } from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { useSelector } from 'react-redux';

const StyledSearchBox = styled.div`
    display: inline-flex;
    background: white;
    opacity: 0.9;
    width: 300px;
    height: 100px;
    border-radius: 10px;

    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 99;
`;

const setResultList = (q, resultList) =>
    resultList.map((result) => {
        return {
            key: `${result.id}`, // key 프로퍼티 추가해서 unique 값으로
            data: result,
            value: `${result.place_name}`,
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

const SearchBox_ = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapControl.map,
    }));
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const queryCallApi = (q) => {
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
                console.log(documents);
                setOptions(
                    documents.length > 0 ? setResultList(q, documents) : []
                );
                setLoading(false);
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

    const handleSearch = (value) => {
        setLoading(true);
        debounce(value);
    };

    const onReset = () => {
        setOptions([]);
        setLoading(false);
    };

    const onSelect = (selected, { text, data }) => {
        console.log(selected);
        // console.log(value_);
        setQuery(text);

        const moveLatLng = new kakao.maps.LatLng(data.y, data.x);
        kakaoMap.setCenter(moveLatLng);
    };

    return (
        <StyledSearchBox>
            <AutoComplete
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onChange={handleSearch}
            >
                <Input.Search
                    allowClear
                    style={{ padding: '10px' }}
                    size="large"
                    enterButton
                    loading={loading}
                    onChange={(event) =>
                        console.log('event: ', event.target.value)
                    }
                />
            </AutoComplete>
        </StyledSearchBox>
    );
};

export default SearchBox_;
