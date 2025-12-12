<template>
  <div class="item-detail-page">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregant detalls...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
      <router-link to="/search" class="back-link">Tornar a cercar</router-link>
    </div>

    <div v-else-if="meal" class="detail-container">
      <button @click="goBack" class="back-button">
        ← Tornar
      </button>

      <div class="detail-header">
        <div class="detail-image">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        </div>
        <div class="detail-info">
          <h1>{{ meal.strMeal }}</h1>
          <div class="tags">
            <span class="tag">Categoria: {{ meal.strCategory }}</span>
            <span class="tag">Àrea: {{ meal.strArea }}</span>
          </div>
          <button 
            @click="toggleFavorite" 
            class="btn-favorite-large"
            :class="{ 'is-favorite': store.isFavorite(meal.idMeal) }"
          >
            {{ store.isFavorite(meal.idMeal) ? 'Eliminar de Favorits' : 'Afegir a Favorits' }}
          </button>
        </div>
      </div>

      <div class="detail-content">
        <section class="ingredients-section">
          <h2>Ingredients</h2>
          <ul class="ingredients-list">
            <li v-for="(ingredient, index) in ingredients" :key="index">
              <span class="ingredient-name">{{ ingredient.name }}</span>
              <span class="ingredient-measure">{{ ingredient.measure }}</span>
            </li>
          </ul>
        </section>

        <section class="instructions-section">
          <h2>Instruccions</h2>
          <p class="instructions">{{ meal.strInstructions }}</p>
        </section>

        <section v-if="meal.strYoutube" class="video-section">
          <h2>Vídeo</h2>
          <a :href="meal.strYoutube" target="_blank" class="video-link">
            Veure a YouTube
          </a>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMealById } from '../services/communicationManager'
import { useFavoritesStore } from '../stores/favoritesStore'

const route = useRoute()
const router = useRouter()
const store = useFavoritesStore()

const meal = ref(null)
const loading = ref(true)
const error = ref(null)

const ingredients = computed(() => {
  if (!meal.value) return []
  
  const ingredientsList = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal.value[`strIngredient${i}`]
    const measure = meal.value[`strMeasure${i}`]
    
    if (ingredient && ingredient.trim() !== '') {
      ingredientsList.push({
        name: ingredient,
        measure: measure || ''
      })
    }
  }
  return ingredientsList
})

const loadMealDetails = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    const data = await getMealById(id)
    
    if (data) {
      meal.value = data
    } else {
      error.value = 'No s\'ha trobat la recepta'
    }
  } catch (err) {
    error.value = 'Error carregant els detalls de la recepta'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = () => {
  if (store.isFavorite(meal.value.idMeal)) {
    store.removeFavorite(meal.value.idMeal)
  } else {
    store.addFavorite(meal.value)
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadMealDetails()
})
</script>

<style scoped>
.item-detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 4rem;
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

.error-message {
  background: #fff5f5;
  color: #7a1a1a;
  padding: 2rem;
  border-radius: 0;
  text-align: center;
  border: 1px solid #f6d6d6;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #333;
  text-decoration: underline;
}

.back-button {
  background: var(--panel);
  border: 1px solid #e5e7eb;
  padding: 0.625rem 1.25rem;
  border-radius: 0;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-button:hover {
  background: #f9fafb;
}

.detail-container {
  background: var(--panel);
  border: 1px solid #e5e7eb;
  border-radius: 0;
  overflow: hidden;
}

.detail-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.detail-image {
  border-radius: 0;
  overflow: hidden;
  background: #f9fafb;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tag {
  background: var(--panel);
  padding: 0.5rem 0.75rem;
  border-radius: 0;
  font-size: 0.875rem;
  color: var(--muted);
  display: inline-block;
  width: fit-content;
}

.btn-favorite-large {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--panel);
  color: var(--text);
}

.btn-favorite-large:hover {
  background: #f9fafb;
}

.btn-favorite-large.is-favorite {
  background: #333;
  color: white;
  border-color: #333;
}

.detail-content {
  padding: 2rem;
  border-top: 1px solid rgba(255,255,255,0.04);
}

.ingredients-section,
.instructions-section,
.video-section {
  margin-bottom: 2rem;
}

.ingredients-section h2,
.instructions-section h2,
.video-section h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.ingredients-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;
}

.ingredients-list li {
  background: rgba(255,255,255,0.02);
  padding: 0.75rem 1rem;
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.04);
}

.ingredient-name {
  font-weight: 500;
  color: #333;
}

.ingredient-measure {
  color: #666;
  font-size: 0.875rem;
}

.instructions {
  line-height: 1.7;
  color: #444;
  font-size: 1rem;
  white-space: pre-line;
}

.video-link {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent), #000 20%));
  color: #012e2a;
  text-decoration: none;
  border-radius: 0;
  font-weight: 500;
  transition: background 0.2s;
}

.video-link:hover {
  filter: brightness(0.95);
}

@media (max-width: 768px) {
  .detail-header {
    grid-template-columns: 1fr;
  }
  
  .detail-info h1 {
    font-size: 1.5rem;
  }
  
  .ingredients-list {
    grid-template-columns: 1fr;
  }
}
</style>
