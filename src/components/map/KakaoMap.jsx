/*global kakao*/ // <---- 주석인줄 알았는데 이거 업으면 kakao 객체 없다고 에러남
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MapContext } from '../../contexts/map';

const StyledMapDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const KakaoMap = () => {
    const { state } = useContext(MapContext);
    const [kakaoMap, setKakaoMap] = useState(null);

    const container = useRef();

    useEffect(() => {
        const center = new kakao.maps.LatLng('37.50802', '127.062835');
        const options = {
            center,
            level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
    }, []);

    useEffect(() => {
        if (!kakaoMap) return;
        const moveLatLng = new kakao.maps.LatLng(
            state.center.y,
            state.center.x
        );
        kakaoMap.setCenter(moveLatLng);
    }, [state]);

    return <StyledMapDiv ref={container} />;
};

export default KakaoMap;
