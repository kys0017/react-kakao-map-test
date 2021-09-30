/*global kakao*/
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setMap } from '../modules/mapSetting';

const StyledMapDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const KakaoMap = ({ children }) => {
    const dispatch = useDispatch();
    const container = useRef();

    // map init
    useEffect(() => {
        console.log('map init!');
        const center = new kakao.maps.LatLng('37.50802', '127.062835');
        const options = {
            center,
            level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);
        dispatch(setMap(map));
    }, [dispatch]);

    return <StyledMapDiv ref={container}>{children}</StyledMapDiv>;
};

export default KakaoMap;
