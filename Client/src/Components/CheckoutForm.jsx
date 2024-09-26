import { useContext, useEffect, useState } from "react";
import AppContext from "../Contexts/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { cart, userAddress, url, user /*, clearCart */ } = useContext(AppContext);
  // console.log("cart details",cart)
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  // console.log("User address in checkoutform",userAddress)
  // const navigate = useNavigate();
  // console.log(qty,price,user)
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PySvJHBWUV9Y1rpOPjQD87gRDshBaMpsZ7CPPZXmx7KlENdpAnF3Z29pdKTJrftIyQekaifduH4wiytj7Zs3eT300iQyq3Lu1"
      );

      const orderReponse = await axios.post(`${url}/payment/checkout-session`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,

      });

    
    /*     navigate('/orderconfirmation')

        clearCart() */
      

      console.log("Order Response",orderReponse)

      const session = orderReponse.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container  my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>PinCode : {userAddress?.pinCode}</li>
                  <li>Near By : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-5">
        <button
          className="btn btn-success btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CheckoutForm;
