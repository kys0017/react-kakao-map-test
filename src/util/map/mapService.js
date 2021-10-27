/*global kakao*/

/**************************
 * map 라이브러리
 **************************/
import 'antd/dist/antd.css';

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
let overlay = new kakao.maps.CustomOverlay({ zIndex: 3, yAnchor: 1 });

export const displayMarkerWithInfo = (map, place) => {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    markers.push(marker);

    addEvent(marker, 'click', () => {
        // infowindow.setContent(place.place_name);
        // infowindow.open(map, marker);
        overlay.setMap(map);
        overlay.setContent(makeOverlayContent(place));
        overlay.setPosition(marker.getPosition());
        document.querySelector('.ant-popover').appendChild(closeBtn());
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
        overlay.setMap(map);
        overlay.setContent(makeOverlayContent(place));
        overlay.setPosition(searchMarker.getPosition());
        document.querySelector('.ant-popover').appendChild(closeBtn());
    });
};

const closeBtn = () => {
    let closeEl = document.createElement('span');
    closeEl.className = 'close';
    closeEl.style.position = 'absolute';
    closeEl.style.top = '5px';
    closeEl.style.right = '-20px';
    closeEl.style.background = '#000';
    closeEl.style.color = '#fff';
    closeEl.style.textAlign = 'center';
    closeEl.style.width = '20px';
    closeEl.style.height = '20px';
    closeEl.style.fontSize = 'smaller';
    closeEl.style.cursor = 'default';
    closeEl.textContent = 'X';
    closeEl.onclick = closeOverlay;
    closeEl.title = '닫기';

    return closeEl;
};

function makeOverlayContent(data) {
    return `
      <div class="ant-popover ant-popover-placement-top" style="position: relative; top: -35px; max-width: 270px;" >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
          <div class="ant-popover-inner" role="tooltip">
            <div class="ant-popover-title" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
              <span title="${data.place_name}">${data.place_name}</span> 
            </div>
            <div class="ant-popover-inner-content" style="font-size: x-small">
              <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                <span title="${data.address_name}">${data.address_name}</span> <br />
                <span title="${data.road_address_name}">${data.road_address_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

// // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
const closeOverlay = () => overlay.setMap(null);

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
