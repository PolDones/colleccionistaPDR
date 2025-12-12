<template>
  <div class="search-bar">
    <input
      v-model="query"
      @keyup.enter="handleSearch"
      type="text"
      placeholder="Escriu una lletra (a-z)..."
      class="search-input"
      maxlength="1"
    />
    <button @click="handleSearch" class="search-button">
      Cercar
    </button>
  </div>
</template>

<script setup>
const query = defineModel()
const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', query.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s;
  text-align: center;
  text-transform: uppercase;
}

.search-input:focus {
  border-color: #333;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-button:hover {
  background: #555;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }
}
</style>
