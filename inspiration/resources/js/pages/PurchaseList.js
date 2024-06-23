import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import IdeaCard from "../components/IdeaCard";

function PurchasesList() {
    const navigate = useNavigate();
    const [purchases, setPurchases] = useState([]); // 購入履歴の状態管理
    const [categories, setCategories] = useState({}); // カテゴリ名のステート
    const [isAuthenticated, setIsAuthenticated] = useState(false); //認証状態の管理

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
            // updated_atに基づいてソート
            const sortedPurchases = response.data.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            setPurchases(sortedPurchases);
        } catch (error) {
            console.error("Error fetching purchases:", error);
            if (error.response && error.response.status === 401) {
                setIsAuthenticated(false); // 認証エラーの場合、認証状態を false に設定
                navigate("/login"); // 認証エラーの場合、ログインページへリダイレクト
            }
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
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            // 認証状態をチェック
            try {
                await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                navigate("/login"); // 認証されていない場合、ログインページへリダイレクト
            }
        };
        checkAuth();
        fetchCategories();
        fetchMyPurchases();
    }, []);

    // ボタン機能
    const handleDetailClick = (ideaId) => {
        // 詳細ボタンがクリックされたときの処理
        navigate(`/purchase-detail/${ideaId}`);
    };

    // 必要ならつける レビューを編集するボタン
    // const handleEditReviewClick = (purchaseId) => {
    //     // レビューボタンがクリックされたときの処理
    //     navigate(`/review-edit/${purchaseId}`);
    // };

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>購入一覧</h2>

                    {purchases.length > 0 ? (
                        purchases.map((purchase, index) => {
                            const { idea } = purchase;
                            return (
                                <IdeaCard
                                    key={index}
                                    idea={idea}
                                    categories={categories}
                                    updatedAt={purchase.updated_at}
                                    isPlaceholder={false}
                                    buttons={[
                                        {
                                            label: "詳細",
                                            onClick: () =>
                                                handleDetailClick(idea.id),
                                        },
                                        // 必要ならつける レビューボタン
                                        // {
                                        //     label: "レビューを編集",
                                        //     onClick: () => handleEditReviewClick(purchase.id),
                                        // },
                                    ]}
                                />
                            );
                        })
                    ) : (
                        <p>購入はまだありません。</p>
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

export default PurchasesList;
