// import { useContext } from "react"
// import AppContext from "./Contexts/AppContext"
import ShowProduct from "./Components/Product/ShowProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Product/ProductDetail";
import Navbar from "./Components/Navbar";
import SearchProduct from "./Components/Product/SearchProduct";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import CheckoutForm from "./Components/CheckoutForm";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";

import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Remaining Work of the project
//Remove buttton is not working - functionality remains
//Filter is not working at Navbar

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/search/:term" element={<SearchProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Address />} />
         
          <Route path="/checkoutform" element={<CheckoutForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
 
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
