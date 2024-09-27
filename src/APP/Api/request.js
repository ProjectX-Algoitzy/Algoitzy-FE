import axios from 'axios';
import { getAlertFunction } from '../Common/Alert/alertSingleton';

export const ACCESS_TOKEN = 'accessToken';

// Authorization에 토큰 자동으로 설정
const request = axios.create({
  baseURL: 'https://user-dev.kau-koala.com',
  headers: {
    withCredentials: true,
    transformRequest: true,
    Authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

// LoadingContext를 사용해서 로딩 상태 제어 (로딩 상태 함수는 호출 시점에서 정의)
let loadingFunctions = { showLoading: () => {}, hideLoading: () => {} };

export const setLoadingFunctions = (show, hide) => {
  loadingFunctions = { showLoading: show, hideLoading: hide };
};

// 요청 인터셉터
request.interceptors.request.use(
  (config) => {
    loadingFunctions.showLoading(); // 요청 시작 시 로딩 상태 표시
    return config;
  },
  (error) => {
    loadingFunctions.hideLoading(); // 요청 실패 시 로딩 상태 숨김
    return Promise.reject(error);
  }
);

// 응답 인터셉터
request.interceptors.response.use(
  (response) => {
    loadingFunctions.hideLoading(); // 응답이 오면 로딩 상태 숨김
    return response.data;
  },
  async (error) => {
    loadingFunctions.hideLoading(); // 에러 발생 시 로딩 상태 숨김

    // 알림 함수 가져오기
    const alert = getAlertFunction();

    if (error.response && error.response.data) {
      const { data, status } = error.response;
      const code = data.code;
      const message = data.message;

      switch (code) {
        case 'NOTICE':
          await alert(message);
          break;
        default:
          console.error(`Unexpected error: ${message}`, error);
          if (message === '만료된 토큰입니다.') {
            window.localStorage.clear();
            window.location.href = '/login';
          }
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default request;
