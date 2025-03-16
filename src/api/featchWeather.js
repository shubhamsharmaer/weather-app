import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f33a484cf794d08d0148764789aaba32'
const fetchWeather = async (city) => {
    const {data} = await axios.get(URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
    }) 
    return data
}

export default fetchWeather