// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import IdeaCard from "../components/IdeaCard";
// import { useNavigate } from "react-router-dom";

// function IdeaCatalog() {
//     const [ideas, setIdeas] = useState([]);
//     const [categories,setCategories] = useState({}); // カテゴリーの状態管理
//     const [user, setUser] = useState(null); // ユーザー情報の状態管理
//     const [userPurchases, setUserPurchases] = useState([]); // ユーザーの購入情報の状態管理
//     const navigate = useNavigate();

//         // ユーザー情報の取得
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get("/api/user", {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`
//                     }
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//             }
//         };

//             // アイディア一覧の取得
//             const fetchIdeas = async () => {
//                 try {
//                     const response = await axios.get("/api/ideas");
//                     setIdeas(response.data);
//                 } catch (error) {
//                     console.error("Error fetching ideas:", error);
//                 }
//             };

//                     // カテゴリ情報の取得
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("/api/categories");
//                 const categoriesMap = response.data.reduce((map, category) => {
//                     map[category.id] = category.name;
//                     return map;
//                 }, {});
//                 setCategories(categoriesMap);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//             // ユーザーの購入情報の取得
//     const fetchPurchases = async () => {
//         try {
//             const response = await axios.get("/api/user/purchases", {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`
//                 }
//             });
//             console.log('Fetched purchases:', response.data);
//             setUserPurchases(response.data);
//         } catch (error) {
//             console.error("Error fetching purchases:", error);
//         }
//     };

//     useEffect(() => {
//         // axios
//             // .get("/api/ideas")
//             // .then((response) => setIdeas(response.data))
//             // .catch((error) => console.error("Error fetching ideas:", error));
//         fetchUser();
//         fetchIdeas();
//         fetchCategories();
//         fetchPurchases();
//     }, []);

//     // const handleDetailClick = (id) => {
//     //     navigate(`/idea-detail/${id}`);
//     // };
//     const handleDetailClick = (id) => {
//         // アイディアの購入状況に応じて、詳細ページまたは概要ページに遷移
//         const isPurchased = userPurchases.some(purchase => purchase.idea_id === id);
//         if (isPurchased) {
//             navigate(`/purchase-detail/${id}`);
//         } else {
//             navigate(`/idea-detail/${id}`);
//         }
//     };

//     const handleEditClick = (id) => {
//         navigate(`/idea-update/${id}`);
//     };

//     return (
//       <div>


//         {/* <div>
//            <h1>アイディア一覧</h1>
//            {ideas.map(idea => (
//             <div key={idea.id}>{idea.title}</div>
//           ))}
//         </div> */}
        

//         <Header />
//         <main className="container">
//             <section className="section-container">
//                 <h2>アイディア一覧</h2>

//                 {ideas.length > 0 ? (
//                         ideas.map((idea) => (
//                             <IdeaCard
//                                 key={idea.id}
//                                 idea={idea}
//                                 categories={categories}
//                                 isPlaceholder={false}
//                                 updatedAt={idea.updated_at}
//                                 buttons={[
//                                     {
//                                         label: userPurchases.some(purchase => purchase.idea_id === idea.id)
//                                             ? "詳細"
//                                             : "概要",
//                                         onClick: () => handleDetailClick(idea.id),
//                                     },
//                                     //ユーザーIDと一緒の場合表示
//                                     ...(user && idea.user_id === user.id
//                                     ? [
//                                         {
//                                             label: "編集",
//                                             onClick: () => handleEditClick(idea.id),
//                                         },
//                                     ]
//                                     : [])
//                                     // {
//                                     //     label: "編集",
//                                     //     onClick: () => handleEditClick(idea.id),
//                                     // },
//                                 ]}
//                             />
//                         ))
//                     ) : (
//                         <IdeaCard isPlaceholder={true} />
//                     )}
//                 {/* {ideas.map((idea) => ( //投稿はまだないを出す
//                     <div className="idea-card" key={idea.id}>
//                         <div className="idea-card__content">
//                             <div className="idea-card__title-category">
//                                 <h3 className="idea-card__title">
//                                     {idea.title}
//                                 </h3>
//                             </div>
//                             <p className="idea-card__summary">{idea.overview}</p>
//                             <div className="idea-card__meta">
//                                 <span className="idea-card__review-count">
//                                     <i className="fa-regular fa-comment-dots"></i>
//                                     {idea.reviewCount}
//                                 </span>
//                                 <span className="idea-card__average-rating">
//                                     <i className="fa-regular fa-thumbs-up"></i>
//                                     {idea.averageRating}
//                                 </span>
//                                 <p className="idea-card__category">
//                                     <i className="fa-solid fa-tags"></i>
//                                     {idea.category}
//                                 </p>
//                                 <p className="idea-card__created_date">
//                                     <i className="fa-regular fa-clock"></i>
//                                     {idea.created_date}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="idea-card__buttons">
//                             <button className="idea-card__button">
//                                 詳細
//                             </button>
//                             <button className="idea-card__button">
//                                 編集
//                             </button>
//                         </div>
//                     </div>
//                 ))} */}


//             </section>
//         </main>
//         <Footer />
//     </div>
//     );
// }

// export default IdeaCatalog;


// ファイル名: IdeaCatalog.js

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

            //＊＊＊＊＊＊変更：レスポンスが配列かどうか確認し、配列でない場合エラーを表示＊＊＊＊＊＊
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

                    {ideas.length > 0 ? (
                        ideas.map((idea) => (
                            <IdeaCard
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
                                    ...(user && idea.user_id === user.id
                                        ? [
                                            {
                                                label: "編集",
                                                onClick: () => handleEditClick(idea.id),
                                            },
                                        ]
                                        : [])
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
