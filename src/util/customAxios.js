import axios from 'axios';

export const kakaoAxios = axios.create({
    baseURL: `https://dapi.kakao.com`,
    headers: {
        Authorization: 'KakaoAK 6797801199c3b3d73ff33c7ca3edea88',
    },
});
