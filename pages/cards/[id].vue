<template>
  <div class="card-page">
    <div class="card-top-items">
      <BaseSwiper
        :images="cardItem.images"
      />
      <div class="card__info">
        <div class="info__column-block">
          <h1 class="info__title">{{ cardItem.title }}</h1>
          <h2 class="info__price">{{ cardItem.price }} RUB</h2>
        </div>
        <div class="info__column-block">
          <h3 class="info__subtitle">Размеры:</h3>
          <div class="info__row-block">
            <div v-for="(button, index) in cardItem.sizes" :key="index" class="sizes__button-wrapper">
              <button 
                :class="[
                  'sizes__button',
                  button.amount === 'подписка' ? 'disabled' : 'not-disabled',
                  activeSize?.title === button.title ? 'active-size' : ''
                ]" 
                @click="changeActiveSize(button)"
              >
                {{ button.title }}
              </button>
              <p v-if="button.amount" :class="button.amount === 'подписка' ? 'amount disabled' : 'amount not-disabled'">{{ button.amount }}</p>
            </div>
          </div>
        </div>
        <div class="info__column-block" v-if="cardItem.colors">
          <h3 class="info__subtitle">Цвет: {{ activeColor?.title }}</h3>
          <div class="info__row-block">
            <div 
              v-for="(color, index) in cardItem.colors" 
              :key="index" 
              :class="{ 'active-color': activeColor?.title === color.title }"
            >
              <button
                class="row__color-button" 
                :style="{
                  backgroundColor: color.color,
                  border: color.title === 'Белый' ? '1px solid var(--base-grey)' : 'none'
                }"
                @click="changeActiveColor(color)"
              ></button>
            </div>
          </div>
        </div>
        <div class="info__row-block">
          <button class="row__add-button">Добавить в корзину</button>
          <button class="row__favorite-button">
            <img src="/assets/icons/favorite.svg"/>
          </button>
        </div>
        <div class="info__column-block" v-if="cardItem.colors">
          <div class="accordion__item">
            <p class="accordion__title">Описание</p>
            <div class="accordion__icon">
              <img src="/assets/icons/plus.svg"/>
            </div>
          </div>
          <div class="accordion__item">
            <p class="accordion__title">Состав и уход</p>
            <div class="accordion__icon">
              <img src="/assets/icons/plus.svg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cards__items-wrapper">
      <h1 class="items__block-title">Похожие товары</h1>
      <div class="cards__container">
        <NuxtLink
          v-if="CardsData"
          v-for="card in CardsData"
          :key="card.id"
          :to="`/cards/${card.id}`"
        >
          <BaseCardItem
            :cardImage="card.images?.[0] || ''"
            :cardTitle="card.title"
            :cardPrice="card.price"
            :cardOldPrice="card.oldPrice"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseSwiper from '~/components/BaseSwiper.vue';
import BaseCardItem from '~/components/BaseCardItem.vue';
import CardsData from '/server/cardsData.json'

const route = useRoute()

const cardItem = computed(() => {
  return CardsData.find(i => i.id === Number(route.params.id))
})

const activeColor = ref(null)
function changeActiveColor(color) {
  activeColor.value = color
}

const activeSize = ref(null)
function changeActiveSize(size) {
  if (size.amount !== 'подписка') {
    activeSize.value = size
  }
}

watch(cardItem, (newVal) => {
  if (newVal?.colors?.length) {
    activeColor.value = newVal.colors[0]
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.card-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
  padding: 0 40px;

  @media (max-width: 900px) {
    padding: 0;
  }

  .card-top-items {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 60px;

    @media (max-width: 900px) {
      flex-direction: column;
      gap: 30px;
    }

    .card__info {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 360px;
      gap: 35px;

      @media (max-width: 900px) {
        width: 100%;
        padding: 0 20px;
      }

      .info__column-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .info__title {
        color: var(--base-black);
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0%;
        text-align: left;
        text-transform: uppercase;
      }

      .info__price {
        color: var(--base-black);
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0%;
        text-align: left;
        text-transform: uppercase;
      }

      .info__subtitle {
        color: var(--base-dark-grey);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0%;
        text-align: left;
      }

      .info__row-block {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 15px;

        .active-color {
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: var(--base-light-black);
            transform: scaleX(1);
            transition: transform 0.3s ease;
          }
        }

        .sizes__button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 50px;
          gap: 5px;

          .sizes__button {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 25px;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0%;
            text-align: left;
            text-transform: uppercase;
            background: inherit;
            color: inherit;
          }

          .active-size {
            border: 1px solid var(--base-black);
            background: var(--base-black);
            color: var(--base-white) !important;
          }

          .not-disabled {
            border: 1px solid var(--base-black);
            color: var(--base-black);
          }

          .disabled {
            color: var(--base-grey);
            border: 1px solid var(--base-grey);
          }

          .amount {
            border: none;
            font-size: 10px;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0%;
            text-align: center;
          }
        }

        .row__color-button {
          cursor: pointer;
          width: 30px;
          height: 30px;
          background: inherit;
          border: none;
        }

        .row__add-button {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 25px;
          background: var(--base-black);
          color: var(--base-white);
          font-size: 11px;
          font-weight: 400;
          line-height: 15px;
          letter-spacing: 0%;
          text-align: center;
          text-transform: uppercase;
          border: 1px solid var(--base-black);
          width: 100%;
          height: 50px;
          transition: all 0.3s ease;

          @media(hover:hover) {
            &:hover {
              border: 1px solid var(--base-black);
              color: var(--base-black);
              background: var(--base-white);
            }
          }
        }

        .row__favorite-button {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 50px;
          border: 1px solid var(--base-black);
          background: none;

          @media (max-width: 900px) {
            position: absolute;
            top: 0;
            right: 15px;
            border: none;
            width: max-content;
            height: max-content;
          }

          img {
            width: 25px;
            height: 25px;
          }
        }
      }

      .accordion__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 15px 15px 15px 0;
        background-color: none;
        width: 100%;
        justify-content: space-between;
        border: 1px solid var(--base-light-grey);
        border-left: none;
        border-right: none;

        &:last-child { border-top: none; }

        .accordion__title {
          color: var(--base-black);
          font-size: 10px;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 0%;
          text-align: left;
          text-transform: uppercase;

          .accordion__icon {
            min-width: 50px;
            min-height: 50px;
            max-width: 50px;
            margin: 50px;
            width: 100%;
            height: 100%;

            img {
              background-size: cover;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .cards__items-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 30px;

    @media (max-width: 900px) {
      padding: 0 20px;
    }

    .items__block-title {
      color: var(--base-black);
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0%;
      text-align: left;
      text-transform: uppercase;
    }

    .cards__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      gap: 10px;

      @media (max-width: 720px) {
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 390px) {
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: flex-start;
        flex-wrap: nowrap;
      }
    }
  }
}
</style>