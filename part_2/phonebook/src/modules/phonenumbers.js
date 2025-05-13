import axios from "axios"

const baseURL = "http://localhost:3001"

const getAll = () => {
    const request = axios.get(`${baseURL}/api/persons`)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(`${baseURL}/api/persons`, newObject)
    return request.then((response) => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/api/persons/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/api/persons/${id}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, deletePerson}
