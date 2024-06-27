import axios from "axios";

// Laravel APIのベースURLを設定
const baseURL =
    process.env.REACT_APP_API_BASE_URL ||
    "https://tests-dev.net" ||
    "http://localhost:8000";
axios.defaults.baseURL = baseURL;

// クッキーを含めたリクエストを送信するための設定
axios.defaults.withCredentials = true;

// ユーザー登録
const register = async (userData) => {
    try {
        const response = await axios.post("/api/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// ユーザー認証（ログイン）
const login = async (credentials) => {
    try {
        const response = await axios.post("/api/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

// ユーザーログアウト
const logout = async () => {
    try {
        const response = await axios.post("/api/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

export { register, login, logout };
