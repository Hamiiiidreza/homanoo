import React from "react";
import { Navigate } from "react-router-dom";

import Home from "./pages/home/home";
import Shop from "./pages/Shop/Shop"
import Product from "./pages/Product/Product";
import ContactUs from "./pages/contact-us/contact-us"
import ShoppingCart from "./pages/shopping-cart/shopping-cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderComplete from "./pages/order-complete/order-complete";
import Articles from "./pages/articles/Articles";
import ArticlesDetails from "./pages/articles/articles-details";
import AboutUs from "./pages/about-us/about-us";

import UserPanel from "./pages/UserPanel/Index";
import Dashboard from "./pages/UserPanel/Index/Dashboard";
import Address from "./pages/UserPanel/address/Address";
import Orders from "./pages/UserPanel/orders/Orders";
import Wishlist from "./pages/UserPanel/wishlist/Wishlist";
import Tickets from "./pages/UserPanel/tickets/tickets";
import UserAccount from "./pages/UserPanel/user-account/user-account";

import AdminPanel from "./pages/AdminPanel/Index";
import AdminDashboard from "./pages/AdminPanel/Index/admin-dashboard";
import ProductManagement from "./pages/AdminPanel/product-management/product-management";
import AddProduct from "./pages/AdminPanel/product-management/AddProduct";
import EditProduct from "./pages/AdminPanel/product-management/EditProduct";
import UserManagement from "./pages/AdminPanel/user-management/user-management";
import ArticleManagement from "./pages/AdminPanel/article-management/article-management";
import AddArticle from "./pages/AdminPanel/article-management/AddArticle";
import EditArticle from "./pages/AdminPanel/article-management/EditArticle";
import TicketManagement from "./pages/AdminPanel/ticket-management/ticket-management";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/Shop', element: <Shop /> },
    { path: '/product', element: <Product /> },
    { path: '/contact-us', element: <ContactUs /> },
    { path: '/about-us', element: <AboutUs /> },
    { path: '/shopping-cart', element: <ShoppingCart /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/order-complete', element: <OrderComplete /> },
    { path: '/articles', element: <Articles /> },
    { path: '/articles-details', element: <ArticlesDetails /> },
    {
        path: '/my-account',
        element: <UserPanel />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "address", element: <Address /> },
            { path: "orders", element: <Orders /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "tickets", element: <Tickets /> },
            { path: "user-account", element: <UserAccount /> },
        ]
    },
    {
        path: '/p-admin',
        element: <AdminPanel />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <AdminDashboard /> },
            {
                path: "admin-product",
                children: [
                    { index: true, element: <ProductManagement /> },
                    { path: "add", element: <AddProduct /> },
                    { path: "edit", element: <EditProduct /> },
                ]
            },
            { path: "admin-users", element: <UserManagement /> },
            {
                path: "admin-articles",
                children: [
                    { index: true, element: <ArticleManagement /> },
                    { path: "add", element: <AddArticle /> },
                    { path: "edit", element: <EditArticle /> },
                ]
            },
            { path: "admin-tickets", element: <TicketManagement /> }
        ]
    },
]

export default routes;