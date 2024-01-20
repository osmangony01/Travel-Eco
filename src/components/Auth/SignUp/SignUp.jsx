
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../routes/axiosInstance";

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [passError, setPassError] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");
    // const { user, setUser, token, setToken, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const register = async (name, email, password) => {
        try {
            const res = await axiosInstance.post('/register', { name, email, password });
            console.log(res);
            if (res.data?.user) {
                navigate("/sign-in", { replace: true });
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                const errors = error.response.data.errors;
                console.log(errors)
            } else
                console.error('Error with no response from server:', error.message);
        }
    }

    const reset = () => {
        setName('');
        setPassError('');
        setConfirmPass('');
        setEmail('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassError("");
        if (password.length < 6) {
            setPassError("At least 6 characters needed!!");
            return;
        }
        setConfirmPassError("");
        if (password !== confirmPass) {
            setConfirmPassError("Password does not match!!");
            return;
        }

        register(name, email, password);

        reset();
    }

    return (
        <div className='pt-6'>
            <div className='w-2/5 max-sm:w-11/12 max-md:w-3/4 max-lg:w-1/2 bg-white mx-auto py-8 px-12 max-sm:px-4 shadow rounded'>
                <h3 className='text-center text-3xl font-semibold'>Sign Up</h3>
                <hr className='my-6' />
                <form action="" className='px-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="" className='block  mb-1.5'>Full Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your name' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='block mb-1.5'>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your email' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='block  mb-1.5'>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your password' required />
                        <small className="text-red-500">{passError}</small>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='block  mb-1.5'>Confirm Password</label>
                        <input type="password" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} name="password" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your password' required />
                        <small className="text-red-500">{confirmPassError}</small>
                    </div>
                    <button className='w-full py-2 mt-5 bg-white border border-purple-400 hover:bg-purple-800 text-base text-black hover:text-white rounded' >Sign Up</button>
                    <p className='mt-2 text-sm  text-slate-600 text-end'>Already have an account? <Link to="/sign-in" className='text-blue-700 font-semibold'>Sign In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;