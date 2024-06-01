import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import Register from "./Register";
import TopPage from "./TopPage";
import NotFound from "./NotFound";

const UnauthenticatedApp = () => (
    <Router>
        <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </Router>
);

export default UnauthenticatedApp;