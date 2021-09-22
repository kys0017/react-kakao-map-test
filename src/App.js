import React from 'react';
import KakaoMap from './components/map/KakaoMap';
import SearchContainer from './components/SearchContainer';
import { MapProvider } from './contexts/map';

function App() {
    return (
        <MapProvider>
            <KakaoMap />
            <SearchContainer />
        </MapProvider>
    );
}

export default App;
