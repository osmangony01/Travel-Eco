
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../provider/AuthProvider';
import axiosInstance from '../../../routes/axiosInstance';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passShow, setPassShow] = useState(true);
    const [error, setError] = useState("");
    const { user, setUser, loading, setLoading, saveToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const res = await axiosInstance.post('/login', { email, password });
            console.log(res);
            console.log(res.status)
            if (res.data?.user) {
                setUser(res.data.user);
                setLoading(false);
                saveToken(res.data.access_token);
                const role = res.data.user.role;
                console.log(role);
                if (role == 1) {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
                // if (role == 0) {
                //     navigate("/profile", { replace: true });
                // }

            }
        } catch (error) {
            if (error.response)
                console.log(error.response.data);
            else
                console.error('Error with no response from server:', error.message);
        }
    }

    const restForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("")
        if (email === "" || password === "") {
            return;
        }
        console.log(email, password);
        login(email, password);

        restForm();
    }

    return (
        <div className='pt-8 pb-16'>
            <div className='w-2/5 max-sm:w-11/12 max-md:w-2/4 lg:w-1/3 bg-white mx-auto py-10 px-10 max-sm:px-4 shadow rounded'>
                <h3 className='text-center text-3xl font-semibold max-sm:text-2xl'>Sign In</h3>
                <hr className='my-6' />
                <p className='text-red-600 text-center text-sm mb-4'>{error}</p>
                <form action="" className='px-4' onSubmit={handleLogin}>
                    <div className='mb-3'>
                        <label htmlFor="" className='block mb-1.5'>Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} name="email" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your email' />
                    </div>
                    <div className='mb-3 relative'>
                        <label htmlFor="" className='block  mb-1.5'>Password</label>
                        <input type={passShow ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} value={password} name="password" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your password' />
                        <small onClick={() => setPassShow(!passShow)} className='absolute right-6 top-11 text-base text-slate-600' required>
                            {passShow ? <span>{<FaEyeSlash></FaEyeSlash>}</span> : <span>{<FaEye></FaEye>}</span>}
                        </small>
                    </div>
                    <button type="submit" className='w-full py-2 mt-5 bg-white border border-purple-400 hover:bg-purple-800 text-base text-black hover:text-white rounded'>Sign In</button>
                    <p className='mt-2 text-sm  text-slate-600 text-end'>Don't have an account? <Link to="/sign-up" className='text-blue-700 font-semibold'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;