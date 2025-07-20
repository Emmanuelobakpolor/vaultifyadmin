import React from 'react'
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts"
import {motion} from "framer-motion"
const DataRevenue =[
    { month:"Jan",sales:"1000" },
    { month:"Feb",sales:"2000" },
    { month:"Mar",sales:"3000" },
    { month:"Apr",sales:"4000" },
    { month:"May",sales:"2000" },
    { month:"Jun",sales:"5000" },
    { month:"Jul",sales:"6000" },
    { month:"Aug",sales:"7000" },
    { month:"Sep",sales:"8000" },
    { month:"Oct",sales:"6000" },
    { month:"Nov",sales:"5000" },
    { month:"Dec",sales:"9000" },
  ]
function Statistics() {
  return (
    <motion.div className='bg-white w-96 backdrop-blur-md shadow-2xl shadow-x h-96 p-5 rounded-xl border-grey-700'
    initial={{ opacity:0,y:20}}
  
    animate={{opacity:1,y:0}}
    transition={{delay:0.2}}
    >
      <h1 className='text-sm'>Total Revenue</h1>
      <div className='h-80 '>

        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={DataRevenue}>
            <CartesianGrid strokeDasharray="3,3" stroke='black'/>
            <XAxis dataKey={"month"} stroke='black'/>
            <YAxis stroke='black' />
            <Tooltip 
            contentStyle={{
              backgroundColor:"shy",
              borderColor:"black"

            }}
            itemStyle={{color:"black"}}
            />
              <Line
              type="monotone"
              dataKey="sales"
              stroke='black'
              strokeWidth={3}
              dot={{fill:"black", strokeWidth:2,r:6}}
              activeDot={{r:0, strokeWidth:2}}
              />

              
            

          </LineChart>

        </ResponsiveContainer>

      </div>

      </motion.div>
  )
}

export default Statistics