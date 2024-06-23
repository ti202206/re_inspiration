// import axios from "axios";

// //アイディア一覧の取得
// const getIdeas = async () => {
//     const { data } = await axios.get("/api/ideas");
//     return data;
// };

// //自身が投稿したアイディア一覧を取得
// const getMyIdeas = async () => {
//     const { data } = await axios.get("/api/my-ideas");
//     return data;
// };

// // 新しいアイディアを作成
// const createIdea = async (idea) => {
//     const { data } = await axios.post("/api/ideas", idea);
//     return data;
// };

// // アイディアを更新
// const updateIdea = async (id, idea) => {
//     const { data } = await axios.put(`/api/ideas/${id}`, idea);
//     return data;
// };

// // アイディアを削除
// const deleteIdea = async (id) => {
//     const { data } = await axios.delete(`/api/ideas/${id}`);
//     return data;
// };

// // 特定のアイディアを取得
// const showIdea = async (id) => {
//     const { data } = await axios.get(`/api/ideas/${id}`);
//     return data;
// };

// export { getIdeas, getMyIdeas, createIdea, updateIdea, deleteIdea, showIdea };
