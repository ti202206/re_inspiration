import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get("/api/reviews")
            .then((response) => {
                console.log(response.data); // データ構造を確認
                setReviews(response.data); // APIからのレスポンスを状態にセット
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>全ユーザーのレビュー履歴</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div className="idea-card" key={review.id}>
                                <div className="idea-card__content">
                                    <div className="idea-card__title-category">
                                        <h3 className="idea-card__title">
                                            {review.idea.title}
                                        </h3>
                                    </div>
                                    <div className="idea-card__meta">
                                        <p className="idea-card__summary">{review.review}</p>
                                        <span className="idea-card__average-rating">
                                            {`評価: ${review.rating}`}
                                        </span>
                                        <p className="idea-card__created_date">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>レビューはまだありません。</p>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Reviews;
