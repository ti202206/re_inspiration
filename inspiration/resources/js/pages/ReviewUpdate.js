// // // // src/pages/ReviewUpdate.js

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useParams, useNavigate } from 'react-router-dom'; // `useNavigate` を追加して遷移を管理
// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';

// // // const ReviewUpdate = () => {
// // //     const { id } = useParams(); // URLパラメータからIDを取得
// // //     const [idea, setIdea] = useState(null);
// // //     const [reviewText, setReviewText] = useState('');
// // //     const [rating, setRating] = useState(0);
// // //     const [error, setError] = useState(null); // エラーメッセージの状態を追加
// // //     const navigate = useNavigate(); // ページ遷移に使用

// // //     useEffect(() => {
// // //         const fetchReviewAndIdea = async () => {
// // //             try {
// // //                 // レビューの取得
// // //                 const reviewResponse = await axios.get(`/api/purchases/${id}`, {
// // //                     headers: {
// // //                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// // //                     }
// // //                 });
// // //                 const review = reviewResponse.data;
// // //                 setReviewText(review.review);
// // //                 setRating(review.rating);

// // //                 // アイディアの取得
// // //                 const ideaResponse = await axios.get(`/api/ideas/${review.idea_id}`, {
// // //                     headers: {
// // //                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// // //                     }
// // //                 });
// // //                 setIdea(ideaResponse.data.idea);
// // //             } catch (error) {
// // //                 console.error('Error fetching review or idea:', error);
// // //                 setError('データの取得に失敗しました。');
// // //             }
// // //         };

// // //         fetchReviewAndIdea();
// // //     }, [id]);

// // //     const handleReviewSubmit = async (e) => {
// // //         e.preventDefault();
// // //         try {
// // //             // レビューの更新
// // //             await axios.put(`/api/purchases/${id}`, {
// // //                 review: reviewText,
// // //                 rating: rating
// // //             }, {
// // //                 headers: {
// // //                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// // //                 }
// // //             });
// // //             // 更新成功時の処理
// // //             navigate(`/idea-detail/${idea.id}`); // レビュー編集後にアイディア詳細ページに戻る
// // //         } catch (error) {
// // //             console.error('Error updating review:', error);
// // //             setError('レビューの更新に失敗しました。');
// // //         }
// // //     };

// // //     // エラーメッセージを表示
// // //     if (error) {
// // //         return <div>{error}</div>;
// // //     }

// // //     // データロード中の表示
// // //     if (!idea) {
// // //         return <div>Loading...</div>;
// // //     }

// // //     return (
// // //         <div>
// // //             <Header />
// // //             <main className="container">
// // //                 <h2>レビューを編集する</h2>
// // //                 <form onSubmit={handleReviewSubmit}>
// // //                     <label htmlFor="reviewText">レビュー</label>
// // //                     <textarea
// // //                         id="reviewText"
// // //                         value={reviewText}
// // //                         onChange={(e) => setReviewText(e.target.value)}
// // //                     />
// // //                     <label htmlFor="rating">評価</label>
// // //                     <input
// // //                         id="rating"
// // //                         type="number"
// // //                         min="1"
// // //                         max="5"
// // //                         value={rating}
// // //                         onChange={(e) => setRating(parseInt(e.target.value, 10))}
// // //                     />
// // //                     <button type="submit">更新する</button>
// // //                 </form>
// // //                 <br />
// // //                 <hr />
// // //                 <br />
// // //                 <h2>アイディア詳細</h2>
// // //                 <h3>{idea.title}</h3>
// // //                 <p>{idea.overview}</p>
// // //                 <p>{idea.content}</p>
// // //                 <p>価格: {idea.price}</p>
// // //                 <div>
// // //                     <span>カテゴリ: {idea.category}</span>
// // //                     <span>レビュー数: {idea.reviewCount}</span>
// // //                     <span>平均評価: {idea.averageRating}</span>
// // //                 </div>
// // //             </main>
// // //             <Footer />
// // //         </div>
// // //     );
// // // };

// // // export default ReviewUpdate;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';
// // import { useParams, useLocation } from 'react-router-dom';

