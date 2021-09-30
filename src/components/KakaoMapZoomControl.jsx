/*global kakao*/
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/all';

const StyledMapZoomControlDiv = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 1rem;
    width: 36px;
    height: 80px;
    overflow: hidden;
    background-color: #f5f5f5;
    z-index: 10;

    border: 1px solid #919191;
    border-radius: 5px;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 40px;
        cursor: pointer;

        svg {
            flex: 1;
            font-size: 22px;
        }

        &:first-child {
            border-bottom: 1px solid #bfbfbf;
        }
    }
`;

const KakaoMapZoomControl = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));

    // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    const zoomIn = () => {
        kakaoMap.setLevel(kakaoMap.getLevel() - 1);
    };

    // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    const zoomOut = () => {
        kakaoMap.setLevel(kakaoMap.getLevel() + 1);
    };

    return (
        <>
            <StyledMapZoomControlDiv>
                <span onClick={zoomIn}>
                    <AiOutlinePlus />
                </span>
                <span onClick={zoomOut}>
                    <AiOutlineMinus />
                </span>
            </StyledMapZoomControlDiv>
        </>
    );
};

export default KakaoMapZoomControl;
