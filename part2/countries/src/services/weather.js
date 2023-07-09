import axios from 'axios'
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.REACT_APP_API_KEY}`

const getWeatherByLonLat = (lon, lat) => {
  const request = axios.get(baseUrl + `lon=${lon}&lat=${lat}`)
  return request.then(response => response.data)
}

const getWeatherByCityCountry = (city, country) => {
    const request = axios.get(baseUrl + `&q=${city},${country}`)
    return request.then(response => response.data)
  }

export default { 
  getWeatherByLonLat, 
  getWeatherByCityCountry
}