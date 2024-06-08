// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// function EditIdea() {
//     const [ideas, setIdeas] = useState([]);
//     const [selectedIdea, setSelectedIdea] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         overview: '',
//         content: '',
//         price: ''
//     });


//     // データを取得して，フォームに表示させる


//     useEffect(() => {
//         const fetchMyIdeas = async () => {
//             try {
//                 const response = await axios.get('/api/my-ideas', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                     }
//                 });
//                 const unpurchasedIdeas = response.data.filter(idea => !idea.purchased);
//                 setIdeas(unpurchasedIdeas);
//             } catch (error) {
//                 console.error('Error fetching ideas:', error);
//             }
//         };

//         fetchMyIdeas();
//     }, []);

//     const handleSelectChange = (e) => {
//         const idea = ideas.find(idea => idea.id === parseInt(e.target.value));
//         setSelectedIdea(idea);
//         setFormData({
//             title: idea.title,
//             overview: idea.overview,
//             content: idea.content,
//             price: idea.price
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`/api/ideas/${selectedIdea.id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                 }
//             });
//             console.log('Idea Updated: ', response.data);
//             alert('アイディアが更新されました。');
//         } catch (error) {
//             console.error('Error updating idea:', error);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <div className="submission-form">
//                     <h2>アイデアを編集する</h2>
//                     <select onChange={handleSelectChange}>
//                         <option value="">アイディアを選択してください</option>
//                         {ideas.map(idea => (
//                             <option key={idea.id} value={idea.id}>{idea.title}</option>
//                         ))}
//                     </select>
//                     {selectedIdea && (
//                         <form onSubmit={handleSubmit}>
//                             <label htmlFor="title">タイトル:</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                             /><br />
//                             <label htmlFor="overview">概要:</label>
//                             <textarea
//                                 id="overview"
//                                 name="overview"
//                                 value={formData.overview}
//                                 onChange={handleChange}
//                             /><br />
//                             <label htmlFor="content">詳細:</label>
//                             <textarea
//                                 id="content"
//                                 name="content"
//                                 value={formData.content}
//                                 onChange={handleChange}
//                             /><br />
//                             <label htmlFor="price">価格:</label>
//                             <input
//                                 type="text"
//                                 id="price"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                             /><br />
//                             <button type="submit">更新する</button>
//                         </form>
//                     )}
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default EditIdea;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {validateIdeaForm} from '../utils/validation';
import { useNavigate, useParams } from 'react-router-dom';

function IdeaUpdate() {
    const initialFormData = {
        title: '',
        overview: '',
        content: '',
        price: '',
        category_id: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams(); // URLパラメータからIDを取得

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                const idea = response.data.idea;
                setFormData({
                    title: idea.title || '',
                    overview: idea.overview || '',
                    content: idea.content || '',
                    price: idea.price || '',
                    category_id: idea.category_id || ''
                });
            } catch (error) {
                console.error('Error fetching idea:', error);
                alert('アイディアの取得に失敗しました。');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('カテゴリの取得に失敗しました。');
            }
        };

        fetchIdea();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ユーティリティ関数でバリデーション
        const newErrors = validateIdeaForm(formData);

        // バリデーションエラーメッセージのセット
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return; // バリデーションエラーがある場合は送信しない
        }

        try {
            const response = await axios.put(`/api/ideas/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                }
            });
            console.log('Idea Updated: ', response.data);
            alert('アイディアが更新されました。');
            navigate('/mypage');
        } catch (error) {
            console.error('Error updating idea:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('アイディアの更新中にエラーが発生しました。');
            }
        }
    };

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアを編集する</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">タイトル:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="error">{errors.title}</p>}

                        <label htmlFor="overview">概要:</label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                        />
                        {errors.overview && <p className="error">{errors.overview}</p>}

                        <label htmlFor="content">詳細:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                        {errors.content && <p className="error">{errors.content}</p>}

                        <label htmlFor="price">価格 (円):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="1"
                            step="1"
                        />
                        {errors.price && <p className="error">{errors.price}</p>}

                        <label htmlFor="category_id">カテゴリ:</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                        >
                            <option value="">カテゴリを選択</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="error">{errors.category_id}</p>}

                        <button type="submit">更新する</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaUpdate;
