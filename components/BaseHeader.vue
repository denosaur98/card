<template>
  <header class="base-header">
    <NuxtLink to="/" class="header__logo-item">
      <img src="/assets/images/logo.png"/>
    </NuxtLink>
    <nav class="navigation">
      <NuxtLink to="/" class="navigation__item">
        <img src="/assets/icons/search.svg"/>
      </NuxtLink>
      <NuxtLink to="/" class="navigation__item">
        <img src="/assets/icons/favorite.svg"/>
      </NuxtLink>
      <NuxtLink to="/" class="navigation__item">
        <img src="/assets/icons/user.svg"/>
      </NuxtLink>
      <NuxtLink to="/" class="navigation__item">
        <img src="/assets/icons/basket.svg"/>
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.base-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 35px 50px;
  width: 100%;

  .header__logo-item {
    position: absolute;
    width: 60px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    gap: 15px;

    .navigation__item {
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>