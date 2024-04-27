import React, { useState } from 'react'
import { UilTemperatureMinus , UilTear, UilWind, UilSun, UilSunset,  UilArrowUp,UilArrowDown} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../Services/info'
function Time({ weather: { dt, timezone, name, country, details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like} }) {
  return (
    <div>

      <div className="flex items-center justify-center my-4 text-white">
        {formatToLocalTime(dt, timezone)}
      </div>

      <div className="flex items-center justify-center my-4 text-white text-4xl">{`${name}, ${country}`}</div>

      <div className="flex items-center justify-center my-4 text-white mt-4 text-2xl">{details}</div>

      <div className="flex items-center justify-around my-4 text-white">
        <img src={iconUrlFromCode(icon)} alt='' className='w-50'/>
        <h2 className='text-7xl'>{`${temp.toFixed()}°`}</h2>
        <div>
          <div className="flex items pb-2">
            <UilTemperatureMinus/>
            <p className='pl-3'>{`Real fell: ${feels_like.toFixed()}°`}</p>
          </div>
          <div className="flex items pb-2">
            <UilTear/>
            <p className='pl-3'>{`Humidity: ${humidity.toFixed()}%`}</p>
          </div>
          <div className="flex items">
            <UilWind/>
            <p className='pl-3'>{`Wind: ${speed.toFixed()} km/h`}</p>
          </div>
        </div>
      </div>
        
      <div className="flex items-center justify-center my-6 text-white text-lg">
        <div className="flex mr-2">
          <UilSun/> 
          <p className='pl-2'>Rise: {formatToLocalTime(sunrise, timezone, "hh:mm a")} </p> 
        </div>
        <p className='px-3'>|</p>
        <div className="flex mr-2">
          <UilSunset/> 
          <p className='pl-2'>Set: {formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
        </div>
        <p className='px-3'>|</p>
        <div className="flex mr-2">
          <UilArrowUp/> 
          <p className='pl-2'>High: {`${temp_max.toFixed()}°`}</p> 
        </div>
        <p className='px-3'>|</p>
        <div className="flex mr-2">
          <UilArrowDown/> 
          <p className='pl-2'>Low: {`${temp_min.toFixed()}°`} </p>
        </div>
      </div>

    </div>
  )
}

export default Time
