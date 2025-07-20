import React from 'react'
import Statistics from './Statistics'
import Notifications from "./Notifications"

function Chart() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  gap-5 lg:grid-col-2 xl:flex-col-2 sm:flex-col-2'>
      <Notifications/>
    </div>
  )
}

export default Chart
