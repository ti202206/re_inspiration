
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const PurchaseDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
    const [favorite, setFavorite] = useState(null); //＊＊＊＊＊＊変更：お気に入りの状態管理を追加＊＊＊＊＊＊
    const [user, setUser] = useState(null); //＊＊＊＊＊＊変更：ユーザー情報の状態管理を追加＊＊＊＊＊＊
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                console.log('Fetched idea:', response.data); // デバッグ用
                setIdea(response.data.idea); // アイデアデータを設定
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

        const fetchFavorite = async () => { //＊＊＊＊＊＊変更：お気に入り情報を取得する関数を追加＊＊＊＊＊＊
            try {
                const response = await axios.get(`/api/favorites/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                setFavorite(response.data);
                console.log('Fetched favorite:', response.data);
            } catch (error) {
                console.error('Error fetching favorite:', error);
            }
        };

        const fetchUser = async () => { //＊＊＊＊＊＊変更：ユーザー情報を取得する関数を追加＊＊＊＊＊＊
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                setUser(response.data);
                console.log('Fetched user:', response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchIdea();
        fetchCategories();
        fetchFavorite(); //＊＊＊＊＊＊変更：お気に入り情報を取得＊＊＊＊＊＊
        fetchUser(); //＊＊＊＊＊＊変更：ユーザー情報を取得＊＊＊＊＊＊
    }, [id]);

    const handleToggleFavorite = async (ideaId) => { //＊＊＊＊＊＊変更：お気に入りのトグル関数を追加＊＊＊＊＊＊
        try {
            const response = await axios.post('/api/favorites/toggle', { idea_id: ideaId }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            if (response.status === 200) {
                setFavorite(prevFavorite => ({
                    ...prevFavorite,
                    is_favorite: !prevFavorite.is_favorite // お気に入りの状態を反転
                }));
            } else {
                throw new Error('サーバーエラー: ' + response.status);
            }
        } catch (error) {
            console.error('お気に入りの解除に失敗しました', error);
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

                    <div className="idea-card__buttons">
                        {/* 自身の投稿でない場合に「気になる」ボタンを表示 */}
                        {user && idea.user_id !== user.id && favorite && ( //＊＊＊＊＊＊変更：お気に入りボタンの条件にfavoriteを追加＊＊＊＊＊＊
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PurchaseDetail;
