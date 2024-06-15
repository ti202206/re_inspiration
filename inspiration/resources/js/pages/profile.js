// // pages/Profile.js
// import React, { useState } from 'react';
// import axios from '../axiosConfig';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [profileImage, setProfileImage] = useState(null);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleImageChange = (e) => {
//         setProfileImage(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('profile_image', profileImage);

//         try {
//             const response = await axios.post('/api/profile/image', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
//                 },
//             });
//             setMessage(response.data.message);
//             // window.location.reload();//リロードして変更を反映
//             setTimeout(() => {
//                 window.location.reload(); // リロードして変更を反映
//             }, 1000); // メッセージ表示後1秒待ってリロード
//         } catch (error) {
//             console.error('Error uploading image', error);
//             setMessage('画像のアップロードに失敗しました。');
//         }
//     };

//     const handleBackToMyPage = () => {
//         navigate('/my-page'); // マイページに戻る
//     };

//     return (
//         // <div>
//         //     <h2>プロフィール画像のアップロード</h2>
//         //     <input type="file" onChange={handleImageChange} />
//         //     <button onClick={handleUpload}>アップロード</button>
//         //     {message && <p>{message}</p>}
//         // </div>
//         <div>
//             <h2>プロフィール画像のアップロード</h2>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <button onClick={handleUpload}>アップロード</button>
//             {message && <p>{message}</p>}
//             <button onClick={handleBackToMyPage}>マイページに戻る</button> {/* マイページに戻るボタン */}
//         </div>
//     );
// };

// export default Profile;



// pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ユーザー情報を取得
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user', {
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
    }, []);

    const handleEditProfile = () => {
        navigate('/profile-edit');
    };

    const handleBackToMyPage = () => {
        navigate('/my-page'); // マイページに戻る
    };

    return (
        <div>
            <h2>プロフィール</h2>
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

                    {/* 変更: プロフィール編集ボタン */}
                    <button onClick={handleEditProfile}>プロフィールを編集</button>
                </div>
            ) : (
                <p>読み込み中...</p>
            )}
            <button onClick={handleBackToMyPage}>マイページに戻る</button> {/* マイページに戻るボタン */}
        </div>
    );
};

export default Profile;
