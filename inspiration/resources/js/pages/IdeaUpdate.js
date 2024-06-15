// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Header from "../components/Header";
// // // import Footer from "../components/Footer";
// // // import { useNavigate, useParams } from 'react-router-dom';

// // // function IdeaUpdate() {
// // //     const initialFormData = {
// // //         title: '',
// // //         overview: '',
// // //         content: '',
// // //         price: '',
// // //         category_id: '',
// // //     };

// // //     const [formData, setFormData] = useState(initialFormData);
// // //     const [categories, setCategories] = useState([]);
// // //     const [errors, setErrors] = useState({});
// // //     const navigate = useNavigate();
// // //     const { id } = useParams(); // URLパラメータからIDを取得

// // //     useEffect(() => {
// // //         const fetchIdea = async () => {
// // //             try {
// // //                 const response = await axios.get(`/api/ideas/${id}`, {
// // //                     headers: {
// // //                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// // //                     }
// // //                 });
// // //                 const idea = response.data.idea;
// // //                 setFormData({
// // //                     title: idea.title || '',
// // //                     overview: idea.overview || '',
// // //                     content: idea.content || '',
// // //                     price: idea.price || '',
// // //                     category_id: idea.category_id || ''
// // //                 });
// // //             } catch (error) {
// // //                 console.error('Error fetching idea:', error);
// // //                 alert('アイディアの取得に失敗しました。');
// // //             }
// // //         };

// // //         const fetchCategories = async () => {
// // //             try {
// // //                 const response = await axios.get('/api/categories');
// // //                 setCategories(response.data);
// // //             } catch (error) {
// // //                 console.error('Error fetching categories:', error);
// // //                 alert('カテゴリの取得に失敗しました。');
// // //             }
// // //         };

// // //         fetchIdea();
// // //         fetchCategories();
// // //     }, [id]);

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         // ユーティリティ関数でバリデーション
// // //         const newErrors = validateIdeaForm(formData);

// // //         // バリデーションエラーメッセージのセット
// // //         setErrors(newErrors);

// // //         if (Object.keys(newErrors).length > 0) {
// // //             return; // バリデーションエラーがある場合は送信しない
// // //         }

// // //         try {
// // //             const response = await axios.put(`/api/ideas/${id}`, formData, {
// // //                 headers: {
// // //                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
// // //                 }
// // //             });
// // //             console.log('Idea Updated: ', response.data);
// // //             alert('アイディアが更新されました。');
// // //             navigate('/mypage');
// // //         } catch (error) {
// // //             console.error('Error updating idea:', error);
// // //             if (error.response && error.response.data.errors) {
// // //                 setErrors(error.response.data.errors);
// // //             } else {
// // //                 alert('アイディアの更新中にエラーが発生しました。');
// // //             }
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <Header />
// // //             <main className="container">
// // //                 <div className="submission-form">
// // //                     <h2>アイデアを編集する</h2>
// // //                     <form onSubmit={handleSubmit}>
// // //                         <label htmlFor="title">タイトル:</label>
// // //                         <input
// // //                             type="text"
// // //                             id="title"
// // //                             name="title"
// // //                             value={formData.title}
// // //                             onChange={handleChange}
// // //                         />
// // //                         {errors.title && <p className="error">{errors.title}</p>}

// // //                         <label htmlFor="overview">概要:</label>
// // //                         <textarea
// // //                             id="overview"
// // //                             name="overview"
// // //                             value={formData.overview}
// // //                             onChange={handleChange}
// // //                         />
// // //                         {errors.overview && <p className="error">{errors.overview}</p>}

// // //                         <label htmlFor="content">詳細:</label>
// // //                         <textarea
// // //                             id="content"
// // //                             name="content"
// // //                             value={formData.content}
// // //                             onChange={handleChange}
// // //                         />
// // //                         {errors.content && <p className="error">{errors.content}</p>}

// // //                         <label htmlFor="price">価格 (円):</label>
// // //                         <input
// // //                             type="number"
// // //                             id="price"
// // //                             name="price"
// // //                             value={formData.price}
// // //                             onChange={handleChange}
// // //                             min="1"
// // //                             step="1"
// // //                         />
// // //                         {errors.price && <p className="error">{errors.price}</p>}

