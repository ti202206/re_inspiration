import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../sass/object/project/_top.scss";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     passwordConfirmation: '',
    //     icon: null,
    // });
    // const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    //     axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    //     console.log(csrfToken);
    // }, []);

    // const handleChange = (event) => {
    //     const { name, value, files } = event.target;
    //     if (name === "icon") {
    //         setFormData(prevState => ({ ...prevState, [name]: files[0] }));
    //     } else {
    //         setFormData(prevState => ({ ...prevState, [name]: value }));
    //     }
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const data = new FormData();
    //     data.append('name', formData.name);
    //     data.append('email', formData.email);
    //     data.append('password', formData.password);
    //     data.append('password_confirmation', formData.passwordConfirmation);
    //     if (formData.icon) {
    //         data.append('icon', formData.icon);
    //     }

    //     try {
    //         await axios.post('/api/register', data);
    //         alert('登録が完了しました。ログインしてください。');
    //     } catch (error) {
    //         if (error.response) {
    //             setErrors(error.response.data.errors);
    //             alert('エラーが発生しました。入力内容を確認してください。');
    //         }
    //     }
    // };

    return (
        <div>
            <Header />
            {/* <div className="container">
                <h1 className="section__title">新規登録</h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>名前:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label>メールアドレス:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label>パスワード:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="form-group">
                        <label>パスワード確認:</label>
                        <input type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleChange} />
                        {errors.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                    </div> */}

                    {/* <div className="form-group">
                        <label>アイコン画像（任意）:</label>
                        <input type="file" name="icon" onChange={handleChange} />
                        {errors.icon && <div className="error">{errors.icon}</div>}
                    </div> */}

                    {/* <button type="submit" className="button">登録</button>
                </form>
            </div> */}

<p><br/><br/><br/><br/><br/><br/><br/><br/>register フォーム</p>
            <Footer />
        </div>
    );
};

export default Register;
