import axios from 'axios';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

//앞으로 토큰은 여기서 사용하시면 됩니다.
// Authorization 에 토큰 자동으로 들어가도록 설정하였습니다.
const request = axios.create({
  // baseURL: 'http://3.36.176.175:8281',
  baseURL: 'https://user-dev.kau-koala.com',
  headers: {
    withCredentials: true,
    transformRequest: true,
    Authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 오류 응답의 구조를 확인하고 처리
    if (error.response && error.response.data) {
      const { data, status } = error.response;
      // data 내부의 code와 message 추출
      const code = data.code;
      const message = data.message;

      // 오류 코드에 따라 처리
      switch (code) {
        case 'NOTICE':
          alert(`Notice: ${message}`);
          break;
        case 'ERROR':
          console.error(`Error: ${message}`);
          break;
        // 기타 코드 처리
        default:
          console.error(`Unexpected error: ${message}`);
          break;
      }

      // 필요 시 사용자에게 적절한 에러 메시지를 반환하거나 표시
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

// request.js 파일에서 refreshToken 내보내기 추가
// export const refreshToken = async () => {
//   try {
//     const response = await axios.post('/api/auth/reissue', {
//       accessToken: localStorage.getItem(ACCESS_TOKEN),
//       refreshToken: localStorage.getItem(REFRESH_TOKEN),
//     });
//     const newAccessToken = response.data.accessToken;
//     localStorage.setItem('accessToken', newAccessToken);
//     return newAccessToken;
//   } catch (error) {
//     console.error('토큰 갱신 에러:', error);
//     throw error;
//   }
// };

export default request;
