import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams(); // URLからユーザーIDを取得

    // 指定したユーザー情報を取得
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}`, {
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
    }, [userId]);

    return (
        <div className="profile__page">
            <Header />
            <main className="profile__content">
                <h2 className="profile__title">ユーザープロフィール</h2>
                {user ? (
                    <div className="profile__details">
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
                            <p>
                                自己紹介: {user.bio || "自己紹介がありません"}
                            </p>
                        </div>
                        <button
                            className="profile__button profile__button--back"
                            onClick={() => navigate("/my-page")}
                        >
                            マイページに戻る
                        </button>
                    </div>
                ) : (
                    <p>読み込み中...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
