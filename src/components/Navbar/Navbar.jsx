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

    return (
        <nav className="flex justify-between items-center py-5 px-10 mx-auto bg-white">
            <h1 className="text-2xl font-semibold"><Link to="/">TravelEco</Link></h1>
            <ul className="flex items-center justify-center">
                <li className="mx-3 font-semibold"><ActiveLink to="/hotel">Hotel</ActiveLink></li>
                <li className="mx-3 font-semibold"><ActiveLink to="/place">Destination</ActiveLink></li>
                <li className="mx-3 font-semibold"><ActiveLink to="/blog-post">Blog post</ActiveLink></li>
                <li className="mx-3 font-semibold"><ActiveLink to="/about-us"> About us</ActiveLink></li>
                {/* {user && <li className="mx-2"><ActiveLink to="/create-post">Create Post</ActiveLink> </li>} */}
                {!user && <li className="mx-3 font-semibold"><ActiveLink to="/sign-in">Sign In</ActiveLink></li>}
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
    );
};

export default Navbar;

