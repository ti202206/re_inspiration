import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function IdeaSubmission() {
    const initialFormData = {
        title: "",
        overview: "",
        content: "",
        price: "",
        category_id: "",
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
                const response = await axios.get("/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // ボタン機能
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/ideas", formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            // console.log("Idea Submitted: ", response.data);
            navigate("/my-page");
        } catch (error) {
            console.error("Error submitting idea:", error);
            setErrors(error.response.data.errors || {});
        }
    };

    return (
        <div className="submission__page">
            <Header />
            <main className="submission__container">
                <div className="submission__form">
                    <h2>アイデアを投稿する</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="submission__title">
                            タイトル:公開情報です（30文字）
                            {errors.title && (
                                <p className="submission__error">
                                    {errors.title}
                                </p>
                            )}
                        </label>
                        <textarea
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="submission__input submission__input-title"
                        />

                        <label htmlFor="overview">
                            概要:公開情報です（90文字）
                            {errors.overview && (
                                <p className="submission__error">
                                    {errors.overview}
                                </p>
                            )}
                        </label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            className="submission__input submission__input-overview"
                        />

                        <label htmlFor="content">
                            詳細:購入者のみ見れるようになります（255文字）
                            {errors.content && (
                                <p className="submission__error">
                                    {errors.content}
                                </p>
                            )}
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="submission__input submission__input-content"
                        />

                        <label htmlFor="price">
                            価格 (円):
                            {errors.price && (
                                <p className="submission__error">
                                    {errors.price}
                                </p>
                            )}
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="1"
                            step="1"
                            className="submission__input"
                        />

                        <label htmlFor="category_id">
                            カテゴリ:
                            {errors.category_id && (
                                <p className="submission__error">
                                    {errors.category_id}
                                </p>
                            )}
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="submission__input"
                        >
                            <option value="">カテゴリを選択</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <button type="submit" className="submission__button">
                            投稿する
                        </button>
                    </form>
                    <button
                        className="submission__button"
                        onClick={() => navigate(-1)}
                        style={{ marginTop: "10px" }}
                    >
                        戻る
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaSubmission;
