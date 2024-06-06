import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PurchasesList() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        axios
            .get("/api/mypurchases", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth_token"
                    )}`,
                },
            })
            .then((response) => {
                const sortedPurchases = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setPurchases(sortedPurchases);
            })
            .catch((error) =>
                console.error("Error fetching purchases:", error)
            );
    }, []);

    return (
        <div>

            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>購入一覧</h2>

                    {purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <div className="purchase-card" key={purchase.id}>
                                <div className="purchase-card__content">
                                    <div className="purchase-card__title-category">
                                        <h3 className="purchase-card__title">
                                            {purchase.idea.title}
                                        </h3>
                                    </div>
                                    <p className="purchase-card__summary">{purchase.idea.overview}</p>
                                    {/* <p className="purchase-card__summary">{purchase.review}</p> */}
                                    <div className="purchase-card__meta">
                                        <span className="purchase-card__rating">
                                            <i className="fa-regular fa-thumbs-up"></i>
                                            {purchase.rating}
                                        </span>
                                        <p className="purchase-card__created_date">
                                            <i className="fa-regular fa-clock"></i>
                                            {new Date(purchase.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="purchase-card__buttons">
                                    <button className="purchase-card__button">
                                        詳細
                                    </button>
                                    <button className="purchase-card__button">
                                        レビューを編集
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>購入はまだありません。</p>
                    )}

                </section>
            </main>
            <Footer />
        </div>
    );
}

export default PurchasesList;
