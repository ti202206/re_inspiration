import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IdeaCard from "../components/IdeaCard";

function IdeaCatalog() {
    const [ideas, setIdeas] = useState([]); //アイディアの状態管理
    const [categories, setCategories] =useState({}); //カテゴリーの状態管理

        // アイディア一覧の取得
        const fetchIdeas = async () => {
            try {
                const response = await axios.get("/api/ideas");
                setIdeas(response.data);
            } catch (error) {
                console.error("Error fetching ideas:", error);
            }
        };
    
        // カテゴリ情報の取得
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
            }
        };

    useEffect(() => {
        fetchIdeas();
        fetchCategories();
        // axios
        //     .get("/api/ideas")
        //     .then((response) => setIdeas(response.data))
        //     .catch((error) => console.error("Error fetching ideas:", error));
    }, []);

    return (
      <div>


        {/* <div>
           <h1>アイディア一覧</h1>
           {ideas.map(idea => (
            <div key={idea.id}>{idea.title}</div>
          ))}
        </div> */}
        

        <Header />
        <main className="container">
            <section className="section-container">
                <h2>アイディア一覧</h2>

                {ideas.length > 0 ? (
                        ideas.map((idea) => (
                            <IdeaCard
                                key={idea.id}
                                idea={idea}
                                categories={categories}
                                isPlaceholder={false}
                                updatedAt={idea.updated_at}
                                user={idea.user}
                                buttons={[
                                    {
                                        label: "詳細",
                                        onClick: () => window.location.href = `/idea-detail/${idea.id}`,
                                    },
                                    {
                                        label: "編集",
                                        onClick: () => window.location.href = `/idea-edit/${idea.id}`,
                                    },
                                ]}
                            />
                        ))
                    ) : (
                        <IdeaCard isPlaceholder={true} /> //＊＊＊＊＊＊変更：データがない場合のプレースホルダー表示＊＊＊＊＊＊
                    )}

                {/* {ideas.map((idea) => ( //投稿はまだないを出す
                    <div className="idea-card" key={idea.id}>
                        <div className="idea-card__content">
                            <div className="idea-card__title-category">
                                <h3 className="idea-card__title">
                                    {idea.title}
                                </h3>
                            </div>
                            <p className="idea-card__summary">{idea.overview}</p>
                            <div className="idea-card__meta">
                                <span className="idea-card__review-count">
                                    <i className="fa-regular fa-comment-dots"></i>
                                    {idea.reviewCount}
                                </span>
                                <span className="idea-card__average-rating">
                                    <i className="fa-regular fa-thumbs-up"></i>
                                    {idea.averageRating}
                                </span>
                                <p className="idea-card__category">
                                    <i className="fa-solid fa-tags"></i>
                                    {idea.category}
                                </p>
                                <p className="idea-card__created_date">
                                    <i className="fa-regular fa-clock"></i>
                                    {idea.created_date}
                                </p>
                            </div>
                        </div>
                        <div className="idea-card__buttons">
                            <button className="idea-card__button">
                                詳細
                            </button>
                            <button className="idea-card__button">
                                編集
                            </button>
                        </div>
                    </div>
                ))} */}

            </section>
        </main>
        <Footer />
    </div>
    );
}

export default IdeaCatalog;
