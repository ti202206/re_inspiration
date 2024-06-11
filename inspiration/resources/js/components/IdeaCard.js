import React from 'react';

// IdeaCard コンポーネント定義
const IdeaCard = ({ idea = {}, categories = {}, isPlaceholder, buttons = [], updatedAt = '' }) => {
    return (
        <div className="idea-card">
            <div className="idea-card__content">
                <div className="idea-card__title-category">
                    {/* idea がない場合はデフォルトで "データがありません" を表示 */}
                    <h3 className="idea-card__title">{isPlaceholder ? 'データがありません' : idea.title}</h3>
                </div>
                <p className="idea-card__summary">{isPlaceholder ? '' : idea.overview}</p>
                <div className="idea-card__meta">

                    {/* 平均値を表示 */}
                    <span className="idea-card__average-rating">
                        <i className="fa-solid fa-star-half-stroke"></i>{isPlaceholder || idea.average_rating === 0 ? '-' : idea.average_rating || '-'}
                    </span>

                    {/* レビューの数を表示 */}
                    <span className="idea-card__review-count">
                        <i className="fa-regular fa-comment-dots"></i>{isPlaceholder ? 0 : idea.review_count || 0}
                    </span>

                    {/* 購入数を表示 */}
                    <span className="idea-card__purchase-count">
                        <i className="fa-solid fa-cart-arrow-down"></i>{isPlaceholder ? 0 : idea.purchase_count || 0}
                    </span>

                    {/* 気になる数を表示 */}
                    <span className="idea-card__favorite_count">
                        <i className="fa-regular fa-thumbs-up"></i>{isPlaceholder ? 0 : idea.favorite_count || 0}
                    </span>

                    {/* カテゴリーを表示 */}
                    <p className="idea-card__category">
                        <i className="fa-solid fa-tags"></i>{isPlaceholder ? '' : categories[idea.category_id]}
                    </p>

                    {/* 投稿日を表示（更新日時を使用） */}
                    <p className="idea-card__updated-at">
                        <i className="fa-regular fa-clock"></i>{isPlaceholder ? '' : new Date(updatedAt).toLocaleDateString()}
                    </p>

                </div>
            </div>
            {/* データがない場合はボタンを表示しない */}
            {!isPlaceholder && (
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
            )}
        </div>
    );
};

export default IdeaCard;
