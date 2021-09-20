import React, { useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Input } from 'antd';
import _ from 'lodash';
import axios from 'axios';

const StyledSearchContainer = styled.div`
    display: inline-flex;
    background: white;
    opacity: 0.9;
    width: 300px;
    height: 200px;
    border-radius: 10px;

    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 99;
`;

const searchResult = (q, resultList) =>
    resultList.map((result, idx) => {
        // const category = `${q}${idx}`;
        return {
            value: result.place_name,
            label: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>{result.place_name}</span>
                </div>
            ),
        };
    });

const SearchContainer = () => {
    const [options, setOptions] = useState([]);

    const queryCallApi = (q) => {
        if (!q) return;
        axios
            .get(
                `https://dapi.kakao.com//v2/local/search/keyword.json?query=${q}&category_group_code=CE7`, // 카페만 검색
                {
                    headers: {
                        Authorization:
                            'KakaoAK 6797801199c3b3d73ff33c7ca3edea88',
                    },
                }
            )
            .then(({ data: { documents } }) => {
                console.log(q);
                console.log(documents);
                setOptions(
                    documents.length > 0 ? searchResult(q, documents) : []
                );
            })
            .catch((e) => console.error('키워드 검색 에러!'));
    };

    const debounce = _.debounce((q) => queryCallApi(q), 300);

    const handleSearch = (value) => {
        if (!value) {
            setOptions(() => []);
            return;
        }
        debounce(value);
    };

    const onSelect = (selected) => {
        console.log(selected);
    };

    return (
        <StyledSearchContainer>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search
                    style={{ padding: '10px' }}
                    size="large"
                    enterButton
                />
            </AutoComplete>
        </StyledSearchContainer>
    );
};

export default SearchContainer;
