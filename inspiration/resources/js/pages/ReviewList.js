// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// function Reviews() {
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         axios.get("/api/reviews")
//             .then((response) => {
//                 console.log(response.data); // データ構造を確認
//                 setReviews(response.data); // APIからのレスポンスを状態にセット
//             })
//             .catch((error) => {
//                 console.error("Error fetching reviews:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <section className="section-container">
//                     <h2>全ユーザーのレビュー履歴</h2>
//                     {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                             <div className="idea-card" key={review.id}>
//                                 <div className="idea-card__content">
//                                     <div className="idea-card__title-category">
//                                         <h3 className="idea-card__title">
//                                             {review.idea.title}
//                                         </h3>
//                                     </div>
//                                     <div className="idea-card__meta">
//                                         <p className="idea-card__summary">{review.review}</p>
//                                         <span className="idea-card__average-rating">
//                                             {`評価: ${review.rating}`}
//                                         </span>
//                                         <p className="idea-card__created_date">
//                                             {new Date(review.created_at).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>レビューはまだありません。</p>
//                     )}
//                 </section>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default Reviews;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import ReviewCard from "../components/ReviewCard";
// import { useNavigate } from "react-router-dom";

// function ReviewsList() {
//     const [reviews, setReviews] = useState([]); // レビューの状態管理
//     const [categories, setCategories] = useState({}); // カテゴリ名の状態管理
//     const [users, setUsers] = useState({}); // ユーザー情報の状態管理
//     const navigate = useNavigate();

//     // レビュー情報を取得
//     const fetchReviews = async () => {
//         try {
//             const response = await axios.get('/api/reviews', {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//             setReviews(sortedReviews);
//             console.log('Fetched reviews:', sortedReviews);
//         } catch (error) {
//             console.error('Error fetching reviews:', error);
//         }
//     };

//     // カテゴリ情報を取得
//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('/api/categories');
//             const categoriesMap = response.data.reduce((map, category) => {
//                 map[category.id] = category.name;
//                 return map;
//             }, {});
//             setCategories(categoriesMap);
//             console.log('Fetched categories:', categoriesMap);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };


//     // ユーザー情報を取得
//     const fetchUsers = async (reviews) => {
//         const userIds = [...new Set(reviews.map(review => review.buyer_id))]; // 重複を排除したユーザーID
//         try {
//             const userResponses = await Promise.all(userIds.map(id => axios.get(`/api/users/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             })));
//             const usersMap = userResponses.reduce((map, response) => {
//                 map[response.data.id] = response.data;
//                 return map;
//             }, {});
//             setUsers(usersMap);
//             console.log('Fetched users:', usersMap);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//         fetchReviews();
//         fetchUsers
//     }, []);

//     const handleDetailClick = (id) => {
//         navigate(`/idea-detail/${id}`);
//     };

//     const handleEditReviewClick = (reviewId) => {
//         navigate(`/review-edit/${reviewId}`);
//     };

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <h2>レビュー一覧</h2>
//                 <section className="section-container">
//                     {reviews.length > 0 ? (
//                         reviews.map((review, index) => {
//                             const { idea } = review;
//                             const user = users[review.buyer_id] || {}; 
//                             return (
//                                 <ReviewCard
//                                     key={index}
//                                     idea={idea}
//                                     categories={categories}
//                                     review={review} // レビューオブジェクトを渡す
//                                     user={user}
//                                     buttons={[
//                                         {
//                                             label: "詳細",
//                                             onClick: () => handleDetailClick(idea.id),
//                                         },
//                                         {
//                                             label: "レビューを編集",
//                                             onClick: () => handleEditReviewClick(review.id),
//                                         },
//                                     ]}
//                                 />
//                             );
//                         })
//                     ) : (
//                         <ReviewCard isPlaceholder={true} /> // データがない場合は true
//                     )}
//                 </section>
//                 <button
//                     className="idea-card__button"
//                     onClick={() => navigate(-1)}
//                 >
//                     戻る
//                 </button>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default ReviewsList;


// src/pages/ReviewsList.js
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
