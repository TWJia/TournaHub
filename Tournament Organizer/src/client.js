import axios from 'axios'

const client = axios.create({
    baseURL:" http://localhost:3001/",
    // baseURL:"https://dcbasborneoabadiselalu.glitch.me/",
})

export default client