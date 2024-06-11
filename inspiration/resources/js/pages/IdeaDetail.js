// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams, useNavigate } from 'react-router-dom';
// import IdeaCard from '../components/IdeaCard';

// const IdeaDetail = () => {
//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [idea, setIdea] = useState(null);
//     const [categories, setCategories] = useState({}); // カテゴリの状態管理
//     const [loadingCategories, setLoadingCategories] = useState(true); // カテゴリのロード状態を管理
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
//                 setIdea(response.data.idea);
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//                 setError('データの取得に失敗しました。');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('/api/categories');
//                 const categoriesMap = response.data.reduce((map, category) => {
//                     map[category.id] = category.name;
//                     return map;
//                 }, {});
//                 setCategories(categoriesMap);
//                 setLoadingCategories(false); // カテゴリのロード状態を更新
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('カテゴリデータの取得に失敗しました。');
//                 setLoadingCategories(false); // カテゴリのロード状態を更新
//             }
//         };

//         fetchIdea();
//         fetchCategories();
//     }, [id]);

    


//     // エラーメッセージを表示
//     if (error) {
//       return <div>{error}</div>;
//   }

//   // データロード中の表示
//   if (!idea) {
//       return <div>Loading...</div>;
//   }

//     return (
//         <div>
//             <Header />
//             <main className="container">
//             <br /><br /><br /><br /><br />
//             <IdeaCard
//                     idea={idea}
//                     categories={categories}
//                     isPlaceholder={false}
//                     updatedAt={idea.updated_at}
//                     buttons={[
//                         {
//                             label: idea.purchased ? "レビューを書く" : "購入する",
//                             onClick: () => navigate(`/reviews/${id}`),
//                         },
//                         {
//                             label: "お気に入りから削除　お気に入りになっていたら",
//                             onClick: () => console.log('お気に入り解除') // トグル処理をここに追加
//                         },
//                         {
//                             label: "戻る",
//                             onClick: () => navigate(-1),
//                         }
//                     ]}
//                 />
//                 <div>
//                     {/* <h2>Fetched Idea (State)</h2>
//                     <pre>{JSON.stringify(idea, null, 2)}</pre> */}
//                 </div>
//               {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
//                 {/* <h2>{idea.title}</h2>
//                 <p>{idea.overview}</p>
//                 <p>{idea.content}</p>
//                 {idea.purchased ? (
//                     <p>詳細: {idea.content}</p>
//                 ) : (
//                     <p>詳細は購入後に見ることができます。</p>
//                 )}
//                 <p>価格: {idea.price}</p>
//                 <div>
//                     <span>カテゴリ: {idea.category}</span>
//                     <span>レビュー数: {idea.reviewCount}</span>
//                     <span>平均評価: {idea.averageRating}</span>
//                 </div>
//                 <div className="idea-card__buttons">
//                     <button className="idea-card__button" onClick={() => navigate(`/reviews/${id}`)}>購入する　購入済みの場合はレビューを書くor更新する</button>
//                     <button className="idea-card__button" ><i className="fa-regular fa-thumbs-up"></i>解除</button>
//                 </div>
//                 <button className="idea-card__button" onClick={() => navigate(-1)}>戻る</button> */}
//                 <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default IdeaDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const IdeaDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
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

        fetchIdea();
        fetchCategories();
    }, [id]);

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

                    <div className="idea-card__buttons">
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