// // const ReviewUpdate = () => {
// //     const { id } = useParams(); // URLパラメータからIDを取得
// //     const location = useLocation();
// //     const { reviewId } = location.state || {}; // 以前の画面からのreviewIdを受け取る
// //     const [review, setReview] = useState(''); // 空文字列で初期化
// //     const [rating, setRating] = useState(0); // 0で初期化
// //     const [error, setError] = useState(null); // エラーメッセージの状態管理

// //     useEffect(() => {
// //         const fetchReviewAndIdea = async () => {
// //             try {
// //                 const response = await axios.get(`/api/purchases/${reviewId}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// //                     }
// //                 });
// //                 setReview(response.data.review || ''); // デフォルトで空文字列
// //                 setRating(response.data.rating || 0); // デフォルトで0
// //             } catch (error) {
// //                 console.error('Error fetching review or idea:', error);
// //                 setError('データの取得に失敗しました。');
// //             }
// //         };

// //         if (reviewId) {
// //             fetchReviewAndIdea();
// //         }
// //     }, [reviewId]);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await axios.post(`/api/reviews/${reviewId}`, {
// //                 review: review,
// //                 rating: rating
// //             }, {
// //                 headers: {
// //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// //                 }
// //             });
// //             // レビューが成功した場合の処理
// //             alert('レビューが更新されました');
// //         } catch (error) {
// //             console.error('Error updating review:', error);
// //             setError('レビューの更新に失敗しました。');
// //         }
// //     };

// //     // エラーメッセージを表示
// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     return (
// //         <div>
// //             <Header />

// //             <br /><br /><br /><br /><br />
// //             <main className="container">
// //                 <h2>レビューを更新する</h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <label htmlFor="review">レビュー</label>
// //                     <textarea
// //                         id="review"
// //                         value={review}
// //                         onChange={(e) => setReview(e.target.value)}
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
// //                     <button type="submit">更新する</button>
// //                 </form>
// //             </main>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default ReviewUpdate;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const ReviewUpdate = () => {
//     // const { id } = useParams(); // アイディアIDをURLパラメータから取得
//     // const [idea, setIdea] = useState(null);
//     // const [review, setReview] = useState('');
//     // const [rating, setRating] = useState(0);
//     // const [error, setError] = useState(null);
//     // const navigate = useNavigate();
//     const { id } = useParams(); // アイディアIDをURLパラメータから取得
//     const [user, setUser] = useState(null);
//     const [idea, setIdea] = useState(null);
//     const [categories, setCategories] = useState({}); // カテゴリの状態管理
//     // const [favorite, setFavorite] = useState({}); // お気に入りの状態管理
//     const [review, setReview] = useState('');
//     const [rating, setRating] = useState(0);
//     const [averageRating, setAverageRating] = useState(0); // 平均評価
//     const [reviewCount, setReviewCount] = useState(0); // レビュー数
//     const [favoriteCount, setFavoriteCount] = useState(0); // 気になる数
//     const [purchaseCount, setPurchaseCount] = useState(0); // 購入数
//     const [purchases, setPurchases] = useState([]); // ユーザーの購入情報
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();


//     const fetchUser = async () => {
//         try {
//             const response = await axios.get('/api/user', {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}` // 認証トークンを設定
//                 }
//             });
//             setUser(response.data);
//             console.log('Fetched user:', response.data);

//             // 購入情報を取得
//             const purchaseResponse = await axios.get('/api/mypurchases', {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             setPurchases(purchaseResponse.data);
//             console.log('Fetched purchases:', purchaseResponse.data);

//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };


//         // アイディア情報を取得
//         const fetchIdea = async () => {
//             try {
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 // const ideaData = response.data.idea;
//                 // setIdea(ideaData);
//                 // setAverageRating(response.data.average_rating || 0);
//                 // setReviewCount(response.data.review_count || 0);
//                 // setFavoriteCount(response.data.favorite_count || 0);
//                 // setPurchaseCount(response.data.purchase_count || 0);
//                 setIdea(response.data.idea); // アイデアデータを設定

//                 setAverageRating(response.data.average_rating || 0); // 平均評価を設定
//                 setReviewCount(response.data.review_count || 0); // レビュー数を設定
//                 setFavoriteCount(response.data.favorite_count || 0); // 気になる数を設定
//                 setPurchaseCount(response.data.purchase_count || 0); // 購入数を設定
//             } catch (error) {
//                 // console.error('Error fetching idea:', error);
//                 console.error('Error fetching idea:', error);

