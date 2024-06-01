import React, { useState } from "react";
import axios from "axios";
import "../../sass/object/project/_login.scss";

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("12345678");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/login", { email, password });
            alert("ログイン成功");
            window.location.href = "/mypage";
        } catch (error) {
            setError("ログインに失敗しました");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">ログイン</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
