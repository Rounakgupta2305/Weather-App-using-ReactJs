import './App.css'
import Inputs from './Components/Inputs'
import Time from './Components/Time'
import Hourly from './Components/Hourly'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import getFormattedWeatherData from './Services/info'
import { useEffect, useState } from 'react'

function App() {
  const [query, setQuery]= useState({q:'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async()=>{
      getFormattedWeatherData({...query, units}).then(
        (data)=> {
          setWeather(data)
        });
    }
    fetchWeather()
    
     
  }, [query, units])
  

  
  
  return (
    <>
      <div className='flex-row justify-center items-center mx-auto max-w-screen-md mt-4  h-fit backdrop-filter backdrop-blur-md md:backdrop-blur-lg shadow-md shadow-gray-400 p-5 rounded-lg'> 
        <h1 className='text-center text-white text-5xl font-mono	font-family:"Liberation Mono" pt-0 '>Weather App</h1>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
        {weather &&(
          <div>
            <Time weather={weather}/>
            <Hourly title="Hourly Forecast" items= {weather.hourly}/>
            <Hourly title="Daily Forecast" items= {weather.daily}/>
          </div>
        )}  
      </div>
    </>
  )
}

export default App
