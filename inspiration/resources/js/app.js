import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from "../js/pages/TopPage";
import MyPage from '../js/pages/MyPage';
import FavoriteList from '../js/pages/FavoriteList';
import IdeaCatalog from '../js/pages/IdeaCatalog';
import IdeaSubmission from '../js/pages/IdeaSubmission';
import MyIdeaHistory from '../js/pages/MyIdeaHistory';
import MyReviewHistory from '../js/pages/MyReviewHistory';
import PurchaseList from '../js/pages/PurchaseList';
import ReviewList from '../js/pages/ReviewList';
import NotFound from '../js/pages/NotFound';


// const App = () => {
//     const token = localStorage.getItem('auth_token');

//     return token ? <AuthenticatedApp /> : <UnauthenticatedApp />;
// };

const App = () => {
    // const token = localStorage.getItem('auth_token');

    // 開発中の一時的な措置: 常にAuthenticatedAppを表示
    // return <AuthenticatedApp />;
    // 本来は以下のように認証状態をチェック
    // return token? <AuthenticatedApp /> : <UnauthenticatedApp />;

    // return <h1>Laravel　！</h1>;

    return(
        <Router>
            <Routes>
                {/* すべてのルートをリストアップ */}
                <Route path="/" element={<TopPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/favorites" element={<FavoriteList />} />
                <Route path="/ideas" element={<IdeaCatalog />} />
                <Route path="/idea-submission" element={<IdeaSubmission />} />
                <Route path="/my-ideas" element={<MyIdeaHistory />} />
                <Route path="/my-reviews" element={<MyReviewHistory />} />
                <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
