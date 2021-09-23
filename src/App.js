import React from 'react';
import KakaoMap from './components/KakaoMap';
import SearchBox from './components/SearchBox';

function App() {
    return (
        <>
            <KakaoMap />
            <SearchBox className="search-box" />
        </>
    );
}

export default App;
