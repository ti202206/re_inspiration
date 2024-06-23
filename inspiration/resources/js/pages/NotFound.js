import React from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/object/project/notfound.scss";

function NotFound() {
    const navigate = useNavigate();

    // トップページに戻る
    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="not-found">
            <div className="not-found__content">
                <h1 className="not-found__title">404 Not Found</h1>
                <p className="not-found__message">
                    お探しのページは見つかりませんでした。
                </p>
                <button className="not-found__button" onClick={handleGoHome}>
                    トップ画面に戻る
                </button>
            </div>
        </div>
    );
}

export default NotFound;
