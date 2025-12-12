import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: []
    }),

    actions: {
        addFavorite(item) {
            if (!this.isFavorite(item.idMeal)) {
                this.favorites.push(item)
            }
        },

        removeFavorite(id) {
            this.favorites = this.favorites.filter(f => f.idMeal !== id)
        }
    },

    getters: {
        isFavorite: (state) => (id) => {
            return state.favorites.some(f => f.idMeal === id)
        },

        favoritesCount: (state) => state.favorites.length
    }
})
