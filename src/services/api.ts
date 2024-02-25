import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

console.log('BaseURL: ', axios.defaults.baseURL);

type ApiResponseType<T> = {
    data: T
    message: string
    statusCode: number
    success: boolean
}

const get = async <T extends ApiResponseType<T>>(url: string) => {
    const { data } = await axios.get(url)
    return data
}

const post = async (url: string) => {
    const { data } = await axios.post(url)
    return data
}

const put = async (url: string) => {
    const { data } = await axios.put(url)
    return data
}

const del = async (url: string) => {
    const { data } = await axios.delete(url)
    return data
}

export default {
    get,
    post,
    put,
    del
}
