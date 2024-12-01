import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./components/HomePage";
import AddBrand from "./components/AddBrand";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";
import ShowProduct from "./components/ShowProduct";
import Pagenotfound from "./components/Pagenotfound";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ShowuserProduct from "./components/ShowuserProduct";
import EditUser from "./components/EditUser";



const projectRoute = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'register',
                element:<Register/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'addBrand',
                element:<AddBrand/>
            },
            {
                path:'addCategory',
                element:<AddCategory/>
            },
            {
                path:'addProduct',
                element:<AddProduct/>
            },
            {
                path:'showProduct',
                element:<ShowProduct/>
            },
            {
                path : 'showuserproduct',
                element : <ShowuserProduct/>
            },
            {
                path : 'user',
                element : <UserDashboard/>,
            },
            {
                path : 'admin',
                element : <AdminDashboard/>
            },
            {
                path : 'update/:userid',
                element : <EditUser/>
            },
            {
                path:'*',
                element:<Pagenotfound/>
            }
        ]
    }
])


export default projectRoute;