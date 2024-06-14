// // // // src/components/ReviewSubmission.js
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Header from "../components/Header";
// // // import Footer from "../components/Footer";
// // // import IdeaCard from "../components/IdeaCard";
// // // import { validateReviewForm } from "../utils/validation"; // バリデーション関数をインポート
// // // import { useParams } from 'react-router-dom';


// // // function ReviewSubmission() {
// // //     const initialFormData = {
// // //         review: '',
// // //         rating: '',
// // //     };

// // //     const { id } = useParams(); // URLパラメータからIDを取得
// // //     const [formData, setFormData] = useState(initialFormData);
// // //     const [idea, setIdea] = useState(null);
// // //     const [errors, setErrors] = useState({});

// // //     useEffect(() => {
// // //         const fetchIdea = async () => {
// // //             try {
// // //                 const response = await axios.get(`/api/ideas/${id}`, {
// // //                     headers: {
// // //                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// // //                     }
// // //                 });
// // //                 setIdea(response.data.idea);
// // //             } catch (error) {
// // //                 console.error('Error fetching idea:', error);
// // //             }
// // //         };

// // //         fetchIdea();
// // //     }, [id]);

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         // バリデーションエラーメッセージのクリア
// // //         setErrors({});

// // //         const newErrors = validateReviewForm(formData);
// // //         if (Object.keys(newErrors).length > 0) {
// // //             setErrors(newErrors);
// // //             return;
// // //         }

// // //         try {
// // //             const response = await axios.put(`/api/purchases/${id}`, formData, {
// // //                 headers: {
// // //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// // //                 }
// // //             });
// // //             console.log('Review Submitted: ', response.data);
// // //             alert('レビューが投稿されました。');
// // //             setFormData(initialFormData);
// // //         } catch (error) {
// // //             console.error('Error submitting review:', error);
// // //             setErrors(error.response.data.errors || {});
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <Header />
// // //             <main className="container">
// // //                 <div className="submission-form">
// // //                     <h2>レビューを投稿する</h2>
// // //                     <form onSubmit={handleSubmit}>
// // //                         <label htmlFor="rating">評価 (1-5):</label>
// // //                         <input
// // //                             type="number"
// // //                             id="rating"
// // //                             name="rating"
// // //                             value={formData.rating}
// // //                             onChange={handleChange}
// // //                             min="1"
// // //                             max="5"
// // //                             step="1"
// // //                         />
// // //                         {errors.rating && <p className="error">{errors.rating}</p>}

// // //                         <label htmlFor="review">レビュー:</label>
// // //                         <textarea
// // //                             id="review"
// // //                             name="review"
// // //                             value={formData.review}
// // //                             onChange={handleChange}
// // //                         />
// // //                         {errors.review && <p className="error">{errors.review}</p>}

// // //                         <button type="submit">投稿する</button>
// // //                     </form>
// // //                 </div>
// // //                 {idea && (
// // //                     <div className="idea-card-container">
// // //                         <h3>選択したアイディア</h3>
// // //                         <IdeaCard
// // //                             idea={idea}
// // //                             categories={{}}
// // //                             isPlaceholder={false}
// // //                         />
// // //                     </div>
// // //                 )}
// // //             </main>
// // //             <Footer />
// // //         </div>
// // //     );
// // // }

// // // export default ReviewSubmission;




// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// // const ReviewSubmission = () => {
// //     const { id } = useParams(); // URLパラメータからIDを取得
// //     const [idea, setIdea] = useState(null);
// //     const [reviewText, setReviewText] = useState('');
// //     const [rating, setRating] = useState(0);
// //     const [error, setError] = useState(null); // エラーメッセージの状態管理
// //     const navigate = useNavigate(); // ページ遷移に使用

// //     useEffect(() => {
// //         const fetchIdea = async () => {
// //             try {
// //                 const response = await axios.get(`/api/ideas/${id}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// //                     }
// //                 });
// //                 setIdea(response.data.idea);
// //             } catch (error) {
// //                 console.error('Error fetching idea:', error);
// //                 setError('データの取得に失敗しました。');
// //             }
// //         };

