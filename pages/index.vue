<template>
  <div class="homepage">
    <NuxtLink 
      v-for="card in CardsData"
      :key="card.id"
      :to="`/cards/${card.id}`"
    >
      <BaseCardItem/>
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
  width: 100%;
  height: 100%;
}
</style>