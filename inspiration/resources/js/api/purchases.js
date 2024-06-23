// import axios from "axios";

// // 購入情報の一覧を取得
// const getPurchases = async () => {
//     const { data } = await axios.get("/api/purchases");
//     return data;
// };

// // 新しい購入を作成
// const createPurchase = async (purchase) => {
//     const { data } = await axios.post("/api/purchases", purchase);
//     return data;
// };

// // 購入情報を更新
// const updatePurchase = async (id, purchase) => {
//     const { data } = await axios.patch(`/api/purchases/${id}`, purchase);
//     return data;
// };

// // レビューされた購入履歴を取得
// const getReviewedPurchases = async () => {
//     const { data } = await axios.get("/api/reviewed-purchases");
//     return data;
// };

// // すべてのレビューを取得
// const getAllReviews = async () => {
//     const { data } = await axios.get("/api/reviews");
//     return data;
// };

// export {
//     getPurchases,
//     createPurchase,
//     updatePurchase,
//     getReviewedPurchases,
//     getAllReviews,
// };
