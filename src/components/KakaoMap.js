/*global kakao*/ // <---- 주석인줄 알았는데 이거 업으면 kakao 객체 없다고 에러남
import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = () => {
    const [kakaoMap, setKakaoMap] = useState(null);

    const container = useRef();

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_APP_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(37.50802, 127.062835);
                const options = {
                    center,
                    level: 3,
                };
                const map = new kakao.maps.Map(container.current, options);
                setKakaoMap(map);
            });
        };
    }, []);

    return (
        <div
            id="map"
            ref={container}
            style={{ width: '100wv', height: '100vh' }}
        />
    );
};

export default KakaoMap;
