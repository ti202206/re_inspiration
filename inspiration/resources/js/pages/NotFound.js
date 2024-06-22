// import React from 'react';

// function NotFound() {
//   return <div><h1>404 Not Found</h1><p>お探しのページは見つかりませんでした。</p></div>;
// }

// export default NotFound;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../sass/object/project/notfound.scss';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404 Not Found</h1>
        <p className="not-found__message">お探しのページは見つかりませんでした。</p>
        {/* ＊＊＊＊＊＊変更：　トップ画面に戻るボタンを追加　＊＊＊＊＊＊ */}
        <button className="not-found__button" onClick={handleGoHome}>
          トップ画面に戻る
        </button>
        {/* ＊＊＊＊＊＊変更：　トップ画面に戻るボタンを追加　＊＊＊＊＊＊ */}
      </div>
    </div>
  );
}

export default NotFound;
