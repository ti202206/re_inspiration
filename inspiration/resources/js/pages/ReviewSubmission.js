import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewSubmission = () => {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [idea, setIdea] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(""); // 数字以外が入力されないようにする
    const [averageRating, setAverageRating] = useState(0); // 平均評価
    const [reviewCount, setReviewCount] = useState(0); // レビュー数
    const [favoriteCount, setFavoriteCount] = useState(0); // 気になる数
    const [purchaseCount, setPurchaseCount] = useState(0); // 購入数
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                const ideaData = response.data.idea;
                setIdea(ideaData);
                setAverageRating(response.data.average_rating || 0);
                setReviewCount(response.data.review_count || 0);
                setFavoriteCount(response.data.favorite_count || 0);
                setPurchaseCount(response.data.purchase_count || 0);
            } catch (error) {
                console.error("Error fetching idea:", error);
                if (error.response && error.response.status === 403) {
                    setError("アクセス権限がありません。");
                } else {
                    setError("アイディアの取得に失敗しました。");
                }
            }
        };

        fetchIdea();
    }, [id]);

    // ボタン機能
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `/api/reviews/${id}`,
                { review, rating: Number(rating) },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                navigate(-1);
            } else {
                throw new Error("レビューの送信に失敗しました。");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("レビューの送信に失敗しました。");
        }
    };

    // エラーメッセージを表示
    if (error) {
        return <div>{error}</div>;
    }

    // データロード中の表示
    if (!idea) {
        return <div>Loading...</div>;
    }

    return (
        <div className="review-submission__page">
            <Header />
            <main className="review-submission__container">
                <div className="review-submission__form">
                    <h2 className="review-submission__title">レビューの投稿</h2>

                    <div className="form-group">
                        <label>タイトル:</label>
                        <div className="form-value">{idea.title}</div>
                    </div>

                    <div className="form-group">
                        <label>概要:</label>
                        <div className="form-value">{idea.overview}</div>
                    </div>

                    <div className="form-group">
                        <label>詳細:</label>
                        <div className="form-value">{idea.content}</div>
                    </div>

                    <div className="form-group">
                        <label>平均評価:</label>
                        <div className="form-value">
                            {averageRating > 0
                                ? `${Number(averageRating).toFixed(1)} / 5`
                                : "－"}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>レビュー数:</label>
                        <div className="form-value">{reviewCount}</div>
                    </div>

                    <div className="form-group">
                        <label>気になる数:</label>
                        <div className="form-value">{favoriteCount}</div>
                    </div>

                    <div className="form-group">
                        <label>購入数:</label>
                        <div className="form-value">{purchaseCount}</div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="rating">評価 (1-5):</label>
                            <input
                                type="number"
                                id="rating"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) =>
                                    setRating(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    )
                                }
                                required
                                className="review-submission__input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="review">レビュー内容:</label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                                className="review-submission__input"
                            />
                        </div>

                        <div className="review-submission__buttons">
                            <button
                                type="submit"
                                className="review-submission__button"
                            >
                                送信
                            </button>

                            <button
                                type="button"
                                className="review-submission__button review-submission__button--back"
                                onClick={() => navigate(-1)}
                            >
                                戻る
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewSubmission;
