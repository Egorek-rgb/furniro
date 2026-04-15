<template>
  <section class="rooms">
    <h2 class="rooms__title">Browse The Range</h2>
    <p class="rooms__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <div class="rooms__categories">
      <div class="rooms__category">
        <img src="../assets/Mask Group.png" alt="" class="rooms__dining" />
        <p>Dining</p>
      </div>
      <div class="rooms__category">
        <img src="../assets/Mask Group.png" alt="" class="rooms__dining" />
        <p>Living</p>
      </div>
      <div class="rooms__category">
        <img src="../assets/Mask Group.png" alt="" class="rooms__dining" />
        <p>Bedroom</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rooms {
  width: min(1200px, 100% - 2rem);
  margin: 4.2rem auto;
  text-align: center;
}

.rooms__title {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--text);
}

.rooms__description {
  color: var(--text-muted);
  max-width: 56ch;
  margin: 0.6rem auto 0;
}

.rooms__categories {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.rooms__category {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 0.8rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.rooms__category:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.rooms__dining {
  width: 100%;
  aspect-ratio: 5 / 6;
  object-fit: cover;
  border-radius: 16px;
}

.rooms__category p {
  font-size: 1.08rem;
  font-weight: 600;
  margin-top: 0.85rem;
}

@media (max-width: 900px) {
  .rooms__categories {
    grid-template-columns: 1fr;
  }
}
</style>
