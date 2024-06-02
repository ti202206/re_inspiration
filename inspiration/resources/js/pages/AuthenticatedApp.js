import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./MyPage";
// import FavoriteList from './FavoriteList';
import IdeaCatalog from "./IdeaCatalog";
// import IdeaSubmission from './IdeaSubmission';
// import MyIdeaHistory from './MyIdeaHistory';
// import MyReviewHistory from './MyReviewHistory';
// import PurchaseList from './PurchaseList';
import ReviewList from "./ReviewList";
// import NotFound from './NotFound';
import TopPage from "../pages/TopPage";
import Register from "./Register";
import LoginForm from "./Login";
import { login } from "../api/auth";
import axios from "axios";

// const AuthenticatedApp = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/mypage" element={<MyPage />} />
//                 <Route path="/favorites" element={<FavoriteList />} />
//                 <Route path="/ideas" element={<IdeaCatalog />} />
//                 <Route path="/idea-submission" element={<IdeaSubmission />} />
//                 <Route path="/my-ideas" element={<MyIdeaHistory />} />
//                 <Route path="/my-reviews" element={<MyReviewHistory />} />
//                 <Route path="/purchases" element={<PurchaseList />} />
//                 <Route path="/reviews" element={<ReviewList />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </Router>
//     );
// };

// const handleLogoutClick = async () => {
//     try {
//       await axios.post('/api/logout');
//       localStorage.removeItem('auth_token');
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

const AuthenticatedApp = () => {
    // const token = localStorage.getItem('auth_token'); // コメントアウト
    // useEffect(() => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
    //     axios.post("/api/login", {
    //             name: "user1",
    //             email: "test@example.com",
    //             password: "12345678",
    //         })
    //         .then((response) => {
    //             console.log(response);
    //         });
    // }, []);
    // 開発中の一時的な措置: 常にすべてのルートを表示
    return (
        <Router>
            <Routes>
                {/* すべてのルートをリストアップ */}
                <Route path="/" element={<TopPage />} />
                <Route path="/mypage" element={<MyPage />} />
                {/* <Route path="/favorites" element={<FavoriteList />} /> */}
                <Route path="/ideas" element={<IdeaCatalog />} />
                {/* <Route path="/idea-submission" element={<IdeaSubmission />} /> */}
                {/* <Route path="/my-ideas" element={<MyIdeaHistory />} /> */}
                {/* <Route path="/my-reviews" element={<MyReviewHistory />} /> */}
                {/* <Route path="/purchases" element={<PurchaseList />} /> */}
                <Route path="/reviews" element={<ReviewList />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default AuthenticatedApp;
