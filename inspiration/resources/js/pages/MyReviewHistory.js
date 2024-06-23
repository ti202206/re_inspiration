import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

function MyReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // 投稿したレビュー情報を取得
    const fetchMyReviews = async () => {
        try {
            // 自身のユーザー情報を取得
            const userResponse = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            const currentUser = userResponse.data;
            setCurrentUser(currentUser);

            // 自身のレビューのみを取得
            const reviewsResponse = await axios.get("/api/reviews", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });

            // 自身の投稿したレビューを表示 最新が上に来るように並び替え
            const myReviews = reviewsResponse.data.filter(
                (review) => review.buyer_id === currentUser.id
            );
            const sortedReviews = myReviews.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setReviews(sortedReviews);
        } catch (error) {
            console.error("Error fetching my reviews:", error);
        }
    };

    useEffect(() => {
        fetchMyReviews();
    }, []);

    // ボタン機能
    const handleDetailClick = (id) => {
        navigate(`/idea-detail/${id}`);
    };

    // 必要なら，レビューをする機能
    // const handleEditReviewClick = (reviewId) => {
    //     navigate(`/review-edit/${reviewId}`);
    // };

    return (
        <div>
            <Header />
            <main className="container">
                <h2>自身のレビュー一覧</h2>
                <section className="section-container">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <ReviewCard
                                key={index}
                                idea={review.idea}
                                review={review}
                                user={{
                                    name: review.buyer_name || "匿名ユーザー",
                                }}
                                isOwner={true} // 常に自身のレビューのみ表示
                                buttons={[
                                    {
                                        label: "詳細",
                                        onClick: () =>
                                            handleDetailClick(review.idea.id),
                                    },
                                    // 必要なら，レビューをする機能
                                    // {
                                    //     label: "レビューを編集",
                                    //     onClick: () => handleEditReviewClick(review.id),
                                    // },
                                ]}
                            />
                        ))
                    ) : (
                        <ReviewCard isPlaceholder={true} />
                    )}
                </section>
                <button
                    className="idea-card__button"
                    onClick={() => navigate(-1)}
                >
                    戻る
                </button>
            </main>
            <Footer />
        </div>
    );
}

export default MyReviewsList;
