import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import Register from "./Register";
import TopPage from "./TopPage";
import NotFound from "./NotFound";
import MyPage from "./MyPage"; //ページ確認用
import IdeaCatalog from "./IdeaCatalog"; //ページ確認用
import PurchaseList from "./PurchaseList" //ページ確認用
import FavoriteList from "./FavoriteList"; //ページ確認用
import IdeaSubmission from "./IdeaSubmission"; //ページ確認用
import IdeaUpdate from "./IdeaUpdate"; //ページ確認用

const UnauthenticatedApp = () => (
    // <Router>
        <Routes>
            {/* <Route path="/" element={<TopPage />} /> */}
            {/* <Route path="/login" element={<LoginForm />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
            {/* <Route path="/mypage" element={<MyPage />} /> */}
            <Route path="/purchases" element={<PurchaseList />} /> {/* ページ確認用 */}
            <Route path="/favorites" element={<FavoriteList />} /> {/* ページ確認用 */}
            {/* <Route path="/ideas" element={<IdeaCatalog />} /> ページ確認用 */}
            <Route path="/idea-submission" element={<IdeaSubmission />} /> {/* ページ確認用 */}
            {/* <Route path="/idea-update" element={<IdeaUpdate />} /> ページ確認用 */}
        </Routes>
    // </Router>
);

export default UnauthenticatedApp;