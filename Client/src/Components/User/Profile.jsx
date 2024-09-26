import { useContext } from "react"
import AppContext from "../../Contexts/AppContext"

const Profile = () => {
    const {user} = useContext(AppContext)
    // console.log(user)
  return (
    <>
      <div className="container text-center my-5">
        <h1>Welcome, {user?.name} </h1>
        <h3>Your gmail is : {user?.email}</h3>
      </div>
    </>
  )
}

export default Profile
