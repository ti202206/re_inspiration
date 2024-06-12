// 

// import React from 'react';

// // ReviewCard コンポーネント定義
// const ReviewCard = ({ idea = {}, categories = {}, review = {}, user = {}, buttons = [] }) => {
//     return (
//         <div className="idea-card">
//             <div className="idea-card__content">
//                 <div className="idea-card__title-category">
//                     {/* アイディアのタイトルを表示 */}
//                     <h3 className="idea-card__title">{idea.title}</h3>
//                 </div>

//                 <div className="idea-card__meta">
//                     <span className="idea-card__average-rating">
//                         <i className="fa-solid fa-star-half-stroke"></i>{idea.average_rating === 0 ? '-' : idea.average_rating || '-'}
//                     </span>
//                     <span className="idea-card__review-count">
//                         <i className="fa-regular fa-comment-dots"></i>{idea.review_count || 0}
//                     </span>
//                     <span className="idea-card__purchase-count">
//                         <i className="fa-solid fa-cart-arrow-down"></i>{idea.purchase_count || 0}
//                     </span>
//                     <span className="idea-card__favorite_count">
//                         <i className="fa-regular fa-thumbs-up"></i>{idea.favorite_count || 0}
//                     </span>
//                     <p className="idea-card__category">
//                         <i className="fa-solid fa-tags"></i>{categories[idea.category_id]}
//                     </p>
//                 </div>

//                 {/* ユーザー名を表示 */}
//                 <p className="idea-card__user">
//                     <i className="fa-regular fa-user"></i> {user.name}
//                 </p>

//                 {/* レビュー内容をサマリーに表示 */}
//                 <p className="idea-card__summary">{review.review}</p>
                
//                 {/* レビューの評価と投稿日を表示 */}
//                 <div className="review-card__extra-content">
//                     <span>評価: {review.rating}</span>
//                     <p>投稿日: {new Date(review.created_at).toLocaleDateString()}</p>
//                 </div>
//             </div>
//             <div className="idea-card__buttons">
//                 {buttons.map((button, index) => (
//                     <button
//                         key={index}
//                         className="idea-card__button"
//                         onClick={button.onClick}
//                     >
//                         {button.label}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ReviewCard;


// src/components/ReviewCard.js
import React from 'react';

const ReviewCard = ({ idea = {}, review = {}, user = {}, buttons = [], isPlaceholder = false }) => {
    const updatedDate = idea.updated_at ? new Date(idea.updated_at).toLocaleDateString() : '';
    const userName = user ? user.name : 'ユーザー情報なし';

    return (
        <div className="idea-card">
            <div className="idea-card__content">
                <div className="idea-card__title-category">
                    <h3 className="idea-card__title">{idea.title}</h3>
                </div>
                <div className="idea-card__meta">
                    <span className="idea-card__average-rating">
                        <i className="fa-solid fa-star-half-stroke"></i>{idea.average_rating === 0 ? '-' : idea.average_rating || '-'}
                    </span>
                    <span className="idea-card__review-count">
                        <i className="fa-regular fa-comment-dots"></i>{idea.review_count || 0}
                    </span>
                    <span className="idea-card__purchase-count">
                        <i className="fa-solid fa-cart-arrow-down"></i>{idea.purchase_count || 0}
                    </span>
                    <span className="idea-card__favorite_count">
                        <i className="fa-regular fa-thumbs-up"></i>{idea.favorite_count || 0}
                    </span>
                    <p className="idea-card__updated-at">
                        <i className="fa-regular fa-clock"></i>{isPlaceholder ? '' : updatedDate}
                    </p>
                </div>
                <p className="idea-card__user">
                    <i className="fa-regular fa-user"></i> {user.name}
                </p>
                <p className="idea-card__summary">{review.review}</p>
                <div className="review-card__extra-content">
                    <span>評価: {review.rating}</span>
                    <p>投稿日: {new Date(review.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="idea-card__buttons">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className="idea-card__button"
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
