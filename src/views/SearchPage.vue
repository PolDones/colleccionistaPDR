<template>
  <div class="search-page">
    <div class="search-header">
      <h1>Cerca Receptes</h1>
      <p class="subtitle">Busca receptes per la primera lletra del nom</p>
    </div>

    <SearchBar v-model="searchQuery" @search="ejecutaBusqueda" />

    <div v-if="error" class="error-message">
    {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregant receptes...</p>
    </div>

    <div v-else-if="results.length > 0" class="results-grid">
      <ItemCard
        v-for="meal in results"
        :key="meal.idMeal"
        :item="meal"
      >
        <template #actions>
          <button 
            @click="goToDetail(meal.idMeal)" 
            class="btn-detail"
          >
            Veure detalls
          </button>
          <button 
            @click.stop="toggleFavorite(meal)" 
            class="btn-favorite"
            :class="{ 'is-favorite': store.isFavorite(meal.idMeal) }"
          >
            {{ store.isFavorite(meal.idMeal) ? 'Eliminar' : 'Afegir' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <div v-else-if="searchQuery && !loading" class="no-results">
      <p>No s'han trobat receptes amb la lletra "{{ searchQuery }}"</p>
      <p class="hint">Prova amb una altra lletra</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { searchMeals } from '../services/communicationManager'
import { useFavoritesStore } from '../stores/favoritesStore'

const router = useRouter()
const store = useFavoritesStore()

const searchQuery = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

const ejecutaBusqueda = async (valor) => {
  if (!valor || valor.trim() === '') {
    error.value = 'Si us plau, introdueix una lletra'
    return
  }

  searchQuery.value = valor
  loading.value = true
  error.value = null

  try {
    const meals = await searchMeals(valor.toLowerCase())
    results.value = meals
  } catch (err) {
    error.value = 'Error carregant les receptes. Torna-ho a provar.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/item/${id}`)
}

const toggleFavorite = (meal) => {
  if (store.isFavorite(meal.idMeal)) {
    store.removeFavorite(meal.idMeal)
  } else {
    store.addFavorite(meal)
  }
}
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-header h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.error-message {
  background: #fff5f5;
  color: #7a1a1a;
  padding: 1rem;
  border-radius: 0;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid #f6d6d6;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.no-results p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.hint {
  font-size: 0.9rem;
  color: #999;
}

.btn-detail,
.btn-favorite {
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-detail {
  background: var(--panel);
  color: var(--text);
  flex: 1;
}

.btn-detail:hover {
  filter: brightness(0.95);
}

.btn-favorite {
  background: var(--panel);
  color: var(--text);
  border: 1px solid #e5e7eb;
}

.btn-favorite:hover {
  background: #f9fafb;
}

.btn-favorite.is-favorite {
  background: #333;
  color: white;
  border-color: #333;
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>
