import React from 'react';
import KakaoMap from './components/KakaoMap';
import KakaoMapZoomControl from './components/KakaoMapZoomControl';
import KakaoMapTypeControl from './components/KakaoMapTypeControl';
import SearchBox from './components/SearchBox';
import SearchList from './components/SearchList';

function App() {
    return (
        <>
            <KakaoMap>
                <KakaoMapTypeControl />
                <KakaoMapZoomControl />
            </KakaoMap>
            <SearchBox />
        </>
    );
}

export default App;
