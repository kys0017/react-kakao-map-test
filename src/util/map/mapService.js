/*global kakao*/

// map 라이브러리

/**
 * 카테고리 검색
 * @param code 카테고리 코드
 * @param map 맵
 */
export const categorySearch = (map, code) => {
    setMarkers(null);
    // console.log(markers);
    markers = [];
    infowindows = [];

    const places = new kakao.maps.services.Places(map);

    const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                displayMarker(result[i], map);
            }
        }
    };
    // 카테고리 코드 검색
    places.categorySearch(code, callback, {
        useMapBounds: true,
        size: 15,
        page: 1,
    });
};

let markers = [];
// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
let infowindows = [];
// 지도에 마커를 표시하는 함수입니다
const displayMarker = (place, map) => {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
    });
    markers.push(marker);

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    infowindow.setContent(place.place_name);
    infowindows.push(infowindow);

    kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow)
    );
};

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
const makeOverListener = (map, marker, infowindow) => {
    return function () {
        infowindow.open(map, marker);
    };
};
// 인포윈도우를 닫는 클로저를 만드는 함수입니다
const makeOutListener = (infowindow) => {
    return function () {
        infowindow.close();
    };
};
// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
export const setMarkers = (map) => {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};

export const addEvent = (map, type, handler) => {
    if (map) kakao.maps.event.addListener(map, type, handler);
};

export const removeEvent = (map, type, handler) => {
    if (map) kakao.maps.event.removeListener(map, type, handler);
};
