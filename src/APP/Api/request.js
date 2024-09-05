import axios from 'axios';
import { getAlertFunction } from '../Common/Alert/alertSingleton';

export const ACCESS_TOKEN = 'accessToken';

//앞으로 토큰은 여기서 사용하시면 됩니다.
// Authorization 에 토큰 자동으로 들어가도록 설정하였습니다.
const request = axios.create({
  baseURL: 'https://user-api.kau-koala.com',
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
  async (error) => {
    // Use the singleton to access the alert function
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
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default request;


// import axios from 'axios';
// import { getAlertFunction } from '../Common/Alert/alertSingleton';

// export const ACCESS_TOKEN = 'accessToken';

// // Authorization 에 토큰 자동으로 들어가도록 설정하였습니다.
// const request = axios.create({
//   baseURL: 'https://admin-dev.kau-koala.com', //변경된 url입니다
//   headers: {
//     withCredentials: true,
//     transformRequest: true,
//     Authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
//   },
// });

// request.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   async (error) => {
//     // Use the singleton to access the alert function
//     const alert = getAlertFunction();
    
//     if (error.response && error.response.data) {
//       const { data, status } = error.response;
//       const code = data.code;
//       const message = data.message;

//       switch (code) {
//         case 'NOTICE':
//           // console.error(`Unexpected error: ${message}`, error);
//           await alert(message);
//           break;
//         default:
//           console.error(`Unexpected error: ${message}`, error);
//           break;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default request;

