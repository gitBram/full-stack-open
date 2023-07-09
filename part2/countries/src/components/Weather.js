import weatherServices from './../services/weather'
import { useState, useEffect } from 'react'

const Weather = ({city, country}) => {
  // Load the data
  const [weather, setWeather] = useState(null)  

  const loadWeatherHook = () => {
    weatherServices.getWeatherByCityCountry(city, country)
      .then(receivedWeather => {
    setWeather(receivedWeather);console.log(receivedWeather)

    })
  }
  useEffect(loadWeatherHook, [])

  console.log("Weather:", weather, weather === null)
  if (weather !== null){
    return (
        <div>
            <h2>Weather Forecast in {city}</h2>
            <p>temperature {weather.main.temp} C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
        )
  }
}

export default Weather