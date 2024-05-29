import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Ideas() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        axios
            .get("/api/ideas")
            .then((response) => setIdeas(response.data))
            .catch((error) => console.error("Error fetching ideas:", error));
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

                {ideas.map((idea) => (
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
                            <div className="idea-card__buttons">
                                <button className="idea-card__button">
                                    詳細
                                </button>
                                <button className="idea-card__button">
                                    編集
                                </button>
                            </div>
                        </div>
                        <Footer />
                    </div>
                ))}
            </section>
        </main>

    </div>
    );
}

export default Ideas;
