// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";
// // import { useNavigate, useParams } from 'react-router-dom';

// // function IdeaUpdate() {
// //     const { id } = useParams(); // アイディアIDをURLパラメータから取得
// //     const [idea, setIdea] = useState({
// //         title: '',
// //         overview: '',
// //         content: '',
// //         price: '',
// //         category_id: '',
// //     });
// //     const [categories, setCategories] = useState([]);
// //     const [isPurchased, setIsPurchased] = useState(false); // 購入済みかどうかの状態
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchIdea = async () => {
// //             try {
// //                 console.log(`Fetching idea with id: ${id}`); 
// //                 const response = await axios.get(`/api/ideas/${id}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// //                     }
// //                 });
// //                 const ideaData = response.data.idea;
// //                 setIdea({
// //                     title: ideaData.title || '',
// //                     overview: ideaData.overview || '',
// //                     content: ideaData.content || '',
// //                     price: ideaData.price || '',
// //                     category_id: ideaData.category_id || ''
// //                 });
// //                 setIsPurchased(ideaData.purchased); // 購入済みかどうかを設定
// //             } catch (error) {
// //                 console.error('Error fetching idea:', error);
// //                 setError('アイディアの取得に失敗しました。');
// //             }
// //         };

// //         const fetchCategories = async () => {
// //             try {
// //                 const response = await axios.get('/api/categories');
// //                 setCategories(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching categories:', error);
// //                 setError('カテゴリの取得に失敗しました。');
// //             }
// //         };

// //         fetchIdea();
// //         fetchCategories();
// //     }, [id]);

// //     const handleChange = (e) => {
// //         setIdea({ ...idea, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         console.log(`Submitting update for idea with id: ${id}`); // デバッグ用ログ
// //         if (!id) {
// //             setError('IDが指定されていません。');
// //             return;
// //         }
// //         try {
// //             await axios.put(`/api/ideas/${id}`, idea, {
// //                 headers: {
// //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// //                 }
// //             });
// //             alert('アイディアが更新されました。');
// //             navigate('/mypage');
// //         } catch (error) {
// //             console.error('Error updating idea:', error);
// //             if (error.response && error.response.status === 403) {
// //                 setError('すでに販売済みのため，変更できません');
// //             } else if (error.response && error.response.status === 404) {
// //                 setError('アイディアが見つかりません。');
// //             } else {
// //                 setError('アイディアの更新中にエラーが発生しました。');
// //             }
// //         }
// //     };


// //     const handleDelete = async () => {
// //         if (window.confirm('このアイディアを削除してもよろしいですか？')) {
// //             try {
// //                 await axios.delete(`/api/ideas/${id}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// //                     }
// //                 });
// //                 alert('アイディアが削除されました。');
// //                 navigate('/mypage');
// //             } catch (error) {
// //                 console.error('Error deleting idea:', error);
// //                 setError('アイディアの削除中にエラーが発生しました。');
// //             }
// //         }
// //     };

// //     return (
// //         <div>
// //             <Header />
// //             <main className="container">
// //                 <div className="submission-form">
// //                     <h2>アイデアを編集する</h2>
// //                     {isPurchased ? (
// //                         <p className="error">販売済みのため変更できません。</p>
// //                     ) : ('')}
// //                     {error && <p className="error">{error}</p>}
// //                         <form onSubmit={handleSubmit}>
// //                             <label htmlFor="title">タイトル:</label>
// //                             <input
// //                                 type="text"
// //                                 id="title"
// //                                 name="title"
// //                                 value={idea.title}
// //                                 onChange={handleChange}
// //                                 disabled={isPurchased}
// //                             />

// //                             <label htmlFor="overview">概要:</label>
// //                             <textarea
// //                                 id="overview"
// //                                 name="overview"
// //                                 value={idea.overview}
// //                                 onChange={handleChange}
// //                                 disabled={isPurchased}
// //                             />

// //                             <label htmlFor="content">詳細:</label>
// //                             <textarea
// //                                 id="content"
// //                                 name="content"
// //                                 value={idea.content}
// //                                 onChange={handleChange}
// //                                 disabled={isPurchased}
// //                             />

// //                             <label htmlFor="price">価格 (円):</label>
// //                             <input
// //                                 type="number"
// //                                 id="price"
// //                                 name="price"
// //                                 value={idea.price}
// //                                 onChange={handleChange}
// //                                 disabled={isPurchased}
// //                                 min="1"
// //                                 step="1"
// //                             />

// //                             <label htmlFor="category_id">カテゴリ:</label>
// //                             <select
// //                                 id="category_id"
// //                                 name="category_id"
// //                                 value={idea.category_id}
// //                                 onChange={handleChange}
// //                                 disabled={isPurchased}
// //                             >
// //                                 <option value="">カテゴリを選択</option>
// //                                 {categories.map(category => (
// //                                     <option key={category.id} value={category.id}>{category.name}</option>
// //                                 ))}
// //                             </select>
// //                             {/* <button type="submit">更新する</button>
// //                             <button 
// //                                 className="btn delete-btn" 
// //                                 onClick={handleDelete}
// //                             >
// //                                 削除する
// //                             </button> */}
// //                             {!isPurchased && (
// //                             <>
// //                                 <button type="submit">更新する</button>
// //                                 <button 
// //                                     className="btn delete-btn"
// //                                     type="button"
// //                                     onClick={handleDelete}
// //                                 >
// //                                     削除する
// //                                 </button>
// //                             </>
// //                         )}
// //                         </form>

// //                     <button className="btn" onClick={() => navigate(-1)}>戻る</button>
// //                 </div>
// //             </main>
// //             <Footer />
// //         </div>
// //     );
// // }

// // export default IdeaUpdate;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useNavigate, useParams } from 'react-router-dom';

// function IdeaUpdate() {
//     const { id } = useParams(); // アイディアIDをURLパラメータから取得
//     const [idea, setIdea] = useState({
//         title: '',
//         overview: '',
//         content: '',
//         price: '',
//         category_id: '',
//     });
//     const [categories, setCategories] = useState([]);
//     const [isPurchased, setIsPurchased] = useState(false); // 購入済みかどうかの状態
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchIdea = async () => {
//             try {
//                 console.log(`Fetching idea with id: ${id}`);
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 const ideaData = response.data.idea;
//                 setIdea({
//                     title: ideaData.title || '',
//                     overview: ideaData.overview || '',
//                     content: ideaData.content || '',
//                     price: ideaData.price || '',
//                     category_id: ideaData.category_id || ''
//                 });
//                 setIsPurchased(ideaData.purchased); // 購入済みかどうかを設定
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//                 setError('アイディアの取得に失敗しました。');
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('カテゴリの取得に失敗しました。');
//             }
//         };

//         fetchIdea();
//         fetchCategories();
//     }, [id]);

//     const handleChange = (e) => {
//         setIdea({ ...idea, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!id) {
//             setError('IDが指定されていません。');
//             return;
//         }
//         try {
//             await axios.put(`/api/ideas/${id}`, idea, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                 }
//             });
//             alert('アイディアが更新されました。');
//             navigate('/mypage');
//         } catch (error) {
//             console.error('Error updating idea:', error);
//             if (error.response && error.response.status === 403) {
//                 setError('すでに販売済みのため、変更できません');
//             } else if (error.response && error.response.status === 404) {
//                 setError('アイディアが見つかりません。');
//             } else {
//                 setError('アイディアの更新中にエラーが発生しました。');
//             }
//         }
//     };

//     const handleDelete = async () => {
//         if (window.confirm('このアイディアを削除してもよろしいですか？')) {
//             try {
//                 await axios.delete(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 alert('アイディアが削除されました。');
//                 navigate('/mypage');
//             } catch (error) {
//                 console.error('Error deleting idea:', error);
//                 setError('アイディアの削除中にエラーが発生しました。');
//             }
//         }
//     };

//     return (
//         <div className="submission__page">
//             <Header />
//             <main className="submission__container">
//                 <div className="submission__form">
//                     <h2>アイデアを編集する</h2>
//                     {/* {isPurchased && <p className="submission__error">販売済みのため変更できません。</p>}
//                     {error && <p className="submission__error">{error}</p>} */}
//                                         {isPurchased === true && <p className="submission__error">販売済みのため変更できません。</p>}
//                     {typeof error === 'string' && error.length > 0 && <p className="submission__error">{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="title">
//                             タイトル:公開情報です（30文字）
//                         </label>
//                         <textarea
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={idea.title || ''}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                             className="submission__input submission__input-title"
//                         />

//                         <label htmlFor="overview">
//                             概要:公開情報です（90文字）
//                         </label>
//                         <textarea
//                             id="overview"
//                             name="overview"
//                             value={idea.overview}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                             className="submission__input submission__input-overview"
//                         />

//                         <label htmlFor="content">
//                             詳細:購入者のみ見れるようになります（255文字）
//                         </label>
//                         <textarea
//                             id="content"
//                             name="content"
//                             value={idea.content}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                             className="submission__input submission__input-content"
//                         />

//                         <label htmlFor="price">価格 (円):</label>
//                         <input
//                             type="number"
//                             id="price"
//                             name="price"
//                             value={idea.price}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                             min="1"
//                             step="1"
//                             className="submission__input"
//                         />

//                         <label htmlFor="category_id">カテゴリ:</label>
//                         <select
//                             id="category_id"
//                             name="category_id"
//                             value={idea.category_id}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                             className="submission__input"
//                         >
//                             <option value="">カテゴリを選択</option>
//                             {categories.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>

//                         {!isPurchased && (
//                             <>
//                                 <button type="submit" className="submission__button">
//                                     更新する
//                                 </button>
//                                 <button
//                                     className="submission__button"
//                                     type="button"
//                                     onClick={handleDelete}
//                                 >
//                                     削除する
//                                 </button>
//                             </>
//                         )}
//                     </form>
//                     <button
//                         className="submission__button"
//                         onClick={() => navigate(-1)}
//                         style={{ marginTop: "10px" }}
//                     >
//                         戻る
//                     </button>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default IdeaUpdate;

// src/pages/IdeaUpdate.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
// import "../scss/pages/idea-update.scss"; // スタイルシートのインポート

function IdeaUpdate() {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [idea, setIdea] = useState({
        title: "",
        overview: "",
        content: "",
        price: "",
        category_id: "",
    });
    const [categories, setCategories] = useState([]);
    const [isPurchased, setIsPurchased] = useState(false); // 購入済みかどうかの状態
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
                    },
                });
                const ideaData = response.data.idea;
                setIdea({
                    title: ideaData.title || "",
                    overview: ideaData.overview || "",
                    content: ideaData.content || "",
                    price: ideaData.price || "",
                    category_id: ideaData.category_id || "",
                });
                setIsPurchased(ideaData.purchased); // 購入済みかどうかを設定
            } catch (error) {
                console.error("Error fetching idea:", error);
                setError("アイディアの取得に失敗しました。");
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("カテゴリの取得に失敗しました。");
            }
        };

        fetchIdea();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        setIdea({ ...idea, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            setError("IDが指定されていません。");
            return;
        }
        try {
            await axios.put(`/api/ideas/${id}`, idea, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
                },
            });
            alert("アイディアが更新されました。");
            navigate("/mypage");
        } catch (error) {
            console.error("Error updating idea:", error);
            if (error.response && error.response.status === 403) {
                setError("すでに販売済みのため、変更できません");
            } else if (error.response && error.response.status === 404) {
                setError("アイディアが見つかりません。");
            } else {
                setError("アイディアの更新中にエラーが発生しました。");
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm("このアイディアを削除してもよろしいですか？")) {
            try {
                await axios.delete(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
                    },
                });
                alert("アイディアが削除されました。");
                navigate("/mypage");
            } catch (error) {
                console.error("Error deleting idea:", error);
                setError("アイディアの削除中にエラーが発生しました。");
            }
        }
    };

    return (
        <div className="idea-update__page">
            <Header />
            <main className="idea-update__container">
                <div className="idea-update__form">
                    <h2 className="idea-update__title">アイデアを編集する</h2>
                    {isPurchased === true && (
                        <p className="idea-update__error">販売済みのため変更できません。</p>
                    )}
                    {typeof error === "string" && error.length > 0 && (
                        <p className="idea-update__error">{error}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">タイトル:公開情報です（30文字）</label>
                        <textarea
                            id="title"
                            name="title"
                            value={idea.title || ""}
                            onChange={handleChange}
                            disabled={isPurchased}
                            className="idea-update__input idea-update__input-title"
                        />

                        <label htmlFor="overview">概要:公開情報です（90文字）</label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={idea.overview}
                            onChange={handleChange}
                            disabled={isPurchased}
                            className="idea-update__input idea-update__input-overview"
                        />

                        <label htmlFor="content">詳細:購入者のみ見れるようになります（255文字）</label>
                        <textarea
                            id="content"
                            name="content"
                            value={idea.content}
                            onChange={handleChange}
                            disabled={isPurchased}
                            className="idea-update__input idea-update__input-content"
                        />

                        <label htmlFor="price">価格 (円):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={idea.price}
                            onChange={handleChange}
                            disabled={isPurchased}
                            min="1"
                            step="1"
                            className="idea-update__input"
                        />

                        <label htmlFor="category_id">カテゴリ:</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={idea.category_id}
                            onChange={handleChange}
                            disabled={isPurchased}
                            className="idea-update__input"
                        >
                            <option value="">カテゴリを選択</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {!isPurchased && (
                            <>
                                <button type="submit" className="idea-update__button">
                                    更新する
                                </button>
                                <button
                                    className="idea-update__button"
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    削除する
                                </button>
                            </>
                        )}
                    </form>
                    <button
                        className="idea-update__button idea-update__button--back"
                        onClick={() => navigate(-1)}
                    >
                        戻る
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaUpdate;
