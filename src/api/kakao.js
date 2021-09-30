import { kakaoAxios } from '../util/customAxios';

// kakao api 요청
export const getLocalSearchKeyword = (keyword) =>
    kakaoAxios.get(`/v2/local/search/keyword.json?query=${keyword}`);
