/*global kakao*/
import React from "react";
import { Card, List } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setCenter } from "../../util/map/mapControl";
import { BsBookmark, BsBookmarkFill } from "react-icons/all";
import { AiFillCloseSquare } from "react-icons/ai";
import { displaySearchMarker } from "../../util/map/mapService";

const SearchListDiv = React.memo(styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  margin-top: 3px;
  border-radius: 5px;

  & .ant-card-extra {
    padding: 0;
  }
`);

const iconStyle = {
  width: "1.2rem",
  height: "1.2rem",
};

const SearchList = ({
  type,
  data,
  bookmarks,
  onClickBookmark,
  onClickClose,
}) => {
  const { map: kakaoMap } = useSelector((state) => ({
    map: state.mapSetting.map,
  }));

  const onClick = (data) => {
    setCenter(kakaoMap, data.y, data.x);
    displaySearchMarker(kakaoMap, data);
  };

  return (
    <SearchListDiv>
      <Card
        type="inner"
        size="small"
        title={type === "result" ? "검색결과" : "북마크"}
        headStyle={{ height: "38px" }}
        bodyStyle={{ display: "none" }}
        extra={
          <AiFillCloseSquare
            style={{ fontSize: "1.5rem" }}
            onClick={onClickClose}
          />
        }
      />
      <Card size="small" style={{ flex: 1, height: "100%", overflow: "auto" }}>
        <List
          itemLayout="horizontal"
          dataSource={type === "result" ? data : bookmarks}
          locale={{ emptyText: <div>No data</div> }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.data.place_name}
                description={item.data.road_address_name}
                onClick={() => onClick(item.data)}
                style={{ cursor: "pointer" }}
              />
              {item.isbookmark === "true" ? (
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
