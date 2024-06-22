import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IdeaCard from "../components/IdeaCard";
import { useNavigate } from "react-router-dom";

function FavoritesList() {
    const [user, setUser] = useState(null); // ユーザー情報の状態管理
    const [favorites, setFavorites] = useState([]); // 気になるの状態管理
    const [categories, setCategories] = useState({}); // カテゴリ名のステート
    const [purchases, setPurchases] = useState([]); // 購入履歴の状態管理
    const navigate = useNavigate();

    // ユーザー情報を取得
    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`, // 認証トークンを設定
                },
            });
            setUser(response.data);
            // console.log("Fetched user:", response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // 気になる情報を取得
    const fetchFavorites = async () => {
        try {
            const response = await axios.get("/api/favorites", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            const sortedFavorites = response.data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            const recentFavorites = sortedFavorites.slice(0, 5);
            setFavorites(recentFavorites);
            // console.log("Fetched favorites:", recentFavorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // 購入済み情報を取得
    const fetchMyPurchases = async () => {
        try {
            const response = await axios.get("/api/mypurchases", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setPurchases(response.data);
            // console.log("Fetched purchases:", response.data);
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    };

    // カテゴリ情報を取得
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            const categoriesMap = response.data.reduce((map, category) => {
                map[category.id] = category.name;
                return map;
            }, {});
            setCategories(categoriesMap);
            // console.log("Fetched categories:", categoriesMap);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // 購入済みかどうか確認
    const isPurchased = (ideaId) => {
        return purchases.some((purchase) => purchase.idea.id === ideaId);
    };

    useEffect(() => {
        fetchUser();
        fetchFavorites();
        fetchMyPurchases();
        fetchCategories();
    }, []);

    // ボタン機能
    const handleDetailClick = (id) => {
        navigate(`/idea-detail/${id}`);
    };

    // 気になるのトグル 必要なら使う
    // const handleToggleFavorite = async (id) => {
    //     try {
    //         const response = await axios.post(
    //             "/api/favorites/toggle",
    //             { idea_id: id },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${sessionStorage.getItem(
    //                         "auth_token"
    //                     )}`,
    //                 },
    //             }
    //         );
    //         fetchFavorites(); // トグル後に気になる情報を再取得
    //     } catch (error) {
    //         console.error("気になるの解除に失敗しました", error);
    //     }
    // };

    return (
        <div>
            <Header />
            <main className="container">
                <h2>気になる一覧</h2>
                <section className="section-container">
                    {favorites.length > 0 ? (
                        favorites.map((favorite) => {
                            const { idea } = favorite;
                            return (
                                <IdeaCard
                                    key={`favorite-${idea.id}`}
                                    idea={idea}
                                    categories={categories}
                                    isPlaceholder={false} // データがある場合は false
                                    updatedAt={idea.updated_at}
                                    buttons={[
                                        {
                                            // 必要ならコメントアウトを外してボタンをつける
                                            // label: "詳細",
                                            // onClick: () => handleDetailClick(idea.id),
                                            label: isPurchased(idea.id)
                                                ? "詳細"
                                                : "概要",
                                            onClick: () =>
                                                isPurchased(idea.id)
                                                    ? handleDetailClick(idea.id)
                                                    : handleOverviewClick(
                                                          idea.id
                                                      ),
                                        },
                                        // {
                                        //     label: "気になるから削除",
                                        //     onClick: () => handleToggleFavorite(idea.id),
                                        // },
                                    ]}
                                    // handleDetailClick={handleDetailClick}
                                    // handleEditReviewClick={handleEditReviewClick}
                                />
                            );
                        })
                    ) : (
                        <IdeaCard isPlaceholder={true} /> // データがない場合は true
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

export default FavoritesList;