// //         fetchIdea();
// //     }, [id]);

// //     const handleReviewSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await axios.post(`/api/reviews/${id}`, { // 修正: 統一されたレビューのエンドポイントにリクエスト
// //                 review: reviewText,
// //                 rating: rating
// //             }, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// //                 }
// //             });
// //             // レビューが成功した場合の処理
// //             navigate(`/idea-detail/${id}`); // レビュー投稿後にアイディア詳細ページに戻る
// //         } catch (error) {
// //             console.error('Error submitting review:', error);
// //             setError('レビューの投稿に失敗しました。');
// //         }
// //     };

// //     // エラーメッセージを表示
// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     // データロード中の表示
// //     if (!idea) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div>
// //             <Header />
// //             <br /><br /><br /><br /><br />
// //             <main className="container">
// //                 <h2>レビューを投稿する</h2>
// //                 <form onSubmit={handleReviewSubmit}>
// //                     <label htmlFor="reviewText">レビュー</label>
// //                     <textarea
// //                         id="reviewText"
// //                         value={reviewText}
// //                         onChange={(e) => setReviewText(e.target.value)}
// //                     />
// //                     <label htmlFor="rating">評価</label>
// //                     <input
// //                         id="rating"
// //                         type="number"
// //                         min="1"
// //                         max="5"
// //                         value={rating}
// //                         onChange={(e) => setRating(parseInt(e.target.value, 10))}
// //                     />
// //                     <button type="submit">投稿する</button>
// //                 </form>
// //                 <br />
// //                 <hr />
// //                 <br />
// //                 <h2>アイディア詳細</h2>
// //                 <h3>{idea.title}</h3>
// //                 <p>{idea.overview}</p>
// //                 <p>{idea.content}</p>
// //                 <p>価格: {idea.price}</p>
// //                 <div>
// //                     <span>カテゴリ: {idea.category}</span>
// //                     <span>レビュー数: {idea.reviewCount}</span>
// //                     <span>平均評価: {idea.averageRating}</span>
// //                 </div>
// //             </main>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default ReviewSubmission;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const ReviewSubmission = () => {
//     const { id } = useParams(); // アイディアIDをURLパラメータから取得
//     const [idea, setIdea] = useState(null);
//     const [review, setReview] = useState('');
//     const [rating, setRating] = useState(0);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // アイディア情報を取得
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
//                 setError('アイディアの取得に失敗しました。');
//             }
//         };

//         fetchIdea();
//     }, [id]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post(`/api/reviews/${id}`, { review, rating }, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             if (response.status === 201) {
//                 navigate(`/purchases/${id}`);
//             } else {
//                 throw new Error('レビューの送信に失敗しました。');
//             }
//         } catch (error) {
//             console.error('Error submitting review:', error);
//             setError('レビューの送信に失敗しました。');
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
//                 <div className="submission-form">
//                     <h2>レビューの投稿</h2>

