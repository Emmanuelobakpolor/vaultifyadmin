import React from 'react'

import Aggregation from '../components/aggregation'
import AnnualUserCount from '../components/AnnualUserCount'
import Notifications from '../components/Notifications'
// import ToDoList from '../components/ToDoList'
import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state => state.user.user)
  const residentCount = user?.residentCount || 0
  const securityCount = user?.securityCount || 0

  // Check if user is super admin
  const isSuperAdmin = user?.adminRole?.includes("Super-admin")

  return (
    <div className='mt-25 ml-5 pr-10 mb-20'>
      <h1 className='text-3xl font-bold pt-6'>Dashboard</h1>

      {/* the dashboard calculations */}
      <Aggregation />
      <div className='flex gap-5'>
        <AnnualUserCount residentCount={residentCount} securityCount={securityCount} />
        {!isSuperAdmin && <Notifications />}
      </div>
      {/* <ToDoList /> */}
    </div>
  )
}

export default Dashboard
