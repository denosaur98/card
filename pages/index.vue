<template>
  <div class="homepage">
    <NuxtLink 
      v-for="card in CardsData"
      :key="card.id"
      :to="`/cards/${card.id}`"
    >
      <BaseCardItem
        :cardImage="card.images[0]"
        :cardTitle="card.title"
        :cardPrice="card.price"
        :cardOldPrice="card.oldPrice"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
import BaseCardItem from '~/components/BaseCardItem.vue';
import CardsData from '../server/cardsData.json'

</script>

<style lang="scss" scoped>
.homepage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 0 50px;
  gap: 30px;

  @media (max-width: 800px) {
    justify-content: center;
  }

  @media (max-width: 720px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 490px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    flex-wrap: nowrap;
    gap: 10px;
    padding: 0 20px;
  }
}
</style>