//                     <div className="form-group">
//                         <label>タイトル:</label>
//                         <div className="form-value">{idea.title}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>概要:</label>
//                         <div className="form-value">{idea.overview}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>詳細:</label>
//                         <div className="form-value">{idea.content}</div>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="rating">評価 (1-5):</label>
//                             <input
//                                 type="number"
//                                 id="rating"
//                                 min="1"
//                                 max="5"
//                                 value={rating}
//                                 onChange={(e) => setRating(Number(e.target.value))}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="review">レビュー内容:</label>
//                             <textarea
//                                 id="review"
//                                 value={review}
//                                 onChange={(e) => setReview(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="btn">送信</button>
//                     </form>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default ReviewSubmission;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReviewSubmission = () => {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [user, setUser] = useState(null);
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    // const [favorite, setFavorite] = useState({}); // お気に入りの状態管理
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0); // 平均評価
    const [reviewCount, setReviewCount] = useState(0); // レビュー数
    const [favoriteCount, setFavoriteCount] = useState(0); // 気になる数
    const [purchaseCount, setPurchaseCount] = useState(0); // 購入数
    const [purchases, setPurchases] = useState([]); // ユーザーの購入情報
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}` // 認証トークンを設定
                }
            });
            setUser(response.data);
            console.log('Fetched user:', response.data);

            // 購入情報を取得
            const purchaseResponse = await axios.get('/api/mypurchases', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            setPurchases(purchaseResponse.data);
            console.log('Fetched purchases:', purchaseResponse.data);

        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

        // アイディア情報を取得
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                // const ideaData = response.data.idea;
                // setIdea(ideaData);
                // setAverageRating(response.data.average_rating || 0);
                // setReviewCount(response.data.review_count || 0);
                // setFavoriteCount(response.data.favorite_count || 0);
                // setPurchaseCount(response.data.purchase_count || 0);
                setIdea(response.data.idea); // アイデアデータを設定

                setAverageRating(response.data.average_rating || 0); // 平均評価を設定
                setReviewCount(response.data.review_count || 0); // レビュー数を設定
                setFavoriteCount(response.data.favorite_count || 0); // 気になる数を設定
                setPurchaseCount(response.data.purchase_count || 0); // 購入数を設定
            } catch (error) {
                // console.error('Error fetching idea:', error);
                console.error('Error fetching idea:', error);

                if (error.response && error.response.status === 403) {
                    setError('アクセス権限がありません。');
                } else {
                    setError('アイディアの取得に失敗しました。');
                }
                setError('アイディアの取得に失敗しました。');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                console.log('Fetched categories:', response.data); // デバッグ用
                const categoriesMap = response.data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {});
                setCategories(categoriesMap);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('カテゴリデータの取得に失敗しました。');
            }
        };

    useEffect(() => {
        fetchUser();
        fetchIdea();
        fetchCategories();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/reviews/${id}`, { review, rating }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.status === 201) {
                // navigate(`/purchases/${id}`);
                navigate(-1);
            } else {
                throw new Error('レビューの送信に失敗しました。');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            // setError('レビューの送信に失敗しました。');

        if (error.response && error.response.status === 403) {
            setError('アクセス権限がありません。');
        } else {
            setError('レビューの送信に失敗しました。');
        }

        }
    };
    //＊＊＊＊＊＊変更：handleSubmit関数の修正＊＊＊＊＊＊
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // 購入情報を取得
    //         const purchasesResponse = await axios.get('/api/mypurchases', {
    //             headers: {
    //                 Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
    //             }
    //         });
    //         const purchases = purchasesResponse.data;

    //         // 対応するpurchaseレコードを検索
    //         const purchase = purchases.find(p => p.idea_id === Number(ideaId));

    //         let response;
    //         if (purchase) {
    //             // 購入レコードが存在する場合は更新
    //             response = await axios.post(`/api/reviews/${purchase.id}`, { review, rating }, {
    //                 headers: {
    //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
    //                 }
    //             });
    //         } else {
    //             // 購入レコードが存在しない場合は新規作成
    //             response = await axios.post(`/api/purchases`, { idea_id: ideaId, review, rating }, {
    //                 headers: {
    //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
    //                 }
    //             });
    //         }

    //         if (response.status === 201) {
    //             navigate(-1);
    //         } else {
    //             throw new Error('レビューの送信に失敗しました。');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting review:', error);

    //         if (error.response && error.response.status === 403) {
    //             setError('アクセス権限がありません。');
    //         } else {
    //             setError('レビューの送信に失敗しました。');
    //         }
    //     }
    // };
    //＊＊＊＊＊＊変更終了＊＊＊＊＊＊


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
            <main className="container">
                <div className="submission-form">
                    <h2>レビューの投稿</h2>

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
                        <label>平均評価:</label>
                        {/* <div className="form-value">{Number(averageRating).toFixed(1)} / 5</div> */}
                        <div className="form-value">
                            {averageRating > 0 ? `${Number(averageRating).toFixed(1)} / 5` : '－'}
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

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="rating">評価 (1-5):</label>
                            <input
                                type="number"
                                id="rating"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="review">レビュー内容:</label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn">送信</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewSubmission;
