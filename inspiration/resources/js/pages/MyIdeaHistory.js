import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyIdeas() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/my-ideas", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setIdeas(response.data);
            } catch (error) {
                console.error("Error fetching my ideas:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>私が投稿したアイディア</h2>
                    {ideas.length > 0 ? ideas.map((idea) => (
                        <div className="idea-card" key={idea.id}>
                            <div className="idea-card__content">
                                <div className="idea-card__title-category">
                                    <h3 className="idea-card__title">{idea.title}</h3>
                                </div>
                                <p className="idea-card__summary">{idea.summary}</p>
                                <div className="idea-card__meta">
                                    <span className="idea-card__review-count"><i className="fa-regular fa-comment-dots"></i> {idea.reviewCount}</span>
                                    <span className="idea-card__average-rating"><i className="fa-regular fa-thumbs-up"></i> {idea.averageRating}</span>
                                    <p className="idea-card__category"><i className="fa-solid fa-tags"></i> {idea.category}</p>
                                    <p className="idea-card__created_date"><i className="fa-regular fa-clock"></i> {idea.created_at}</p>
                                </div>
                                <div className="idea-card__buttons">
                                    <button className="idea-card__button">詳細</button>
                                    <button className="idea-card__button">編集</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>投稿したアイディアはありません。</p>}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default MyIdeas;
