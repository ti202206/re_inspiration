import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfileEdit = () => {
    const [profileImage, setProfileImage] = useState(null); //プロフィール画像の状態管理
    const [currentProfileImage, setCurrentProfileImage] = useState(""); //現在のプロフィール画像のurl
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState(""); //自己紹介の状態管理
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
                setBio(response.data.bio || "");
                setCurrentProfileImage(response.data.profile_image_url);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUser();
    }, []);

    // ボタン機能
    // 画像ファイルの変更
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    // プロフィールの更新をサーバーに送信
    const handleUpload = async () => {
        const formData = new FormData();
        if (profileImage) {
            formData.append("profile_image", profileImage);
        }
        formData.append("name", name);
        formData.append("email", email);
        formData.append("bio", bio);

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
            // console.error("Error updating profile", error);
            // setMessage("プロフィールの更新に失敗しました。");
            console.error("Error updating profile", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setMessage(
                    "プロフィールの更新に失敗しました: " +
                        error.response.data.errors
                );
            } else {
                setMessage("プロフィールの更新に失敗しました。");
            }
        }
    };

    const handleBackToProfile = () => {
        navigate("/profile"); // プロフィール確認ページに戻る
    };

    const handleDeleteAccount = async () => {
        if (
            window.confirm(
                "本当にアカウントを削除しますか？この操作は元に戻せません。"
            )
        ) {
            try {
                await axios.delete("/api/profile", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                alert("アカウントが削除されました。");
                sessionStorage.removeItem("auth_token");
                navigate("/"); // topページにリダイレクト
            } catch (error) {
                console.error("Error deleting account", error);
                alert("アカウントの削除に失敗しました。");
            }
        }
    };

    return (
        <div className="profile-edit__page">
            <Header />
            <div className="profile-edit__container">
                <h2 className="profile-edit__title">プロフィールを編集</h2>
                <img
                    src={
                        profileImage
                            ? URL.createObjectURL(profileImage)
                            : currentProfileImage
                    } // プレビュー画像
                    alt="Profile"
                    className="profile-edit__image"
                />
                <div className="profile-edit__input-file-container">
                    <label
                        htmlFor="profileImage"
                        className="profile-edit__file-label"
                    >
                        画像を選択
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profileImage"
                        onChange={handleImageChange}
                        className="profile-edit__input-file"
                    />
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前を入力"
                    className="profile-edit__input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレスを入力"
                    className="profile-edit__input"
                />
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="自己紹介を入力"
                    className="profile-edit__textarea"
                />
                <button
                    onClick={handleUpload}
                    className="profile-edit__button profile-edit__button--update"
                >
                    更新
                </button>
                {message && <p className="profile-edit__message">{message}</p>}
                <button
                    onClick={handleDeleteAccount}
                    className="profile-edit__button profile-edit__button--delete"
                >
                    アカウントを削除
                </button>
                <button
                    onClick={handleBackToProfile}
                    className="profile-edit__button profile-edit__button--back"
                >
                    戻る
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileEdit;
