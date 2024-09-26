import { useContext, useState } from "react";
import AppContext from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom"; 

const Login = () => {

  const navigate = useNavigate()

  const {login} = useContext(AppContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  }

  const { email, password} = formData

  const submitFormHandler = async (e) => {
     e.preventDefault()
    //  alert("Your form has been submitted")

    const result = await login(email, password)

    if(result.success) {
     navigate('/')
    }
    //  console.log(formData)
  }

  return (
    <>
    <div className="my-5 p-4 container" style={{width:'600px' ,border:'2px solid yellow', borderRadius:'10px'}} >
    <h3 className="text-center">User Registration</h3>
      <form onSubmit={submitFormHandler} 
      className="my-3">

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email 
          </label>
          <input
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" 
          className="Form-label">
            Password
          </label>
          <input
          name='password'
            value={formData.password}
            onChange={onChangeHandler}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

       <div className="d-grid col-6 mx-auto my-5">
        <button type="submit" className="btn btn-primary ">
          Login
        </button>
        </div>

      </form>
      </div>
    </>
  );
};

export default Login;

