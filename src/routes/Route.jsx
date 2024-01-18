import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
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

]);


export default router;