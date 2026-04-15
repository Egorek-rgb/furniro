<script setup>
import { ref, computed } from "vue";
import { addToCart } from "../../store/cart";
import CatalogSearch from "./CatalogSearch.vue";
import { catalogProducts } from "../data/catalogProducts";

const setHovered = (index) => {
  hoveredIndex.value = index;
};

const clearHovered = () => {
  hoveredIndex.value = null;
};
const items = ref(catalogProducts);
const format = (value) => {
  return `Rs. ${value.toLocaleString("en-US")}`;
};
const hoveredIndex = ref(null);
const searchQuery = ref("");

const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return items.value;

  return items.value.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });
});
</script>

<template>
  <section id="catalog" class="products">
    <h2 class="products__head">Our Products</h2>
    <CatalogSearch v-model="searchQuery" />
    <ul class="products__listing">
      <li
        class="products-item"
        @mouseenter="setHovered(index)"
        @mouseleave="clearHovered"
        v-for="(item, index) in filteredItems"
        :key="item.id"
      >
        <div class="products-item__picture">
          <img :src="item.img" alt="" class="products-item__img" />
        </div>
        <div class="products-item__info">
          <div class="products-item__name">{{ item.name }}</div>
          <div class="products-item__description">{{ item.description }}</div>
          <div class="products-item__cost">
            {{ format(item.cost) }}
            <span class="products-item__sale">{{ format(item.sale) }}</span>
          </div>
        </div>
        <transition name="fade">
          <div v-if="hoveredIndex === index" class="card__overlay">
            <button @click="addToCart(item)" class="card__overlay-btn">
              Add to cart
            </button>
            <div class="icons">
              <div class="icon">
                <img src="../assets/gridicons_share.svg" alt="" />
                <div class="text">Share</div>
              </div>
              <div class="icon">
                <img src="../assets/gridicons_share.svg" alt="" />
                <div class="text">Compare</div>
              </div>
              <div class="icon">
                <img src="../assets/gridicons_share.svg" alt="" />
                <div class="text">Like</div>
              </div>
            </div>
          </div>
        </transition>
      </li>
    </ul>
    <p v-if="!filteredItems.length" class="products__empty">
      No products found. Try another query.
    </p>
    <div class="wrapper">
      <button class="products__btn">Show More</button>
    </div>
  </section>
</template>

<style scoped>
.products {
  width: min(1200px, 100% - 2rem);
  margin: 0 auto;
}

.products__head {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.8rem;
}

.products__listing {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
}

.products-item {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.products-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.products-item__img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.products-item__info {
  padding: 1rem;
}

.products-item__name {
  color: var(--text);
  font-weight: 600;
  font-size: 1.25rem;
}

.products-item__description {
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.products-item__cost {
  margin-top: 0.8rem;
  font-size: 1.05rem;
  font-weight: 700;
}

.products-item__sale {
  text-decoration: line-through;
  color: #9ca4b3;
  font-size: 0.92rem;
  font-weight: 400;
  margin-left: 0.5rem;
}

.card__overlay {
  position: absolute;
  inset: 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: white;
  z-index: 2;
  background: linear-gradient(
    160deg,
    rgba(17, 24, 39, 0.65),
    rgba(17, 24, 39, 0.42)
  );
  backdrop-filter: blur(2px);
}

.card__overlay-btn {
  color: #fff;
  background: linear-gradient(135deg, var(--brand), #c79d3c);
  min-height: 2.85rem;
  min-width: 11rem;
  border-radius: 999px;
  font-weight: 600;
}

.icons {
  display: flex;
  gap: 0.75rem;
}

.icon {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
}

.products__btn {
  color: var(--brand);
  border: 1px solid var(--brand);
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.products__btn:hover {
  background: var(--brand);
  color: #fff;
}

.wrapper {
  text-align: center;
  margin-top: 1.6rem;
}

.products__empty {
  text-align: center;
  color: var(--text-muted);
  margin-top: 1rem;
}

@media (max-width: 1100px) {
  .products__listing {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 840px) {
  .products__listing {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .products__listing {
    grid-template-columns: 1fr;
  }
}
</style>
