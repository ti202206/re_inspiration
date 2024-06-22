import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import Register from "./Register";
import TopPage from "./TopPage";
import NotFound from "./NotFound";

// 認証不要なルート
const UnauthenticatedApp = () => (

        <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/not" element={<NotFound />} />
        </Routes>
);

export default UnauthenticatedApp;