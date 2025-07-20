import React from "react";
import axios  from "axios"
import { useState } from "react";
import { useShopContext } from '../../context.jsx';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
function AddAmin() {
  const navigate = useNavigate()
  const { backendUrl ,setIsLoginIn} = useShopContext()
  const [adminName,setName] =useState("");
  const [adminRole,setRole] =useState("");
  const [adminEmail,setEmail] =useState("");
  const [adminPassword,setPassword] =useState("");

  const handleSubmit = async (e)=>{
    try {e.preventDefault()
      axios.defaults.withCredentials=true
     const {data}= await axios.post(backendUrl+ '/api/admin/registerAdmin', {adminEmail,adminPassword,adminName,adminRole} )
     if (data.success){
      setIsLoginIn(true)
      toast.success("Admin Added Successfully")
      navigate("/Administration")
     }else{
      toast.error(data.message)
      console.log(data.message) 

     }
   
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      
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
    <div className="mt-25 justify-self-center mx-auto">
      {/* <h1 className="justify-self-center justify-centers font-bold ">Vaultify Admin </h1> */}

      {/* <form className="shadow w-100 p-10 shadow-sky-900  " onSubmit={handleSubmit}>
        <h1 className=" justify-self-center m-5">Register Admin</h1>
 <h1 className=" mb-5" >
          <label className="font-semibold mb-5">Admin Name</label>
          <p>
          <input type="text" placeholder=" Full name" className="focus:to-sky-900 max-xl: " value={adminName}  onChange={(e )=>setName(e.target.value)}></input>
        </p>
        </h1>
        

        <h1 className=" mb-5">
          <label className="font-semibold mb-5">Admin Email</label>
          <p>
          <input type="email" placeholder="Valid Email" value={adminEmail}  onChange={(e )=>setEmail(e.target.value)}></input>
        </p>
        </h1>
        <h1>
          <label>
            Amin Role
          </label>
          <p>
            <input type="text" placeholder="Admin Role" value={adminRole} onChange={(e )=>setRole(e.target.value)}></input>
          </p>
        </h1>

        <h1 className=" mb-5">
          <label className="font-semibold mb-5">Password</label>
          <p>
          <input type="password" placeholder="password" value={adminPassword}  onChange={(e )=>setPassword(e.target.value)}></input>
        </p>
        </h1>
        <button className=" bg-sky-950 p-2 mt-10 rounded-xl text-white" >Submit</button>
      </form> */}
      <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg"
>
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Admin</h1>

  <div className="mb-4">
    <label htmlFor="adminName" className="block text-gray-700 font-semibold mb-2">
      Admin Name
    </label>
    <input
      type="text"
      id="adminName"
      placeholder="Full name"
      value={adminName}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="adminEmail" className="block text-gray-700 font-semibold mb-2">
      Admin Email
    </label>
    <input
      type="email"
      id="adminEmail"
      placeholder="Valid Email"
      value={adminEmail}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="adminRole" className="block text-gray-700 font-semibold mb-2">
      Admin Role
    </label>
    <select value={adminRole}
      type="text"
      id="adminRole"
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required>
      admin
    <option value="Super-admin">Superadmin</option>
      <option value="Admin">Admin</option>
      <option value="Paradise admin">Paradise admin</option>
      <option value="Range-view admin">Range-view admin</option>
      <option value="Range-view admin">Range admin</option>
    </select>
    {/* <inputs
      type="text"
      id="adminRole"
      placeholder="Admin Role"
      value={adminRole}
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    /> */}
  </div>

  <div className="mb-6">
    <label htmlFor="adminPassword" className="block text-gray-700 font-semibold mb-2">
      Password
    </label>
    <input
      type="password"
      id="adminPassword"
      placeholder="Password"
      value={adminPassword}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-800"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-sky-950 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300"
  >
    Submit
  </button>
</form>

    </div>
  );
  }

export default AddAmin;
