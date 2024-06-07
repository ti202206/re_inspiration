import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

    const MyPage = () => {

        const [user, setUser] = useState(null); // ユーザー情報の状態管理
        const [ideas, setIdeas] = useState([]); // アイディアの状態管理
        const [favorites, setFavorites] = useState([]); // お気に入りの状態管理
        const [purchases, setPurchases] = useState([]); // 購入履歴の状態管理
        const [reviewed, setReviewed] = useState([]); // レビューしたアイディアの状態管理
        const [categories, setCategories] = useState({}); // カテゴリ名のステート
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
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // 投稿したアイディア情報を取得
        const fetchMyIdeas = async () => {
            try {
                const response = await axios.get('/api/my-ideas', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const sortedIdeas = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const recentIdeas = sortedIdeas.slice(0, 5);
                setIdeas(recentIdeas);
                console.log('Fetched ideas:', recentIdeas);
            } catch (error) {
                console.error('Error fetching ideas:', error);
            }
        };

        // お気に入り情報を取得
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const sortedFavorites = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const recentFavorites = sortedFavorites.slice(0, 5);
                setFavorites(recentFavorites);
                console.log('Fetched favorites:', recentFavorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        // 購入済み情報を取得
        const fetchMyPurchases = async () => {
            try {
                const response = await axios.get('/api/mypurchases', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const sortedPurchases = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const recentPurchases = sortedPurchases.slice(0, 5);
                setPurchases(recentPurchases);
                console.log('Fetched purchases:', recentPurchases);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        // レビュー情報を取得
        const fetchMyReviewed = async () => {
            try {
                const response = await axios.get('/api/reviewed-purchases', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const sortedReviewed = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const recentReviewed = sortedReviewed.slice(0, 5);
                setReviewed(recentReviewed);
                console.log('Fetched Reviewed:', recentReviewed);
            } catch (error) {
                console.error('Error fetching Reviewed:', error);
            }
        };

        // カテゴリ情報を取得
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                const categoriesMap = response.data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {});
                setCategories(categoriesMap);
                console.log('Fetched categories:', categoriesMap);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        useEffect(() => {
            fetchUser();
            fetchMyIdeas();
            fetchFavorites();
            fetchMyPurchases();
            fetchMyReviewed();
            fetchCategories();
        }, []);

        const handleDetailClick = (id) => {
            navigate(`/idea-detail/${id}`);
        };

        // const handleIdeaHistoryClick = (id) => {
        //     navigate(`/my-ideas`);
        // };

        const handleToggleFavorite = async (id) => {
            try {
                const response = await axios.post('/api/favorites/toggle', { idea_id: id }, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                fetchFavorites(); // トグル後にお気に入り情報を再取得
            } catch (error) {
                console.error('お気に入りの解除に失敗しました', error);
            }
        };


    return (
        <div>
            <Header />
            <main className="container">
            <div>
                {/* <h2>User Information</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre> */}
            </div>
            <div>
                {/* <h2>Fetched Ideas (State)</h2>
                <pre>{JSON.stringify(ideas, null, 2)}</pre> */}
            </div>
            <div>
                {/* <h2>Fetched favorites (State)</h2> */}
                {/* <pre>{JSON.stringify(favorites, null, 2)}</pre> */}
            </div>
            <div>
                {/* <h2>Fetched purchase (State)</h2>
                <pre>{JSON.stringify(purchases, null, 2)}</pre> */}
            </div>
            <div>
                {/* <h2>Fetched reviewed (State)</h2>
                <pre>{JSON.stringify(reviewed, null, 2)}</pre> */}
            </div>

            <div>
                {/* <h2>Fetched categories (State)</h2>
                <pre>{JSON.stringify(categories, null, 2)}</pre> */}
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><p>MyPage</p>
                <div className="section-container">

                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>気になるアイディア（最新５件）</h2>
                            <a href="/favorites">全てを表示</a>
                        </div>

                        {favorites.map((favorite, index) => {
                            const { idea } = favorite;
                            return (
                                <div className="idea-card" key={index}>
                                    <div className="idea-card__content">
                                        <div className="idea-card__title-category">
                                            <h3 className="idea-card__title">{idea.title}</h3>
                                        </div>
                                        <p className="idea-card__summary">{idea.overview}</p>
                                        <div className="idea-card__mate">
                                            <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>{idea.favorite_count || 0}</span>
                                            <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>{idea.average_rating || 0}</span>
                                            <p className="idea-card__category"><i className="fa-solid fa-tags"></i>{categories[idea.category_id]}</p>
                                        </div>
                                    </div>
                                    <div className="idea-card__buttons">
                                        <button className="idea-card__button" onClick={() => handleDetailClick(idea.id)}>詳細</button>
                                        <button className="idea-card__button" onClick={() => handleToggleFavorite(idea.id)}><i className="fa-regular fa-thumbs-up"></i>解除</button>
                                    </div>
                                </div>
                            );
                        })}

                    </section>


                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>購入したアイディア（最新５件）</h2>
                            <a href="/purchases">全てを表示</a>
                        </div>

                        {purchases.map((purchase, index) => {
                            const { idea } = purchase;
                            return (
                                <div className="idea-card" key={index}>
                                    <div className="idea-card__content">
                                        <div className="idea-card__title-category">
                                            <h3 className="idea-card__title">{idea.title}</h3>
                                        </div>
                                        <p className="idea-card__summary">{idea.overview}</p>
                                        <div className="idea-card__mate">
                                            <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>{idea.favorite_count || 0}</span>
                                            <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>{idea.average_rating || 0}</span>
                                            <p className="idea-card__category"><i className="fa-solid fa-tags "></i>{categories[idea.category_id]}</p>
                                        </div>
                                    </div>
                                    <div className="idea-card__buttons">
                                        <button className="idea-card__button" onClick={() => handleDetailClick(idea.id)} >詳細</button>
                                        {/* <button className="idea-card__button" onClick={() => handleToggleFavorite(idea.id)} >レビューを編集</button> */}
                                    </div>
                                </div>
                            );
                        })}
                    </section>


                        <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>投稿したアイディア（最新５件）</h2>
                            <a href="/my-ideas">全てを表示</a>
                        </div>
                        {ideas.map((idea, index) => (
                            <div className="idea-card" key={index}>
                                <div className="idea-card__content">
                                    <div className="idea-card__title-category">
                                        <h3 className="idea-card__title">{idea.title}</h3>
                                    </div>
                                    <p className="idea-card__summary">{idea.overview}</p>
                                    <div className="idea-card__mate">
                                        <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>{idea.favorite_count || 0}</span>  {/**Purchaseから */}
                                        <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>{idea.average_rating || 0}</span> *Purchaseから
                                        <p className="idea-card__category"><i className="fa-solid fa-tags"></i>{categories[idea.category_id]}</p>
                                    </div>
                                </div>
                                <div className="idea-card__buttons">
                                    <button className="idea-card__button" onClick={() => handleDetailClick(idea.id)} >詳細</button>
                                    <button className="idea-card__button">編集</button>
                                </div>
                            </div>
                            )
                        )}
                        </section>


                    <section className="mypage__section">
                        <div className="mypage__title">
                            <h2>レビューしたアイディア（最新５件）</h2>
                            <a href="/my-reviews">全てを表示</a>
                        </div>
                        {reviewed.map((review, index) =>{
                            const {idea} = review;
                            return(
                                <div className="idea-card" key={index} >
                                    <div className="idea-card__content">
                                        <div className="idea-card__title-category">
                                            <h3 className="idea-card__title">{idea.title}</h3>
                                        </div>
                                        <p className="idea-card__summary">{idea.overview}</p>
                                        <div className="idea-card__mate">
                                            <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i>{idea.favorite_count || 0}</span>
                                            <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i>{idea.average_rating || 0}</span>
                                            <p className="idea-card__category"><i className="fa-solid fa-tags"></i>{categories[idea.category_id]}</p>
                                        </div>
                                    </div>
                                    <div className="idea-card__buttons">
                                        <button className="idea-card__button" onClick={() => handleDetailClick(idea.id)} >詳細</button>
                                        <button className="idea-card__button">編集</button>
                                    </div>
                                </div>
                            );
                        })}
                    </section>


                </div> 
            </main>

            <Footer />
        </div>
    );
};

export default MyPage;

