<script setup>
import { cart } from "../../store/cart";
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { catalogProducts } from "../data/catalogProducts";

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const searchWrapperRef = ref(null);
const searchInputRef = ref(null);
const router = useRouter();

const count = computed(() => {
  let sum = 0;
  for (let i = 0; i < cart.items.length; i++) {
    sum += cart.items[i].quantity;
  }
  return sum;
});

const circleSizeClass = computed(() => {
  if (count.value >= 100) return "circle-xl";
  return "circle-sm";
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const searchSuggestions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return [];

  return catalogProducts
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    })
    .slice(0, 6);
});

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value;

  if (isSearchOpen.value) {
    await nextTick();
    searchInputRef.value?.focus();
  } else {
    searchQuery.value = "";
  }
};

const formatPrice = (value) => {
  return `Rs. ${value.toLocaleString("en-US")}`;
};

const selectSuggestion = async () => {
  isSearchOpen.value = false;
  searchQuery.value = "";
  await router.push("/");
  requestAnimationFrame(() => {
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

const handleOutsideClick = (event) => {
  if (!isSearchOpen.value) return;
  if (!searchWrapperRef.value?.contains(event.target)) {
    isSearchOpen.value = false;
    searchQuery.value = "";
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="header__logo">
        <img src="../assets/logo.svg" alt="" />
      </a>

      <!-- Навигация для десктопа -->
      <nav class="nav nav--desktop">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/" @click="closeMenu">Home</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/shop" @click="closeMenu">Shop</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/about" @click="closeMenu">About</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/contact" @click="closeMenu">Contact</router-link>
          </li>
        </ul>
      </nav>

      <div class="header__icons" ref="searchWrapperRef">
        <a href="" class="accaunt-icon header__icon">
          <img
            src="../assets/accaunt.svg"
            alt=""
            class="accaunt-icon__icon icon"
          />
        </a>
        <button class="search-icon header__icon" @click.stop="toggleSearch">
          <img
            src="../assets/search.svg"
            alt=""
            class="search-icon__icon icon"
          />
        </button>
        <a href="" class="heart-icon header__icon">
          <img src="../assets/heart.svg" alt="" class="heart-icon__icon icon" />
        </a>
        <router-link to="/shop" class="shop-icon header__icon">
          <img src="../assets/shop.svg" alt="" class="shop-icon__icon icon" />
          <span
            v-if="cart.items.length > 0"
            class="circle"
            :class="circleSizeClass"
          >
            {{ count }}
          </span>
        </router-link>

        <div v-if="isSearchOpen" class="search-dropdown">
          <input
            ref="searchInputRef"
            v-model.trim="searchQuery"
            type="text"
            class="search-dropdown__input"
            placeholder="Type product name..."
          />

          <ul v-if="searchQuery && searchSuggestions.length" class="search-list">
            <li
              v-for="item in searchSuggestions"
              :key="item.id"
              class="search-list__item"
            >
              <button class="search-list__btn" @click="selectSuggestion(item)">
                <img :src="item.img" :alt="item.name" class="search-list__img" />
                <span class="search-list__meta">
                  <span class="search-list__name">{{ item.name }}</span>
                  <span class="search-list__description">{{ item.description }}</span>
                </span>
                <span class="search-list__price">{{ formatPrice(item.cost) }}</span>
              </button>
            </li>
          </ul>

          <div v-else-if="searchQuery" class="search-dropdown__empty">
            Nothing found for "{{ searchQuery }}"
          </div>
        </div>
      </div>

      <!-- Бургер кнопка -->
      <button
        class="burger"
        @click="toggleMenu"
        :class="{ 'burger--active': isMenuOpen }"
      >
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>

      <!-- Мобильное меню -->
      <transition name="slide">
        <nav v-if="isMenuOpen" class="nav nav--mobile">
          <ul class="nav__list nav__list--mobile">
            <li class="nav__item">
              <router-link to="/" @click="closeMenu">Home</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/shop" @click="closeMenu">Shop</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/about" @click="closeMenu">About</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/contact" @click="closeMenu"
                >Contact</router-link
              >
            </li>
          </ul>
        </nav>
      </transition>

      <!-- Оверлей для закрытия меню при клике вне -->
      <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.header__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Десктопная навигация */
.nav--desktop {
  display: none;
}

@media (min-width: 769px) {
  .nav--desktop {
    display: block;
  }

  .nav--mobile {
    display: none;
  }

  .burger {
    display: none;
  }
}

.nav__list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.25s ease;
}

.nav__item a:hover {
  color: var(--brand);
}

/* Стили для бургера */
.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.burger__line {
  width: 100%;
  height: 3px;
  background-color: var(--text);
  transition: all 0.3s ease;
  border-radius: 3px;
}

.burger--active .burger__line:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.burger--active .burger__line:nth-child(2) {
  opacity: 0;
}

.burger--active .burger__line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Мобильное меню */
.nav--mobile {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background-color: var(--surface);
  box-shadow: -14px 0 32px rgba(17, 24, 39, 0.15);
  z-index: 1000;
  padding: 80px 2rem 2rem;
}

.nav__list--mobile {
  flex-direction: column;
  gap: 1.5rem;
}

.nav__list--mobile .nav__item {
  font-size: 1.2rem;
}

/* Анимация для меню */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Оверлей */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(17, 24, 39, 0.42);
  z-index: 999;
}

/* Иконки */
.shop-icon {
  position: relative;
}

.header__icons {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  position: relative;
}

.header__icon {
  width: 2.15rem;
  height: 2.15rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.header__icon:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.header__logo img {
  filter: drop-shadow(0 8px 14px rgba(184, 142, 47, 0.2));
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 0.8rem);
  right: 0;
  width: min(560px, 88vw);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow-md);
  padding: 0.7rem;
  z-index: 1200;
}

.search-dropdown__input {
  width: 100%;
  min-height: 2.6rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 0.85rem;
}

.search-dropdown__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(184, 142, 47, 0.15);
}

.search-list {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.4rem;
}

.search-list__btn {
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem;
  border-radius: 10px;
}

.search-list__btn:hover {
  background: var(--surface-soft);
}

.search-list__img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
}

.search-list__meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.search-list__name {
  font-weight: 600;
  color: var(--text);
}

.search-list__description {
  font-size: 0.86rem;
  color: var(--text-muted);
}

.search-list__price {
  margin-left: auto;
  color: var(--brand-dark);
  font-weight: 600;
  font-size: 0.9rem;
}

.search-dropdown__empty {
  margin-top: 0.5rem;
  color: var(--text-muted);
  font-size: 0.92rem;
  padding: 0.4rem 0.2rem;
}

.circle {
  position: absolute;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  color: white;
  background: linear-gradient(135deg, #ff5a72, #f43f5e);
  border-radius: 100%;
  top: -6px;
  right: -8px;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(244, 63, 94, 0.35);
}

.circle-xl {
  width: 25px;
}

@media (max-width: 680px) {
  .header__icon {
    width: 30px;
    height: 30px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>
