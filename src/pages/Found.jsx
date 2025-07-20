import React from 'react'
import {motion} from "framer-motion"
function Found() {
  return (
    <div className='mt-25 ml-5 pr-10 mb-20 '>
<h1 className='ml-5 mb-5 font-bold' >
  Report Found item
</h1>
<motion.div className='bg-white pb-20 p-5  justify-center self-center rounded-2xl shadow-xl '
    initial={{ opacity:0,y:20}}
  
    animate={{opacity:1,y:0}}
    transition={{delay:0.2}}
>
  
<form>
  <h1 className='m-5 font-semibold'> 
  
  <label>Item Name </label>
  <p>
<input   className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Item Name '></input >

</p>
  
  </h1 >


<h1 className='m-5 font-semibold'>
  <label>Found Date </label>
  <p><input className='bg-gray-50 border-0.2 rounded-x w-lg p-1'  type="date" placeholder='Available Unit' /></p>
</h1>

<h1 className='m-5 font-semibold'>
  <label>
   Found Time 
  </label>
  <p>
    <input type='time' className='bg-gray-50 border-0.2 rounded-x w-lg p-1'  placeholder=' '></input>
  </p>
</h1>
<h1 className='m-5 font-semibold'>
  <label>Item Description</label>
  <p >
  <input type='text'  className='bg-gray-50 border-0.2 rounded-x w-lg h-20 p-1' placeholder='Enter description'></input> 

    </p>
</h1>
<h1 className='m-5 font-semibold'>
  <label>Location Found</label>
  <p  >
  <input className='bg-gray-50 border-0.2 rounded-x w-lg p-1'  type='type' placeholder='Enter Location'></input>
 
  </p>

</h1>
<h1 className='m-5 font-semibold'>
  <label> Contact (Phone Number)</label>
  <p  >
  <input className='bg-gray-50 border-0.2 rounded-x w-lg p-1' placeholder='Enter Phone Number'></input>

  </p>

</h1>
<div children="item-center justify-center ">
  <button className='bg-sky-800 rounded-2xl p-2 text-white' type='submit'> Report Found Items</button >
</div>
</form>
</motion.div>
    </div>
  )
}

export default Found