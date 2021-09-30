/* 액션 타입 만들기 */
const SET_MAP = 'map/SET_MAP';

/* 액션 생성 함수 만들기 */
export const setMap = (map) => ({ type: SET_MAP, map });

/* 초기상태 선언 */
const initialState = {
    map: null,
};

/* 리듀서 선언 */
export default function mapSetting(state = initialState, action) {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                map: action.map,
            };
        default:
            return state;
    }
}
