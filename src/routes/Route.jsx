import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../components/Auth/SignIn/SignIn";
import SignUp from "../components/Auth/SignUp/SignUp";
import Profile from "../components/User/Profile";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../components/Admin/Dashboard";
import AdminSidebar from "../components/Admin/AdminLayout";

import About from "../components/About/About";
import AddHotel from "../components/Admin/Hotel/AddHotel";
import AddPlace from "../components/Admin/Place/AddPlace";
import PlaceList from "../components/Admin/Place/PlaceList";
import HotelList from "../components/Admin/Hotel/HotelList";
import Hotel from "../components/Hotel/Hotel";
import Place from "../components/Place/Place";
import AllPost from "../components/User/Post/AllPost";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }, 
            {
                path: "/hotel",
                element: <Hotel></Hotel>
            },
            {
                path: "/place",
                element:<Place></Place>
            },
            {
                path: "/about-us",
                element:<About></About>
            },
            {
                path: "/blog-post",
                element:<AllPost></AllPost>
            },

        ]
    },
    {
        path: "/sign-in",
        element:<SignIn></SignIn>
    },
    {
        path: "/sign-up",
        element:<SignUp></SignUp>
    },
   
    {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
    },
    {
        path: "/admin",
        element: <AdminSidebar></AdminSidebar>,
        children: [
            {
                path: "",
                element: <Dashboard></Dashboard>
            },
            {
                path: "hotel-list",
                element: <HotelList></HotelList>
            },
            {
                path: "add-hotel",
                element: <AddHotel></AddHotel>
            },
            {
                path: "place-list",
                element: <PlaceList></PlaceList>
            },
            {
                path: "add-place",
                element: <AddPlace></AddPlace>
            }
        ]
    }
]);


export default router;