// // //                         <label htmlFor="category_id">カテゴリ:</label>
// // //                         <select
// // //                             id="category_id"
// // //                             name="category_id"
// // //                             value={formData.category_id}
// // //                             onChange={handleChange}
// // //                         >
// // //                             <option value="">カテゴリを選択</option>
// // //                             {categories.map(category => (
// // //                                 <option key={category.id} value={category.id}>{category.name}</option>
// // //                             ))}
// // //                         </select>
// // //                         {errors.category_id && <p className="error">{errors.category_id}</p>}

// // //                         <button type="submit">更新する</button>
// // //                     </form>
// // //                 </div>
// // //             </main>
// // //             <Footer />
// // //         </div>
// // //     );
// // // }

// // // export default IdeaUpdate;

// // // src/components/IdeaUpdate.js

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
// //                     {isPurchased && <p className="error">販売済みのため変更できません。</p>}
// //                     {error && <p className="error">{error}</p>}
// //                     <form onSubmit={handleSubmit}>
// //                         <label htmlFor="title">タイトル:</label>
// //                         <input
// //                             type="text"
// //                             id="title"
// //                             name="title"
// //                             value={idea.title}
// //                             onChange={handleChange}
// //                             disabled={isPurchased}
// //                         />

// //                         <label htmlFor="overview">概要:</label>
// //                         <textarea
// //                             id="overview"
// //                             name="overview"
// //                             value={idea.overview}
// //                             onChange={handleChange}
// //                             disabled={isPurchased}
// //                         />

// //                         <label htmlFor="content">詳細:</label>
// //                         <textarea
// //                             id="content"
// //                             name="content"
// //                             value={idea.content}
// //                             onChange={handleChange}
// //                             disabled={isPurchased}
// //                         />

// //                         <label htmlFor="price">価格 (円):</label>
// //                         <input
// //                             type="number"
// //                             id="price"
// //                             name="price"
// //                             value={idea.price}
// //                             onChange={handleChange}
// //                             disabled={isPurchased}
// //                             min="1"
// //                             step="1"
// //                         />

// //                         <label htmlFor="category_id">カテゴリ:</label>
// //                         <select
// //                             id="category_id"
// //                             name="category_id"
// //                             value={idea.category_id}
// //                             onChange={handleChange}
// //                             disabled={isPurchased}
// //                         >
// //                             <option value="">カテゴリを選択</option>
// //                             {categories.map(category => (
// //                                 <option key={category.id} value={category.id}>{category.name}</option>
// //                             ))}
// //                         </select>
// //                         {!isPurchased && (
// //                             <>
// //                                 <button type="submit">更新する</button>
// //                                 <button 
// //                                     className="btn delete-btn" 
// //                                     onClick={handleDelete}
// //                                 >
// //                                     削除する
// //                                 </button>
// //                             </>
// //                         )}
// //                         {/* <button type="submit" disabled={isPurchased}>更新する</button> */}
// //                     </form>

// //                     {/* <button 
// //                         className="btn delete-btn" 
// //                         onClick={handleDelete} 
// //                         disabled={isPurchased}
// //                     >
// //                         削除する
// //                     </button> */}

// //                     <button className="btn" onClick={() => navigate(-1)}>戻る</button>
// //                 </div>
// //             </main>
// //             <Footer />
// //         </div>
// //     );
// // }

// // export default IdeaUpdate;


// // src/components/IdeaUpdate.js

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
//         // アイディアデータを取得
//         const fetchIdea = async () => {
//             try {
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

//         // カテゴリーデータを取得
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
//                 setError('すでに販売済みのため，変更できません');
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
//         <div>
//             <Header />
//             <main className="container">
//                 <div className="submission-form">
//                     <h2>アイデアを編集する</h2>
                    
//                     {/* {isPurchased && <p className="error">販売済みのため変更できません。</p>}
//                     {error && <p className="error">{error}</p>} */}

//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="title">タイトル:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={idea.title}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                         />

//                         <label htmlFor="overview">概要:</label>
//                         <textarea
//                             id="overview"
//                             name="overview"
//                             value={idea.overview}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                         />

//                         <label htmlFor="content">詳細:</label>
//                         <textarea
//                             id="content"
//                             name="content"
//                             value={idea.content}
//                             onChange={handleChange}
//                             disabled={isPurchased}
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
//                         />

