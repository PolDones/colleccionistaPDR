<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1>Les Meves Receptes Favorites</h1>
      <p class="subtitle">
        {{ store.favoritesCount }} {{ store.favoritesCount === 1 ? 'recepta' : 'receptes' }} desades
      </p>
    </div>

    <div v-if="store.favorites.length === 0" class="empty-state">
      <h2>Encara no tens receptes favorites</h2>
      <p>Comença a cercar i desa les teves receptes preferides</p>
      <router-link to="/search" class="cta-button">
        Anar a Cercar
      </router-link>
    </div>

    <div v-else class="favorites-grid">
      <ItemCard
        v-for="meal in store.favorites"
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
            @click="removeFavorite(meal.idMeal)" 
            class="btn-remove"
          >
            Eliminar
          </button>
        </template>
      </ItemCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import { useFavoritesStore } from '../stores/favoritesStore'

const router = useRouter()
const store = useFavoritesStore()

const goToDetail = (id) => {
  router.push(`/item/${id}`)
}

const removeFavorite = (id) => {
  store.removeFavorite(id)
}
</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--panel);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 0;
}

.empty-state h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.empty-state p {
  color: #666;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
  color: var(--text);
  text-decoration: none;
  border-radius: 0;
  font-weight: 500;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #555;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.btn-detail,
.btn-remove {
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
  filter: brightness(0.98);
}

.btn-remove {
  background: #fff5f5;
  color: #7a1a1a;
  border: 1px solid #f6d6d6;
}

.btn-remove:hover {
  background: #fff0f0;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>
