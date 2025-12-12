<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo" style="margin-right: 40px;">
        Col·leccionista
      </router-link>
      <br>
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          Inici
        </router-link>
        <router-link to="/search" class="nav-link">
          Cerca
        </router-link>
        <router-link to="/favorites" class="nav-link">
          Favorits
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  background: var(--panel);
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-logo:hover {
  color: #666;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #333;
}

.nav-link.router-link-active {
  color: #333;
  font-weight: 600;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
    gap: 1.5rem;
  }
}
</style>
