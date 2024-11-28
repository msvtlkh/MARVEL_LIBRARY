import md5 from 'crypto-js/md5';

const PUBLIC_KEY = 'efbf0e2380a7033f8e13123d725f6247'
const PRIVATE_KEY = 'd754208ec26431e3f1c6e08b7920b543dc4bec05'

const ts = new Date().getTime().toString()
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString()

const API_BASE = 'https://gateway.marvel.com:443/v1/public/'
const API_KEY = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

const REQUEST_CHARACTER_LIMIT = 9
const REQUEST_COMICS_LIMIT = 8
const BASE_OFFSET = 210


export const fetchRequest = async (url: string) => {
    try {
        const response = await fetch(`${url}`)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllCharactersData = (offset = BASE_OFFSET) => {
    return fetchRequest(`${API_BASE}characters?limit=${REQUEST_CHARACTER_LIMIT}&offset=${offset}&${API_KEY}`)
}

export const getOneCharacterData = (id:number) => {
    return fetchRequest(`${API_BASE}characters/${id}?${API_KEY}`)
}

export const getAllComicsData = (request = REQUEST_COMICS_LIMIT) => {
    return fetchRequest(`${API_BASE}comics?limit=${request}&${API_KEY}`)
}

export const getOneComicsData = (id:number) => {
    return fetchRequest(`${API_BASE}comics/${id}?${API_KEY}`)
}




