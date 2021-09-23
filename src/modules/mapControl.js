/* 액션 타입 만들기 */
const SET_MAP = 'map/SET_MAP';
// const SET_CENTER = 'map/SET_CENTER';
// const SET_LEVEL = 'map/SET_LEVEL';

/* 액션 생성 함수 만들기 */
export const setMap = (map) => ({ type: SET_MAP, map });
// export const setCenter = (center) => ({ type: SET_CENTER, center });
// export const setLevel = (level) => ({ type: SET_LEVEL, level });

/* 초기상태 선언 */
const initialState = {
    map: null,
    // center: {
    //     x: '127.062835',
    //     y: '37.50802',
    // },
    // level: 3,
};

/* 리듀서 선언 */
export default function mapControl(state = initialState, action) {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                map: action.map,
            };
        // case SET_CENTER:
        //     return {
        //         ...state,
        //         center: {
        //             ...action.center,
        //         },
        //     };
        // case SET_LEVEL:
        //     return {
        //         ...state,
        //         level: action.level,
        //     };
        default:
            return state;
    }
}
