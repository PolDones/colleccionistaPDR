import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'
import ItemDetailPage from '../views/ItemDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage
  },
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemDetailPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
