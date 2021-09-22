import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Input } from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { MapContext } from '../contexts/map';

const StyledSearchContainer = styled.div`
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

const searchResult = (q, resultList) =>
    resultList.map((result, idx) => {
        return {
            key: `${result.place_name}_${idx}`, // key 프로퍼티 추가해서 unique 값으로
            data: result,
            value: `${result.place_name}`,
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

const SearchContainer = () => {
    const { actions } = useContext(MapContext);
    const [options, setOptions] = useState([]);

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
                    documents.length > 0 ? searchResult(q, documents) : []
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

    const handleSearch = (value) => debounce(value);

    const onReset = () => {
        setOptions([]);
    };

    const onSelect = (selected, { data }) => {
        // todo: 해당 위치로 이동
        // console.log(data);
        actions.setCenter({ x: data.x, y: data.y });
    };

    return (
        <StyledSearchContainer>
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
                />
            </AutoComplete>
        </StyledSearchContainer>
    );
};

export default SearchContainer;
