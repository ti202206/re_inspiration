import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../sass/object/project/register.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

import defaultIcon from "../../assets/icons/default-user-icon.png";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        icon: defaultIcon,
    });
    const [iconPreview, setIconPreview] = useState(defaultIcon); // アイコンの初期値を設定
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfTokenMeta) {
            const csrfToken = csrfTokenMeta.getAttribute("content");
            axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        } else {
            console.error("CSRF token not found");
        }
    }, []);

    // アイコンの変更
    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "icon") {
            const file = files[0];
            setFormData((prevState) => ({ ...prevState, [name]: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            } else {
                setIconPreview(defaultIcon);
            }
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // プロフィール変更処理
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("password_confirmation", formData.passwordConfirmation);
        // if (formData.icon) {
        //     data.append("icon", formData.icon);
        // } else {
        //     const response = await fetch(defaultIcon);
        //     const blob = await response.blob();
        //     data.append("icon", blob, "default-user-icon.png");
        // }
        if (formData.icon && formData.icon !== defaultIcon) {
            data.append("icon", formData.icon);
        }

        try {
            // await axios.post("/api/register", data);
            await axios.post("/api/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("登録が完了しました。");
            window.location.href = "/my-page";
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors || {});
                alert("エラーが発生しました。入力内容を確認してください。");
            } else {
                console.error("Error:", error);
                alert("エラーが発生しました。");
            }
        }
    };

    return (
        <div className="register__page">
            <Header />
            <div className="register__container">
                <form onSubmit={handleSubmit} className="register__form">
                    <h1 className="register__title">新規登録</h1>
                    <div className="form-group">
                        <label>名前:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            className="register__input"
                        />
                        {errors.name && (
                            <div className="register__error">{errors.name}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>メールアドレス:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="register__input"
                        />
                        {errors.email && (
                            <div className="register__error">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>パスワード:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            className="register__input"
                        />
                        {errors.password && (
                            <div className="register__error">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>パスワード確認:</label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            autoComplete="new-password"
                            className="register__input"
                        />
                        {errors.password_confirmation && (
                            <div className="register__error">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>アイコン画像（任意）:</label>
                        <input
                            type="file"
                            name="icon"
                            onChange={handleChange}
                            className="register__input-file"
                        />
                        {iconPreview && (
                            <img
                                src={iconPreview}
                                alt="Icon Preview"
                                className="register__icon-preview"
                            />
                        )}
                    </div>
                    <button type="submit" className="register__button">
                        登録
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
