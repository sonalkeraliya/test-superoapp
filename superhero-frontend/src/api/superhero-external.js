import axios from 'axios'

const KEY = '2712125522265475'

export default axios.create({
    baseURL : `https://www.superheroapi.com/api.php/${KEY}`
})

