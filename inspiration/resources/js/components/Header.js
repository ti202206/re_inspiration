import axios from 'axios';
import React, { useEffect, useState } from 'react';

const handleRegisterClick = () => {
  window.location.href = '/register';
};

const handleLoginClick = () => {
  window.location.href = '/login';
};

const handleLogoutClick = async () => {
  try {
    await axios.post('/api/logout');
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

function Header() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <header className='header'>
      <h1 className="header__title">Inspiration</h1>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu--item"><a href="#concept">コンセプト</a></li>
          <li className="header__menu--item"><a href="#feature">特徴</a></li>
          <li className="header__menu--item"><a href="#column">コラム</a></li>
        </ul>
        <div className="header__buttons">
          <button className="header__button header__buttons--register" onClick={handleRegisterClick}>新規登録</button>
          <button className="header__button header__buttons--login" onClick={handleLoginClick}>ログイン</button>
          <button className="header__button header__buttons--logout" onClick={handleLogoutClick}>ログアウト</button>
        </div>
                <div className="header__buttons">
          {!isAuthenticated ? (
            <>
              <button className="header__button header__buttons--register" onClick={handleRegisterClick}>新規登録</button>
              <button className="header__button header__buttons--login" onClick={handleLoginClick}>ログイン</button>
            </>
          ) : (
            <button className="header__button header__buttons--logout" onClick={handleLogoutClick}>ログアウト</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
