import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL =process.env.MIX_APP_URL || 'https://api.tests-dev.net';
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

// 認証が不要なパスのリスト
const authFreePaths = [
    "/", // トップページのルート
    "/api/auth/login", // ログインAPI
    "/api/auth/register", // 登録API
];

// 認証トークンの設定
axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("auth_token"); // トークンを sessionStorage から取得
        // 認証が不要なパスの完全一致でチェック
        const isAuthFree = authFreePaths.some(
            (path) =>
                config.url.startsWith(path) ||
                config.url.startsWith(axios.defaults.baseURL + path)
        );
        // 認証が不要なパスの場合はトークンをヘッダーに追加しない
        if (!isAuthFree && token) {
            config.headers.Authorization = `Bearer ${token}`; // トークンを Authorization ヘッダーに設定
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
