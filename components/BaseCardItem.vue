<template>
  <div class="base-card">
    <div class="card__image-wrapper">
      <NuxtImg :src="props.cardImage" class="card__image" :alt="props.cardTitle"/>
    </div>
    <div class="card__info">
      <h1 class="info__title">{{ props.cardTitle }}</h1>
      <div class="info__price-wrapper">
        <p class="price" v-if="props.cardPrice">{{ props.cardPrice }}</p>
        <p class="old-price" v-if="props.cardOldPrice">{{ props.cardOldPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  cardImage: String,
  cardTitle: String,
  cardPrice: Number,
  cardOldPrice: Number
})
</script>

<style lang="scss" scoped>
.base-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 335px;
  width: 100%;

  @media (max-width: 720px) {
    max-width: 170px;
    max-height: 280px;
    height: 100%;
  }

  .card__image-wrapper {
    width: 100%;
    height: 445px;
    overflow: hidden;
    z-index: 999;

    @media (max-width: 720px) {
      height: 225px;
    }

    .card__image {
      width: 100%;
      height: 100%;
      transition: 1s;
      object-fit: cover;

      @media(hover:hover) {
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  .card__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    width: 100%;

    @media (max-width: 720px) {
      height: 80px;
    }

    .info__title {
      color: var(--base-black);
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0%;
      text-align: left;
      text-transform: lowercase;
    }

    .info__price-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;

      .price {
        color: var(--base-black);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0%;
        text-align: left;
        text-transform: uppercase;
      }

      .old-price {
        color: var(--base-grey);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0%;
        text-align: left;
        text-decoration-line: line-through;
        text-transform: uppercase;
      }
    }
  }
}
</style>