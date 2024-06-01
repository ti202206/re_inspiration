// import React, { useState } from 'react';
// import axios from 'axios';
// import "../../sass/object/project/_login.scss";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/login', { email, password });
//             localStorage.setItem('auth_token', response.data.token);
//             window.location.href = '/mypage';
//         } catch (error) {
//             setError('Login failed. Please check your credentials and try again.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleLogin}>
//                 <h2>Login</h2>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//                 {error && <p className="error">{error}</p>}
//             </form>
//         </div>
//     );
// };




// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginForm = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    // axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    //     try {
    //         const response = await axios.post('/login', { email, password });
    //         localStorage.setItem('auth_token', response.data.token);
    //         window.location.href = '/mypage';
    //     } catch (error) {
    //         setError('Login failed. Please check your credentials and try again.');
    //     }
    // };
    

    return (
        <div>
            <Header />
            {/* <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <div>{error}</div>}
            </form> */}

<p><br/><br/><br/><br/><br/><br/><br/><br/>login フォーム</p>
            <Footer />
        </div>
    );
};

export default LoginForm;
