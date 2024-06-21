// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../sass/object/project/top.scss";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         passwordConfirmation: "",
//         icon: null,
//     });
//     const [iconPreview, setIconPreview] = useState(null);
//     const [errors, setErrors] = useState({});

//     useEffect(() => {

//         const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
//         if (csrfTokenMeta) {
//             const csrfToken = csrfTokenMeta.getAttribute("content");
//             axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
//             // console.log(csrfToken);
//         } else {
//             console.error("CSRF token not found");
//         }
//     }, []);

//         // フォームデータの変更ハンドラ
//         const handleChange = (event) => {
//             const { name, value, files } = event.target;
//             if (name === "icon") {
//                 const file = files[0];
//                 setFormData((prevState) => ({ ...prevState, [name]: file }));
    
//                 // 追加: アイコンのプレビューを更新
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setIconPreview(reader.result);
//                 };
//                 if (file) {
//                     reader.readAsDataURL(file);
//                 } else {
//                     setIconPreview(null);
//                 }
//             } else {
//                 setFormData((prevState) => ({ ...prevState, [name]: value }));
//             }
//         };

//         //フォーム送信
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = new FormData();
//         data.append("name", formData.name);
//         data.append("email", formData.email);
//         data.append("password", formData.password);
//         data.append("password_confirmation", formData.passwordConfirmation);
//         if (formData.icon) {
//             data.append("icon", formData.icon);
//         }

//         try {
//             await axios.post("/api/register", data);
//             alert("登録が完了しました。");
//             window.location.href = "/mypage";
//         } catch (error) {
//             if (error.response) {
//                 setErrors(error.response.data.errors || {});
//                 alert("エラーが発生しました。入力内容を確認してください。");
//             } else {
//                 console.error("Error:", error);
//                 alert("エラーが発生しました。");
//             }
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="container">
//                 <h1 className="section__title">新規登録</h1>
//                 <form onSubmit={handleSubmit} className="form-container">
//                     <div className="form-group">
//                         <label>名前:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             autoComplete="name"
//                         />
//                         {errors.name && (
//                             <div className="error">{errors.name}</div>
//                         )}
//                     </div>
//                     <div className="form-group">
//                         <label>メールアドレス:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             autoComplete="email"
//                         />
//                         {errors.email && (
//                             <div className="error">{errors.email}</div>
//                         )}
//                     </div>
//                     <div className="form-group">
//                         <label>パスワード:</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             autoComplete="new-password"
//                         />
//                         {errors.password && (
//                             <div className="error">{errors.password}</div>
//                         )}
//                     </div>
//                     <div className="form-group">
//                         <label>パスワード確認:</label>
//                         <input
//                             type="password"
//                             name="passwordConfirmation"
//                             value={formData.passwordConfirmation}
//                             onChange={handleChange}
//                             autoComplete="new-password"
//                         />
//                         {errors.password_confirmation && (
//                             <div className="error">
//                                 {errors.password_confirmation}
//                             </div>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label>アイコン画像（任意）:</label>
//                         <input
//                             type="file"
//                             name="icon"
//                             onChange={handleChange}
//                         />
//                         {errors.icon && (
//                             <div className="error">{errors.icon}</div>
//                         )}
//                     </div>

//                     <button type="submit" className="button">
//                         登録
//                     </button>
//                 </form>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../sass/object/project/register.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        icon: null,
    });
    const [iconPreview, setIconPreview] = useState(null);
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
                setIconPreview(null);
            }
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("password_confirmation", formData.passwordConfirmation);
        if (formData.icon) {
            data.append("icon", formData.icon);
        }

        try {
            await axios.post("/api/register", data);
            alert("登録が完了しました。");
            window.location.href = "/mypage";
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
        <div className="register-page">
            <Header />
            <div className="register-container">
                
                <form onSubmit={handleSubmit} className="register-form">
                <h1 className="register-title">新規登録</h1>
                    <div className="form-group">
                        <label>名前:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            className="register-input"
                        />
                        {errors.name && (
                            <div className="register-error">{errors.name}</div>
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
                            className="register-input"
                        />
                        {errors.email && (
                            <div className="register-error">{errors.email}</div>
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
                            className="register-input"
                        />
                        {errors.password && (
                            <div className="register-error">{errors.password}</div>
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
                            className="register-input"
                        />
                        {errors.password_confirmation && (
                            <div className="register-error">
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
                            className="register-input-file"
                        />
                        {iconPreview && (
                            <img src={iconPreview} alt="Icon Preview" className="register-icon-preview" />
                        )}
                        {errors.icon && (
                            <div className="register-error">{errors.icon}</div>
                        )}
                    </div>
                    <button type="submit" className="register-button">
                        登録
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
