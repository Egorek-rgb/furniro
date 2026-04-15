<script setup>
import { ref, computed } from "vue";
import { cart } from "../../store/cart";
import { format } from "../../store/cart";
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const item = computed(() => {
  return cart.items.find((item) => item.id == props.id);
});

// Создаем массив всех изображений товара
const images = computed(() => {
  if (!item.value) return [];

  // Собираем все изображения, которые есть у товара
  return [
    item.value.img,
    item.value.img2,
    item.value.img3,
    item.value.img4,
    item.value.img5,
  ].filter((img) => img); // убираем пустые значения
});

// Текущее главное изображение (по умолчанию - первое)
const currentMainImage = ref(0); // индекс в массиве images

// Функция смены главного изображения
const setMainImage = (index) => {
  currentMainImage.value = index;
};

// Получаем текущее главное изображение
const mainImage = computed(() => {
  return images.value[currentMainImage.value] || "";
});
</script>

<template>
  <div v-if="item" class="nav-line">
    <router-link to="/">
      <span class="nav-line__home" style="color: #9f9f9f">Home</span>
    </router-link>
    <img src="../assets/dashicons_arrow-up-alt2.png" alt="" />
    <span class="nav-line__shop" style="color: #9f9f9f">Shop</span>
    <img src="../assets/dashicons_arrow-up-alt2.png" alt="" />
    <span class="vertical-line"></span>
    <span class="nav-line__cart-name">{{ item.name }}</span>
  </div>

  <div class="main-content">
    <div class="main-content__galary">
      <!-- Миниатюры (все изображения) -->
      <div class="main-content__mini-photo">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :class="{ active: currentMainImage === index }"
          @click="setMainImage(index)"
          alt=""
          style="width: 76px; height: 80px; border-radius: 5px; cursor: pointer"
        />
      </div>

      <!-- Главное фото -->
      <div class="main-content__main-img">
        <img
          :src="mainImage"
          alt=""
          style="width: 477px; height: 500px; object-fit: cover"
        />
      </div>
    </div>

    <div class="main-content__info">
      <!-- Информация о товаре -->
      <div class="main-content__info-head">
        <h2>{{ item.name }}</h2>
        <p class="price">Rs. {{ format(item.cost) }}</p>
      </div>
      <div class="main-content__info-review">
        <div class="stars">
          <img src="../assets/Vector.svg" alt="" class="star" />
          <img src="../assets/Vector.svg" alt="" class="star" />
          <img src="../assets/Vector.svg" alt="" class="star" />
          <img src="../assets/Vector.svg" alt="" class="star" />
          <img src="../assets/carbon_star-half.svg" alt="" class="half-star" />
        </div>
        <div class="vertical-line"></div>
        <div class="num-of-customers" style="color: #9f9f9f">
          5 Customer Review
        </div>
      </div>
      <div class="main-content__info-description">
        Setting the bar as one of the loudest speakers in its class, the Kilburn
        is a compact, stout-hearted hero with a well-balanced audio which boasts
        a clear midrange and extended highs for a sound.
      </div>
      <div class="main-content__info-size">
        <p style="margin-top: 10px">Size</p>
        <div class="main-content__info-sizes">
          <div class="main-content__info-item">L</div>
          <div class="main-content__info-item">XL</div>
          <div class="main-content__info-item">XS</div>
        </div>
      </div>
      <!-- остальная информация -->
      <p style="margin-top: 10px">Color</p>
      <div class="main-content__info-colors">
        <div
          class="main-content__info-color"
          style="
            background-color: aqua;
            width: 30px;
            height: 30px;
            border-radius: 100%;
          "
        ></div>
        <div
          class="main-content__info-color"
          style="
            background-color: aqua;
            width: 30px;
            height: 30px;
            border-radius: 100%;
          "
        ></div>
        <div
          class="main-content__info-color"
          style="
            background-color: aqua;
            width: 30px;
            height: 30px;
            border-radius: 100%;
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content__info-colors {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}
.main-content__info-item:hover {
  background-color: #b88e2f;
  color: white;
}
.main-content__info-item {
  width: 30px;
  height: 30px;
  background-color: #f9f1e7;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.main-content__info-sizes {
  display: flex;
  gap: 16px;
}
.main-content__info-description {
  max-width: 424px;
  margin-top: 13px;
  font-size: 13px;
}
.stars {
  display: flex;
  gap: 6px;
}
.main-content__info-review {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  align-items: center;
}
.vertical-line {
  height: 30px;
  width: 1px;
  background-color: #9f9f9f;
}
.price {
  font-size: 24px;
  color: #9f9f9f;
}
.main-content {
  display: flex;
  gap: 82px;
}
h2 {
  font-size: 42px;
}
.nav-line {
  background-color: #f9f1e7;
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 99px;
  gap: 25px;
}

.main-content {
  padding-left: 99px;
  padding-top: 32px;
}

.vertical-line {
  height: 37px;
  width: 1px;
  background-color: #9f9f9f;
}

.main-content__galary {
  display: flex;
  gap: 35px;
}

.main-content__mini-photo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.main-content__mini-photo img {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.main-content__mini-photo img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.main-content__mini-photo img.active {
  border: 2px solid #b88e2f;
  box-shadow: 0 4px 8px rgba(184, 142, 47, 0.3);
}

.main-content__main-img img {
  border-radius: 8px;
}
</style>
