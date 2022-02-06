import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FiCoffee } from "react-icons/all";
import {
  addEvent,
  categorySearch,
  removeEvent,
  setMarkers,
} from "../../util/map/mapService";

const StyledMapCafeDisplayDiv = styled.div`
  position: absolute;
  top: 7rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  overflow: hidden;
  background-color: #f5f5f5;
  z-index: 10;

  border: 1px solid #919191;
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    top: 16rem;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    cursor: pointer;

    svg {
      flex: 1;
      font-size: 22px;
    }

    &:first-child {
      border-bottom: 1px solid #bfbfbf;
    }
  }

  .btn {
    background: #fff;
    background: linear-gradient(#fff, #e6e6e6);

    &:hover {
      background: #f5f5f5;
      background: linear-gradient(#f5f5f5, #e3e3e3);
    }

    &:active {
      background: #e6e6e6;
      background: linear-gradient(#e6e6e6, #fff);
    }
  }

  .selected_btn {
    background: #b197fc;

    //&:hover {
    //    color: #fff;
    //}
  }
`;

const KakaoMapCafeDisplay = () => {
  const { map: kakaoMap } = useSelector((state) => ({
    map: state.mapSetting.map,
  }));

  const [isClicked, setIsClicked] = useState(false);
  const [cafeCls, setCafeCls] = useState("btn");

  // 버튼 클릭 시 토글
  const onClick = () => {
    setIsClicked(!isClicked);
  };

  const handler = () => {
    categorySearch(kakaoMap, "CE7");
  };
  // 버튼 클릭 시 지도에 카페 위치 마커 표시

  // 토글 on 일 때 지도 이동할 떄마다 현재 bound 에만 마커 표시
  useEffect(() => {
    if (!kakaoMap) return;
    if (isClicked) {
      setCafeCls("selected_btn");
      handler();
      addEvent(kakaoMap, "dragend", handler);
      addEvent(kakaoMap, "zoom_changed", handler);
      addEvent(kakaoMap, "center_changed", handler);
    } else {
      setCafeCls("btn");
    }

    return () => {
      // console.log('카페 버튼 컴포넌트 언마운트!');
      setMarkers(null);
      removeEvent(kakaoMap, "dragend", handler);
      removeEvent(kakaoMap, "zoom_changed", handler);
      removeEvent(kakaoMap, "center_changed", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked]);

  return (
    <>
      <StyledMapCafeDisplayDiv>
        <span className={cafeCls} onClick={onClick}>
          <FiCoffee />
        </span>
      </StyledMapCafeDisplayDiv>
    </>
  );
};

export default KakaoMapCafeDisplay;
