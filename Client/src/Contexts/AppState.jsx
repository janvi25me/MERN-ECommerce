import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState()

// console.log(cart)
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      profile();
    };
    fetchProduct();
    userCart();
    getAddress()
  }, [token, reload]);

  // console.log(products)

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    // console.log("ls token ",lstoken)
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
    // console.log("user register ",api)
  };

  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // console.log("user login ",api.data)
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user profile
  const profile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user profile ",api.data);
    setUser(api.data.user);
  };

  // add To Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    // console.log("product id = ", productId);
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
      setReload(!reload)
    //  console.log("my cart ",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user Cart
  const userCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
       
//  console.log("User cart",api)
 setCart(api.data.cart)
//  setCart(api.data.cart)
   /*     console.log("User cart response:", api.data);
      if (api.data.message === "Cart not found") {
        console.log("Cart not found as per backend response");
      } */
    }  catch (error) {
      console.error("Error fetching user cart:", error);
    } 
  };
  
// Decrease qty
const decreaseQty = async(productId, qty) => {
  const api = await axios.post(`${url}/cart/--qty`, 
    { productId, qty },
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    })
    setReload(!reload)
//  console.log("Decrease qty",api)
toast.success(api.data.message, {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
});
}

//remove items from cart
const removeFromCart = async (productId) => {
  const api = await axios.delete(
    `${url}/cart/remove/${productId}`, 
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    })
    setReload(!reload)

//  console.log("Item removed from cart",api),
 toast.success(api.data.message, {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
});
}

//Clear cart 
 const clearCart = async() => {
  const api = await axios.delete(`${url}/cart/clear`,
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    })
    setReload(!reload)
 console.log("remove item from cart",api) 

 console.log(api.data.message,api)
 toast.success(api.data.message, {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
});

}

//add shipping address
const addAddress = async (fullName, address, city, state, country, pinCode, phoneNumber) => {
  const api = await axios.post(
    `${url}/address/add`,
    { fullName, address, city, state, country, pinCode, phoneNumber },
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    }
  );
    setReload(!reload)
  //  console.log("User address ",api)
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  return api.data
};

//get shipping address
const getAddress = async () => {
  const api = await axios.get(`${url}/address/get`, {
    headers: {
      "Content-Type": "Application/json",
      Auth:token
    },
    withCredentials: true,
  });
  // console.log("User address",api.data.userAddress);
  setUserAddress(api.data.userAddress)
};

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        logout,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        addAddress,
        userAddress
      }}
    >
      {" "}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
