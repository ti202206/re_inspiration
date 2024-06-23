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
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setIdeas(response.data);
        } catch (error) {
            console.error("Error fetching my ideas:", error);
            setError("私のアイディアの取得に失敗しました。");
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
            setError("カテゴリーデータの取得に失敗しました。");
        }
    };

    useEffect(() => {
        fetchMyIdeas();
        fetchCategories();
    }, []);

    // ボタン機能
    const handleEditClick = (id) => {
        navigate(`/idea-update/${id}`);
    };

    // エラー時の表示
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
                                    },
                                ]}
                            />
                        ))
                    ) : (
                        <IdeaCard isPlaceholder={true} />
                    )}
                </section>
                <button
                    className="idea-card__button"
                    onClick={() => navigate(-1)}
                >
                    戻る
                </button>
            </main>
            <Footer />
        </div>
    );
}

export default MyIdeas;