//                 if (error.response && error.response.status === 403) {
//                     setError('アクセス権限がありません。');
//                 } else {
//                     setError('アイディアの取得に失敗しました。');
//                 }
//                 setError('アイディアの取得に失敗しました。');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('/api/categories');
//                 console.log('Fetched categories:', response.data); // デバッグ用
//                 const categoriesMap = response.data.reduce((map, category) => {
//                     map[category.id] = category.name;
//                     return map;
//                 }, {});
//                 setCategories(categoriesMap);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('カテゴリデータの取得に失敗しました。');
//             }
//         };

//         // アイディア情報とレビュー情報を取得
//         const fetchIdeaAndReview = async () => {
//             try {
//                 // アイディア情報を取得
//                 // const ideaResponse = await axios.get(`/api/ideas/${id}`, {
//                 //     headers: {
//                 //         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 //     }
//                 // });
//                 // const ideaData = ideaResponse.data.idea;
//                 // setIdea(ideaData);

//                 // 自身のレビュー情報を取得
//                 const reviewResponse = await axios.get(`/api/reviews?idea_id=${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });

//                 const userReview = reviewResponse.data.find(r => r.buyer_id === ideaData.user_id);
//                 if (userReview) {
//                     setReview(userReview.review);
//                     setRating(userReview.rating);
//                 }
//             } catch (error) {
//                 console.error('Error fetching idea or review:', error);
//                 setError('データの取得に失敗しました。');
//             }
//         };

//     useEffect(() => {
//         fetchUser();
//         fetchIdea();
//         fetchCategories();
//         fetchIdeaAndReview();
//     }, [id]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.put(`/api/reviews/${id}`, { review, rating }, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             if (response.status === 200) {
//                 navigate(`/purchases/${id}`);
//             } else {
//                 throw new Error('レビューの更新に失敗しました。');
//             }
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
//                 <div className="submission-form">
//                     <h2>レビューの編集</h2>

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


//                     <div className="form-group">
//                         <label>平均評価:</label>
//                         {/* <div className="form-value">{Number(averageRating).toFixed(1)} / 5</div> */}
//                         <div className="form-value">
//                             {averageRating > 0 ? `${Number(averageRating).toFixed(1)} / 5` : '－'}
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label>レビュー数:</label>
//                         <div className="form-value">{reviewCount}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>気になる数:</label>
//                         <div className="form-value">{favoriteCount}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>購入数:</label>
//                         <div className="form-value">{purchaseCount}</div>
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

//                         <button type="submit" className="btn">更新</button>
//                     </form>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default ReviewUpdate;


// src/components/ReviewUpdate.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReviewUpdate = () => {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [user, setUser] = useState(null);
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({});
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchIdea = async () => {
        try {
            const response = await axios.get(`/api/ideas/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            setIdea(response.data.idea);
            setAverageRating(response.data.average_rating || 0);
            setReviewCount(response.data.review_count || 0);
            setFavoriteCount(response.data.favorite_count || 0);
            setPurchaseCount(response.data.purchase_count || 0);
        } catch (error) {
            console.error('Error fetching idea:', error);
            if (error.response && error.response.status === 403) {
                setError('アクセス権限がありません。');
            } else {
                setError('アイディアの取得に失敗しました。');
            }
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
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

    //＊＊＊＊＊＊変更：ユーザーのレビュー情報を取得＊＊＊＊＊＊
    const fetchReview = async () => {
        try {
            const response = await axios.get(`/api/reviews/${id}/my-review`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.data.review) {
                setReview(response.data.review.review);
                setRating(response.data.review.rating);
            }
        } catch (error) {
            console.error('Error fetching review:', error);
            setError('レビューの取得に失敗しました。');
        }
    };
    //＊＊＊＊＊＊変更：ユーザーのレビュー情報を取得＊＊＊＊＊＊

    useEffect(() => {
        fetchUser();
        fetchIdea();
        fetchCategories();
        fetchReview();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.put(`/api/reviews/${id}`, { review, rating, }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.status === 200) {
                navigate(-1); // 直前のページに戻る
            } else {
                throw new Error('レビューの更新に失敗しました。');
            }
        } catch (error) {
            console.error('Error updating review:', error);
            setError('レビューの更新に失敗しました。');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!idea) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>レビューの編集</h2>

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

                        <button type="submit" className="btn">更新</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewUpdate;
