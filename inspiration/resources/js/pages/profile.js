import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
    return (
        <div>
            <Header />
            <main className="container">
                <h2>プロフィールページ</h2>
                {/* プロフィール情報を表示 */}
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
