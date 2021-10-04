/*global kakao*/
import React from 'react';
import { Card, List } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { setCenter, setMarker } from '../../util/map';
import { BsBookmark, BsBookmarkFill } from 'react-icons/all';
import { AiFillCloseSquare } from 'react-icons/ai';

const SearchListDiv = React.memo(styled.div`
    display: flex;
    padding: 5px;
    flex: 1;
    flex-direction: column;
    width: 350px;
    height: auto;
    border-radius: 10px;
    background: rgba(10, 123, 192, 0.3);

    position: absolute;
    top: 180px;
    left: 10px;
    bottom: 10px;
    z-index: 5;
`);

const SearchList = ({ type, data, onClickClose, onClickBookmark }) => {
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
                title={type === 'result' ? '검색결과' : '북마크'}
                bodyStyle={{ display: 'none' }}
                extra={
                    <AiFillCloseSquare
                        style={{ fontSize: '20px' }}
                        onClick={onClickClose}
                    />
                }
            />
            <Card size="small" style={{ overflow: 'auto' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    locale={{ emptyText: <div>dddd</div> }}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    onClick(item.data.y, item.data.x)
                                }
                                title={item.data.place_name}
                                description={item.data.road_address_name}
                            />
                            {item.isbookmark === 'true' ? (
                                <BsBookmarkFill
                                    onClick={(e) => onClickBookmark(e, item)}
                                    style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                    }}
                                />
                            ) : (
                                <BsBookmark
                                    onClick={(e) => onClickBookmark(e, item)}
                                    style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                    }}
                                />
                            )}
                        </List.Item>
                    )}
                />
            </Card>
        </SearchListDiv>
    );
};

export default React.memo(SearchList);
