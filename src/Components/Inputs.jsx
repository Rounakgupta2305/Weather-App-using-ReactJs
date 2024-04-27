import React, { useState } from 'react'
import { UilSearch , UilLocationArrow} from '@iconscout/react-unicons'

function Inputs({ setQuery, units, setUnits }) {

  const [city, setCity] = useState('')
  const SearchClick = ()=> {
    if(city!=='') {
      setQuery({q:city})
    }
  }

  const LocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat,lon,});
      });
    }
  };


  const UnitsChange= ()=> {
    const selectedUnit= e.currentTarget.name;
    if(units !== selectedUnit){
      setUnits(selectedUnit)
    }
  }
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-4/5 items-center justify-center space-x-4">
        <UilSearch size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick= {SearchClick}/>

        <input placeholder='Search a city' className="text-xl font-light p-2 w-full shadow-xl capitalize placeholder:capitalize focus: outline-none" value={city}
          onChange={(e) => setCity(e.currentTarget.value)}/>

        <UilLocationArrow size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick= {LocationClick} />

        <button name= "metric" className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={UnitsChange}>°C</button>

        <p className='text-white px-2 text-2xl'>|</p>

        <button name ="imperial" className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={UnitsChange}>°F</button>

      </div>
    </div>
  )
}

export default Inputs
