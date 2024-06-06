// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useParams, useNavigate } from 'react-router-dom';

// const IdeaDetail = () => {
//     const { id } = useParams(); // URLパラメータからIDを取得
//     const [idea, setIdea] = useState(null);
//     const navigate = useNavigate(); // navigateを追加

//     useEffect(() => {
//         const fetchIdea = async () => {
//             try {
//                 const response = await axios.get(`/api/ideas/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
//                     }
//                 });
//                 setIdea(response.data);
//             } catch (error) {
//                 console.error('Error fetching idea:', error);
//             }
//         };

//         fetchIdea();
//     }, [id]);

//     if (!idea) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Header />
//             <main className="container">
//               <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//                 <h2>{idea.title}</h2>
//                 <p>{idea.overview}</p>
//                 <div>
//                     <span>カテゴリ: {idea.category}</span>
//                     <span>レビュー数: {idea.reviewCount}</span>
//                     <span>平均評価: {idea.averageRating}</span>
//                 </div>
//                 <p>詳細: {idea.content}</p>
//                 <p>価格: {idea.price}</p>
//                 <button onClick={() => navigate(-1)}>戻る</button>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default IdeaDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const IdeaDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [error, setError] = useState(null); // エラーメッセージの状態を追加
    const navigate = useNavigate(); // navigateを追加

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                setIdea(response.data.idea);
            } catch (error) {
                console.error('Error fetching idea:', error);
                setError('データの取得に失敗しました。');
            }
        };

        fetchIdea();
    }, [id]);


    // エラーメッセージを表示
    if (error) {
      return <div>{error}</div>;
  }

  // データロード中の表示
  if (!idea) {
      return <div>Loading...</div>;
  }

    return (
        <div>
            <Header />
            <main className="container">
            <br /><br /><br /><br /><br />
                <div>
                    <h2>Fetched Idea (State)</h2>
                    <pre>{JSON.stringify(idea, null, 2)}</pre> {/* 取得したデータを表示 */}
                </div>
              {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
                <h2>{idea.title}</h2>
                <p>{idea.overview}</p>
                <p>{idea.content}</p>
                {idea.purchased ? (
                    <p>詳細: {idea.content}</p>
                ) : (
                    <p>詳細は購入後に見ることができます。</p>
                )}
                <p>価格: {idea.price}</p>
                <div>
                    <span>カテゴリ: {idea.category}</span>
                    <span>レビュー数: {idea.reviewCount}</span>
                    <span>平均評価: {idea.averageRating}</span>
                </div>
                <div className="idea-card__buttons">
                    <button className="idea-card__button" >購入する</button>
                    <button className="idea-card__button" ><i className="fa-regular fa-thumbs-up"></i>解除</button>
                    <button className="idea-card__button" onClick={() => navigate(-1)}>戻る</button>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </main>
            <Footer />
        </div>
    );
};

export default IdeaDetail;
