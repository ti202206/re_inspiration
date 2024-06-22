// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     // ユーザー情報を取得
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get("/api/user", {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem(
//                             "auth_token"
//                         )}`,
//                     },
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Error fetching user data", error);
//             }
//         };

//         fetchUser();
//     }, []);

//     const handleEditProfile = () => {
//         navigate("/profile-edit");
//     };

//     const handleBackToMyPage = () => {
//         navigate("/my-page");
//     };

//     return (
//         <div>
//             <h2>プロフィール</h2>
//             {user ? (
//                 <div>
//                     <img
//                         src={
//                             user.profile_image_url ||
//                             "/images/default-user-icon.png"
//                         }
//                         alt="User Icon"
//                         className="profile__image"
//                         style={{ width: "100px", height: "100px" }}
//                     />
//                     <p>名前: {user.name}</p>

//                     <p>自己紹介: {user.bio || "自己紹介がありません"}</p>

//                     <button onClick={handleEditProfile}>
//                         プロフィールを編集
//                     </button>
//                 </div>
//             ) : (
//                 <p>読み込み中...</p>
//             )}
//             <button onClick={handleBackToMyPage}>マイページに戻る</button>{" "}
//         </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ユーザー情報を取得
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUser();
    }, []);

    const handleEditProfile = () => {
        navigate("/profile-edit");
    };

    const handleBackToMyPage = () => {
        navigate("/my-page"); // マイページに戻る
    };

    return (
        <div className="profile__page">
            <Header />
            <h2 className="profile__title">プロフィール</h2>
            {user ? (
                <div className="profile__content">
                    <img
                        src={
                            user.profile_image_url ||
                            "/images/default-user-icon.png"
                        }
                        alt="User Icon"
                        className="profile__image"
                    />
                    <div className="profile__info">
                        <p>名前: {user.name}</p>
                        {/* <p>メール: {user.email}</p> */}
                        <p>自己紹介: {user.bio || "自己紹介がありません"}</p>
                    </div>
                    <div>
                        <button
                            className="profile__button profile__button--edit"
                            onClick={handleEditProfile}
                        >
                            プロフィールを編集
                        </button>
                        <button
                            className="profile__button profile__button--back"
                            onClick={handleBackToMyPage}
                        >
                            マイページに戻る
                        </button>
                    </div>
                </div>
            ) : (
                <p>読み込み中...</p>
            )}
            <Footer />
        </div>
    );
};

export default Profile;
