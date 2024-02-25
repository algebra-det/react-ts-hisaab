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

export default {
    get,
    post
}
