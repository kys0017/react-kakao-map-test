/*global kakao*/
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setMap } from '../modules/mapControl';

const StyledMapDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const KakaoMap = () => {
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

    return <StyledMapDiv ref={container} />;
};

export default KakaoMap;