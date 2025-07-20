import React from 'react'
import images from "../assets/properties"
import { href, Link } from 'react-router-dom'
import {color, motion} from "framer-motion"
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import Image from "react"
import {logout} from "../redux/User/userSlice.js"
import sideBARicons from "../assets/images/sidebarIcons.png"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const SIDEBAR_ITEMS =[
    
    {name:"Dashboard", icon:sideBARicons, href:"/dashboard"},
    {name:"Manage Residents", icon:sideBARicons, href:"/residents"},
    {name:"Manage Security P.", icon:sideBARicons, href:"/securityPersonnel"},
    {name:"Manage Visitors", icon:sideBARicons, href:"/ManageVisitors"},
    {name:"Payment MGT.", icon:sideBARicons, href:"payment"},
    {name:"Service Bookings", icon:sideBARicons, href:"/service"},
    {name:"Lost & Found MGT.", icon:sideBARicons, href:"/LostAndFound"},
    {name:"Announcement", icon:sideBARicons, href:"/Announcement"},
    {name:"Administration ", icon:sideBARicons, href:"/Administration"},
    {name:"Log Out", icon:sideBARicons, href:"/logout", }
]
function SideBar() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
  
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  // Normalize role string for consistency
  const userRoles = user?.adminRole || "";
  const isSuperAdmin = userRoles.includes("Super-admin") || userRoles.includes("Super admin");

  // Filter sidebar items for super-admin
  const filteredSidebarItems = isSuperAdmin
    ? SIDEBAR_ITEMS.filter(item => !["/ManageVisitors", "/service", "/LostAndFound"].includes(item.href))
    : SIDEBAR_ITEMS;

  return (
    <>
  
    <motion.div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen? "w-64": "w-20"}`}
animate={{width:isSideBarOpen? 256:80}}
    >

        <div className='h-full bg-sky-950 bg-opacity-500 p-5 flex flex-col border-r backdrop-blur-md border-black-700 ' >

          <motion.button
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
          onClick={() =>setIsSideBarOpen(!isSideBarOpen)}
          
          className='p-2 rounded-full hover:bg-white onfocus:bg-black text-amber-50 transition-colors max-w-fit justify-center pr-2'
          >
            <h1 className='text-white items-center'>Vaultify</h1>

          </motion.button>
          <nav className='mt-8 flex-grow '>
            {
              filteredSidebarItems.map((item) => (
                <>
           
                <NavLink 
                activeClassName="active-link"
                key={item.href} to={item.href} className=''>
                  <motion.div
                   whileHover={{scale:1.2}}
                   whileTap={{scale:0.9}}
                  className='flex items-center p-4 text-sm font-medium rounded-lg   text-sky-950 hover:bg-sky-900 transition-colors mb-2 flex-wrap'>
                    
                    <img src={item.icon}  className={`w-6 h-6 p-2 hover:bg-white-700 ${isSideBarOpen? "block": "hidden"}`} />
{isSideBarOpen && <span className='text-white'>{item.name}</span>}
                  </motion.div>

                </NavLink>
               
                </>
              ))
            }
<button
  className="bg-white text-red-400 p-2 rounded-2xl"
  onClick={() => {
    dispatch(logout());
    // localStorage.removeItem("user");
    // window.location.reload();
  }}
>
  Log Out
</button>

          </nav>
        </div>
    </motion.div>
    </>
  )
}

export default SideBar
