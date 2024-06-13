import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const IdeaDetail = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [favorite, setFavorite] = useState({}); // お気に入りの状態管理
    const [reviews, setReviews] = useState([]); // レビューの状態管理
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
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

            // お気に入り情報を取得
            const fetchFavorite = async () => {
                try {
                    const response = await axios.get(`/api/favorites/${id}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                        }
                    });
                    // const sortedFavorite = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                    setFavorite(response.data);
                    console.log('Fetched favorite:', setFavorite);
                } catch (error) {
                    console.error('Error fetching favorite:', error);
                }
            };

            //アイディア情報を取得
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                console.log('Fetched idea:', response.data); // デバッグ用
                setIdea(response.data.idea); // アイデアデータを設定

                setReviews(response.data.reviews || []);
            } catch (error) {
                console.error('Error fetching idea:', error);
                setError('データの取得に失敗しました。');
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
        fetchFavorite();
    }, [id]);

    // エラーメッセージを表示
    if (error) {
        return <div>{error}</div>;
    }

    // データロード中の表示
    if (!idea) {
        return <div>Loading...</div>;
    }

    const sortedReviews = reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const handleToggleFavorite = async (ideaId) => {
        try {
            const response = await axios.post('/api/favorites/toggle', { idea_id: ideaId }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.status === 200) {
                // fetchFavorite(); // トグル後にお気に入り情報を再取得
                setFavorite(prevFavorite => ({
                    ...prevFavorite,
                    is_favorite: !prevFavorite.is_favorite // お気に入りの状態を反転
                }));
            } else {
                throw new Error('サーバーエラー: ' + response.status);
            }
            // fetchFavorites(); // トグル後にお気に入り情報を再取得
        } catch (error) {
            console.error('お気に入りの解除に失敗しました', error);
        }
    };
    
    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアの詳細</h2>

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
                        <div className="form-value">詳細は購入後に見ることができます。</div>
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

                    <div className="review-section">
                        <h3>レビュー</h3>
                        {sortedReviews.length > 0 ? (
                            sortedReviews.map((review,index) => (
                                <div key={index} className="review">
                                    <p><strong>{review.rating}</strong> / 5</p>
                                    <p>{review.review}</p>
                                    <p><small>{new Date(review.created_at).toLocaleString()}</small></p>
                                </div>
                            ))
                        ) : (
                            <p>レビューはまだありません。</p>
                        )}
                    </div>

                    <div className="idea-card__buttons">
                        {/* 自身の投稿でない場合に「気になる」ボタンを表示 */}
                        {user && idea.user_id !== user.id &&(
                        <button
                            className='btn'
                            onClick={()=>handleToggleFavorite( idea.id)}
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default IdeaDetail;

//ここから，切り替えを実装