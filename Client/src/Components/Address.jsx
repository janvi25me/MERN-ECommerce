import { useContext, useState } from "react";
import AppContext from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const { addAddress, userAddress } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
     address: "", 
     city: "", 
     state: "", 
     country: "",
    pinCode: "",
     phoneNumber: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const { fullName, address, city, state, country, pinCode, phoneNumber } =
   formData;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    //  alert("Your form has been submitted")
 /*    console.log("User address",formData)
    alert(formData) */
  const result = await addAddress(
    fullName, 
    address, 
    city, 
    state, 
    country, 
    pinCode, 
    phoneNumber);
console.log("address", result)
    if (result.success) {
      navigate("/checkoutform");
    } 
  setFormData({
    fullName: "",
     address: "", 
     city: "", 
     state: "", 
     country: "",
    pinCode: "",
     phoneNumber: ""
  })
  };
  

  return (
    <>
      <div
        className="my-5 p-4 container"
        style={{ border: "2px solid white", borderRadius: "10px" }}
      >
        <h3 className="text-center">Shipping Address</h3>
        <form onSubmit={submitFormHandler} className="my-3">

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                FullName
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputName1"
                required
                // aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputName1"
                required
                // aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                PinCode
              </label>
              <input
                name="pinCode"
                value={formData.pinCode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                PhoneNumber
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
                required
              />
            </div>
          </div>

          <div className="row">
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address/Nearby
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
                required
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary " style={{fontWeight:'bold'}}  onClick={() => navigate('/checkoutform')}>
              Submit
            </button>
          </div>
        </form>

{userAddress && ( 
  <div className="d-grid col-6 mx-auto my-3">
        <button type="submit" className="btn btn-warning "
         style={{fontWeight:'bold'}}
         onClick={() => navigate('/checkoutform')}>
              Use Old Address
            </button>
        </div>
        )}
       
      
      </div>
    </>
  );
};

export default Address;