//                         <label htmlFor="category_id">カテゴリ:</label>
//                         <select
//                             id="category_id"
//                             name="category_id"
//                             value={idea.category_id}
//                             onChange={handleChange}
//                             disabled={isPurchased}
//                         >
//                             <option value="">カテゴリを選択</option>
//                             {categories.map(category => (
//                                 <option key={category.id} value={category.id}>{category.name}</option>
//                             ))}
//                         </select>
//                         {!isPurchased && (
//                             <>
//                                 <button type="submit">更新する</button>
//                                 <button 
//                                     className="btn delete-btn" 
//                                     onClick={handleDelete}
//                                 >
//                                     削除する
//                                 </button>
//                             </>
//                         )}
//                     </form>

//                     <button className="btn" onClick={() => navigate(-1)}>戻る</button>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default IdeaUpdate;


// src/components/IdeaUpdate.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from 'react-router-dom';

function IdeaUpdate() {
    const { id } = useParams(); // アイディアIDをURLパラメータから取得
    const [idea, setIdea] = useState({
        title: '',
        overview: '',
        content: '',
        price: '',
        category_id: '',
    });
    const [categories, setCategories] = useState([]);
    const [isPurchased, setIsPurchased] = useState(false); // 購入済みかどうかの状態
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                console.log(`Fetching idea with id: ${id}`); 
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const ideaData = response.data.idea;
                setIdea({
                    title: ideaData.title || '',
                    overview: ideaData.overview || '',
                    content: ideaData.content || '',
                    price: ideaData.price || '',
                    category_id: ideaData.category_id || ''
                });
                setIsPurchased(ideaData.purchased); // 購入済みかどうかを設定
            } catch (error) {
                console.error('Error fetching idea:', error);
                setError('アイディアの取得に失敗しました。');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('カテゴリの取得に失敗しました。');
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
        console.log(`Submitting update for idea with id: ${id}`); // デバッグ用ログ
        if (!id) {
            setError('IDが指定されていません。');
            return;
        }
        try {
            await axios.put(`/api/ideas/${id}`, idea, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            alert('アイディアが更新されました。');
            navigate('/mypage');
        } catch (error) {
            console.error('Error updating idea:', error);
            if (error.response && error.response.status === 403) {
                setError('すでに販売済みのため，変更できません');
            } else if (error.response && error.response.status === 404) {
                setError('アイディアが見つかりません。');
            } else {
                setError('アイディアの更新中にエラーが発生しました。');
            }
        }
    };


    const handleDelete = async () => {
        if (window.confirm('このアイディアを削除してもよろしいですか？')) {
            try {
                await axios.delete(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                alert('アイディアが削除されました。');
                navigate('/mypage');
            } catch (error) {
                console.error('Error deleting idea:', error);
                setError('アイディアの削除中にエラーが発生しました。');
            }
        }
    };

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアを編集する</h2>
                    {isPurchased ? (
                        <p className="error">販売済みのため変更できません。</p>
                    ) : ('')}
                    {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">タイトル:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={idea.title}
                                onChange={handleChange}
                                disabled={isPurchased}
                            />

                            <label htmlFor="overview">概要:</label>
                            <textarea
                                id="overview"
                                name="overview"
                                value={idea.overview}
                                onChange={handleChange}
                                disabled={isPurchased}
                            />

                            <label htmlFor="content">詳細:</label>
                            <textarea
                                id="content"
                                name="content"
                                value={idea.content}
                                onChange={handleChange}
                                disabled={isPurchased}
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
                            />

                            <label htmlFor="category_id">カテゴリ:</label>
                            <select
                                id="category_id"
                                name="category_id"
                                value={idea.category_id}
                                onChange={handleChange}
                                disabled={isPurchased}
                            >
                                <option value="">カテゴリを選択</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {/* <button type="submit">更新する</button>
                            <button 
                                className="btn delete-btn" 
                                onClick={handleDelete}
                            >
                                削除する
                            </button> */}
                            {!isPurchased && (
                            <>
                                <button type="submit">更新する</button>
                                <button 
                                    className="btn delete-btn"
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    削除する
                                </button>
                            </>
                        )}
                        </form>

                    <button className="btn" onClick={() => navigate(-1)}>戻る</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaUpdate;
