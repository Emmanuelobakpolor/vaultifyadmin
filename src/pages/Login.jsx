import React from "react";
import axios  from "axios"
import { useState } from "react";
import { useShopContext } from '../context.jsx';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signInFail,signInSuccess,loginStart } from "../redux/User/userSlice.js";
import vau from "../assets/images/vau.png"
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
// import vaultify from "../assets/images/vaultify.png"
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()
const {loading , error} = useSelector((state) => state.user)

  const navigate = useNavigate()
  const { backendUrl ,setIsLoginIn, getUserDate} = useShopContext()
  // const [adminName,setName] =useState("");
  const [adminEmail,setEmail] =useState("");
  const [adminPassword,setPassword] =useState("");

    const handleSubmit = async (e)=>{


    try {e.preventDefault()
      dispatch(loginStart())
      axios.defaults.withCredentials=true
      // Trim inputs before sending
      const trimmedEmail = adminEmail.trim();
      const trimmedPassword = adminPassword.trim();
const { data } = await axios.post(backendUrl + '/admin/login', {  // Remove /api
  adminEmail: trimmedEmail,
  adminPassword: trimmedPassword,
});
if (loading) {
  toast.success("Loading...");
}
     if (data.success){
      dispatch(signInSuccess(data.userData))
toast.success("Welcome back")
    
      navigate("/dashboard")
     }else{
      dispatch(signInFail(data))
      toast.error(error.message)

     }
     
   
    } catch (error) {
      toast.error(error.message)
      
    }
    
    



//   adminName, 
//     adminEmail,
//     adminPassword
// }
// // console.log(formDate)
//
// .then((res)=>{
//   console.log(res.data)
//   if(res.status === 200){
//     alert("Login successful")
//   }else{
//     alert("Login failed")
//   }
// })}}
  }
  return (
    <div className="mt-10 justify-self-center mx-auto">
      <h1 className="justify-self-center justify-centers font-bold text-3xl font-Montserrat">Vault<span className="text-cyan-700">ify</span> Admin Dashboard </h1>
<div>
  <img src={vau} className="mx-auto mb-5"/>
</div>
      
<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg"
>
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

  <div className="mb-4">
    <label htmlFor="adminEmail" className="block text-gray-700 font-semibold mb-2">
      Admin Email
    </label>
    <input
      type="email"
      id="adminEmail"
      placeholder="Enter your email"
      value={adminEmail}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
      trim
    />
  </div>

  {/* <div className="mb-6">
    <label htmlFor="adminPassword" className="block text-gray-700 font-semibold mb-2">
      Password
    </label>
    <input
      type="password"
      id="adminPassword"
      placeholder="Enter your password"
      value={adminPassword}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div> */}
  
<div className="mb-6 relative">
  <label htmlFor="adminPassword" className="block text-gray-700 font-semibold mb-2">
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    id="adminPassword"
    placeholder="Enter your password"
    value={adminPassword}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
    required
    trim
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-3 top-9 text-gray-600 focus:outline-none"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>
<div>
  < Link to={"/enterEmail"}>
  <h1 className=" mb-5"> Change Password</h1>

  </Link>
</div>

  <button
    type="submit"
    className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300"
  >
    Submit
  </button>
</form>

    </div>
  );
  }

export default Login;
