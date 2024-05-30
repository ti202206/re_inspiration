import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function IdeaSubmission() {
    // 初期フォームデータの状態
    const initialFormData = {
        title: '',
        overview: '',
        content: '',
        price: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ideas', formData);
            console.log('Idea Submitted: ', response.data);
            // フォームの内容をクリアする
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error submitting idea:', error);
        }
    };

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアを投稿する</h2>
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
                        <button type="submit">投稿する</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaSubmission;



// styles

// .submission-form {
//   max-width: 600px;
//   margin: 20px auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;

//   label {
//       display: block;
//       margin: 10px 0;
//   }

//   input[type="text"],
//   textarea {
//       width: 100%;
//       padding: 8px;
//       border: 1px solid #ccc;
//       border-radius: 4px;
//   }

//   button {
//       background-color: #007bff;
//       color: white;
//       padding: 10px 15px;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;
//       margin-top: 10px;

//       &:hover {
//           background-color: #0056b3;
//       }
//   }
// }
