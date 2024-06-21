
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IdeaCard from "../components/IdeaCard";
import { useNavigate } from "react-router-dom";

function IdeaCatalog() {
    const [ideas, setIdeas] = useState([]);
    const [categories, setCategories] = useState({}); // カテゴリーの状態管理
    const [user, setUser] = useState(null); // ユーザー情報の状態管理
    const [userPurchases, setUserPurchases] = useState([]); // 購入情報を空の配列で初期化
    const [filteredIdeas, setFilteredIdeas] = useState([]); // フィルタリングされたアイディアの状態
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPrice, setFilterPrice] = useState('');
    const [filterStartDate, setFilterStartDate] = useState(''); // 開始日
    const [filterEndDate, setFilterEndDate] = useState(''); // 終了日
    const navigate = useNavigate();

    // ユーザー情報の取得
    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // アイディア一覧の取得
    const fetchIdeas = async () => {
        try {
            const response = await axios.get("/api/ideas");
            setIdeas(response.data);
            filterIdeas(response.data);
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

    // ユーザーの購入情報の取得
    const fetchPurchases = async () => {
        try {
            const response = await axios.get("/api/mypurchases", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`
                }
            });
            console.log('Fetched purchases:', response); // デバッグ用

            // レスポンスが配列かどうか確認し、配列でない場合エラーを表示
            if (response.status === 200 && Array.isArray(response.data)) {
                setUserPurchases(response.data); // 購入情報を設定
            } else {
                console.error("Error: Purchases data is not an array or not a valid response:", response.data);
            }
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchIdeas();
        fetchCategories();
        fetchPurchases();
    }, []);

    useEffect(() => {
        filterIdeas(ideas);
    }, [filterCategory, filterPrice, filterStartDate, filterEndDate, ideas]);

    // フィルタリングロジック
    const filterIdeas = () => {
        let filtered = ideas;

        if (filterCategory) {
            filtered = filtered.filter(idea => idea.category_id === parseInt(filterCategory));
        }

        if (filterPrice) {
            filtered = filtered.filter(idea => idea.price <= parseFloat(filterPrice));
        }

        if (filterStartDate) {
            const startDate = new Date(filterStartDate);
            filtered = filtered.filter(idea => new Date(idea.created_at) >= startDate);
        }

        if (filterEndDate) {
            const endDate = new Date(new Date(filterEndDate).setDate(new Date(filterEndDate).getDate() + 1));
            filtered = filtered.filter(idea => new Date(idea.created_at) < endDate);
        }

        setFilteredIdeas(filtered);
    };

    const handleDetailClick = (id) => {
        const isPurchased = userPurchases.some(purchase => purchase.idea_id === id);
        if (isPurchased) {
            navigate(`/purchase-detail/${id}`);
        } else {
            navigate(`/idea-detail/${id}`);
        }
    };

    const handleEditClick = (id) => {
        navigate(`/idea-update/${id}`);
    };

    return (
        <div>
            <Header />
            <main className="container">
                <section className="section-container">
                    <h2>アイディア一覧</h2>

                    <div className="filters">
                        <div className="filter-item">
                            <label htmlFor="filterCategory">カテゴリ:</label>
                            <select
                                id="filterCategory"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">すべて</option>
                                {Object.entries(categories).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="filterPrice">価格 (上限):</label>
                            <input
                                type="number"
                                id="filterPrice"
                                value={filterPrice}
                                onChange={(e) => setFilterPrice(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className="filter-item">
                            <label htmlFor="filterStartDate">開始日:</label>
                            <input
                                type="date"
                                id="filterStartDate"
                                value={filterStartDate}
                                onChange={(e) => setFilterStartDate(e.target.value)}
                            />
                        </div>
                        <div className="filter-item">
                            <label htmlFor="filterEndDate">終了日:</label>
                            <input
                                type="date"
                                id="filterEndDate"
                                value={filterEndDate}
                                onChange={(e) => setFilterEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredIdeas.length > 0 ? (
                        filteredIdeas.map((idea) => (
                            <IdeaCard
                                className="idea-card__max-width"
                                key={idea.id}
                                idea={idea}
                                categories={categories}
                                isPlaceholder={false}
                                updatedAt={idea.updated_at}
                                buttons={[
                                    {
                                        label: userPurchases.some(purchase => purchase.idea_id === idea.id)
                                            ? "詳細"
                                            : "概要",
                                        onClick: () => handleDetailClick(idea.id),
                                    },
                                    // ...(user && idea.user_id === user.id
                                    //     ? [
                                    //         {
                                    //             label: "編集",
                                    //             onClick: () => handleEditClick(idea.id),
                                    //         },
                                    //     ]
                                    //     : [])
                                ]}
                            />
                        ))
                    ) : (
                        <IdeaCard isPlaceholder={true} />
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default IdeaCatalog;
