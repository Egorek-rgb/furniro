import { reactive } from "vue";
export const cart = reactive({
  items: [],
});

export function addToCart(product) {
  console.log("Добавляемый товар:", product);
  console.log(cart.items.length);
  console.log("Корзина до добавления:", cart.items);
  const existing = cart.items.find((item) => item.id === product.id);
  console.log("Найденный элемент:", existing);
  if (existing) {
    existing.quantity++;
    console.log("Ищем товар с id:", product.id);
    console.log("Текущая корзина:", cart.items);
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
}

export function deleteCart(product) {
  const existing = cart.items.find((item) => item.id === product.id);

  if (existing) {
    if (existing.quantity === 1) {
      cart.items.shift(existing);
    } else {
      existing.quantity--;
    }
  }
}

export function format(value) {
  return `Rs. ${value.toLocaleString("en-US")}`;
}
