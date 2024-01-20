import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../components/Auth/SignIn/SignIn";
import SignUp from "../components/Auth/SignUp/SignUp";
import Profile from "../components/User/Profile";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../components/Admin/Dashboard";
import AdminSidebar from "../components/Admin/AdminLayout";
import Hotel from "../components/Admin/Hotel/Hotel";
import Place from "../components/Admin/Place/Place";
import About from "../components/About/About";


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
                path: "hotel",
                element: <Hotel></Hotel>
            },
            {
                path: "place",
                element: <Place></Place>
            }
        ]
    }
]);


export default router;