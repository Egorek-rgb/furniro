<script setup>
import { ref, computed } from "vue";
import Group146 from "../assets/Group 146.png";
import Rubbish from "../assets/ant-design_delete-filled.png";
import { cart } from "../../store/cart";
import { deleteCart } from "../../store/cart";
import { format } from "../../store/cart";

const sum = computed(() => {
  let sum = 0;
  for (let index = 0; index < cart.items.length; index++) {
    sum += cart.items[index].cost * cart.items[index].quantity;
  }
  return sum;
});
</script>

<template>
  <img class="cart-img" src="../assets/Group 78.png" alt="" />
  <section class="cart">
    <div class="cart__container">
      <!-- Таблица для десктопа -->
      <div class="table table--desktop">
        <div class="table__head">
          <div class="table__head-item">Product</div>
          <div class="table__head-item">Price</div>
          <div class="table__head-item">Quantity</div>
          <div class="table__head-item">Subtotal</div>
        </div>
        <div
          class="table__col"
          v-for="(item, index) in cart.items"
          :key="index"
        >
          <div class="table__img">
            <router-link :to="{ name: 'CartPage', params: { id: item.id } }">
              <img :src="item.img" alt="" class="main-img" />
            </router-link>
          </div>
          <div class="table__product-name">{{ item.name }}</div>
          <div class="table__product-price">{{ format(item.cost) }}.00</div>
          <input
            type="number"
            class="table__product-quantity"
            v-model.number="item.quantity"
          />
          <div class="table__subtotal">
            {{ format(item.cost * item.quantity) }}.00
          </div>
          <button @click="deleteCart(item)" class="table__rubbish-btn">
            <img :src="Rubbish" alt="Delete" />
          </button>
        </div>
      </div>

      <!-- Мобильная версия корзины -->
      <div class="cart__mobile">
        <div
          v-for="(item, index) in cart.items"
          :key="index"
          class="cart__mobile-item"
        >
          <div class="cart__mobile-header">
            <router-link :to="{ name: 'CartPage', params: { id: item.id } }">
              <img :src="item.img" alt="" class="cart__mobile-img" />
            </router-link>
            <div class="cart__mobile-info">
              <h3 class="cart__mobile-name">{{ item.name }}</h3>
              <div class="cart__mobile-price">{{ format(item.cost) }}.00 ₽</div>
            </div>
            <button @click="deleteCart(item)" class="cart__mobile-delete">
              <img :src="Rubbish" alt="Delete" />
            </button>
          </div>

          <div class="cart__mobile-footer">
            <div class="cart__mobile-quantity">
              <span class="cart__mobile-label">Количество:</span>
              <input
                type="number"
                class="cart__mobile-input"
                v-model.number="item.quantity"
                min="1"
              />
            </div>
            <div class="cart__mobile-subtotal">
              <span class="cart__mobile-label">Подытог:</span>
              <span class="cart__mobile-subtotal-value">
                {{ format(item.cost * item.quantity) }}.00 ₽
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок итогов -->
      <div class="cart__totals">
        <h2 class="cart__totals-head">Cart Totals</h2>
        <div class="cart__totals-main-content">
          <div class="cart__totals-subtotal">
            <div class="cart__totals-subtotal-head">Subtotal</div>
            <div class="cart__totals-subtotal-cost">{{ format(sum) }}.00</div>
          </div>
          <div class="cart__totals-total">
            <div class="cart__totals-total-head">Total</div>
            <div class="cart__totals-total-cost">{{ format(sum) }}.00</div>
          </div>
          <button class="cart__totals-btn" type="submit">Check Out</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Общие стили */
.cart-img {
  width: 100%;
  height: auto;
  display: block;
}

.cart {
  margin-top: 87px;
  padding: 0 20px;
}

.cart__container {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

/* Десктопная таблица */
.table--desktop {
  flex: 1;
  min-width: 300px;
}

.table__head {
  display: flex;
  background-color: #f9f1e7;
  padding-left: 142px;
  height: 55px;
  align-items: center;
  border-radius: 8px;
}

.table__head-item:nth-child(2) {
  margin-left: 114px;
}

.table__head-item:nth-child(3) {
  margin-left: 137px;
}

.table__head-item:nth-child(4) {
  margin-left: 36px;
}

.table__col {
  display: flex;
  margin-top: 55px;
  align-items: center;
  position: relative;
}

.table__product-name {
  margin-left: 34px;
  min-width: 100px;
}

.table__product-price {
  margin-left: 69px;
  min-width: 80px;
}

.table__product-quantity {
  margin-left: 84px;
  margin-right: 56px;
  width: 32px;
  height: 32px;
  text-align: center;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
}

.table__subtotal {
  margin-right: 52px;
  min-width: 100px;
}

.table__rubbish-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.table__rubbish-btn:hover {
  opacity: 0.7;
}

/* Мобильная версия */
.cart__mobile {
  display: none;
  width: 100%;
}

.cart__mobile-item {
  background: #f9f1e7;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
}

.cart__mobile-header {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
}

.cart__mobile-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart__mobile-info {
  flex: 1;
}

.cart__mobile-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.cart__mobile-price {
  font-size: 14px;
  color: #b88e2f;
  font-weight: 500;
}

.cart__mobile-delete {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.cart__mobile-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.cart__mobile-label {
  font-size: 12px;
  color: #666;
  margin-right: 8px;
}

.cart__mobile-input {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  font-size: 14px;
}

.cart__mobile-subtotal-value {
  font-size: 16px;
  font-weight: 600;
  color: #b88e2f;
}

/* Блок итогов */
.cart__totals {
  background-color: #f9f1e7;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
}

.cart__totals-head {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.cart__totals-main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart__totals-subtotal,
.cart__totals-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.cart__totals-subtotal-head,
.cart__totals-total-head {
  font-weight: 600;
}

.cart__totals-subtotal-cost {
  font-size: 16px;
  color: #9f9f9f;
}

.cart__totals-total-cost {
  font-size: 20px;
  color: #b88e2f;
  font-weight: 600;
}

.cart__totals-btn {
  border: 1px solid black;
  width: 100%;
  max-width: 222px;
  height: 59px;
  border-radius: 15px;
  background: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin: 20px auto 0;
  transition: all 0.3s ease;
}

.cart__totals-btn:hover {
  background: #b88e2f;
  color: white;
  border-color: #b88e2f;
}

/* Убираем стрелки у number input */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Адаптация */
@media (max-width: 1024px) {
  .cart__container {
    justify-content: center;
  }

  .cart__totals {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .cart {
    margin-top: 50px;
    padding: 0 15px;
  }

  .table--desktop {
    display: none;
  }

  .cart__mobile {
    display: block;
  }

  .cart__totals-head {
    font-size: 22px;
  }

  .cart__totals-total-cost {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .cart {
    margin-top: 30px;
    padding: 0 10px;
  }

  .cart__mobile-item {
    padding: 12px;
  }

  .cart__mobile-img {
    width: 60px;
    height: 60px;
  }

  .cart__mobile-name {
    font-size: 14px;
  }

  .cart__mobile-price {
    font-size: 12px;
  }

  .cart__mobile-footer {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .cart__mobile-quantity,
  .cart__mobile-subtotal {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cart__totals {
    padding: 15px;
  }

  .cart__totals-head {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .cart__totals-subtotal,
  .cart__totals-total {
    padding: 0 10px;
  }

  .cart__totals-btn {
    height: 50px;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .cart__mobile-header {
    flex-wrap: wrap;
  }

  .cart__mobile-delete {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .cart__mobile-item {
    position: relative;
  }
}
</style>
