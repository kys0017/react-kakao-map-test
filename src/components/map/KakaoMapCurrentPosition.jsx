/*global kakao*/
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
    AiOutlineMinus,
    AiOutlinePlus,
    BiCurrentLocation,
} from 'react-icons/all';
import {
    getCurrentPosition,
    setCenter,
    setLevel,
    setMarker,
} from '../../util/map';

const StyledMapZoomControlDiv = styled.div`
    position: absolute;
    bottom: 7rem;
    right: 1rem;
    width: 36px;
    height: 36px;
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

    const setCurrentPosition = async () => {
        try {
            const { coords } = await getCurrentPosition({
                enableHighAccuracy: true,
            });
            setCenter(kakaoMap, coords.latitude, coords.longitude);
            setMarker(kakaoMap, coords.latitude, coords.longitude);
        } catch (e) {
            throw new Error('set position error!');
        }
    };

    return (
        <>
            <StyledMapZoomControlDiv>
                <span onClick={setCurrentPosition}>
                    <BiCurrentLocation />
                </span>
            </StyledMapZoomControlDiv>
        </>
    );
};

export default KakaoMapZoomControl;
