// import axios from 'axios';

// export const fetchData = async (url, authToken) => {
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${authToken}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching data from ${url}:`, error);
//         throw error;
//     }
// };

// export const toggleFavorite = async (id, authToken) => {
//     try {
//         const response = await axios.post('/api/favorites/toggle', { idea_id: id }, {
//             headers: {
//                 Authorization: `Bearer ${authToken}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('お気に入りの解除に失敗しました', error);
//         throw error;
//     }
// };
