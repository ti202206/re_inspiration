// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";



// function MyReviewHistory() {

//     // const [purchases, setPurchases] = useState([]);
//     const [user, setUser] = useState(null);
//     const [categories, setCategories] = useState({});
//     const [reviewed, setReviewed] = useState([]);
//     const navigate = useNavigate();

//     const fetchUser = async () => {
//         try {
//             const response = await axios.get("/api/user", {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem(
//                         "auth_token"
//                     )}`, // 認証トークンを設定
//                 },
//             });
//             setUser(response.data);
//             console.log("Fetched user:", response.data);
//         } catch (error) {
//             console.error("Error fetching user:", error);
//         }
//     };

//     // // 購入済み情報を取得
//     // const fetchMyPurchases = async () => {
//     //     try {
//     //         const response = await axios.get("/api/mypurchases", {
//     //             headers: {
//     //                 Authorization: `Bearer ${sessionStorage.getItem(
//     //                     "auth_token"
//     //                 )}`,
//     //             },
//     //         });
//     //         const sortedPurchases = response.data.sort(
//     //             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//     //         );
//     //         const recentPurchases = sortedPurchases.slice(0, 5);
//     //         setPurchases(recentPurchases);
//     //         console.log("Fetched purchases:", recentPurchases);
//     //     } catch (error) {
//     //         console.error("Error fetching purchases:", error);
//     //     }
//     // };

//             // レビュー情報を取得
//             const fetchMyReviewed = async () => {
//                 try {
//                     const response = await axios.get('/api/reviewed-purchases', {
//                         headers: {
//                             Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                         }
//                     });
//                     const sortedReviewed = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//                     const recentReviewed = sortedReviewed.slice(0, 5);
//                     setReviewed(recentReviewed);
//                     console.log('Fetched Reviewed:', recentReviewed);
//                 } catch (error) {
//                     console.error('Error fetching Reviewed:', error);
//                 }
//             };

//         // カテゴリ情報を取得
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("/api/categories");
//                 const categoriesMap = response.data.reduce((map, category) => {
//                     map[category.id] = category.name;
//                     return map;
//                 }, {});
//                 setCategories(categoriesMap);
//                 console.log("Fetched categories:", categoriesMap);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         useEffect(() => {
//             fetchUser();
//             fetchCategories();
//             fetchMyReviewed();
//             // fetchMyPurchases();
//         }, []);

//         const handleDetailClick = (ideaId) => {
//             // 詳細ボタンがクリックされたときの処理
//             navigate(`/idea-detail/${ideaId}`); // `/idea-detail/:ideaId` のパスに遷移
//         };



//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <section className="section-container">
//                     <h2>レビューしたアイディア一覧</h2>

//                     {reviewed.length > 0 ? (
//                         reviewed.map((review, index) => {
//                             const { idea } = review;
//                             return (
//                                 <div className="idea-card" key={index}>
//                                     <div className="idea-card__content">
//                                         <div className="idea-card__title-category">
//                                             <h3 className="idea-card__title">
//                                                 {idea.title}
//                                             </h3>
//                                         </div>
//                                         <p className="idea-card__summary">
//                                             {idea.overview ||
//                                                 "概要はありません"}
//                                         </p>
//                                         {/* <p className="purchase-card__summary">{purchase.review}</p> */}
//                                         <div className="idea-card__meta">
//                                             <span className="idea-card__review-count">
//                                                 <i className="fa-regular fa-comment-dots"></i>
//                                                 {idea.favorite_count || 0}
//                                             </span>
//                                             <span className="idea-card__average-rating">
//                                                 <i className="fa-regular fa-thumbs-up"></i>
//                                                 {idea.average_rating || 0}
//                                             </span>
//                                             <p className="idea-card__category">
//                                                 <i className="fa-solid fa-tags"></i>
//                                                 {categories[idea.category_id]}
//                                             </p>
//                                             {/* <span className="idea-card__rating">
//                                             <i className="fa-regular fa-thumbs-up"></i>
//                                             {purchase.rating}
//                                         </span>
//                                         <p className="purchase-card__created_date">
//                                             <i className="fa-regular fa-clock"></i>
//                                             {new Date(purchase.created_at).toLocaleDateString()}
//                                         </p> */}
//                                         </div>
//                                     </div>
//                                     <div className="idea-card__buttons">
//                                         <button
//                                             className="idea-card__button"
//                                             onClick={() =>
//                                                 handleDetailClick(idea.id)
//                                             }
//                                         >
//                                             アイディアの詳細
//                                         </button>
//                                         <button
//                                             className="idea-card__button"
//                                             onClick={() =>
//                                                 handleEditReviewClick(idea.id)
//                                             }
//                                         >
//                                             レビューを編集
//                                         </button>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p>購入はまだありません。</p>
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

// export default MyReviewHistory;


// src/pages/MyReviewsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

function MyReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // 自身のレビュー情報を取得
    const fetchMyReviews = async () => {
        try {
            // 現在のユーザー情報を取得
            const userResponse = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            const currentUser = userResponse.data;
            setCurrentUser(currentUser);

            // 現在のユーザーのレビューのみを取得
            const reviewsResponse = await axios.get('/api/reviews', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });

            const myReviews = reviewsResponse.data.filter(review => review.buyer_id === currentUser.id);
            const sortedReviews = myReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setReviews(sortedReviews);
        } catch (error) {
            console.error('Error fetching my reviews:', error);
        }
    };

    useEffect(() => {
        fetchMyReviews();
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
                <h2>自身のレビュー一覧</h2>
                <section className="section-container">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <ReviewCard
                                key={index}
                                idea={review.idea}
                                review={review}
                                user={{ name: review.buyer?.name || '匿名ユーザー' }}
                                isOwner={true} // 常に自身のレビューのみ表示
                                buttons={[
                                    {
                                        label: "詳細",
                                        onClick: () => handleDetailClick(review.idea.id),
                                    },
                                    // {
                                    //     label: "レビューを編集",
                                    //     onClick: () => handleEditReviewClick(review.id),
                                    // },
                                ]}
                            />
                        ))
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

export default MyReviewsList;
