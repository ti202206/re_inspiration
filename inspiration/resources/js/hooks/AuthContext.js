
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuth, setIsAuth] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('auth_token');
//         if (token) {
//             setIsAuth(true);
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isAuth, setIsAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
