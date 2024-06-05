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

axios.interceptors.request.use(config => {
    const token = Cookies.get('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
