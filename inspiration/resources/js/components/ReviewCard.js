import React from "react";

const ReviewCard = ({
    className,
    idea = {},
    review = {},
    user = {},
    buttons = [],
    isPlaceholder = false,
}) => {
    const updatedDate = idea.updated_at
        ? new Date(idea.updated_at).toLocaleDateString()
        : "";
    const userName = user ? user.name : "ユーザー情報なし";

    return (
        <div className={`review-card ${className}`}>
            <div className="review-card__content">
                <div className="review-card__title-category">
                    <h3 className="review-card__title">{idea.title}</h3>
                </div>
                <div className="review-card__meta">
                    <span className="review-card__average-rating">
                        <i className="fa-solid fa-star-half-stroke"></i>
                        {idea.average_rating === 0
                            ? "-"
                            : idea.average_rating || "-"}
                    </span>
                    <span className="review-card__review-count">
                        <i className="fa-regular fa-comment-dots"></i>
                        {idea.review_count || 0}
                    </span>
                    <span className="review-card__purchase-count">
                        <i className="fa-solid fa-cart-arrow-down"></i>
                        {idea.purchase_count || 0}
                    </span>
                    <span className="review-card__favorite-count">
                        <i className="fa-regular fa-thumbs-up"></i>
                        {idea.favorite_count || 0}
                    </span>
                    <p className="review-card__updated-at">
                        <i className="fa-regular fa-clock"></i>
                        {isPlaceholder ? "" : updatedDate}
                    </p>
                </div>
                <p className="review-card__summary">{review.review}</p>
                <div className="review-card__extra-content">
                    <p>レビュー：</p>
                    <p className="review-card__user">
                        <i className="fa-regular fa-user"></i> {user.name}
                    </p>
                    <span>評価: {review.rating}</span>
                    <p>
                        投稿日:{" "}
                        {new Date(review.updated_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="review-card__buttons">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className="review-card__button"
                        onClick={button.onClick}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewCard;
