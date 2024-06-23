import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";

const IdeaDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [user, setUser] = useState(null);
    const [idea, setIdea] = useState({});
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [favorite, setFavorite] = useState({}); // 気になるの状態管理
    const [reviews, setReviews] = useState([]); // レビューの状態管理
    const [averageRating, setAverageRating] = useState(0); // 平均評価
    const [reviewCount, setReviewCount] = useState(0); // レビュー数
    const [favoriteCount, setFavoriteCount] = useState(0); // 気になる数
    const [purchaseCount, setPurchaseCount] = useState(0); // 購入数の状態管理
    const [purchases, setPurchases] = useState([]); // ユーザーの購入情報
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
    const navigate = useNavigate();

    // ユーザー情報，購入情報を取得
    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`, // 認証トークンを設定
                },
            });
            setUser(response.data);
            // console.log("Fetched user:", response.data);

            // 購入情報を取得
            const purchaseResponse = await axios.get("/api/mypurchases", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setPurchases(purchaseResponse.data);
            // console.log("Fetched purchases:", purchaseResponse.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // 気になる情報を取得
    const fetchFavorite = async () => {
        try {
            const response = await axios.get(`/api/favorites/idea/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setFavorite(response.data || {});
            // console.log("Fetched favorite:", response.data);
        } catch (error) {
            console.error("Error fetching favorite:", error);
        }
    };

    // アイディア情報を取得
    const fetchIdea = async () => {
        try {
            const response = await axios.get(`/api/ideas/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            // console.log("Fetched idea:", response.data); // デバッグ用
            setIdea(response.data.idea); // アイデアデータを設定

            setAverageRating(response.data.average_rating || 0); // 平均評価を設定
            setReviewCount(response.data.review_count || 0); // レビュー数を設定
            setFavoriteCount(response.data.favorite_count || 0); // 気になる数を設定
            setPurchaseCount(response.data.purchase_count || 0); // 購入数を設定

            setReviews(response.data.reviews || []);
        } catch (error) {
            console.error("Error fetching idea:", error);
            setError("データの取得に失敗しました。");
        }
    };

    // カテゴリー情報取得
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            // console.log("Fetched categories:", response.data); // デバッグ用
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

    // レビュー情報取得
    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/reviews", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`, // 認証トークンを含める
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

    // ユーザー情報取得後にレビュー情報を取得
    useEffect(() => {
        if (user) {
            fetchReviews(); // レビュー情報を取得
        }
    }, [user, id]);

    // 現在のユーザーが特定のアイデアを購入しているかを確認
    const hasPurchased = (ideaId) => {
        return purchases.some((purchase) => purchase.idea_id === ideaId);
    };

    // 購入処理を実行する関数
    const handlePurchase = async (ideaId) => {
        // user_idがnullでないことを確認
        if (idea.user_id === null) {
            alert("このアイディアの投稿者は退会済みのため、購入できません。");
            return;
        }

        try {
            const response = await axios.post(
                "/api/purchases",
                { idea_id: ideaId },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("購入が完了しました。");
                navigate(`/purchase-detail/${ideaId}`);
            } else {
                throw new Error("購入に失敗しました。");
            }
        } catch (error) {
            console.error("Error during purchase:", error);
            alert("購入処理に失敗しました。");
        }
    };

    // 気になるトグル処理
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
                fetchFavorite(); // 気になるの状態を再取得
            } else {
                throw new Error("サーバーエラー: " + response.status);
            }
        } catch (error) {
            console.error("気になるの解除に失敗しました", error);
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
        <div className="idea-detail__page">
            <Header />
            <main className="idea-detail__container">
                <div className="idea-detail__form">
                    <h2>アイデアの詳細</h2>

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
                        <div className="form-value">
                            詳細は購入後に見ることができます。
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            投稿者:
                            {idea.user?.name ? (
                                <Link to={`/user/${idea.user.id}`}>
                                    {idea.user.name}
                                </Link>
                            ) : (
                                "投稿者不明"
                            )}
                        </label>
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

                    <div className="idea-card__buttons">
                        {user &&
                            idea.user_id !== user.id &&
                            idea.user_id !== null &&
                            !hasPurchased(idea.id) && (
                                <button
                                    className="idea-detail__button"
                                    onClick={() => handlePurchase(idea.id)}
                                >
                                    購入する
                                </button>
                            )}

                        {/* 「気になる」ボタンを表示 */}
                        {user && idea.user_id !== user.id && (
                            <button
                                className="idea-detail__button"
                                onClick={() => handleToggleFavorite(idea.id)}
                            >
                                {favorite.is_favorite
                                    ? "気になるを削除"
                                    : "気になる"}
                            </button>
                        )}

                        <button
                            className="idea-detail__button idea-detail__button--back"
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
                                        <strong>{review.rating}</strong> / 5
                                    </p>
                                    <p>{review.review}</p>
                                    {/* <p><strong>投稿者:</strong> {review.buyer_name}</p> */}
                                    <p>
                                        <strong>投稿者:</strong>
                                        {/* レビュアー名にリンクを追加 */}
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
                                            {new Date(
                                                review.updated_at
                                            ).toLocaleDateString("ja-JP", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </small>
                                    </p>
                                    {index < reviews.length - 1 && (
                                        <hr className="review-divider" />
                                    )}
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

export default IdeaDetail;
