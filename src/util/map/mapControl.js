/*global kakao*/

// 지도 기본 컨트롤

// 지도타입 변경 (로드맵, 하이브리드)
export const setMapType = (map, maptype) => {
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    }
};

// 현재 위치 가져오기
export const getCurrentPosition = (option = { enableHighAccuracy: true }) => {
    if ('geolocation' in navigator) {
        /* 위치정보 사용 가능 */
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    } else {
        /* 위치정보 사용 불가능 */
        return null;
    }
};

// 해당 위치로 이동
export const setCenter = (map, y, x) => {
    const moveLatLng = new kakao.maps.LatLng(y, x);
    map.setCenter(moveLatLng);
};

// 마커 표시
export let marker = null;
export const setMarker = (map, y, x) => {
    const latLng = new kakao.maps.LatLng(y, x);
    if (!marker) {
        // 마커 없으면 생성
        marker = new kakao.maps.Marker({
            position: latLng,
        });
        marker.setMap(map);
    } else {
        // 있으면 마커 위치 변경
        marker.setPosition(latLng);
    }
};

export const removeMarkers = () => {
    const marker = new kakao.maps.Marker({
        position: null,
    });
    marker.setMap(null);
};

export const setLevel = (map, level) => {
    map.setLevel(map.getLevel() + level);
};
