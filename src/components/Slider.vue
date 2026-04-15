<template>
  <section class="slider">
    <div class="slider__wrapper">
      <div class="slider__text">
        <h2 class="slider__title">
          50+ Beautiful rooms <br />
          inspiration
        </h2>
        <p class="slider__description">
          Our designer already made a lot of beautiful <br />prototipe of rooms
          that inspire you
        </p>
        <button class="slider__btn">Explore More</button>
      </div>

      <div class="slider__main-content">
        <!-- Первое изображение (главное) -->
        <div
          class="slider__first-img"
          :style="{ backgroundImage: `url(${images[currentIndex]})` }"
        >
          <div class="img-info">
            <div class="img-info__title">
              {{ formatNumber(currentIndex + 1) }}
              <span class="horizontal-line"></span>Bed Room
            </div>
            <div class="img-info__subtitle">Inner Peace</div>
          </div>
          <button class="slider__arrow" @click="nextSlide">
            <img src="../assets/Vector 1.svg" alt="Next" />
          </button>
        </div>

        <!-- Второе изображение (следующее) -->
        <div
          class="slider__next-img"
          :style="{
            backgroundImage: `url(${images[nextIndex]})`,
            filter: 'brightness(0.9) saturate(1.2) hue-rotate(10deg)',
          }"
          @click="nextSlide"
        >
          <div class="slider__next-overlay">
            <span class="slider__next-number">{{
              formatNumber(nextIndex + 1)
            }}</span>
          </div>
        </div>

        <!-- Третье изображение (следующее после следующего) -->
        <div
          class="slider__third-img"
          :style="{
            backgroundImage: `url(${images[thirdIndex]})`,
            filter: 'brightness(0.8) saturate(1.4) hue-rotate(20deg)',
          }"
          @click="nextSlide"
        >
          <div class="slider__third-overlay">
            <span class="slider__third-number">{{
              formatNumber(thirdIndex + 1)
            }}</span>
          </div>
        </div>

        <!-- Индикаторы -->
        <div class="slider__indicators">
          <button
            v-for="(_, index) in images"
            :key="index"
            class="slider__indicator"
            :class="{ 'slider__indicator--active': index === currentIndex }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

// Массив с изображениями
const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

// Массив с изображениями (используем правильные пути)
const images = [
  getImageUrl("Rectangle 25.png"),
  getImageUrl("Rectangle 24.png"),
  getImageUrl("Rectangle 40.png"),
  getImageUrl("Rectangle 38.png"),
  getImageUrl("Rectangle 41.png"),
];

const currentIndex = ref(0);

// Вычисляем индекс следующего изображения
const nextIndex = computed(() => {
  return (currentIndex.value + 1) % images.length;
});

// Вычисляем индекс третьего изображения
const thirdIndex = computed(() => {
  return (currentIndex.value + 2) % images.length;
});

// Переход к следующему слайду
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// Переход к конкретному слайду
const goToSlide = (index) => {
  currentIndex.value = index;
};

// Форматирование номера с ведущим нулем
const formatNumber = (num) => {
  return num < 10 ? `0${num}` : num.toString();
};
</script>

<style scoped>
.slider {
  width: min(1200px, 100% - 2rem);
  margin: 4.2rem auto 0;
  padding: 2.2rem;
  background: linear-gradient(135deg, #fff8e9, #f8f2e6);
  border-radius: 24px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.slider__wrapper {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: center;
}

.slider__text {
  flex: 0 0 300px;
}

.slider__title {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 20px;
}

.slider__description {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 30px;
}

.slider__btn {
  padding: 12px 36px;
  background: linear-gradient(135deg, var(--brand), #c79d3c);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider__btn:hover {
  background-color: #9a7426;
}

.slider__main-content {
  flex: 1;
  display: flex;
  gap: 20px;
  position: relative;
  min-height: 500px;
}

/* Первое изображение (главное) */
.slider__first-img {
  flex: 0 0 60%;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  min-height: 500px;
}

.slider__first-img:hover {
  transform: scale(1.02);
}

.img-info {
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 14px;
  backdrop-filter: blur(5px);
}

.img-info__title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.horizontal-line {
  width: 30px;
  height: 2px;
  background-color: #b88e2f;
  display: inline-block;
  margin: 0 10px;
}

.img-info__subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.slider__arrow {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--brand), #c79d3c);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 2;
}

.slider__arrow:hover {
  background-color: #9a7426;
}

.slider__arrow img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

/* Второе изображение */
.slider__next-img {
  flex: 0 0 30%;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 400px;
  align-self: flex-end;
}

.slider__next-img:hover {
  transform: scale(1.02);
  filter: brightness(1) saturate(1) hue-rotate(0deg) !important;
}

.slider__next-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 15px;
  border-radius: 6px;
  backdrop-filter: blur(3px);
}

.slider__next-number {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* Третье изображение */
.slider__third-img {
  position: absolute;
  right: -100px;
  bottom: 0;
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.slider__third-img:hover {
  transform: scale(1.02);
  opacity: 1;
  filter: brightness(1) saturate(1) hue-rotate(0deg) !important;
  right: -90px;
}

.slider__third-overlay {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px 12px;
  border-radius: 4px;
  backdrop-filter: blur(2px);
}

.slider__third-number {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* Индикаторы */
.slider__indicators {
  position: absolute;
  bottom: -40px;
  left: 0;
  display: flex;
  gap: 12px;
}

.slider__indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s;
}

.slider__indicator--active {
  background-color: #b88e2f;
  transform: scale(1.3);
}

.slider__indicator:hover {
  background-color: #b88e2f;
}

/* Адаптация */
@media (max-width: 1200px) {
  .slider {
    padding: 40px 40px;
  }

  .slider__third-img {
    display: none;
  }

  .slider__main-content {
    min-height: 400px;
  }

  .slider__first-img {
    min-height: 400px;
  }

  .slider__next-img {
    min-height: 320px;
  }
}

@media (max-width: 768px) {
  .slider {
    padding: 30px 20px;
  }

  .slider__wrapper {
    flex-direction: column;
    gap: 30px;
  }

  .slider__text {
    flex: none;
    width: 100%;
    text-align: center;
  }

  .slider__title {
    font-size: 32px;
  }

  .slider__main-content {
    width: 100%;
    min-height: 350px;
  }

  .slider__first-img {
    flex: 0 0 70%;
    min-height: 350px;
  }

  .slider__next-img {
    flex: 0 0 25%;
    min-height: 280px;
  }

  .img-info {
    left: 15px;
    bottom: 15px;
    padding: 12px;
  }

  .img-info__subtitle {
    font-size: 18px;
  }

  .slider__arrow {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }
}

@media (max-width: 480px) {
  .slider__main-content {
    min-height: 300px;
  }

  .slider__first-img {
    min-height: 300px;
  }

  .slider__next-img {
    display: none;
  }

  .slider__first-img {
    flex: 0 0 100%;
  }

  .slider__indicators {
    bottom: -30px;
  }
}
</style>
