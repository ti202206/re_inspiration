import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [currentUser,setCurrentUser]=useState(null);
    const navigate = useNavigate();

    // レビュー情報を取得
    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/reviews', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}` // 認証トークンを含める
                }
            });

            const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setReviews(sortedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchCurrentUser();
    }, []);

    const handleDetailClick = (id) => {
        navigate(`/idea-detail/${id}`);
    };

    const handleEditReviewClick = (reviewId) => {
        navigate(`/review-edit/${reviewId}`);
    };

    return (
        <div>
            <Header />
            <main className="container">
                <h2>レビュー一覧</h2>
                <section className="section-container">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => {
                            const isOwner = currentUser && review.buyer_id === currentUser.id;
                            return (
                                <ReviewCard
                                    key={index}
                                    idea={review.idea}
                                    review={review}
                                    user={{ name: review.buyer?.name || '匿名ユーザー' }} // buyer の名前を表示
                                    isOwner={isOwner}
                                    buttons={[
                                        {
                                            label: "詳細",
                                            onClick: () => handleDetailClick(review.idea.id),
                                        },
                                        isOwner && {
                                            label: "レビューを編集",
                                            onClick: () => handleEditReviewClick(review.id),
                                        },
                                    ].filter(Boolean)} // undefinedを除去
                                />
                            );
                        })
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

export default ReviewsList;
