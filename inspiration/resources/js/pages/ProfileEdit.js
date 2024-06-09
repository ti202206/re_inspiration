// pages/ProfileEdit.js
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [currentProfileImage, setCurrentProfileImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // ユーザー情報を取得
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                setName(response.data.name);
                setEmail(response.data.email);
                setCurrentProfileImage(response.data.profile_image_url);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUser();
    }, []);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        if (profileImage) {
            formData.append("profile_image", profileImage);
        }
        formData.append("name", name);
        formData.append("email", email);

        try {
            const response = await axios.post("/api/profile/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "auth_token"
                    )}`,
                },
            });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate("/profile"); // プロフィールページにリダイレクト
            }, 1000); // メッセージ表示後1秒待ってリダイレクト
        } catch (error) {
            console.error("Error updating profile", error);
            setMessage("プロフィールの更新に失敗しました。");
        }
    };

    const handleBackToProfile = () => {
        navigate("/profile"); // プロフィール確認ページに戻る
    };

    return (
        <div>
            <h2>プロフィールを編集</h2>
            <img 
                src={profileImage ? URL.createObjectURL(profileImage) : currentProfileImage} // プレビュー画像
                alt="Profile"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名前を入力"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレスを入力"
            />
            <button onClick={handleUpload}>更新</button>
            {message && <p>{message}</p>}
            <button onClick={handleBackToProfile}>戻る</button>{" "}
            {/* プロフィール確認ページに戻るボタン */}
        </div>
    );
};

export default ProfileEdit;
