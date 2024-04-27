import {DateTime} from "luxon"
const key="12649df7ba78a474a31fb7144a849823"
const baseurl = `https://api.openweathermap.org/data/`

const getWeatherData = (infoType, searchParams)=> {

  if(infoType=="weather"){
    const url = new URL (baseurl + "2.5" + "/" + infoType);
    url.search = new URLSearchParams ({... searchParams, appid:key})
    return fetch(url).then((res)=> res.json());
  }

  if(infoType=="onecall"){
    const url = new URL (baseurl + "3.0" + "/" + infoType);
    url.search = new URLSearchParams ({... searchParams, appid:key})
    return fetch(url).then((res)=> res.json());
  }

};

const formatCurrentWeather = (data) => {
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt,
    sys: {country, sunrise, sunset}, 
    weather, 
    wind: {speed}
  } = data;

  const {main: details, icon}=weather[0]

  return {lat, lon, temp, feels_like, temp_min, temp_max, humidity,
  name, dt, country, sunrise, sunset, details, icon, speed}
}


const formatForecastWeather =(data) => {
  let {timezone, daily, hourly} = data;
  daily = daily.slice(1,6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon
    }
  });

  hourly= hourly.slice(1,6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon
    }
  });
  return {timezone, daily, hourly};
};


const getFormattedWeatherData = async (searchParams)=> {
  const formattedCurrentWeather= await getWeatherData(
    "weather", 
    searchParams
  ).then(formatCurrentWeather); 
  
  const {lat, lon} = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat, 
    lon, 
    exclude: "current,minutely,alerts", 
    units: searchParams.units
    }).then (formatForecastWeather);
 
  return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (
  secs, 
  zone, 
  format= "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;


export { formatToLocalTime, iconUrlFromCode };
