<template>
  <section class="banner">
    <div class="banner__collection container">
      <div class="banner__wrapper">
        <h2 class="banner__subtitle">New Arrival</h2>
        <h1 class="banner__title">Discover Our <br />New Collection</h1>
        <div class="banner__description">
          Curated furniture collections for modern homes. Minimal shapes, warm
          textures and timeless comfort.
        </div>
        <button class="banner__btn">BUY NOW</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: min(1200px, 100% - 2rem);
  margin-inline: auto;
}

.banner {
  min-height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  background-image: linear-gradient(
      90deg,
      rgba(16, 23, 35, 0.2) 0%,
      rgba(16, 23, 35, 0.05) 35%,
      rgba(16, 23, 35, 0) 55%
    ),
    url("../assets/bg.jpg");
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  overflow: hidden;
}

.banner__collection {
  display: flex;
  justify-content: flex-end;
}

.banner__wrapper {
  max-width: 560px;
  padding: 2rem 2.2rem;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.banner__subtitle {
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--brand-dark);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.banner__title {
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.08;
  font-weight: 700;
  color: #1d2433;
  margin-bottom: 1rem;
}

.banner__description {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 48ch;
}

.banner__btn {
  margin-top: 1.5rem;
  min-height: 3.2rem;
  padding: 0 1.7rem;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--brand), #c79d3c);
  box-shadow: 0 12px 22px rgba(184, 142, 47, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.banner__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 24px rgba(184, 142, 47, 0.35);
}

@media (max-width: 900px) {
  .banner {
    min-height: 75vh;
    background-position: 62% center;
  }

  .banner__collection {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .banner__wrapper {
    padding: 1.5rem;
  }
}
</style>
