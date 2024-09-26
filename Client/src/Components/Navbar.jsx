import { Link, useNavigate, /* useLocation */ } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../Contexts/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();

  const { /* setFilteredData ,*/ products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  // console.log("Products in Navbar:", products);
  // console.log("Cart:", cart);

  // const filteredByCategory = (cat) => {
  //   setFilteredData(
  //     products.filter(
  //       (data) =>
  //         typeof data?.category === "string" &&
  //         data?.category?.toLowerCase() === cat?.toLowerCase()
  //     )
  //   );
  // };

  // const filteredByPrice = (price) => {
  //   setFilteredData(
  //     products.filter(
  //       (data) => typeof data?.price === "number" && data?.price >= price
  //     )
  //   );
  // };

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <div className="left">
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <h3>ShopOnline</h3>
            </Link>
          </div>

          <form className="search" onSubmit={onSearchHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontWeight: "bold" }}
            />
          </form>

          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={'/cart'}
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart_checkout
                  </span>
                  
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <Link
                  to={"/"}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="btn btn-danger mx-3"
                >
                  Logout
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

    {/*     {location.pathname === "/" && (
          <div className="nav_side">
            <div onClick={() => setFilteredData(products)} className="items">
              No filter
            </div>
            <div
              onClick={() => filteredByCategory("laptops")}
              className="items"
            >
              Laptops
            </div>
            <div
              onClick={() => filteredByCategory("mobiles")}
              className="items"
            >
              Mobiles
            </div>
            <div
              onClick={() => filteredByCategory("cameras")}
              className="items"
            >
              Cameras
            </div>
            <div
              onClick={() => filteredByCategory("tablets")}
              className="items"
            >
              Tablets
            </div>
            <div
              onClick={() => filteredByCategory("headphones")}
              className="items"
            >
              Headphones
            </div>
            <div onClick={() => filteredByPrice(15999)} className="items">
              15999
            </div>
            <div onClick={() => filteredByPrice(45999)} className="items">
              45999
            </div>
            <div onClick={() => filteredByPrice(69999)} className="items">
              69999
            </div>
            <div onClick={() => filteredByPrice(89999)} className="items">
              89999
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Navbar;
