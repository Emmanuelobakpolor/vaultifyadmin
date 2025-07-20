import React from 'react'
import  search from "../assets/images/search.png"
import blackIcon from "../assets/images/blackIcon.png"
import person from "../assets/images/person.png"
import { useShopContext } from '../context'
// import { useQuery } from "react-query";
import axios from 'axios'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
function TopNav() {

  const {user} = useSelector(state => state.user)
  const {userData , backendUrl,setUserDate } = useShopContext()

//   const {isLoading ,data, loading} = useQuery("userData",() =>{
//     return axios.get( backendUrl +"/api/admin/getUserData")

//   })
// if(data){
//   console.log(data)

// }
  // const overlay =() =>{
  //   <h1>
  //     hello
  //   </h1>
  // }

  return (
    <div className='flex justify-between items-center bg-white shadow-md p-2 fixed top-0 left-0 right-0 z-5 max-w-full mx-auto'> 
<div className='flex items-center '>
    {/* <input type="text" placeholder="Search..." className='border border-gray-300 rounded-md p-2 color-black ml-64' /> */}

    <img src={search} alt="search"  className='-ml-6'/>

    <img src={blackIcon} alt="sidebarIcon" className='justify-items-end ml-96'/>
    <h1 className='ml-5'>{user? user.adminName:"welcome"}
      <p>{user? user.adminRole:"No Role"}</p>
    </h1>

    <img src={person} alt="sidebarIcon" className='justify-items-end ml-5'/>
</div>
    </div>
  )
}

export default  TopNav
