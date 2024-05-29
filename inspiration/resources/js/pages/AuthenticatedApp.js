import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from '../pages/MyPage';
// import FavoriteList from './FavoriteList';
import IdeaCatalog from './IdeaCatalog';
// import IdeaSubmission from './IdeaSubmission';
// import MyIdeaHistory from './MyIdeaHistory';
// import MyReviewHistory from './MyReviewHistory';
// import PurchaseList from './PurchaseList';
// import ReviewList from './ReviewList';
// import NotFound from './NotFound';
import TopPage from './TopPage';

// const AuthenticatedApp = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/mypage" element={<MyPage />} />
//                 <Route path="/favorites" element={<FavoriteList />} />
//                 <Route path="/ideas" element={<IdeaCatalog />} />
//                 <Route path="/idea-submission" element={<IdeaSubmission />} />
//                 <Route path="/my-ideas" element={<MyIdeaHistory />} />
//                 <Route path="/my-reviews" element={<MyReviewHistory />} />
//                 <Route path="/purchases" element={<PurchaseList />} />
//                 <Route path="/reviews" element={<ReviewList />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </Router>
//     );
// };

const AuthenticatedApp = () => {
    // const token = localStorage.getItem('auth_token'); // コメントアウト

    // 開発中の一時的な措置: 常にすべてのルートを表示
    return (
        <Router>
            <Routes>
                {/* すべてのルートをリストアップ */}
                <Route path="/" element={<TopPage />} />
                <Route path="/mypage" element={<MyPage />} />
                {/* <Route path="/favorites" element={<FavoriteList />} /> */}
                <Route path="/ideas" element={<IdeaCatalog />} />
                {/* <Route path="/idea-submission" element={<IdeaSubmission />} /> */}
                {/* <Route path="/my-ideas" element={<MyIdeaHistory />} /> */}
                {/* <Route path="/my-reviews" element={<MyReviewHistory />} /> */}
                {/* <Route path="/purchases" element={<PurchaseList />} /> */}
               {/* <Route path="/reviews" element={<ReviewList />} /> */}
               {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default AuthenticatedApp;
