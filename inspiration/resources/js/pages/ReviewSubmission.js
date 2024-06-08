// // src/components/ReviewSubmission.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import IdeaCard from "../components/IdeaCard";
// import { validateReviewForm } from "../utils/validation"; // バリデーション関数をインポート
// import { useParams } from 'react-router-dom';


// function ReviewSubmission() {
//     const initialFormData = {
//         review: '',
//         rating: '',
//     };

//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [formData, setFormData] = useState(initialFormData);
//     const [idea, setIdea] = useState(null);
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         const fetchIdea = async () => {
//             try {
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 setIdea(response.data.idea);
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//             }
//         };

//         fetchIdea();
//     }, [id]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // バリデーションエラーメッセージのクリア
//         setErrors({});

//         const newErrors = validateReviewForm(formData);
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         try {
//             const response = await axios.put(`/api/purchases/${id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             console.log('Review Submitted: ', response.data);
//             alert('レビューが投稿されました。');
//             setFormData(initialFormData);
//         } catch (error) {
//             console.error('Error submitting review:', error);
//             setErrors(error.response.data.errors || {});
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <div className="submission-form">
//                     <h2>レビューを投稿する</h2>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="rating">評価 (1-5):</label>
//                         <input
//                             type="number"
//                             id="rating"
//                             name="rating"
//                             value={formData.rating}
//                             onChange={handleChange}
//                             min="1"
//                             max="5"
//                             step="1"
//                         />
//                         {errors.rating && <p className="error">{errors.rating}</p>}

//                         <label htmlFor="review">レビュー:</label>
//                         <textarea
//                             id="review"
//                             name="review"
//                             value={formData.review}
//                             onChange={handleChange}
//                         />
//                         {errors.review && <p className="error">{errors.review}</p>}

//                         <button type="submit">投稿する</button>
//                     </form>
//                 </div>
//                 {idea && (
//                     <div className="idea-card-container">
//                         <h3>選択したアイディア</h3>
//                         <IdeaCard
//                             idea={idea}
//                             categories={{}}
//                             isPlaceholder={false}
//                         />
//                     </div>
//                 )}
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default ReviewSubmission;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // `useNavigate` を追加して遷移を管理
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReviewSubmission = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null); // エラーメッセージの状態を追加
    const navigate = useNavigate(); // ページ遷移に使用

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setIdea(response.data.idea);
            } catch (error) {
                console.error('Error fetching idea:', error);
                setError('データの取得に失敗しました。');
            }
        };

        fetchIdea();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/reviews/${id}`, { // 修正: 統一されたレビューのエンドポイントにリクエスト
                review: reviewText,
                rating: rating
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            // レビューが成功した場合の処理
            navigate(`/idea-detail/${id}`); // レビュー投稿後にアイディア詳細ページに戻る
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('レビューの投稿に失敗しました。');
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
        <div>
            <Header />
            <br /><br /><br /><br /><br />
            <main className="container">
                <h2>レビューを投稿する</h2>
                <form onSubmit={handleReviewSubmit}>
                    <label htmlFor="reviewText">レビュー</label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
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
                    <button type="submit">投稿する</button>
                </form>
                <br />
                <hr />
                <br />
                <h2>アイディア詳細</h2>
                <h3>{idea.title}</h3>
                <p>{idea.overview}</p>
                <p>{idea.content}</p>
                <p>価格: {idea.price}</p>
                <div>
                    <span>カテゴリ: {idea.category}</span>
                    <span>レビュー数: {idea.reviewCount}</span>
                    <span>平均評価: {idea.averageRating}</span>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewSubmission;
