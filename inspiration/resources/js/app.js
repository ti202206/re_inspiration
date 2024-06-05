// import './bootstrap';
// import Alpine from 'alpinejs';
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// // import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AuthenticatedApp from './pages/AuthenticatedApp';
// import UnauthenticatedApp from './pages/UnauthenticatedApp';
// import axios from 'axios';

// window.Alpine = Alpine;
// Alpine.start();

// const App = () => {
//     const isAuthenticated = !!localStorage.getItem('auth_token');

//     if (isAuthenticated) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
//     }

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/*" element={isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />} />
//             </Routes>
//         </Router>
//     );
// };

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);


// import './bootstrap';
// import Alpine from 'alpinejs';
// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AuthenticatedApp from './pages/AuthenticatedApp';
// import UnauthenticatedApp from './pages/UnauthenticatedApp';
// import TopPage from './pages/TopPage';
// import MyPage from './pages/MyPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import axios from './axiosConfig';

// window.Alpine = Alpine;
// Alpine.start();

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//     // useEffect(() => {
//     //     const checkAuth = async () => {
//     //         try {
//     //             const token = localStorage.getItem('auth_token');
//     //             if (token) {
//     //                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     //                 await axios.get('/api/user');
//     //                 setIsAuthenticated(true);
//     //             } else {
//     //                 setIsAuthenticated(false);
//     //             }
//     //         } catch (error) {
//     //             setIsAuthenticated(false);
//     //         } finally {
//     //             setIsCheckingAuth(false);
//     //         }
//     //     };

//     //     checkAuth();
//     // }, []);

//     // useEffect(() => {
//     //     const checkAuth = async () => {
//     //         try {
//     //             await axios.get('/api/user');
//     //             setIsAuthenticated(true);
//     //         } catch (error) {
//     //             console.error('Authentication check failed:', error);
//     //             setIsAuthenticated(false);
//     //         } finally {
//     //             setIsCheckingAuth(false);
//     //         }
//     //     };

//     //     checkAuth();
//     // }, []);



//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 await axios.get('/sanctum/csrf-cookie');
//                 const response = await axios.get('/api/user');
//                 if (response.status === 200) {
//                     setIsAuthenticated(true);
//                 } else {
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 setIsAuthenticated(false);
//             } finally {
//                 setIsCheckingAuth(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     if (isCheckingAuth) {
//         return <div>Loading...</div>; // 認証チェック中のローディング表示
//     }

//     return (
//         <Router>
//             <Routes>
//                 {/* <Route path="/" element={<TopPage />} /> */}
//                 <Route path="/" element={isAuthenticated ? <MyPage /> : <TopPage />} />
//                 <Route path="/*" element={isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />} />
//             </Routes>
//         </Router>
//     );
// };

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);




// import './bootstrap';
// import Alpine from 'alpinejs';
// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import AuthenticatedApp from './pages/AuthenticatedApp';
// import UnauthenticatedApp from './pages/UnauthenticatedApp';
// import TopPage from './pages/TopPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import MyPage from './pages/MyPage'; // 必要に応じて追加
// import axios from './axiosConfig';

// window.Alpine = Alpine;
// Alpine.start();

// const App = () => {
//     return (
//         <Router>
//             <AppWithRouter />
//         </Router>
//     );
// };

// const AppWithRouter = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//     const location = useLocation();

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 // 新規登録画面やログイン画面では認証チェックをスキップする
//                 if (location.pathname === '/register' || location.pathname === '/login') {
//                     setIsCheckingAuth(false);
//                     return;
//                 }

//                 await axios.get('/sanctum/csrf-cookie');
//                 const response = await axios.get('/api/user');
//                 if (response.status === 200) {
//                     setIsAuthenticated(true);
//                 } else {
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 setIsAuthenticated(false);
//             } finally {
//                 setIsCheckingAuth(false);
//             }
//         };

//         checkAuth();
//     }, [location.pathname]);

//     if (isCheckingAuth) {
//         return <div>Loading...</div>; // 認証チェック中のローディング表示
//     }

//     return (
//         <Routes>
//             <Route path="/" element={isAuthenticated ? <MyPage /> : <TopPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/*" element={isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />} />
//         </Routes>
//     );
// };

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);




import './bootstrap';
import Alpine from 'alpinejs';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';
import TopPage from './pages/TopPage';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import axios from './axiosConfig';

window.Alpine = Alpine;
Alpine.start();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // 新規登録画面やログイン画面では認証チェックをスキップする
                if (location.pathname === '/register' || location.pathname === '/login') {
                    setIsCheckingAuth(false);
                    return;
                }

                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.get('/api/user');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // 認証されていない場合は認証状態を false に設定する
                    setIsAuthenticated(false);
                } else {
                    console.error('Authentication check failed:', error);
                }
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [location.pathname]);

    if (isCheckingAuth) {
        return <div>Loading...</div>; // 認証チェック中のローディング表示
    }

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <MyPage /> : <TopPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* 未定義のルートにアクセスした場合のリダイレクト */}
        </Routes>
    );
};

const RootApp = () => (
    <Router>
        <App />
    </Router>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<RootApp />);
