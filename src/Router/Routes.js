import Main from "../Layout/Main";
import Admin from "../components/Admin/Admin/Admin";
import Checkout from "../components/Checkout/Checkout/Checkout";
import Home from "../components/Home/Home/Home";
import Login from "../components/Login/Login/Login";
import MyService from "../components/MyService/MyService/MyService";
import Signup from "../components/Signup/Signup/Signup";
import PrivateRoute from "./PrivateRoute";



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
                path: '/checkout/:id',
                element: <PrivateRoute>
                    <Checkout></Checkout>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://mankind-service-center-server.onrender.com/services/${params.id}`)
            },
            {
                path: '/myservice',
                element: <PrivateRoute>
                    <MyService></MyService>
                </PrivateRoute>
            },
            {
                path: '/admin',
                element: <PrivateRoute>
                    <Admin></Admin>
                </PrivateRoute>
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