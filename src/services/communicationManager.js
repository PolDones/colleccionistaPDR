import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const searchMeals = async (letter) => {
    try {
        const response = await apiClient.get('/search.php', {
            params: { f: letter }
        })
        return response.data.meals || []
    } catch (error) {
        console.error('Error buscando recetas:', error)
        throw error
    }
}

export const getMealById = async (id) => {
    try {
        const response = await apiClient.get('/lookup.php', {
            params: { i: id }
        })
        return response.data.meals ? response.data.meals[0] : null
    } catch (error) {
        console.error('Error obteniendo detalles de la receta:', error)
        throw error
    }
}

export default {
    searchMeals,
    getMealById
}
