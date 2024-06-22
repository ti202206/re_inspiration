import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "./MyPage";
import FavoriteList from "./FavoriteList";
import IdeaCatalog from "./IdeaCatalog";
import IdeaSubmission from "./IdeaSubmission";
import MyIdeaHistory from "./MyIdeaHistory";
import MyReviewHistory from "./MyReviewHistory";
import PurchaseList from "./PurchaseList";
import ReviewList from "./ReviewList";
import IdeaUpdate from "./IdeaUpdate";
import IdeaDetail from "./IdeaDetail";
import PurchaseDetail from "./PurchaseDetail";
import ReviewSubmission from "./ReviewSubmission";
import ReviewUpdate from "./ReviewUpdate";
import Profile from "./profile";
import ProfileEdit from "./ProfileEdit";
import UserProfile from "./UserProfile";

// 認証が必要なルート
const AuthenticatedApp = () => {
    return (
        <Routes>
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/favorites" element={<FavoriteList />} />
            <Route path="/ideas" element={<IdeaCatalog />} />
            <Route path="/idea-submission" element={<IdeaSubmission />} />
            <Route path="/my-ideas" element={<MyIdeaHistory />} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/my-reviews" element={<MyReviewHistory />} />
            <Route path="/reviews/:id" element={<ReviewSubmission />} />
            <Route path="/review-update/:id" element={<ReviewUpdate />} />
            <Route path="/idea-update/:id" element={<IdeaUpdate />} />
            <Route path="/idea-detail/:id" element={<IdeaDetail />} />
            <Route path="/purchase-detail/:id" element={<PurchaseDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
    );
};

export default AuthenticatedApp;
