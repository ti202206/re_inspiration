// import axios from 'axios';

// // クッキーを使うための設定
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// export default axios;




// import axios from 'axios';
// import Cookies from 'js-cookie';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// if (token) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
// }

// export default axios;




// import axios from 'axios';
// import Cookies from 'js-cookie';

// axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://127.0.0.1:8000';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(config => {
//     const token = Cookies.get('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default axios;


// // axiosConfig.js
// import axios from 'axios';
// import Cookies from 'js-cookie';

// // CSRFトークンの取得
// axios.get('/sanctum/csrf-cookie').then(response => {
//     // CSRFトークンが設定された状態でAPIリクエストを行う
// });

// axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://127.0.0.1:8000';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(config => {
//     const token = Cookies.get('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default axios;


import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://127.0.0.1:8000';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// axios.interceptors.request.use(config => {
//     const token = Cookies.get('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// 認証が不要なパスのリスト
const authFreePaths = [
    '/', // トップページのルート
    '/api/auth/login', // ログインAPI
    '/api/auth/register', // 登録API
];

// 認証トークンの設定
// axios.interceptors.request.use(config => {
//     const token = sessionStorage.getItem('auth_token'); // トークンを sessionStorage から取得
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`; // トークンを Authorization ヘッダーに設定
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
// axios.interceptors.request.use(config => {
//     const token = sessionStorage.getItem('auth_token'); // トークンを sessionStorage から取得
//     // 認証が不要なパスの完全一致でチェック
//     const isAuthFree = authFreePaths.some(path => config.url.startsWith(axios.defaults.baseURL + path));
//     // 認証が不要なパスの場合はトークンをヘッダーに追加しない
//     if (!isAuthFree && token) {
//         config.headers.Authorization = `Bearer ${token}`; // トークンを Authorization ヘッダーに設定
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// axiosConfig.js

// 認証トークンの設定
axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('auth_token'); // トークンを sessionStorage から取得
    // [修正] 認証が不要なパスの完全一致でチェック
    const isAuthFree = authFreePaths.some(path => config.url.startsWith(path) || config.url.startsWith(axios.defaults.baseURL + path));
    // 認証が不要なパスの場合はトークンをヘッダーに追加しない
    if (!isAuthFree && token) {
        config.headers.Authorization = `Bearer ${token}`; // トークンを Authorization ヘッダーに設定
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export default axios;


// import axios from 'axios';
// import Cookies from 'js-cookie';

// axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://127.0.0.1:8000';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(async config => {
//     // CSRFトークンを取得してリクエストに設定
//     if (!config.headers['X-CSRF-TOKEN']) {
//         await axios.get('/sanctum/csrf-cookie');
//         config.headers['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
//     }
//     const token = Cookies.get('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default axios;


// // axiosConfig.js
// import axios from 'axios';
// import Cookies from 'js-cookie';

// // CSRFトークンの取得
// axios.get('/sanctum/csrf-cookie').then(response => {
//     // CSRFトークンが設定された状態でAPIリクエストを行う
// });

// axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://127.0.0.1:8000';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(config => {
//     const token = Cookies.get('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default axios;
