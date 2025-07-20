import React from 'react'
import {motion} from "framer-motion"
function ManageSecurityP() {
  return (
    <div className='mt-25 ml-5 pr-10 mb-20 '>
<h1 className='ml-5 mb-5 font-bold' >
  Add New Security Personnel
</h1>
<motion.div className='bg-white pb-20 p-5  justify-center self-center rounded-2xl shadow-xl '
    initial={{ opacity:0,y:20}}
  
    animate={{opacity:1,y:0}}
    transition={{delay:0.2}}
>
  
<form>
  <h1 className='m-5 font-semibold'> 
  
  <label>Full Name </label>
  <p>
<input   className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Full Name'></input >

</p>
  
  </h1 >


<h1 className='m-5 font-semibold'>
  <label>Assign Location</label>
  <p><input className='bg-gray-50 border-0.2 rounded-x w-lg p-1'  type="text" placeholder='Location' /></p>
</h1>

<h1 className='m-5 font-semibold'>
  <label>
    Phone Number
  </label>
  <p>
    <input type='num' className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Phone Number '></input>
  </p>
</h1>
<h1 className='m-5 font-semibold'>
  <label>Email Address</label>
  <p >
  <input type='email'  className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Email Address'></input> 

    </p>
</h1>
<h1 className='m-5 font-semibold'>
  <label>Shift Schedule</label>
  <p  >
  <input className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Schedule'></input>

  </p>

</h1>
<h1 className='m-5 font-semibold'>
  <label>Emergency Contact (Phone Number)</label>
  <p  >
  <input className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Phone Number'></input>

  </p>

</h1>
<div children="item-center justify-center ">
  <button className='bg-sky-800 rounded-2xl p-2 text-white' type='submit'>
    Submit
</button></div>
</form>
</motion.div>
    </div>
  )
}

export default ManageSecurityP