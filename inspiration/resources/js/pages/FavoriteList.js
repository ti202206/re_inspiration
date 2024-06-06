import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FavoritesList() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios
            .get("/api/favorites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
            })
            .then((response) => {
                const sortedFavorites = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setFavorites(sortedFavorites);
            })
            .catch((error) =>
                console.error("Error fetching favorites:", error)
            );
    }, []);

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>お気に入り一覧</h2>

                    {favorites.length > 0 ? (
                        favorites.map((favorite) => (
                            <div className="favorite-card" key={favorite.id}>
                                <div className="favorite-card__content">
                                    <div className="favorite-card__title-category">
                                        <h3 className="favorite-card__title">
                                            {favorite.idea.title}
                                        </h3>
                                    </div>
                                    <p className="favorite-card__summary">{favorite.idea.overview}</p>
                                    <div className="favorite-card__meta">
                                        <p className="favorite-card__created_date">
                                            <i className="fa-regular fa-clock"></i>
                                            {new Date(favorite.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="favorite-card__buttons">
                                    <button className="favorite-card__button">
                                        詳細
                                    </button>
                                    <button className="favorite-card__button">
                                        削除
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>お気に入りはまだありません。</p>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default FavoritesList;
