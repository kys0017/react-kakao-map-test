import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/all';
import { setLevel } from '../../util/map/mapControl';

const StyledMapZoomControlDiv = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 1rem;
    width: 36px;
    height: 72px;
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
`;

const KakaoMapZoomControl = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));

    const zoomIn = () => setLevel(kakaoMap, -1);
    const zoomOut = () => setLevel(kakaoMap, 1);

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
