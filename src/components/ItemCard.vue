<template>
  <div class="item-card">
    <div class="card-image">
      <img :src="item.strMealThumb" :alt="item.strMeal" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ item.strMeal }}</h3>
      <p class="card-info">
        <span class="label">Categoria:</span>
        {{ item.strCategory }}
      </p>
      <p class="card-info">
        <span class="label">Àrea:</span>
        {{ item.strArea }}
      </p>
      
      <div class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.item-card {
  background: var(--panel);
  border: 1px solid #e5e7eb;
  border-radius: 0;
  overflow: hidden;
  transition: border-color 0.2s;
}

.item-card:hover {
  border-color: #999;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f9fafb;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-info {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.label {
  font-weight: 500;
  color: #333;
}

.card-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
