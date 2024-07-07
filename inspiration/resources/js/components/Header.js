import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 追加
    const navigate = useNavigate();
    const location = useLocation();

    // 認証チェック
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const response = await axios.get("/api/user", {
    //                 headers: {
    //                     Authorization: `Bearer ${sessionStorage.getItem(
    //                         "auth_token"
    //                     )}`,
    //                 },
    //             });
    //             setUser(response.data);
    //             setIsAuthenticated(true);
    //         } catch (error) {
    //             setIsAuthenticated(false);
    //         }
    //     };

    //     checkAuth();
    // }, []);
    useEffect(() => {
        const checkAuth = async () => {
            if (authFreePaths.includes(location.pathname)) {
                setIsCheckingAuth(false);
                return;
            }

            try {
                await axios.get("/sanctum/csrf-cookie");
                const response = await axios.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                });
                if (response.status === 200) {
                    setUser(response.data);
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

    // ボタン押下時の処理
    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = async () => {
        try {
            await axios.post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                }
            );
            sessionStorage.removeItem("auth_token");
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleTitleClick = () => {
        if (isAuthenticated) {
            navigate("/my-page");
            window.scrollTo(0, 0);
        } else {
            navigate("/");
            window.scrollTo(0, 0);
        }
    };

    const handleIdeaSubmissionClick = () => {
        navigate("/idea-submission");
    };

    return (
        <header className="header">
            <h1 className="header__title" onClick={handleTitleClick}>
                Inspiration
            </h1>
            <nav className="header__nav">
                <ul className="header__menu">
                    {isAuthenticated ? (
                        <>
                            <li className="header__menu--item">
                                <a href="/ideas">アイディア一覧</a>
                            </li>
                            <li className="header__menu--item">
                                <a href="/reviews">レビュー一覧</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="header__menu--item">
                                <a href="#concept">コンセプト</a>
                            </li>
                            <li className="header__menu--item">
                                <a href="#feature">特徴</a>
                            </li>
                            <li className="header__menu--item">
                                <a href="#column">コラム</a>
                            </li>
                        </>
                    )}
                </ul>

                <div className="header__center-button">
                    {isAuthenticated &&
                        location.pathname !== "/idea-submission" && (
                            <button
                                className="header__button header__buttons--submit"
                                onClick={handleIdeaSubmissionClick}
                            >
                                アイディアを投稿する
                            </button>
                        )}
                </div>

                <div className="header__buttons">
                    {!isAuthenticated ? (
                        <>
                            <button
                                className="header__button header__buttons--register"
                                onClick={handleRegisterClick}
                            >
                                新規登録
                            </button>
                            <button
                                className="header__button header__buttons--login"
                                onClick={handleLoginClick}
                            >
                                ログイン
                            </button>
                        </>
                    ) : (
                        <>
                            {user && (
                                <div className="header__user">
                                    <img
                                        src={
                                            user.profile_image_url ||
                                            "/images/default-user-icon.png"
                                        }
                                        alt="User Icon"
                                        className="header__user-icon"
                                        onClick={handleProfileClick}
                                    />
                                    <span
                                        className="header__user-name"
                                        onClick={handleProfileClick}
                                    >
                                        {user.name}
                                    </span>
                                </div>
                            )}
                            <button
                                className="header__button header__buttons--logout"
                                onClick={handleLogoutClick}
                            >
                                ログアウト
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
