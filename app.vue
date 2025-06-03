<template>
  <div class="app">
    <BaseHeader/>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import BaseHeader from './components/BaseHeader.vue';
</script>