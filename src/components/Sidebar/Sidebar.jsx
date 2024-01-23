import React, { useContext, useState } from 'react';
import axiosInstance from '../../routes/axiosInstance';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const { user, setToken, token, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const res = await axiosInstance.post(`/logout?token=${token}`);
            console.log(res);
            if (res.status == 200) {
                if (res.data?.status == 200) {
                    localStorage.removeItem('access_token');
                    setUser(null);
                    setToken(null);
                    navigate("/", { replace: true });
                }
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                const errors = error.response.data.errors;
            } else {
                console.error('Error with no response from server:', error.message);
            }
        }
    }
    return (
        <div className="w-full text-white flex py-5 px-4 flex-col">
            {/* <h1>Admin Panel</h1> */}
            <div className='my-2 hover:text-orange-500 font-semibold'>
                <Link to={''}>Dashboard</Link>
            </div>
            <div className='my-2 hover:text-orange-500 font-semibold'>
                <Link to={'hotel-list'}>Hotels</Link>
            </div>
            <div className='my-2 hover:text-orange-500 font-semibold'>
                <Link to={'place-list'}>Places</Link>
            </div>
            <hr></hr>
            <div className='my-2 hover:text-violet-500 font-semibold'>
                <button onClick={handleLogOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default Sidebar;