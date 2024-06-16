
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams, useNavigate } from 'react-router-dom';

// const PurchaseDetail = () => {
//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [idea, setIdea] = useState(null);
//     const [categories, setCategories] = useState({}); // カテゴリの状態管理
//     const [error, setError] = useState(null); // エラーメッセージの状態を管理
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchIdea = async () => {
//             try {
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 console.log('Fetched idea:', response.data); // デバッグ用
//                 setIdea(response.data.idea); // アイデアデータを設定
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//                 setError('データの取得に失敗しました。');
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

//         fetchIdea();
//         fetchCategories();
//     }, [id]);

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
//                     <h2>アイデアの詳細</h2>

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
//                         <label>価格 (円):</label>
//                         <div className="form-value">{idea.price}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>カテゴリ:</label>
//                         <div className="form-value">
//                             {categories[idea.category_id] || 'カテゴリ不明'}
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label>更新日時:</label>
//                         <div className="form-value">
//                             {new Date(idea.updated_at).toLocaleString()}
//                         </div>
//                     </div>

//                     <div className="idea-card__buttons">
//                         <button
//                             className="btn"
//                             onClick={() => navigate(-1)}
//                         >
//                             戻る
//                         </button>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default PurchaseDetail;

// ファイル名: PurchaseDetail.js



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams, useNavigate } from 'react-router-dom';

// const PurchaseDetail = () => {
//     const [user, setUser] = useState(null); //ユーザー情報の状態管理
//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [idea, setIdea] = useState(null);
//     const [categories, setCategories] = useState({}); // カテゴリの状態管理
//     const [favorite, setFavorite] = useState(null); //お気に入りの状態管理
//     const [reviews, setReviews] = useState([]); // レビューの状態管理
//     const [userReview, setUserReview] = useState(null); // 現在のユーザーのレビュー
//     const [error, setError] = useState(null); // エラーメッセージの状態を管理
//     const navigate = useNavigate();

