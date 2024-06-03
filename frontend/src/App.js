import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import { RequireAuth } from "./component/Route/PrivateRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from "axios";
import Payment from "./component/Cart/Payment"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders"
import OrderSuccess from "./component/Cart/OrderSuccess"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";






function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setstripeApiKey] = useState(`${process.env.NEXT_STRIPE_API_KEY}`);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    console.log(data.stripeApiKey);
    setstripeApiKey(data.stripeApiKey);

  }

  //const stripeApiKey= process.env.STRIPE_API_KEY;

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);



  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        {/* <ProtectedRoute path="/account" element={<Profile/>} /> */}
        {/* <Route path='/account' element={<ProtectedRoute> <Profile/>  </ProtectedRoute> }/>
  */}
        <Route path='/account' element={<RequireAuth> <Profile /></RequireAuth>} />
        <Route path='/me/update' element={<RequireAuth> <UpdateProfile /></RequireAuth>} />
        <Route path='/password/update' element={<RequireAuth> <UpdatePassword /></RequireAuth>} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route path='/login/shipping' element={<RequireAuth> <Shipping /></RequireAuth>} />
        <Route path='/order/confirm' element={<RequireAuth> <ConfirmOrder /></RequireAuth>} />

        {/* {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route path='/process/payment' element={<RequireAuth> <Payment /></RequireAuth>} />
          </Elements>
        )} */}
        {/* {stripeApiKey &&
          <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><RequireAuth> <Payment /></RequireAuth> </Elements>} />
        } */}
        {/* <Route path='/process/payment' element={<Elements ><RequireAuth> <Payment /></RequireAuth> </Elements>} /> */}

        <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><RequireAuth> <Payment /></RequireAuth> </Elements>} />
        <Route path='/success' element={<RequireAuth> <OrderSuccess /></RequireAuth>} />
        <Route path='/orders' element={<RequireAuth> <MyOrders /></RequireAuth>} />
        <Route path='/order/:id' element={<RequireAuth> <OrderDetails /></RequireAuth>} />
        {/* <Route path='/admin/dashboard' element={<RequireAuth> <Dashboard/></RequireAuth>} /> */}
        <Route exact path='/admin/dashboard' element={<RequireAuth> <Dashboard /></RequireAuth>} />
        <Route exact path='/admin/products' element={<RequireAuth> <ProductList /></RequireAuth>} />
        <Route exact path='/admin/product' element={<RequireAuth> <NewProduct /></RequireAuth>} />
        <Route exact path='/admin/product/:id' element={<RequireAuth> <UpdateProduct /></RequireAuth>} />
        <Route exact path='/admin/orders' element={<RequireAuth> <OrderList /></RequireAuth>} />
        <Route exact path='/admin/order/:id' element={<RequireAuth> <ProcessOrder /></RequireAuth>} />
        <Route exact path='/admin/users' element={<RequireAuth> <UserList /></RequireAuth>} />
        <Route exact path='/admin/user/:id' element={<RequireAuth> <UpdateUser /></RequireAuth>} />
        <Route exact path='/admin/reviews' element={<RequireAuth> <ProductReviews /></RequireAuth>} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
