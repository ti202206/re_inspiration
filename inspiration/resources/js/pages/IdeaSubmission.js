
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function IdeaSubmission() {
    const initialFormData = {
        title: '',
        overview: '',
        content: '',
        price: '',
        category_id: '',
        purchased: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // カテゴリデータの取得
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('/api/ideas', formData);
    //         console.log('Idea Submitted: ', response.data);
    //         setFormData(initialFormData);
    //         setErrors({});
    //     } catch (error) {
    //         console.error('Error submitting idea:', error);
    //         setErrors(error.response.data.errors || {});
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ideas', formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            console.log('Idea Submitted: ', response.data);
            navigate('/my-page'); // ＊＊＊＊＊＊変更：提出後に /my-page にリダイレクト＊＊＊＊＊＊
        } catch (error) {
            console.error('Error submitting idea:', error);
            setErrors(error.response.data.errors || {});
        }
    };

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアを投稿する</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">タイトル:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="error">{errors.title}</p>}

                        <label htmlFor="overview">概要:</label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                        />
                        {errors.overview && <p className="error">{errors.overview}</p>}

                        <label htmlFor="content">詳細:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                        {errors.content && <p className="error">{errors.content}</p>}

                        <label htmlFor="price">価格 (円):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="1"
                            step="1"
                        />
                        {errors.price && <p className="error">{errors.price}</p>}

                        <label htmlFor="category_id">カテゴリ:</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                        >
                            <option value="">カテゴリを選択</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="error">{errors.category_id}</p>}

                        <button type="submit">投稿する</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaSubmission;


/* src/styles/IdeaSubmission.css */

// .submission-form {
//     max-width: 600px;
//     margin: 20px auto;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     background-color: #f9f9f9;
// }

// .submission-form h2 {
//     text-align: center;
//     margin-bottom: 20px;
//     font-size: 24px;
// }

// .submission-form label {
//     display: block;
//     margin: 10px 0 5px;
//     font-weight: bold;
// }

// .submission-form input[type="text"],
// .submission-form input[type="number"],
// .submission-form textarea,
// .submission-form select {
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     margin-bottom: 10px;
//     box-sizing: border-box;
// }

// .submission-form textarea {
//     height: 100px;
// }

// .submission-form button {
//     display: block;
//     width: 100%;
//     background-color: #007bff;
//     color: white;
//     padding: 10px 0;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 16px;
//     margin-top: 10px;
//     transition: background-color 0.3s ease;
// }

// .submission-form button:hover {
//     background-color: #0056b3;
// }

// .error {
//     color: red;
//     font-size: 14px;
// }
