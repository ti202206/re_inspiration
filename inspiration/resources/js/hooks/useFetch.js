// import { useState, useEffect } from 'react';
// import { fetchData } from '../utils/api';

// const useFetch = (url) => {
//     const [data, setData] = useState([null]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDataAsync = async () => {
//             try {
//                 const authToken = sessionStorage.getItem('auth_token');
//                 const result = await fetchData(url, authToken);
//                 setData(result);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDataAsync();
//     }, [url]);

//     return { data, loading, error };
// };

// export default useFetch;
