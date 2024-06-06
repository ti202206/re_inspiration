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
import { useNavigate, useParams } from 'react-router-dom';

function IdeaUpdate() {
    const [formData, setFormData] = useState({
        title: '',
        overview: '',
        content: '',
        price: ''
    });
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
                const idea = response.data.idea; // 'idea'プロパティを使用してデータを取得
                setFormData({
                    title: idea.title,
                    overview: idea.overview,
                    content: idea.content,
                    price: idea.price
                });
            } catch (error) {
                console.error('Error fetching idea:', error);
            }
        };

        fetchIdea();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            alert('アイディアの更新中にエラーが発生しました。');
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
                        /><br />
                        <label htmlFor="overview">概要:</label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                        /><br />
                        <label htmlFor="content">詳細:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        /><br />
                        <label htmlFor="price">価格:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        /><br />
                        <button type="submit">更新する</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaUpdate;
