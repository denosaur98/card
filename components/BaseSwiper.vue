<template>
  <div :class="props.containerClass">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :effect="'slide'"
      :loop="false"
      :navigation="true"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
      class="swiper"
    >
      <SwiperSlide>

      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

const props = defineProps({
  slides: Array,
})

const modules = [Navigation]
</script>

<style lang="scss" scoped>

</style>