// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../sass/object/project/_mypage.scss";

// const MyPage = () => {
//     const [purchasedIdeas, setPurchasedIdeas] = useState([]);
//     const [favoritedIdeas, setFavoritedIdeas] = useState([]);
//     const [postedIdeas, setPostedIdeas] = useState([]);
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             const token = localStorage.getItem("auth_token");
//             try {
//                 const purchasedResponse = await axios.get(
//                     "/api/user/purchased-ideas",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 const favoritedResponse = await axios.get(
//                     "/api/user/favorited-ideas",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 const postedResponse = await axios.get(
//                     "/api/user/posted-ideas",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 const reviewsResponse = await axios.get("/api/user/reviews", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 setPurchasedIdeas(purchasedResponse.data);
//                 setFavoritedIdeas(favoritedResponse.data);
//                 setPostedIdeas(postedResponse.data);
//                 setReviews(reviewsResponse.data);
//             } catch (error) {
//                 console.error("Error fetching dashboard data", error);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     return (
//         <div>
//             <Header />

//             <main className="container">
//                 <div className="section-container">
//                     <section className="mypage__section">
//                         <div className="mypage__title">
//                             <h2>気になるアイディア（最新５件）</h2>
//                             <a href="idea-catalog.html">全てを表示</a>
//                         </div>
//                         <div className="idea-card">
//                             <div className="idea-card__content">
//                                 <div className="idea-card__title-category">
//                                     <h3 className="idea-card__title">
//                                         アイディア１
//                                     </h3>
//                                 </div>
//                                 <p className="idea-card__summary">
//                                     このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。
//                                 </p>
//                                 <div className="idea-card__meta">
//                                     <span className="idea-card__review-count">
//                                         <i className="fa-regular fa-comment-dots"></i>
//                                         11
//                                     </span>
//                                     <span className="idea-card__average-rating">
//                                         <i className="fa-regular fa-thumbs-up"></i>
//                                         ★★★★☆
//                                     </span>
//                                     <p className="idea-card__category">
//                                         <i className="fa-solid fa-tags"></i>
//                                         テクノロジー
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="idea-card__buttons">
//                                 <button className="idea-card__button">
//                                     詳細
//                                 </button>
//                                 <button className="idea-card__button">
//                                     編集
//                                 </button>
//                             </div>
//                         </div>
//                     </section>

//                     <section className="mypage__section">
//                         <div className="mypage__title">
//                             <h2>購入したアイディア（最新５件）</h2>
//                             <a href="idea-catalog.html">全てを表示する</a>
//                         </div>
//                         <div className="idea-card">
//                             <div className="idea-card__content">
//                                 <div className="idea-card__title-category">
//                                     <h3 className="idea-card__title">
//                                         アイディア１
//                                     </h3>
//                                 </div>
//                                 <p className="idea-card__summary">
//                                     このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。
//                                 </p>
//                                 <div className="idea-card__meta">
//                                     <span className="idea-card__review-count">
//                                         <i className="fa-regular fa-comment-dots"></i>
//                                         11
//                                     </span>
//                                     <span className="idea-card__average-rating">
//                                         <i className="fa-regular fa-thumbs-up"></i>
//                                         ★★★★☆
//                                     </span>
//                                     <p className="idea-card__category">
//                                         <i className="fa-solid fa-tags"></i>
//                                         テクノロジー
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="idea-card__buttons">
//                                 <button className="idea-card__button">
//                                     詳細
//                                 </button>
//                                 <button className="idea-card__button">
//                                     編集
//                                 </button>
//                             </div>
//                         </div>
//                     </section>

//                     <section className="mypage__section">
//                         <div className="mypage__title">
//                             <h2>最近投稿したアイディア（最新５件）</h2>
//                             <a href="idea-catalog.html">全てを表示</a>
//                         </div>
//                         <div className="idea-card">
//                             <div className="idea-card__content">
//                                 <div className="idea-card__title-category">
//                                     <h3 className="idea-card__title">
//                                         アイディア１
//                                     </h3>
//                                 </div>
//                                 <p className="idea-card__summary">
//                                     このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。
//                                 </p>
//                                 <div className="idea-card__meta">
//                                     <span className="idea-card__review-count">
//                                         <i className="fa-regular fa-comment-dots"></i>
//                                         11
//                                     </span>
//                                     <span className="idea-card__average-rating">
//                                         <i className="fa-regular fa-thumbs-up"></i>
//                                         ★★★★☆
//                                     </span>
//                                     <p className="idea-card__category">
//                                         <i className="fa-solid fa-tags"></i>
//                                         テクノロジー
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="idea-card__buttons">
//                                 <button className="idea-card__button">
//                                     詳細
//                                 </button>
//                                 <button className="idea-card__button">
//                                     編集
//                                 </button>
//                             </div>
//                         </div>
//                     </section>

