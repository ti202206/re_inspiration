// // import './bootstrap';
// import Alpine from "alpinejs";
// import React, { useState, useEffect } from "react";
// import { createRoot } from "react-dom/client";
// import {
//     BrowserRouter as Router,
//     Route,
//     Routes,
//     useLocation,
//     Navigate,
// } from "react-router-dom";
// import AuthenticatedApp from "./pages/AuthenticatedApp";
// import UnauthenticatedApp from "./pages/UnauthenticatedApp";
// import TopPage from "./pages/TopPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import MyPage from "./pages/MyPage";
// import axios from "./axiosConfig";

// window.Alpine = Alpine;
// Alpine.start();

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//     const location = useLocation();

//     // 認証チェックをスキップするパス
//     const authFreePaths = ["/register", "/login"];

//     useEffect(() => {
//         const checkAuth = async () => {
//             // 認証チェックをスキップするページの場合
//             if (authFreePaths.includes(location.pathname)) {
//                 setIsCheckingAuth(false);
//                 return;
//             }

//             //認証チェック
//             try {
//                 await axios.get("/sanctum/csrf-cookie");
//                 const response = await axios.get("/api/user");
//                 if (response.status === 200) {
//                     setIsAuthenticated(true);
//                 } else {
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 if (error.response && error.response.status === 401) {
//                     // 認証されていない場合は認証状態を false に設定する
//                     setIsAuthenticated(false);
//                 } else {
//                     console.error("Authentication check failed:", error);
//                 }
//             } finally {
//                 setIsCheckingAuth(false);
//             }
//         };

//         checkAuth();
//     }, [location.pathname]);

//     if (isCheckingAuth && !authFreePaths.includes(location.pathname)) {
//         return <div>Loading...</div>; // 認証チェック中のローディング表示
//     }

//     return (
//         <Routes>
//             <Route
//                 path="/"
//                 element={
//                     isAuthenticated ? <Navigate to="/my-page" /> : <TopPage />
//                 }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//                 path="/my-page"
//                 element={
//                     isAuthenticated ? <MyPage /> : <Navigate to="/login" />
//                 }
//             />
//             <Route
//                 path="/*"
//                 element={
//                     isAuthenticated ? (
//                         <AuthenticatedApp />
//                     ) : (
//                         <UnauthenticatedApp />
//                     )
//                 }
//             />
//             <Route path="*" element={<Navigate to="/" />} />{" "}
//             {/* 未定義のルートにアクセスした場合のリダイレクト */}
//         </Routes>
//     );
// };

// const RootApp = () => (
//     <Router>
//         <App />
//     </Router>
// );

// const container = document.getElementById("app");
// const root = createRoot(container);
// root.render(<RootApp />);

// import './bootstrap';
import Alpine from "alpinejs";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
    Navigate,
} from "react-router-dom";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import TopPage from "./pages/TopPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import axios from "./axiosConfig";
import Header from "./components/Header"; //＊＊＊＊＊＊変更：Headerコンポーネントのインポート＊＊＊＊＊＊

window.Alpine = Alpine;
Alpine.start();

//＊＊＊＊＊＊変更：authFreePathsの定義に / を追加＊＊＊＊＊＊
const authFreePaths = ["/", "/register", "/login"];

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); //＊＊＊＊＊＊変更：認証チェックの状態管理＊＊＊＊＊＊
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            if (authFreePaths.includes(location.pathname)) {
                setIsCheckingAuth(false);
                return;
            }

            try {
                await axios.get("/sanctum/csrf-cookie");
                const response = await axios.get("/api/user");
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsAuthenticated(false);
                } else {
                    console.error("Authentication check failed:", error);
                }
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [location.pathname]);

    if (isCheckingAuth && !authFreePaths.includes(location.pathname)) {
        return <div>Loading...</div>; // 認証チェック中のローディング表示
    }

    return (
        <>
            <Header
                authFreePaths={authFreePaths}
                isAuthenticated={isAuthenticated}
                isCheckingAuth={isCheckingAuth}
            />{" "}
            {/*＊＊＊＊＊＊変更：Headerコンポーネントの追加＊＊＊＊＊＊*/}
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/my-page" />
                        ) : (
                            <TopPage />
                        )
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/my-page"
                    element={
                        isAuthenticated ? <MyPage /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <AuthenticatedApp />
                        ) : (
                            <UnauthenticatedApp />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />{" "}
                {/* 未定義のルートにアクセスした場合のリダイレクト */}
            </Routes>
        </>
    );
};

const RootApp = () => (
    <Router>
        <App />
    </Router>
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<RootApp />);