//     const fetchUser = async () => { //ユーザー情報を取得する関数
//         try {
//             const response = await axios.get('/api/user', {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             setUser(response.data);
//             console.log('Fetched user:', response.data);
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     const fetchFavorite = async () => { //お気に入り情報を取得する関数
//         try {
//             const response = await axios.get(`/api/favorites/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             setFavorite(response.data);
//             console.log('Fetched favorite:', response.data);
//         } catch (error) {
//             console.error('Error fetching favorite:', error);
//         }
//     };


//         const fetchIdea = async () => {
//             try {
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 console.log('Fetched idea:', response.data); // デバッグ用
//                 setIdea(response.data.idea); // アイデアデータを設定
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//                 setError('データの取得に失敗しました。');
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

//             // レビュー情報を取得する関数
//     // const fetchReviews = async () => {
//     //     try {
//     //         const response = await axios.get(`/api/reviews?idea_id=${id}`, {
//     //             headers: {
//     //                 Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//     //             }
//     //         });
//     //         const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     //         setReviews(sortedReviews);
//     //         console.log('Fetched reviews:', sortedReviews);

//     //         // 現在のユーザーのレビューを特定
//     //         if (user) {
//     //             const userReview = sortedReviews.find(review => review.buyer_id === user.id);
//     //             setUserReview(userReview);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error fetching reviews:', error);
//     //     }
//     // };
//     const fetchReviews = async () => {
//         try {
//             const response = await axios.get(`/api/reviews?idea_id=${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//             const reviewsWithUsers = await Promise.all(sortedReviews.map(async (review) => {
//                 const userResponse = await axios.get(`/api/users/${review.buyer_id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 return {
//                     ...review,
//                     buyer: userResponse.data // ユーザー情報を追加
//                 };
//             }));
//             setReviews(reviewsWithUsers);
//             console.log('Fetched reviews with user info:', reviewsWithUsers);

//             // 現在のユーザーのレビューを特定
//             if (user) {
//                 const userReview = reviewsWithUsers.find(review => review.buyer_id === user.id);
//                 setUserReview(userReview);
//             }
//         } catch (error) {
//             console.error('Error fetching reviews:', error);
//         }
//     };


//         useEffect(() => {
//             fetchUser(); //ユーザー情報を取得
//         fetchIdea();
//         fetchCategories();
//         fetchFavorite(); //お気に入り情報を取得
//     }, [id]);

//     // ユーザー情報取得後にレビュー情報を取得
//     useEffect(() => {
//         if (user) {
//             fetchReviews(); // レビュー情報を取得
//         }
//     }, [user, id]);

//     const sortedReviews = reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


//     const handleToggleFavorite = async (ideaId) => { //お気に入りのトグル関数
//         try {
//             const response = await axios.post('/api/favorites/toggle', { idea_id: ideaId }, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             if (response.status === 200) {
//                 setFavorite(prevFavorite => ({
//                     ...prevFavorite,
//                     is_favorite: !prevFavorite.is_favorite // お気に入りの状態を反転
//                 }));
//             } else {
//                 throw new Error('サーバーエラー: ' + response.status);
//             }
//         } catch (error) {
//             console.error('お気に入りの解除に失敗しました', error);
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
//                     <h2>購入したアイデアの詳細</h2>

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
//                         <label>価格 (円):</label>
//                         <div className="form-value">{idea.price}</div>
//                     </div>

//                     <div className="form-group">
//                         <label>カテゴリ:</label>
//                         <div className="form-value">
//                             {categories[idea.category_id] || 'カテゴリ不明'}
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label>更新日時:</label>
//                         <div className="form-value">
//                             {new Date(idea.updated_at).toLocaleString()}
//                         </div>
//                     </div>


//                     <div className="idea-card__buttons">
//                         {/* レビューの有無に応じたボタンの表示 */}
//                         {userReview ? (
//                             <button
//                                 className="btn"
//                                 onClick={() => navigate(`/review-update/${id}`)}
//                             >
//                                 レビューを更新
//                             </button>
//                         ) : (
//                             <button
//                                 className="btn"
//                                 onClick={() => navigate(`/reviews/${id}`)}
//                             >
//                                 レビューをする
//                             </button>
//                         )}
//                     </div>

//                     <div className="idea-card__buttons">
//                         {/* 自身の投稿でない場合に「気になる」ボタンを表示 */}
//                         {user && idea.user_id !== user.id && favorite && ( //＊＊＊＊＊＊変更：お気に入りボタンの条件にfavoriteを追加＊＊＊＊＊＊
//                             <button
//                                 className='btn'
//                                 onClick={() => handleToggleFavorite(idea.id)}
//                             >
//                                 {favorite.is_favorite ? 'お気に入りから削除' : '気になる'}
//                             </button>
//                         )}
//                         <button
//                             className="btn"
//                             onClick={() => navigate(-1)}
//                         >
//                             戻る
//                         </button>
//                     </div>

//                     {/* <div className="review-section">
//                         <h3>レビュー</h3>
//                         {sortedReviews.length > 0 ? (
//                             sortedReviews.map((review,index) => (
//                                 <div key={index} className="review">
//                                     <p><strong>{review.rating}</strong> / 5</p>
//                                     <p>{review.review}</p>
//                                     <p><small>{new Date(review.created_at).toLocaleString()}</small></p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>レビューはまだありません。</p>
//                         )}
//                     </div> */}

//                     <div className="review-section">
//                         <h3>レビュー</h3>
//                         {/* {reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <div key={index} className="review">
//                                     <p><strong>{review.rating}</strong> / 5</p>
//                                     <p>{review.review}</p>
//                                     <p><small>{new Date(review.updated_at).toLocaleString()}</small></p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>レビューはまだありません。</p>
//                         )} */}
//                                               <h3>レビュー</h3>
//                         {reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <div key={index} className="review">
//                                     <p><strong>評価:</strong> {review.rating} / 5</p>
//                                     <p><strong>レビュー:</strong> {review.review}</p>
//                                     <p><strong>投稿者:</strong> {review.buyer.name}</p>
//                                     <p><small>投稿日: {new Date(review.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>レビューはまだありません。</p>
//                         )}
//                     </div>

//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default PurchaseDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PurchaseDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [user, setUser] = useState(null); // ユーザー情報の状態管理
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [favorite, setFavorite] = useState(null); // お気に入りの状態管理
    const [reviews, setReviews] = useState([]); // レビューの状態管理
    // const [userReview, setUserReview] = useState(null); // 現在のユーザーのレビュー
    const [averageRating, setAverageRating] = useState(0); // 平均評価
    const [reviewCount, setReviewCount] = useState(0); // レビュー数
    const [favoriteCount, setFavoriteCount] = useState(0); // 気になる数
    const [purchaseCount, setPurchaseCount] = useState(0); // 購入数の状態管理
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
    const navigate = useNavigate();

    // ユーザー情報を取得する関数
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            console.log('Fetched user:', response.data);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // お気に入り情報を取得する関数
    const fetchFavorite = async () => {
        try {
            const response = await axios.get(`/api/favorites/idea/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            console.log('Fetched favorite:', response.data)
            setFavorite(response.data);
        } catch (error) {
            console.error('Error fetching favorite:', error);
        }
    };

    // アイデア情報を取得する関数
    const fetchIdea = async () => {
        try {
            const response = await axios.get(`/api/ideas/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            console.log('Fetched idea:', response.data);
            setIdea(response.data.idea);

            setAverageRating(response.data.average_rating || 0); // 平均評価を設定
            setReviewCount(response.data.review_count || 0); // レビュー数を設定
            setFavoriteCount(response.data.favorite_count || 0); // 気になる数を設定
            setPurchaseCount(response.data.purchase_count || 0); // 購入数を設定

            setReviews(response.data.reviews || []);

        } catch (error) {
            console.error('Error fetching idea:', error);
            setError('データの取得に失敗しました。');
        }
    };

    // カテゴリ情報を取得する関数
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            console.log('Fetched categories:', response.data);
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

    // //＊＊＊＊＊＊変更：レビュー情報を取得する関数を追加＊＊＊＊＊＊
    // const fetchReviews = async () => {
    //     try {
    //         const response = await axios.get(`/api/reviews?idea_id=${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
    //             }
    //         });
    //         const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    //         const reviewsWithUsers = await Promise.all(sortedReviews.map(async (review) => {
    //             const userResponse = await axios.get(`/api/users/${review.buyer_id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
    //                 }
    //             });
    //             return {
    //                 ...review,
    //                 buyer: userResponse.data // ユーザー情報を追加
    //             };
    //         }));
    //         console.log('Fetched reviews with user info:', reviewsWithUsers); //＊＊＊＊＊＊変更：レビューとユーザー情報のログ表示＊＊＊＊＊＊
    //         setReviews(reviewsWithUsers);

    //         // 現在のユーザーのレビューを特定
    //         if (user) {
    //             const userReview = reviewsWithUsers.find(review => review.buyer_id === user.id);
    //             setUserReview(userReview);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //     }
    // };
    //＊＊＊＊＊＊変更ここまで＊＊＊＊＊＊

    useEffect(() => {
        fetchUser();
        fetchIdea();
        fetchCategories();
        fetchFavorite();
    }, [id]);

        // レビュー情報を取得
        // const fetchReviews = async () => {
        //     try {
        //         const response = await axios.get('/api/reviews', {
        //             headers: {
        //                 Authorization: `Bearer ${sessionStorage.getItem('auth_token')}` // 認証トークンを含める
        //             }
        //         });
    
        //         const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        //         setReviews(sortedReviews);
        //     } catch (error) {
        //         console.error('Error fetching reviews:', error);
        //     }
        // };
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}` // 認証トークンを含める
                    }
                });
                const filteredReviews = response.data.filter(review => review.idea_id === Number(id));
                const sortedReviews = filteredReviews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setReviews(sortedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

    // useEffect(() => {
    //     fetchUser(); // ユーザー情報を取得
    //     fetchIdea();
    //     fetchCategories();
    //     fetchFavorite(); // お気に入り情報を取得
    // }, [id]);

    // ユーザー情報取得後にレビュー情報を取得
    useEffect(() => {
        if (user) {
            fetchReviews(); // レビュー情報を取得
        }
    }, [user, id]);

        // エラーメッセージを表示
        if (error) {
            return <div>{error}</div>;
        }
    
        // データロード中の表示
        if (!idea) {
            return <div>Loading...</div>;
        }

    const handleToggleFavorite = async (ideaId) => { // お気に入りのトグル関数
        try {
            const response = await axios.post('/api/favorites/toggle', { idea_id: ideaId }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.status === 200) {
                // setFavorite(prevFavorite => ({
                //     ...prevFavorite,
                //     is_favorite: !prevFavorite.is_favorite // お気に入りの状態を反転
                fetchFavorite();
                // }));
            } else {
                throw new Error('サーバーエラー: ' + response.status);
            }
        } catch (error) {
            console.error('お気に入りの解除に失敗しました', error);
        }
    };

    // // エラーメッセージを表示
    // if (error) {
    //     return <div>{error}</div>;
    // }

    // // データロード中の表示
    // if (!idea) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>購入したアイデアの詳細</h2>

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
                        <label>投稿者:</label>
                        <div className="form-value">
                            {idea.user ? <Link to={`/user/${idea.user.id}`}>{idea.user.name}</Link> : '投稿者不明'}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>価格 (円):</label>
                        <div className="form-value">{idea.price}</div>
                    </div>

                    <div className="form-group">
                        <label>カテゴリ:</label>
                        <div className="form-value">
                            {categories[idea.category_id] || 'カテゴリ不明'}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>更新日時:</label>
                        <div className="form-value">
                            {new Date(idea.updated_at).toLocaleString()}
                        </div>
                    </div>



                    {/* Display average rating, review count, favorite count, and purchase count */}
                    <div className="form-group">
                        <label>平均評価:</label>
                        <div className="form-value">{Number(averageRating).toFixed(1)} / 5</div>
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


                    {/* <div className="idea-card__buttons"> */}
                        {/* レビューの有無に応じたボタンの表示 */}
                        {/* {userReview ? (
                            <button
                                className="btn"
                                onClick={() => navigate(`/review-update/${userReview.id}`)}
                            >
                                レビューを更新
                            </button>
                        ) : (
                            <button
                                className="btn"
                                onClick={() => navigate(`/reviews/${id}`)}
                            >
                                レビューをする
                            </button>
                        )}
                    </div> */}

                    <div className="idea-card__buttons">

                    {user && idea.user_id !== user.id && favorite && (
    <>
        {/* レビューをするボタン */}
        {purchaseCount > 0 && reviewCount === 0 && (
            <button className='btn' onClick={() => navigate(`/reviews/${idea.id}`)}>
                レビューをする
            </button>
        )}
        {/* レビューを編集するボタン */}
        {purchaseCount > 0 && reviewCount > 0 && (
            <button className='btn' onClick={() => navigate(`/review-update/${idea.id}`)}>
                レビューを編集する
            </button>
        )}
    </>
)}

                        {/* 自身の投稿でない場合に「気になる」ボタンを表示 */}
                        {user && idea.user_id !== user.id && favorite && (
                            <button
                                className='btn'
                                onClick={() => handleToggleFavorite(idea.id)}
                            >
                                {favorite.is_favorite ? 'お気に入りから削除' : '気になる'}
                            </button>
                        )}

                        <button
                            className="btn"
                            onClick={() => navigate(-1)}
                        >
                            戻る
                        </button>
                    </div>

                    {/*＊＊＊＊＊＊変更：レビュー情報表示の修正＊＊＊＊＊＊*/}
                    <div className="review-section">
                        <h3>レビュー</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><strong>評価:</strong> {review.rating} / 5</p>
                                    <p><strong>レビュー:</strong> {review.review}</p>
                                    {/* <p><strong>投稿者:</strong> {review.buyer?.name}</p> */}
                                    <p><strong>投稿者:</strong>
                                        {/* 投稿者名にリンクを追加 */}
                                        {review.buyer_id ? <Link to={`/user/${review.buyer_id}`}>{review.buyer_name}</Link> : review.buyer_name || '投稿者不明'}
                                    </p>
                                    <p><small>投稿日: {new Date(review.updated_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
                                </div>
                            ))
                        ) : (
                            <p>レビューはまだありません。</p>
                        )}
                    </div>
                    {/*＊＊＊＊＊＊変更ここまで＊＊＊＊＊＊*/}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PurchaseDetail;
