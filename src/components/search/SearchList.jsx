/*global kakao*/
import React, { useState } from 'react';
import { Card, List } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { setCenter, setMarker } from '../../util/map/mapControl';
import { BsBookmark, BsBookmarkFill } from 'react-icons/all';
import { AiFillCloseSquare } from 'react-icons/ai';

const SearchListDiv = React.memo(styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
    overflow: hidden;
`);

const iconStyle = {
    width: '1.2rem',
    height: '1.2rem',
};

const SearchList = ({ type, data, onClickClose }) => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));

    const [bookmarks, setBookmarks] = useState([]);

    const onClick = (y, x) => {
        setCenter(kakaoMap, y, x);
        setMarker(kakaoMap, y, x);
    };

    const onClickBookmark = (e, item) => {
        const bookmarkIndex = bookmarks.findIndex(
            (bookmark) => bookmark.value === item.value
        );

        if (bookmarkIndex === -1) {
            item.isbookmark = 'true';
            setBookmarks([...bookmarks, item]);
        } else {
            item.isbookmark = 'false';
            bookmarks.splice(bookmarkIndex, 1);
            setBookmarks([...bookmarks]);
        }
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
                        style={{ fontSize: '1.5rem' }}
                        onClick={onClickClose}
                    />
                }
            />
            <Card
                size="small"
                style={{ flex: 1, height: '100%', overflow: 'auto' }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={type === 'result' ? data : bookmarks}
                    locale={{ emptyText: <div>No data</div> }}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.data.place_name}
                                description={item.data.road_address_name}
                                onClick={() =>
                                    onClick(item.data.y, item.data.x)
                                }
                                style={{ cursor: 'pointer' }}
                            />
                            {item.isbookmark === 'true' ? (
                                <BsBookmarkFill
                                    onClick={(e) => onClickBookmark(e, item)}
                                    style={iconStyle}
                                />
                            ) : (
                                <BsBookmark
                                    onClick={(e) => onClickBookmark(e, item)}
                                    style={iconStyle}
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
