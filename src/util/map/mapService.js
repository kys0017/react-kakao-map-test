/*global kakao*/

/**************************
 * map 라이브러리
 **************************/

/**
 * 카테고리 검색
 * @param code 카테고리 코드
 * @param map 맵
 */
export const categorySearch = (map, code) => {
    setMarkers(null);
    markers = [];

    let data = [];

    const places = new kakao.maps.services.Places(map);

    const callback = (result, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            data = [...result];

            for (let i = 0; i < data.length; i++) {
                displayMarkerWithInfo(map, data[i]);
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

let infowindow = new kakao.maps.InfoWindow({
    zIndex: 1,
    removable: true,
});
let overlay = new kakao.maps.CustomOverlay({});

export const displayMarkerWithInfo = (map, place) => {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    markers.push(marker);

    addEvent(marker, 'click', () => {
        infowindow.setContent(place.place_name);
        infowindow.open(map, marker);
    });
};

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
export const setMarkers = (map) => {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};

// 검색리스트 클릭 시 마커 표시
export let searchMarker = null;
export const displaySearchMarker = (map, place) => {
    if (!searchMarker) {
        searchMarker = setMarker(map, place);
    } else {
        searchMarker.setPosition(new kakao.maps.LatLng(place.y, place.x));
    }

    addEvent(searchMarker, 'click', () => {
        infowindow.setContent(place.place_name);
        infowindow.open(map, searchMarker);
        // overlay.setMap(map);
        // overlay.setContent(makeOverlayContent(place));
        // overlay.setPosition(searchMarker.getPosition());
    });
};

const makeOverlayContent = (data) => {
    return `
        <div class="wrap" style="position: absolute;bottom: 42px; width: 250px; left: -125px; padding: 0px;background-color: greenyellow; ">
            ${data.place_name}
        </div>
    `;
};

// 마커를 생성하고 지도에 표시합니다
export const setMarker = (map, place) =>
    new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
    });

export const removeMarkers = () => {
    const marker = new kakao.maps.Marker({
        position: null,
    });
    marker.setMap(null);
};

export const addEvent = (map, type, handler) => {
    if (map) kakao.maps.event.addListener(map, type, handler);
};

export const removeEvent = (map, type, handler) => {
    if (map) kakao.maps.event.removeListener(map, type, handler);
};
