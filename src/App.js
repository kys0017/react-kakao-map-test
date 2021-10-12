import React from 'react';
import KakaoMap from './components/KakaoMap';
import KakaoMapZoomControl from './components/map/KakaoMapZoomControl';
import KakaoMapTypeControl from './components/map/KakaoMapTypeControl';
import SearchBox from './components/search/SearchBox';
import KakaoMapCurrentPosition from './components/map/KakaoMapCurrentPosition';
import KakaoMapCafeDisplay from './components/map/KakaoMapCafeDisplay';

function App() {
    return (
        <>
            <KakaoMap>
                <KakaoMapCafeDisplay />
                <KakaoMapCurrentPosition />
                <KakaoMapTypeControl />
                <KakaoMapZoomControl />
            </KakaoMap>
            <SearchBox />
        </>
    );
}

export default App;
