<script setup lang="ts">
import { HouseData } from '../types/types'
import { RouterLink } from 'vue-router'

import bathIcon from '../assets/icons/ic_bath@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import EditDeleteButtons from './Edit-delete-buttons.vue'

const props = defineProps<{ house: HouseData }>()

function convertPrice(price: number) {
  return new Intl.NumberFormat('en-DE').format(price)
}
</script>

<template>
  <div class="container-card-item">
    <div class="card-item">
      <RouterLink :to="`/house-details/${props.house?.id}`">
        <div class="info-block">
          <img class="card-item-img" :src="props.house?.image" alt="imageIcon" />
          <div class="container-card-info">
            <div class="house-location">{{ props.house?.location.street }}</div>
            <div class="price-info">€ {{ convertPrice(props.house?.price) }}</div>
            <div class="zip-code-info">{{ props.house?.location.zip }}</div>
            <div class="room-info">
              <span class="icons"
                ><img :src="bedIcon" alt="Bed Icon" />
                <p>{{ props.house?.rooms.bedrooms }}</p></span
              >
              <span class="icons"
                ><img :src="bathIcon" alt="Bath Icon" />
                <p>{{ props.house?.rooms.bathrooms }}</p></span
              >
              <span class="icons"
                ><img :src="sizeIcon" alt="Size Icon" />
                <p>{{ props.house?.size }}</p></span
              >
            </div>
          </div>
        </div>
      </RouterLink>
      <div v-if="props.house?.madeByMe">
        <EditDeleteButtons :house="props.house" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-card-item {
  position: relative;
}
.container-card-item a {
  text-decoration: none;
}
.info-block {
  display: flex;
  align-items: center;
}
.card-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto 30px;
  padding: 20px;
  background-color: var(--element-background-2);
  border-radius: 7px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  & .card-item-img {
    width: 130px;
    height: 130px;
    border-radius: 5px;
    object-fit: cover;
  }
}
.container-card-info {
  margin-left: 20px;
  color: var(--text-secondary);
  font-family: 'Open Sans', sans-serif;

  & div {
    margin-bottom: 8px;
  }
}

.icons img {
  width: 20px;
}

.house-location {
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.house-location::first-letter {
  text-transform: uppercase;
}

.price-info {
  font-weight: 600;
}

.zip-code-info {
  color: var(--element-tertiary-2);
}

.icons {
  margin-right: 10px;
  display: flex;
  & p {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.room-info {
  display: flex;
  align-items: center;
}

.container-btn {
  display: flex;
  & button {
    border: none;
    background-color: transparent;
    margin: 15px 15px 0 0;
    z-index: 99;
  }
}

.btn-tabs img {
  width: 20px;
  opacity: 0.7;
  cursor: pointer;
}

.btn-tabs img:hover {
  opacity: 1;
  transition: 0.3s ease-in-out;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .card-item {
    margin: 0 auto 15px;
    padding: 10px;
    & .card-item-img {
      width: 100px;
      height: 100px;
    }
  }

  .info-block {
    font-size: 80%;
  }

  .icons {
    margin-right: 0;
  }
  .container-card-info {
    margin-left: 15px;
    & div {
      margin-bottom: 3px;
    }
  }

  .container-btn {
    & button {
      margin: 10px 10px 0 0;
    }
  }

  .btn-tabs img {
    width: 15px;
  }
}
</style>
