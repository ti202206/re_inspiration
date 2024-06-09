// // src/pages/ReviewUpdate.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom'; // `useNavigate` を追加して遷移を管理
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const ReviewUpdate = () => {
//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [idea, setIdea] = useState(null);
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState(0);
//     const [error, setError] = useState(null); // エラーメッセージの状態を追加
//     const navigate = useNavigate(); // ページ遷移に使用

//     useEffect(() => {
//         const fetchReviewAndIdea = async () => {
//             try {
//                 // レビューの取得
//                 const reviewResponse = await axios.get(`/api/purchases/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                     }
//                 });
//                 const review = reviewResponse.data;
//                 setReviewText(review.review);
//                 setRating(review.rating);

//                 // アイディアの取得
//                 const ideaResponse = await axios.get(`/api/ideas/${review.idea_id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                     }
//                 });
//                 setIdea(ideaResponse.data.idea);
//             } catch (error) {
//                 console.error('Error fetching review or idea:', error);
//                 setError('データの取得に失敗しました。');
//             }
//         };

//         fetchReviewAndIdea();
//     }, [id]);

//     const handleReviewSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // レビューの更新
//             await axios.put(`/api/purchases/${id}`, {
//                 review: reviewText,
//                 rating: rating
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                 }
//             });
//             // 更新成功時の処理
//             navigate(`/idea-detail/${idea.id}`); // レビュー編集後にアイディア詳細ページに戻る
//         } catch (error) {
//             console.error('Error updating review:', error);
//             setError('レビューの更新に失敗しました。');
//         }
//     };

//     // エラーメッセージを表示
//     if (error) {
//         return <div>{error}</div>;
//     }

//     // データロード中の表示
//     if (!idea) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <h2>レビューを編集する</h2>
//                 <form onSubmit={handleReviewSubmit}>
//                     <label htmlFor="reviewText">レビュー</label>
//                     <textarea
//                         id="reviewText"
//                         value={reviewText}
//                         onChange={(e) => setReviewText(e.target.value)}
//                     />
//                     <label htmlFor="rating">評価</label>
//                     <input
//                         id="rating"
//                         type="number"
//                         min="1"
//                         max="5"
//                         value={rating}
//                         onChange={(e) => setRating(parseInt(e.target.value, 10))}
//                     />
//                     <button type="submit">更新する</button>
//                 </form>
//                 <br />
//                 <hr />
//                 <br />
//                 <h2>アイディア詳細</h2>
//                 <h3>{idea.title}</h3>
//                 <p>{idea.overview}</p>
//                 <p>{idea.content}</p>
//                 <p>価格: {idea.price}</p>
//                 <div>
//                     <span>カテゴリ: {idea.category}</span>
//                     <span>レビュー数: {idea.reviewCount}</span>
//                     <span>平均評価: {idea.averageRating}</span>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default ReviewUpdate;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useLocation } from 'react-router-dom';

const ReviewUpdate = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const location = useLocation();
    const { reviewId } = location.state || {}; // 以前の画面からのreviewIdを受け取る
    const [review, setReview] = useState(''); // 空文字列で初期化
    const [rating, setRating] = useState(0); // 0で初期化
    const [error, setError] = useState(null); // エラーメッセージの状態管理

    useEffect(() => {
        const fetchReviewAndIdea = async () => {
            try {
                const response = await axios.get(`/api/purchases/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                setReview(response.data.review || ''); // デフォルトで空文字列
                setRating(response.data.rating || 0); // デフォルトで0
            } catch (error) {
                console.error('Error fetching review or idea:', error);
                setError('データの取得に失敗しました。');
            }
        };

        if (reviewId) {
            fetchReviewAndIdea();
        }
    }, [reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/reviews/${reviewId}`, {
                review: review,
                rating: rating
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            // レビューが成功した場合の処理
            alert('レビューが更新されました');
        } catch (error) {
            console.error('Error updating review:', error);
            setError('レビューの更新に失敗しました。');
        }
    };

    // エラーメッセージを表示
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header />

            <br /><br /><br /><br /><br />
            <main className="container">
                <h2>レビューを更新する</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="review">レビュー</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <label htmlFor="rating">評価</label>
                    <input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <button type="submit">更新する</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewUpdate;
