import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import ActiveLink from "./ActiveLink";
import axiosInstance from "../../routes/axiosInstance";
import CreatePost from "../User/Post/CreatePost";



const Navbar = () => {
    // const [userControl, setUserControl] = useState(false);
    // const [toggle, setToggle] = useState(false);

    const { user, setToken, token, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [addModel, setAddModal] = useState(false);
    const [userControl, setUserControl] = useState(false);

    // to handle task pop-up modal
    const handleAddModal = (status) => {
        setAddModal(status)
    }

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

    // const navItems = <>
    //     <li><ActiveLink to="/hotels">Hotel</ActiveLink></li>
    //     <li><ActiveLink to="/places">Destination</ActiveLink></li>
    //     <li><ActiveLink to="/about-us"> About us</ActiveLink></li>
    //     {!user && <li><ActiveLink to="/sign-in">Sign in</ActiveLink></li>}
    // </>

    return (
        <nav className="flex justify-between items-center py-5 px-10 mx-auto bg-white">
            <h1 className="text-2xl font-semibold"><Link to="/">TravelEco</Link></h1>
            <ul className="flex items-center justify-center">
                {/* {
                navItems.map(({ path, title }) => <li key={path} className="mx-2">
                    <Link href={path}>{title}</Link>
                </li>)
            } */}
                <li className="mx-3"><ActiveLink to="/hotel">Hotel</ActiveLink></li>
                <li className="mx-3"><ActiveLink to="/place">Destination</ActiveLink></li>
                <li className="mx-3"><ActiveLink to="/blog-post">Blog post</ActiveLink></li>
                <li className="mx-3"><ActiveLink to="/about-us"> About us</ActiveLink></li>
                {/* {user && <li className="mx-2"><ActiveLink to="/create-post">Create Post</ActiveLink> </li>} */}
                {!user && <li className="mx-3"><ActiveLink to="/sign-in">Sign In</ActiveLink></li>}
                {/* {user && <li className="mx-2"><ActiveLink to="/profile">Profile</ActiveLink></li>}
                {user && <li className="mx-2"><button onClick={handleLogOut}>Sign Out</button></li>} */}
                <li>
                {
                        user && <div className="relative" onClick={() => setUserControl(!userControl)}>
                            <label className="btn btn-ghost btn-circle avatar m-0">
                                <div className="w-10 rounded-full">
                                    <FaUserCircle size={40}></FaUserCircle>
                                </div>
                            </label>
                            {
                                userControl && <div className="absolute border rounded right-0 top-11 z-10 text-black bg-white">
                                    <ul className="menu menu-compact mt-3 p-2 shadow bg-base-100 rounded-md w-52">
                                        <li className="my-2"><span>{user.name}</span></li>
                                        <hr></hr>
                                        <li className="my-2 hover:text-blue-600"><Link to={'/profile'}>Profile</Link></li>
                                        <li className="my-2 hover:text-blue-600" onClick={() => handleAddModal(true)}><Link>Create post</Link></li>
                                        <hr></hr>
                                        <li className="my-2 hover:text-blue-600" onClick={handleLogOut}><Link>Sign Out</Link></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                </li>
                {<CreatePost status={addModel} handleAddModal={handleAddModal}></CreatePost>}
            </ul>
        </nav>
        // <div className="relative">

        //     <div className="navbar bg-neutral text-neutral-content  md:px-20 py-2  scroll-py-2.5">
        //         <div className="navbar-start">
        //             <div className="relative" onClick={() => setToggle(!toggle)}>
        //                 <label tabIndex={0} className="btn btn-ghost lg:hidden m-0">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //                 </label>
        //                 {
        //                     toggle && <div className="absolute left-0 top-10 lg:hidden z-20">
        //                         <ul className="menu menu-compact mt-3 p-2 shadow bg-base-100 rounded-md w-52 text-black  text-sm">
        //                             {navItems}
        //                         </ul>
        //                     </div>
        //                 }
        //             </div>
        //             <div className="flex items-center">
        //                 <img src="/images/logo3.png" alt="asdf" />
        //                 <a className="btn btn-ghost normal-case text-xl md:text-2xl">TravelEco</a>
        //             </div>
        //         </div>

        //         <div className="navbar-end">
        //             {
        //                 <div className="hidden lg:flex">
        //                     <ul className="menu menu-horizontal px-1 text-[#ece9e9]  text-sm">
        //                         {navItems}
        //                     </ul>
        //                 </div>
        //             }
        //             {
        //                 user && <div className="relative" onClick={() => setUserControl(!userControl)}>
        //                     <label className="btn btn-ghost btn-circle avatar m-0">
        //                         <div className="w-10 rounded-full">
        //                             {user.photoURL ? <img src={user.photoURL} alt="" className='bg-slate-200' title={user.displayName} />
        //                                 : <span className='first-line:' title={user.displayName}><FaUserCircle size={40}></FaUserCircle></span>}
        //                         </div>
        //                     </label>
        //                     {
        //                         userControl && <div className="absolute right-0 top-10 z-10 text-black">
        //                             <ul className="menu menu-compact mt-3 p-2 shadow bg-base-100 rounded-md w-52">
        //                                 <li><span>{user.email}</span></li>
        //                                 <li><Link to={'/profile'}>Profile</Link></li>
        //                                 <li onClick={handleLogOut}><a>Sign Out</a></li>
        //                             </ul>
        //                         </div>
        //                     }
        //                 </div>
        //             }
        //         </div>
        //     </div>
        // </div>
    );
};

export default Navbar;

