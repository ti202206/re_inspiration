// import React, { useState } from "react";
// import axios from "axios";
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     // const [email, setEmail] = useState("");
//     // const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("test@example.com");
//     const [password, setPassword] = useState("12345678");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.post("/api/login", { email, password });
//             alert("ログイン成功");
//             window.location.href = "/mypage";
//         } catch (error) {
//             setError("ログインに失敗しました");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">ログイン</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     const [email, setEmail] = useState("test@example.com");
//     const [password, setPassword] = useState("12345678");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post("/api/login", { email, password }, {
//                 headers: {
//                     'X-Requested-With': 'XMLHttpRequest',
//                 }
//             });
//             if (response.data.token) {
//                 localStorage.setItem('auth_token', response.data.token);
//             }
//             alert("ログイン成功");
//             window.location.href = "/mypage";
//         } catch (error) {
//             setError("ログインに失敗しました");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">ログイン</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Login;



// import React, { useState } from "react";
// import axios from "../axiosConfig";
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     const [email, setEmail] = useState("test@example.com");
//     const [password, setPassword] = useState("12345678");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.post("/api/login", { email, password });
//             Cookies.set('auth_token', response.data.token);
//             alert("ログイン成功");
//             window.location.href = "/mypage";
//         } catch (error) {
//             setError("ログインに失敗しました");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">ログイン</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Login;



import React, { useState } from "react";
import axios from "../axiosConfig";
import Cookies from 'js-cookie';
import "../../sass/object/project/_login.scss";

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
        const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("12345678");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // CSRFトークンを取得
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post("/api/login", { email, password });
            Cookies.set('auth_token', response.data.token);
            alert("ログイン成功");
            window.location.href = "/mypage";
        } catch (error) {
            setError("ログインに失敗しました");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                />
                <button type="submit">ログイン</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;


// import React, { useState } from "react";
// import axios from "../axiosConfig";
// import Cookies from "js-cookie";
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     const [email, setEmail] = useState("test@example.com");
//     const [password, setPassword] = useState("12345678");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // try {
//         //     const response = await axios.post("/api/login", { email, password });
//         //     Cookies.set('auth_token', response.data.token);
//         //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//         //     alert("ログイン成功");
//         //     window.location.href = "/mypage";
//         // } catch (error) {
//         //     setError("ログインに失敗しました");
//         // }

//         try {
//             // CSRFトークンを取得
//             await axios.get('/sanctum/csrf-cookie'); // この行が追加されました
//             const response = await axios.post("/api/login", { email, password });
//             Cookies.set('auth_token', response.data.token);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//             alert("ログイン成功");
//             window.location.href = "/mypage";
//         } catch (error) {
//             setError("ログインに失敗しました");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">ログイン</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Login;



// import React, { useState } from "react";
// import axios from "../axiosConfig"; // カスタムaxiosインスタンスを使用
// import Cookies from "js-cookie";
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     const [email, setEmail] = useState("test@example.com");
//     const [password, setPassword] = useState("12345678");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // CSRFトークンを取得
//             await axios.get('/sanctum/csrf-cookie'); // この行が重要です
//             const response = await axios.post("/api/login", { email, password });
//             Cookies.set('auth_token', response.data.token);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//             alert("ログイン成功");
//             window.location.href = "/mypage";
//         } catch (error) {
//             setError("ログインに失敗しました");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                     autoComplete="email"
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                     autoComplete="current-password"
//                 />
//                 <button type="submit">ログイン</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Login;
