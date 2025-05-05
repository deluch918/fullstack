import axios from 'axios'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/"

const getAllCountries = () => {
    const request = axios.get(`${baseURL}/api/all`)
    return request.then(response => response.data)
}

const getWeather = (weatherURL) => {
    const request = axios.get(weatherURL)
    return request.then(response => response.data)
}

export default { getAllCountries, getWeather }