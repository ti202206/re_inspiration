import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewUpdate = () => {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [idea, setIdea] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // アイディア取得
    const fetchIdea = async () => {
        try {
            const response = await axios.get(`/api/ideas/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setIdea(response.data.idea);
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

    // レビュー取得
    const fetchReview = async () => {
        try {
            const response = await axios.get(`/api/reviews/${id}/my-review`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            if (response.data.review) {
                setReview(response.data.review.review);
                setRating(response.data.review.rating);
            }
        } catch (error) {
            console.error("Error fetching review:", error);
            setError("レビューの取得に失敗しました。");
        }
    };

    useEffect(() => {
        fetchIdea();
        fetchReview();
    }, [id]);

    // レビュー更新を送信
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `/api/reviews/${id}`,
                { review, rating },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                navigate(-1); // 直前のページに戻る
            } else {
                throw new Error("レビューの更新に失敗しました。");
            }
        } catch (error) {
            console.error("Error updating review:", error);
            setError("レビューの更新に失敗しました。");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!idea) {
        return <div>Loading...</div>;
    }

    return (
        <div className="review-update__page">
            <Header />
            <main className="review-update__container">
                <div className="review-update__form">
                    <h2>レビューの編集</h2>

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
                                    setRating(Number(e.target.value))
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="review">レビュー内容:</label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </div>

                        <div className="review-update__buttons">
                            <button
                                type="submit"
                                className="review-update__button"
                            >
                                更新
                            </button>

                            <button
                                type="button"
                                className="review-update__button review-update__button--back"
                                onClick={() => navigate(-1)}
                                style={{ marginTop: "10px" }}
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

export default ReviewUpdate;
