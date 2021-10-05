/*global kakao*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SearchList from './SearchList';
import { getLocalSearchKeyword } from '../../api/kakao';
import { setCenter, setMarker } from '../../util/map';
import SearchBoxRadioButton from './SearchBoxRadioButton';
import SearchBoxInput from './SearchBoxInput';

const StyledSearchBox = React.memo(styled.div`
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
`);

// options 셋팅
const setResultList = (q, resultList) =>
    resultList.map((result) => {
        return {
            query: q,
            key: `${result.id}`,
            value: `${result.id}`, // should be unique
            text: `${result.place_name}`,
            data: result,
            isbookmark: 'false',
            label: (
                <div>
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
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('result');

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
            })
            .catch((e) => {
                throw new Error('키워드 검색 에러!');
            });
    };

    const onChange = (value) => setQuery(value);

    const onSelect = (selected, { text, data }) => {
        // console.log('query: ', query, ' , text:', text);
        setQuery(text);
        setVisible(true);
        if (query === text) setData(options);
        else
            getLocalSearchKeyword(text).then(({ data: { documents } }) =>
                setData(setResultList(text, documents))
            );

        setCenter(kakaoMap, data.y, data.x);
        setMarker(kakaoMap, data.y, data.x);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setVisible(true);
            // console.log('query: ', query, ' , value:', e.target.value);
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
    };

    const onClose = () => setVisible(false);

    const onClickRadioButton = (e) => {
        setType(e.target.value);
        setVisible(true);
    };

    return (
        <>
            <StyledSearchBox>
                <SearchBoxInput
                    query={query}
                    options={options}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onSelect={onSelect}
                    onReset={onReset}
                />
                <SearchBoxRadioButton onClickRadioButton={onClickRadioButton} />
            </StyledSearchBox>
            {visible && (
                <>
                    <SearchList
                        type={type}
                        data={data}
                        onClickClose={onClose}
                    />
                </>
            )}
        </>
    );
};

export default React.memo(SearchBox);
