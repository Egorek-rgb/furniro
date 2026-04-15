<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="catalog-search">
    <svg
      class="catalog-search__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 21L16.65 16.65M10.8 18.2C14.8869 18.2 18.2 14.8869 18.2 10.8C18.2 6.71309 14.8869 3.4 10.8 3.4C6.71309 3.4 3.4 6.71309 3.4 10.8C3.4 14.8869 6.71309 18.2 10.8 18.2Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <input
      :value="modelValue"
      type="search"
      class="catalog-search__input"
      placeholder="Search in catalog..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.catalog-search {
  position: relative;
  width: min(560px, 100%);
  margin: 0 auto 1.2rem;
}

.catalog-search__icon {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a8597;
  pointer-events: none;
}

.catalog-search__input {
  width: 100%;
  min-height: 2.95rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0 1rem 0 2.7rem;
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.catalog-search__input::placeholder {
  color: #8d97a7;
}

.catalog-search__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(184, 142, 47, 0.14);
}
</style>
