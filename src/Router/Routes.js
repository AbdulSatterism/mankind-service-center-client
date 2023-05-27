import Main from "../Layout/Main";
import Home from "../components/Home/Home/Home";
import Login from "../components/Login/Login/Login";
import Signup from "../components/Signup/Signup/Signup";



const { createBrowserRouter } = require("react-router-dom");

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            }
        ]
    }
]);

export default routes;