<template>
  <div class="home-page">
    <div class="hero">
      <h1>Col·leccionista de Receptes</h1>
      <p class="subtitle">Descobreix, cerca i desa les teves receptes favorites</p>
      <router-link to="/search" class="cta-button">
        Començar a cercar
      </router-link>
    </div>
    
    <div class="features">
      <div class="feature">
        <h3>Cerca</h3>
        <p>Troba receptes de tot el món</p>
      </div>
      <div class="feature">
        <h3>Favorits</h3>
        <p>Desa les teves receptes preferides</p>
      </div>
      <div class="feature">
        <h3>Detalls</h3>
        <p>Veu ingredients i instruccions</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--panel);
  border: 1px solid #e5e7eb;
  border-radius: 0;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #666;
}

.cta-button {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #333;
  color: white;
  text-decoration: none;
  border-radius: 0;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #555;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: var(--panel);
  border: 1px solid #e5e7eb;
  border-radius: 0;
  transition: border-color 0.2s;
}

.feature:hover {
  border-color: #999;
}

.feature h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.feature p {
  color: #666;
  font-size: 0.95rem;
}
</style>