//                     <section className="mypage__section">
//                         <div className="mypage__title">
//                             <h2>最近レビューしたアイディア（最新５件）</h2>
//                             <a href="idea-catalog.html">全てを表示</a>
//                         </div>
//                         <div className="idea-card">
//                             <div className="idea-card__content">
//                                 <div className="idea-card__title-category">
//                                     <h3 className="idea-card__title">
//                                         アイディア１
//                                     </h3>
//                                 </div>
//                                 <p className="idea-card__summary">
//                                     このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。
//                                 </p>
//                                 <div className="idea-card__meta">
//                                     <span className="idea-card__review-count">
//                                         <i className="fa-regular fa-comment-dots"></i>
//                                         11
//                                     </span>
//                                     <span className="idea-card__average-rating">
//                                         <i className="fa-regular fa-thumbs-up"></i>
//                                         ★★★★☆
//                                     </span>
//                                     <p className="idea-card__category">
//                                         <i className="fa-solid fa-tags"></i>
//                                         テクノロジー
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="idea-card__buttons">
//                                 <button className="idea-card__button">
//                                     詳細
//                                 </button>
//                                 <button className="idea-card__button">
//                                     編集
//                                 </button>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default MyPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../../sass/app.scss"

// const MyPage = () => {
//     const [ideas, setIdeas] = useState([]);
//     useEffect(() => {
//         const fetchIdeas = async () => {
//             try {
//                 const response = await axios.get('/api/ideas');
//                 setIdeas(response.data);
//             } catch (error) {
//                 console.error('Error fetching ideas:', error);
//             }
//         };

//         fetchIdeas();
//     }, []);



    const MyPage = () => {
        useEffect(() => {
            axios.get('/api/ideas', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
           .then(response => {
                console.log(response.data);
            })
           .catch(error => {
                console.error(error);
            });
        }, []);


        
    return (
        <div>
            <Header />
            <main className="container">
                <div className="section-container">

                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>気になるアイディア（最新５件）</h2>
                            <a href="/ideas">全てを表示</a>
                        </div>

                        <div className="idea-card">
                            <div className="idea-card__content">
                                <div className="idea-card__title-category">
                                    <h3 className="idea-card__title">アイディア１</h3>
                                </div>
                                <p className="idea-card__summary">このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。</p>
                                <div className="idea-card__mate">
                                    <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>11</span>
                                    <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>★★★★☆</span>
                                    <p className="idea-card__category"><i className="fa-solid fa-tags"></i>テクノロジー</p>
                                </div>
                            </div>
                            <div className="idea-card__buttons">
                                <button className="idea-card__button">詳細</button>
                                <button className="idea-card__button">編集</button>
                            </div>
                        </div>
                    </section>


                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>購入したアイディア（最新５件）</h2>
                            <a href="/ideas">全てを表示</a>
                        </div>

                        <div className="idea-card">
                            <div className="idea-card__content">
                                <div className="idea-card__title-category">
                                    <h3 className="idea-card__title">アイディア１</h3>
                                </div>
                                <p className="idea-card__summary">このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。</p>
                                <div className="idea-card__mate">
                                    <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>11</span>
                                    <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>★★★★☆</span>
                                    <p className="idea-card__category"><i className="fa-solid fa-tags"></i>テクノロジー</p>
                                </div>
                            </div>
                            <div className="idea-card__buttons">
                                <button className="idea-card__button">詳細</button>
                                <button className="idea-card__button">編集</button>
                            </div>
                        </div>
                    </section>




                    {ideas.map((idea,index)=>(
                        <section key={index} className="mypage__section">
                        <div className="mypage__title">
                            <h2>投稿したアイディア（最新５件）</h2>
                            <a href="/ideas">全てを表示</a>
                        </div>
                        <div className="idea-card">
                            <div className="idea-card__content">
                                <div className="idea-card__title-category">
                                    <h3 className="idea-card__title">{idea.title}</h3>
                                </div>
                                <p className="idea-card__summary">{idea.summary}</p>
                                <div className="idea-card__mate">
                                    <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>11</span>  {/**Purchaseから */}
                                    <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>★★★★☆</span> {/**Purchaseから */}
                                    <p className="idea-card__category"><i className="fa-solid fa-tags"></i>{idea.category}</p>
                                </div>
                            </div>
                            <div className="idea-card__buttons">
                                <button className="idea-card__button">詳細</button>
                                <button className="idea-card__button">編集</button>
                            </div>
                        </div>
                    </section>
                        ))}






                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>レビューしたアイディア（最新５件）</h2>
                            <a href="/ideas">全てを表示</a>
                        </div>

                        <div className="idea-card">
                            <div className="idea-card__content">
                                <div className="idea-card__title-category">
                                    <h3 className="idea-card__title">アイディア１</h3>
                                </div>
                                <p className="idea-card__summary">このアイディアはテスト用のダミーテキストです。このアイディアはテスト用のダミーテキストです。</p>
                                <div className="idea-card__mate">
                                    <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>11</span>
                                    <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>★★★★☆</span>
                                    <p className="idea-card__category"><i className="fa-solid fa-tags"></i>テクノロジー</p>
                                </div>
                            </div>
                            <div className="idea-card__buttons">
                                <button className="idea-card__button">詳細</button>
                                <button className="idea-card__button">編集</button>
                            </div>
                        </div>
                    </section>


                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyPage;

{/* <main className="container">
<section className="section">
    <h2>気になるアイディア（最新５件）</h2>
    {ideas.slice(0, 5).map((idea) => (
        <div className="idea-card" key={idea.id}>
            <h3>{idea.title}</h3>
            <p>{idea.summary}</p>
            <div>
                <span>レビュー数: {idea.reviewCount}</span>
                <span>平均評価: {idea.averageRating}</span>
                <span>カテゴリ: {idea.category}</span>
            </div>
            <button>詳細</button>
            <button>編集</button>
        </div>
    ))}
    <a href="/ideas">全てを表示</a>
</section>
{/* 他のセクションも同様に追加可能 */}
// </main> */}
