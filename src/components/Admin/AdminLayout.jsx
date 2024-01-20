import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';


const AdminSidebar = () => {
    const [bar, setBar] = useState(false)

    const handleSidebar = () => {
        //setTimeout(() => setBar(!bar), 200);
        setBar(!bar)
    }

    return (
        <div className='flex'>
            {/* <Sidebar setBar={setBar}  bar={bar} ></Sidebar> */}
            <div className={`fixed top-0 left-0 h-full ${bar ? 'z-30 w-[250px] ' : "z-10 w-0"} text-white transition-all duration-500 bg-[#3e3c61] block md2:hidden`}>
                <div >
                    <span className='cursor-pointer' onClick={handleSidebar}>X</span>
                </div>
                <Sidebar></Sidebar>
            </div>

            <div className='fixed top-0 left-0 w-[300px] hidden md2:block bg-[#3e3c61] text-white h-screen'>
                <Sidebar></Sidebar>
            </div>

            <div className={`w-full ml-0 overflow-hidden md2:ml-[300px] z-20`}>
                <span className='block md2:hidden z-0'><button onClick={handleSidebar} className='px-5'><FaBars></FaBars> </button></span>
                <div className='m-5 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;