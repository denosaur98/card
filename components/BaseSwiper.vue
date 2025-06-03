<template>
  <div :class="props.containerClass" class="custom-swiper-container">
    <div class="custom-pagination" v-if="!isMobile">
      <button 
        v-for="(image, index) in props.images" 
        :key="'thumb-'+index"
        class="pagination-thumb"
        :class="{ 'active': activeIndex === index }"
        @click="slideTo(index)"
      >
        <NuxtImg :src="image"/>
      </button>
    </div>
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :effect="'slide'"
      :loop="false"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev'
      }"
      :pagination="isMobile ? { clickable: true } : false"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
      class="swiper"
    >
      <SwiperSlide v-for="(image, index) in props.images" :key="index">
        <NuxtImg :src="image"/>
      </SwiperSlide>
      <div class="custom-prev" v-if="props.images.length > 1">
        <img src="/assets/icons/arrow.svg" alt="Previous" />
      </div>
      <div class="custom-next" v-if="props.images.length > 1">
        <img src="/assets/icons/arrow.svg" alt="Next" />
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps({
  images: Array,
})

const modules = [Navigation, Pagination]
const swiperInstance = ref(null)
const activeIndex = ref(0)
const isMobile = ref(false)

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 900
}

function onSwiper(swiper) {
  swiperInstance.value = swiper
}

function onSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex
}

function slideTo(index) {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style lang="scss">
.custom-swiper-container {
  position: relative;
  display: flex;
  width: 700px;
  gap: 30px;

  @media (max-width: 1100px) {
    width: 500px;
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
}

.swiper {
  width: 100%;
  overflow: hidden;
  
  :deep(.swiper-pagination) {
    bottom: 10px !important;
    
    .swiper-pagination-bullet {
      background: white;
      opacity: 0.5;
      width: 8px;
      height: 8px;
      margin: 0 4px !important;
      
      &-active {
        opacity: 1;
      }
    }
  }
}

.swiper-slide {
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 1s;

    @media(hover:hover) {
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.custom-pagination {
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 900px) {
    display: none;
  }
}

.pagination-thumb {
  width: 70px;
  height: 90px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  opacity: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  
  &.active {
    opacity: 0.5;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  
  @media (hover:hover) {
    &:hover {
      opacity: 0.8;
    }
  }
}

.swiper-pagination-bullet-active {
  background: var(--base-grey);
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: var(--base-white);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 900px) {
    width: 30px;
    height: 30px;
  }

  @media (hover:hover) {
    &:hover {
      background: var(--base-black);
      
      img {
        filter: brightness(0) invert(1);
      }
    }
  }

  img {
    width: 15px;
    height: 15px;
    transition: all 0.3s ease;

    @media (max-width: 900px) {
      width: 12px;
      height: 12px;
    }
  }
}

.custom-prev {
  left: 20px;

  @media (max-width: 900px) {
    left: 10px;
  }
  
  img {
    transform: rotate(180deg);
  }
}

.custom-next {
  right: 20px;

  @media (max-width: 900px) {
    right: 10px;
  }
}

.swiper-button-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>