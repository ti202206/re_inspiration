// pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

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
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleBackToMyPage = () => {
        navigate('/my-page'); // マイページに戻る
    };

    return (
        <div>
            <h2>ユーザープロフィール</h2>
            {user ? (
                <div>
                    {/* プロフィール情報の表示 */}
                    <img 
                        src={user.profile_image_url || '/images/default-user-icon.png'} 
                        alt="User Icon" 
                        className="profile__image"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <p>名前: {user.name}</p>
                    {/* <p>メール: {user.email}</p> */}
                    <p>自己紹介: {user.bio || "自己紹介がありません"}</p>
                </div>
            ) : (
                <p>読み込み中...</p>
            )}
            <button onClick={handleBackToMyPage}>マイページに戻る</button> {/* マイページに戻るボタン */}
        </div>
    );
};

export default UserProfile;
