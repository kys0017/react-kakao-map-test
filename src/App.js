import React from 'react';
import KakaoMap from './components/KakaoMap';
import KakaoMapZoomControl from './components/map/KakaoMapZoomControl';
import KakaoMapTypeControl from './components/map/KakaoMapTypeControl';
import SearchBox from './components/search/SearchBox';
import KakaoMapCurrentPosition from './components/map/KakaoMapCurrentPosition';

function App() {
    return (
        <>
            <KakaoMap>
                <KakaoMapCurrentPosition />
                <KakaoMapTypeControl />
                <KakaoMapZoomControl />
            </KakaoMap>
            <SearchBox />
        </>
    );
}

export default App;
