import React from 'react'
import { iconUrlFromCode } from '../Services/info'

function Hourly({title, items}) {
  return (
    <>
    <div className='text-white flex items-center justify-start mt-4'>
      <h3 className='pb-2 text-xl'>{title}</h3>
    </div>

    <hr/>

    <div className="flex flex-row items-center justify-between text-white mt-5">

      {items.map(item => (
        <div className="flex flex-col items-center justify-center">
          <p className='font-light'>{item.tile}</p>
          <img src={iconUrlFromCode(item.icon)} alt='' className='w-10'/>
          <p className='font-light'>{`${item.temp.toFixed()}°`}</p>
        </div>
      ))}

    </div>
    </>
  )
}

export default Hourly