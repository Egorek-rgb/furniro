<script setup>
const phones = ["+7 (861) 200-02-02", "+7 (918) 010-45-67", "+7 (988) 321-78-90"];

const socials = [
  { name: "VK", href: "https://vk.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
  { name: "Telegram", href: "https://t.me" },
];
</script>

<template>
  <main class="contact-page">
    <section class="contact-section contact-form-card">
      <div class="contact-form-card__intro">
        <p class="contact-form-card__label">Contact us</p>
        <h1 class="contact-form-card__title">Let's create your ideal interior</h1>
        <p class="contact-form-card__description">
          Leave a request and our manager will contact you shortly to clarify
          details, budget and delivery options.
        </p>
      </div>

      <form class="contact-form" @submit.prevent>
        <div class="contact-form__grid">
          <label class="contact-field">
            <span class="contact-field__label">Name</span>
            <input class="contact-field__input" type="text" placeholder="Your name" />
          </label>
          <label class="contact-field">
            <span class="contact-field__label">Phone</span>
            <input class="contact-field__input" type="tel" placeholder="+7 (___) ___-__-__" />
          </label>
        </div>

        <div class="contact-form__grid">
          <label class="contact-field">
            <span class="contact-field__label">Email</span>
            <input class="contact-field__input" type="email" placeholder="you@example.com" />
          </label>
          <label class="contact-field">
            <span class="contact-field__label">Topic</span>
            <input class="contact-field__input" type="text" placeholder="Furniture consultation" />
          </label>
        </div>

        <label class="contact-field">
          <span class="contact-field__label">Message</span>
          <textarea
            class="contact-field__input contact-field__textarea"
            rows="5"
            placeholder="Write your message"
          ></textarea>
        </label>

        <button class="contact-form__btn" type="submit">Send request</button>
      </form>
    </section>

    <section class="contact-section map-card">
      <h2 class="map-card__title">Our location: Gallery Krasnodar</h2>
      <div class="map-card__wrapper">
        <iframe
          title="Gallery Krasnodar on Google Maps"
          src="https://maps.google.com/maps?width=100%25&height=450&hl=ru&q=45.040216,38.974556+(ТРЦ%20Галерея%20Краснодар)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <a
        class="map-card__link"
        href="https://www.google.com/maps/place/%D0%A2%D0%A0%D0%A6+%D0%93%D0%B0%D0%BB%D0%B5%D1%80%D0%B5%D1%8F+%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80/@45.040216,38.974556,15z"
        target="_blank"
        rel="noreferrer"
      >
        Open in Google Maps
      </a>
    </section>

    <section class="contact-section contacts-grid">
      <article class="contacts-grid__col">
        <h3 class="contacts-grid__title">Phones</h3>
        <ul class="contacts-grid__list">
          <li v-for="phone in phones" :key="phone">{{ phone }}</li>
        </ul>
      </article>

      <article class="contacts-grid__col">
        <h3 class="contacts-grid__title">Address</h3>
        <p class="contacts-grid__text">
          Krasnaya St, 176/5, TRC "Gallery Krasnodar", Krasnodar, Russia
        </p>
      </article>

      <article class="contacts-grid__col">
        <h3 class="contacts-grid__title">Socials</h3>
        <ul class="contacts-grid__list contacts-grid__list--social">
          <li v-for="social in socials" :key="social.name">
            <a :href="social.href" target="_blank" rel="noreferrer">
              {{ social.name }}
            </a>
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  width: min(1200px, 100% - 2rem);
  margin: 2rem auto 3rem;
  display: grid;
  gap: 1.4rem;
}

.contact-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.contact-form-card {
  padding: 1.5rem;
  display: grid;
  gap: 1.2rem;
}

.contact-form-card__label {
  color: var(--brand-dark);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  font-weight: 600;
}

.contact-form-card__title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.1;
  margin-top: 0.3rem;
}

.contact-form-card__description {
  margin-top: 0.7rem;
  max-width: 62ch;
  color: var(--text-muted);
}

.contact-form {
  display: grid;
  gap: 1rem;
}

.contact-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}

.contact-field {
  display: grid;
  gap: 0.4rem;
}

.contact-field__label {
  font-weight: 500;
}

.contact-field__input {
  min-height: 2.8rem;
  border: 1px solid var(--border);
  background: var(--surface-soft);
  border-radius: 12px;
  padding: 0.65rem 0.8rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-field__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(184, 142, 47, 0.15);
}

.contact-field__textarea {
  resize: vertical;
  min-height: 6.2rem;
}

.contact-form__btn {
  justify-self: start;
  min-height: 2.9rem;
  padding: 0 1.4rem;
  border-radius: 999px;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(135deg, var(--brand), #c79d3c);
  box-shadow: 0 12px 24px rgba(184, 142, 47, 0.28);
}

.map-card {
  padding: 1.2rem;
}

.map-card__title {
  font-size: 1.25rem;
  margin-bottom: 0.85rem;
}

.map-card__wrapper {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.map-card iframe {
  width: 100%;
  min-height: 390px;
  border: 0;
}

.map-card__link {
  display: inline-block;
  margin-top: 0.75rem;
  color: var(--brand-dark);
  font-weight: 600;
}

.contacts-grid {
  padding: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.contacts-grid__col {
  background: var(--surface-soft);
  border-radius: 14px;
  padding: 1rem;
}

.contacts-grid__title {
  font-size: 1.05rem;
  margin-bottom: 0.7rem;
}

.contacts-grid__list {
  display: grid;
  gap: 0.45rem;
  color: var(--text-muted);
}

.contacts-grid__text {
  color: var(--text-muted);
}

.contacts-grid__list--social a {
  color: var(--text);
  transition: color 0.2s ease;
}

.contacts-grid__list--social a:hover {
  color: var(--brand);
}

@media (max-width: 860px) {
  .contact-form__grid {
    grid-template-columns: 1fr;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .map-card iframe {
    min-height: 320px;
  }
}
</style>
