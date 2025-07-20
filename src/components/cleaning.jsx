import React from 'react'
const SERVICE=[
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
  {name:'cleaning', price: 100, rating:"4.5",contact:"1234567890", AvailabilityStatus:"Available",ProfileDetails:"View Profile"},
]
function Cleaning() {
  return (
    <>
    <div className='mt-25 ml-25 font-semibold text-sky-950 w-3xl '>cleaning</div>
    <div>
<table className='min-w-full divide-y divide-grey-700'>

<thead>



    <tr>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Service</th>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Price</th>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Rating</th>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Contact</th>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Availability Status</th>
      <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Profile Details</th>
    </tr>
</thead>
<tbody className='min-w-full max-w-full divide-y divide-grey-700 m-5 '>


    {SERVICE.map((service, index) => (
      <tr key={index}>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.name}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.price}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.rating}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.contact}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.AvailabilityStatus}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{service.ProfileDetails}</td>
      </tr>
    ))}
  </tbody>

</table>

    </div>
    </>

  
  )
}

export default Cleaning