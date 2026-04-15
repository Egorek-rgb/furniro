<template>
  <section class="gallery">
    <div class="gallery__text-content">
      <div class="gallery__subtitle">Share your setup with</div>
      <div class="gallery__title">#FuniroFurniture</div>
    </div>

    <!-- Десктопная версия (скрывается на мобильных) -->
    <div class="gallery__desktop">
      <div class="gallery__main-content">
        <div class="gallery__left-col">
          <div class="gallery__top-line">
            <img
              src="../assets/Rectangle 36.png"
              alt=""
              style="margin-top: -27px"
            />
            <img
              src="../assets/Rectangle 38.png"
              alt=""
              style="margin-top: 43px; margin-left: 16px"
            />
          </div>
          <div class="bottom-line">
            <img
              src="../assets/Rectangle 37.png"
              alt=""
              style="margin-right: 16px"
            />
            <img src="../assets/Rectangle 39.png" alt="" />
          </div>
        </div>
        <div class="gallery__middle-col">
          <img src="../assets/Rectangle 40.png" alt="" />
        </div>
        <div class="gallery__right-col">
          <div class="gallery__right-col-top-line">
            <img
              src="../assets/Rectangle 43.png"
              alt=""
              style="margin-right: 16px; margin-top: 72px"
            />
            <img
              src="../assets/Rectangle 45.png"
              alt=""
              style="margin-top: -13px"
            />
          </div>
          <div class="gallery__right-col-bottom-line">
            <img src="../assets/Rectangle 41.png" alt="" />
            <img
              src="../assets/Rectangle 44.png"
              alt=""
              style="margin-left: 16px"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Мобильный слайдер -->
    <div class="gallery__mobile-slider">
      <div class="slider-container">
        <div
          class="slider-track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(image, index) in sliderImages"
            :key="index"
            class="slide"
          >
            <img :src="image.src" :alt="image.alt" class="slide__image" />
          </div>
        </div>
      </div>

      <!-- Индикаторы (точки) -->
      <div class="slider-dots">
        <button
          v-for="(_, index) in sliderImages"
          :key="index"
          class="slider-dot"
          :class="{ 'slider-dot--active': currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Кнопки навигации -->
      <button class="slider-btn slider-btn--prev" @click="prevSlide">←</button>
      <button class="slider-btn slider-btn--next" @click="nextSlide">→</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);
const getImageUrl = (fileName) => {
  return new URL(`../assets/${fileName}`, import.meta.url).href;
};
const sliderImages = [
  { src: getImageUrl("Rectangle 36.png"), alt: "Furniture 1" },
  { src: getImageUrl("Rectangle 38.png"), alt: "Furniture 2" },
  { src: getImageUrl("Rectangle 37.png"), alt: "Furniture 3" },
  { src: getImageUrl("Rectangle 39.png"), alt: "Furniture 4" },
  { src: getImageUrl("Rectangle 40.png"), alt: "Furniture 5" },
  { src: getImageUrl("Rectangle 43.png"), alt: "Furniture 6" },
  { src: getImageUrl("Rectangle 45.png"), alt: "Furniture 7" },
  { src: getImageUrl("Rectangle 41.png"), alt: "Furniture 8" },
  { src: getImageUrl("Rectangle 44.png"), alt: "Furniture 9" },
];

const nextSlide = () => {
  if (currentSlide.value < sliderImages.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0; // Зацикливание
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = sliderImages.length - 1; // Зацикливание
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Автоматическая прокрутка (опционально)
let autoplayInterval;

onMounted(() => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Менять слайд каждые 5 секунд
});

onUnmounted(() => {
  clearInterval(autoplayInterval);
});
</script>

<style scoped>
.bottom-line {
  display: flex;
}
.gallery__right-col-bottom-line {
  display: flex;
}
.gallery {
  width: min(1200px, 100% - 2rem);
  margin: 4.2rem auto 2rem;
  padding: 2.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.gallery__text-content {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery__subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.gallery__title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text);
}

/* Десктопная версия */
.gallery__desktop {
  display: block;
}

.gallery__main-content {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.gallery__left-col,
.gallery__right-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery__top-line,
.gallery__bottom-line,
.gallery__right-col-top-line,
.gallery__right-col-bottom-line {
  display: flex;
  gap: 1.5rem;
}

/* Мобильный слайдер */
.gallery__mobile-slider {
  display: none;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.slider-container {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.slide {
  flex: 0 0 100%;
}

.slide__image {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
}

/* Индикаторы */
.slider-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.slider-dot--active {
  background-color: var(--brand);
  transform: scale(1.2);
}

/* Кнопки навигации */
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.slider-btn:hover {
  opacity: 1;
  background-color: var(--brand);
  color: white;
}

.slider-btn--prev {
  left: 10px;
}

.slider-btn--next {
  right: 10px;
}

/* Адаптация */
@media (max-width: 768px) {
  .gallery__desktop {
    display: none;
  }

  .gallery__mobile-slider {
    display: block;
  }

  .gallery__title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .gallery {
    padding: 2rem 1rem;
  }

  .gallery__title {
    font-size: 1.5rem;
  }

  .slider-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
