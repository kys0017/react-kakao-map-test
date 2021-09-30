/*global kakao*/
import React from 'react';
import { Card, List } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { setCenter, setMarker } from '../util/map';

const SearchListDiv = styled.div`
    display: flex;
    padding: 5px;
    flex: 1;
    flex-direction: column;
    width: 350px;
    height: auto;
    border-radius: 10px;
    background: rgba(10, 123, 192, 0.3);

    position: absolute;
    top: 125px;
    left: 10px;
    bottom: 10px;
    z-index: 5;
`;

const SearchList = ({ data }) => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));

    const onClick = (y, x) => {
        setCenter(kakaoMap, y, x);
        setMarker(kakaoMap, y, x);
    };

    return (
        <SearchListDiv>
            <Card
                type="inner"
                size="small"
                title="검색결과"
                bodyStyle={{ display: 'none' }}
            ></Card>
            <Card size="small" style={{ overflow: 'auto' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={({ data: item }) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{ cursor: 'pointer' }}
                                onClick={() => onClick(item.y, item.x)}
                                title={item.place_name}
                                description={item.road_address_name}
                            ></List.Item.Meta>
                        </List.Item>
                    )}
                />
            </Card>
        </SearchListDiv>
    );
};

export default SearchList;
