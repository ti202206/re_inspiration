import React, { useState } from "react";
import axios from "../axiosConfig";
import Cookies from 'js-cookie';
import "../../sass/object/project/login.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("12345678");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // CSRFトークンを取得
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post("/api/login", { email, password });
            Cookies.set('auth_token', response.data.token);
            alert("ログイン成功");
            window.location.href = "/my-page";
        } catch (error) {
            setError("ログインに失敗しました");
        }
    };

    return (
        <div className="login__page">
            <Header />
            <div className="login__container">
                <form onSubmit={handleSubmit} className="login__form">
                    <h2 className="login__title">ログイン</h2>
                    {error && <p className="login__error">{error}</p>}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="login__input"
                        required
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login__input"
                        required
                        autoComplete="current-password"
                    />
                    <button type="submit" className="login__button">ログイン</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
