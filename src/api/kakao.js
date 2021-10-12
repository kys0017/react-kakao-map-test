import { kakaoAxios } from '../util/customAxios';

/**
 * 키워드로 장소검색
 * @param keyword
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLocalSearchKeyword = (keyword) =>
    kakaoAxios.get(`/v2/local/search/keyword.json?query=${keyword}`);

/**
 * 카테고리로 장소검색
 * @param cate
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLocalSearchCategory = (cate) =>
    kakaoAxios.get(
        `/v2/local/search/category.json?category_group_code=${cate}`
    );
