// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import IdeaCard from "../components/IdeaCard";
// import { useNavigate } from "react-router-dom";

// function MyIdeas() {
//     const [ideas, setIdeas] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("/api/my-ideas", {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem(
//                             "auth_token"
//                         )}`,
//                     },
//                 });
//                 setIdeas(response.data);
//             } catch (error) {
//                 console.error("Error fetching my ideas:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleEditClick = (id) => {
//         navigate(`/idea-update/${id}`); // IDをURLに渡してリダイレクト
//     };

//     return (
//         <div>
//             <Header />
//             <main className="container">
//                 <section className="section-container">
//                     <h2>私が投稿したアイディア</h2>
//                     {ideas.length > 0 ? (
//                         ideas.map((idea) => (
//                             <div className="idea-card" key={idea.id}>
//                                 <div className="idea-card__content">
//                                     <div className="idea-card__title-category">
//                                         <h3 className="idea-card__title">
//                                             {idea.title}
//                                         </h3>
//                                     </div>
//                                     <p className="idea-card__summary">
//                                         {idea.overview}
//                                     </p>
//                                     <div className="idea-card__meta">
//                                         <span className="idea-card__review-count">
//                                             <i className="fa-regular fa-comment-dots"></i>{" "}
//                                             {idea.reviewCount}
//                                         </span>
//                                         <span className="idea-card__average-rating">
//                                             <i className="fa-regular fa-thumbs-up"></i>{" "}
//                                             {idea.averageRating}
//                                         </span>
//                                         <p className="idea-card__category">
//                                             <i className="fa-solid fa-tags"></i>{" "}
//                                             {idea.category}
//                                         </p>
//                                         <p className="idea-card__created_date">
//                                             <i className="fa-regular fa-clock"></i>{" "}
//                                             {idea.created_at}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="idea-card__buttons">
//                                     {/* <button className="idea-card__button">
//                                         詳細
//                                     </button> */}
//                                     <button
//                                         className="idea-card__button"
//                                         onClick={() => handleEditClick(idea.id)}
//                                     >
//                                         編集
//                                     </button>{" "}
//                                     {/* 編集ボタン */}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>投稿したアイディアはありません。</p>
//                     )}
//                 </section>
//                 <button
//                     className="idea-card__button"
//                     onClick={() => navigate(-1)}
//                 >
//                     戻る
//                 </button>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default MyIdeas;


// src/components/MyIdeas.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IdeaCard from "../components/IdeaCard";
import { useNavigate } from "react-router-dom";

function MyIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [categories, setCategories] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // アイディア情報の取得
    const fetchMyIdeas = async () => {
        try {
            const response = await axios.get("/api/my-ideas", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
                },
            });
            setIdeas(response.data);
        } catch (error) {
            console.error("Error fetching my ideas:", error);
            setError('私のアイディアの取得に失敗しました。');
        }
    };

    // カテゴリー情報の取得
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            const categoriesMap = response.data.reduce((map, category) => {
                map[category.id] = category.name;
                return map;
            }, {});
            setCategories(categoriesMap);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError('カテゴリーデータの取得に失敗しました。');
        }
    };

    useEffect(() => {
        fetchMyIdeas();
        fetchCategories();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/idea-update/${id}`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>私が投稿したアイディア</h2>
                    {ideas.length > 0 ? (
                        ideas.map((idea) => (
                            <IdeaCard
                                key={idea.id}
                                idea={idea}
                                categories={categories}
                                updatedAt={idea.updated_at}
                                price={idea.price}
                                buttons={[
                                    {
                                        label: "編集",
                                        onClick: () => handleEditClick(idea.id),
                                    }
                                ]}
                            />
                        ))
                    ) : (
                        <IdeaCard isPlaceholder={true} />
                    )}
                </section>
                {/*＊＊＊＊＊＊変更：戻るボタンの追加＊＊＊＊＊＊*/}
                <button
                    className="idea-card__button"
                    onClick={() => navigate(-1)}
                >
                    戻る
                </button>
                {/*＊＊＊＊＊＊変更終了＊＊＊＊＊＊*/}
            </main>
            <Footer />
        </div>
    );
}

export default MyIdeas;
