import { useNavigate } from "react-router-dom"

const Success = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="container my-5" style={{color:'white',  display:'flex', alignItems:'center', justifyContent:'center'}}>
       
      <h1 className="">✅ Payment Successful...</h1>
    </div>

    <div className="text-center my-5">
            <button
              className="btn btn-warning  mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => navigate("/")}
            >
              Continue Shopping...
            </button>
          </div>
    </>
  )
}

export default Success
