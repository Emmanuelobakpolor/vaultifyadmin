import React from 'react'

const ToDoListData = [
  {}

]

function ToDoList() {
  const date = Date.now()
  return (
    <div className='bg-white  mt-10 p-5 rounded-2xl '>
    <h1>
      To-Do-List
      </h1>
      <p>
        {date}
      </p>
      <div className='flex'>

      <div className='mt-5' >
      <p> check flat for fixing water by 12:00 </p>
      <p> check flat for fixing water by 12:00 </p>
      <p> check flat for fixing water by 12:00 </p>
      <p> check flat for fixing water by 12:00 </p>
      <p> check flat for fixing water by 12:00 </p>
      <p> check flat for fixing water by 12:00 </p>
      </div>
      <button className='bg-gray-100 m-20'>today</button>
      </div>
      </div>

  )
}

export default ToDoList