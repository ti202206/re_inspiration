import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const IdeaDetail = () => {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [idea, setIdea] = useState(null);
    const [categories, setCategories] = useState({}); // カテゴリの状態管理
    const [reviews, setReviews] = useState([]); // レビューの状態管理
    const [error, setError] = useState(null); // エラーメッセージの状態を管理
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`/api/ideas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
                    }
                });
                console.log('Fetched idea:', response.data); // デバッグ用
                setIdea(response.data.idea); // アイデアデータを設定

                setReviews(response.data.reviews || []);
            } catch (error) {
                console.error('Error fetching idea:', error);
                setError('データの取得に失敗しました。');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                console.log('Fetched categories:', response.data); // デバッグ用
                const categoriesMap = response.data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {});
                setCategories(categoriesMap);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('カテゴリデータの取得に失敗しました。');
            }
        };

        fetchIdea();
        fetchCategories();
    }, [id]);

    // エラーメッセージを表示
    if (error) {
        return <div>{error}</div>;
    }

    // データロード中の表示
    if (!idea) {
        return <div>Loading...</div>;
    }

    const sortedReviews = reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div>
            <Header />
            <main className="container">
                <div className="submission-form">
                    <h2>アイデアの詳細</h2>

                    <div className="form-group">
                        <label>タイトル:</label>
                        <div className="form-value">{idea.title}</div>
                    </div>

                    <div className="form-group">
                        <label>概要:</label>
                        <div className="form-value">{idea.overview}</div>
                    </div>

                    <div className="form-group">
                        <label>詳細:</label>
                        <div className="form-value">詳細は購入後に見ることができます。</div>
                    </div>

                    <div className="form-group">
                        <label>価格 (円):</label>
                        <div className="form-value">{idea.price}</div>
                    </div>

                    <div className="form-group">
                        <label>カテゴリ:</label>
                        <div className="form-value">
                            {categories[idea.category_id] || 'カテゴリ不明'}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>更新日時:</label>
                        <div className="form-value">
                            {new Date(idea.updated_at).toLocaleString()}
                        </div>
                    </div>

                    <div className="review-section">
                        <h3>レビュー</h3>
                        {sortedReviews.length > 0 ? (
                            sortedReviews.map(review => (
                                <div key={review.id} className="review">
                                    <p><strong>{review.rating}</strong> / 5</p>
                                    <p>{review.review}</p>
                                    <p><small>{new Date(review.created_at).toLocaleString()}</small></p>
                                </div>
                            ))
                        ) : (
                            <p>レビューはまだありません。</p>
                        )}
                    </div>

                    <div className="idea-card__buttons">
                        <button
                            className="btn"
                            onClick={() => navigate(-1)}
                        >
                            戻る
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default IdeaDetail;
