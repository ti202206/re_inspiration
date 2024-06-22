import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";

const PurchaseDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({});
    const [favorite, setFavorite] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchFavorite = async () => {
        try {
            const response = await axios.get(`/api/favorites/idea/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setFavorite(response.data);
        } catch (error) {
            console.error("Error fetching favorite:", error);
        }
    };

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
            setReviews(response.data.reviews || []);
        } catch (error) {
            console.error("Error fetching idea:", error);
            setError("データの取得に失敗しました。");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            const categoriesMap = response.data.reduce((map, category) => {
                map[category.id] = category.name;
                return map;
            }, {});
            setCategories(categoriesMap);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("カテゴリデータの取得に失敗しました。");
        }
    };

    useEffect(() => {
        fetchUser();
        fetchIdea();
        fetchCategories();
        fetchFavorite();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/reviews", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            const filteredReviews = response.data.filter(
                (review) => review.idea_id === Number(id)
            );
            const sortedReviews = filteredReviews.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            setReviews(sortedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchReviews();
        }
    }, [user, id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!idea) {
        return <div>Loading...</div>;
    }

    const handleToggleFavorite = async (ideaId) => {
        try {
            const response = await axios.post(
                "/api/favorites/toggle",
                { idea_id: ideaId },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                fetchFavorite();
            } else {
                throw new Error("サーバーエラー: " + response.status);
            }
        } catch (error) {
            console.error("気になるの解除に失敗しました", error);
        }
    };

    return (
        <div className="purchase-detail__page">
            <Header />
            <main className="purchase-detail__container">
                <div className="purchase-detail__form">
                    <h2>購入したアイデアの詳細</h2>

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
                        <label>投稿者:</label>
                        <div className="form-value">
                            {idea.user ? (
                                <Link to={`/user/${idea.user.id}`}>
                                    {idea.user.name}
                                </Link>
                            ) : (
                                "投稿者不明"
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>価格 (円):</label>
                        <div className="form-value">{idea.price}</div>
                    </div>

                    <div className="form-group">
                        <label>カテゴリ:</label>
                        <div className="form-value">
                            {categories[idea.category_id] || "カテゴリ不明"}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>更新日時:</label>
                        <div className="form-value">
                            {new Date(idea.updated_at).toLocaleString()}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>平均評価:</label>
                        <div className="form-value">
                            {Number(averageRating).toFixed(1)} / 5
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

                    <div className="purchase-detail__buttons">
                        {user && idea.user_id !== user.id && favorite && (
                            <>
                                {purchaseCount > 0 && reviewCount === 0 && (
                                    <button
                                        className="purchase-detail__button"
                                        onClick={() =>
                                            navigate(`/reviews/${idea.id}`)
                                        }
                                    >
                                        レビューをする
                                    </button>
                                )}
                                {purchaseCount > 0 && reviewCount > 0 && (
                                    <button
                                        className="purchase-detail__button"
                                        onClick={() =>
                                            navigate(
                                                `/review-update/${idea.id}`
                                            )
                                        }
                                    >
                                        レビューを編集する
                                    </button>
                                )}
                            </>
                        )}

                        {user && idea.user_id !== user.id && favorite && (
                            <button
                                className="purchase-detail__button"
                                onClick={() => handleToggleFavorite(idea.id)}
                            >
                                {favorite.is_favorite
                                    ? "気になるから削除"
                                    : "気になる"}
                            </button>
                        )}

                        <button
                            className="purchase-detail__button purchase-detail__button--back"
                            onClick={() => navigate(-1)}
                        >
                            戻る
                        </button>
                    </div>

                    <div className="review-section">
                        <h3>レビュー</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p>
                                        <strong>評価:</strong> {review.rating} /
                                        5
                                    </p>
                                    <p>
                                        <strong>レビュー:</strong>{" "}
                                        {review.review}
                                    </p>
                                    <p>
                                        <strong>投稿者:</strong>
                                        {review.buyer_id ? (
                                            <Link
                                                to={`/user/${review.buyer_id}`}
                                            >
                                                {review.buyer_name}
                                            </Link>
                                        ) : (
                                            review.buyer_name || "投稿者不明"
                                        )}
                                    </p>
                                    <p>
                                        <small>
                                            投稿日:{" "}
                                            {new Date(
                                                review.updated_at
                                            ).toLocaleDateString("ja-JP", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </small>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>レビューはまだありません。</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PurchaseDetail;
