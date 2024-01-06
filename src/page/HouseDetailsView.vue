<script setup lang="ts">
import bathIcon from '../assets/icons/ic_bath@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import constructionIcon from '../assets/icons/ic_construction_date@3x.png'
import deleteIcon from '../assets/icons/ic_delete@3x.png'
import deleteWhiteIcon from '../assets/icons/ic_delete_white@3x.png'
import editIcon from '../assets/icons/ic_edit@3x.png'
import editWhiteIcon from '../assets/icons/ic_edit_white@3x.png'
import garageIcon from '../assets/icons/ic_garage@3x.png'
import locationIcon from '../assets/icons/ic_location@3x.png'
import priceIcon from '../assets/icons/ic_price@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import HouseImage from '../assets/images/img_placeholder_house@3x.png'
import BackToPages from '../components/Back-to-pages.vue'
import CardItemRecommended from '../components/Card-item-recommended.vue'

import { useMonitorSize } from '../utils/monitor-sizes'
import { RouterLink, useRoute } from 'vue-router'
import { HouseData } from '../types/types'
import { useHousesStore } from '../stores/store'
import { onMounted, reactive, ref } from 'vue'

const house = ref<HouseData | null>(null)

// size monitor view
const { base, xs, sm } = useMonitorSize()
const housesStore = useHousesStore()
const route = useRoute()
const rawId = route.params.id as string
// Assuming you have 'id' available
const id = parseInt(rawId, 10)
const data = ref<HouseData>()

onMounted(async () => {
  await housesStore.getHouseById(id)
  data.value = housesStore.houseData
})

function convertPrice(price) {
  return new Intl.NumberFormat('en-DE').format(price)
}
</script>

<template>
  <div class="container-house-details">
    <div class="wrapper-house-details">
      <BackToPages />
      <div v-for="(house, index) in data" :key="index" class="house-details-main">
        <img class="house-details-img" :src="house?.image" alt="HouseImage" />
        <div class="house-details-content">
          <div class="wrapper-house-address">
            <div class="house-address">{{ house?.location.street }}</div>
            <div class="container-btn">
              <button class="btn-tabs">
                <img :src="!base && !xs && !sm ? editIcon : editWhiteIcon" alt="Edit Icon" />
              </button>
              <RouterLink to="/delete_house">
                <button class="btn-tabs">
                  <img
                    :src="!base && !xs && !sm ? deleteIcon : deleteWhiteIcon"
                    alt="Delete Icon"
                  />
                </button>
              </RouterLink>
            </div>
          </div>
          <div class="house-details-location">
            <span><img :src="locationIcon" alt="Location Icon" /></span>
            {{ house?.location.street }} {{ house?.location.zip }}
          </div>
          <div class="house-details-info">
            <div>
              <span class="house-details-icons"
                ><img :src="priceIcon" alt="Price Icon" class="house-details-icons" />
                <p class="details-info">{{ convertPrice(house?.price) }}</p></span
              >
              <span><img :src="sizeIcon" alt="Size Icon" class="house-details-icons" /></span>
              <p class="details-info">{{ house?.size }}</p>
              <span
                ><img :src="constructionIcon" alt="Construction Icon" class="house-details-icons"
              /></span>
              <p class="details-info">{{ house?.constructionYear }}</p>
            </div>
            <div>
              <span class="house-details-icons"
                ><img :src="bedIcon" alt="Bed Icon" />
                <p class="details-info">{{ house?.rooms.bedrooms }}</p></span
              >
              <span class="house-details-icons"
                ><img :src="bathIcon" alt="Bath Icon" />
                <p class="details-info">{{ house?.rooms.bathrooms }}</p></span
              >
              <span class="house-details-icons"
                ><img :src="garageIcon" alt="Garage Icon" />
                <p class="details-info">{{ house?.hasGarage }}</p></span
              >
            </div>
          </div>
          <div class="house-description">{{ house?.description }}</div>
        </div>
      </div>
    </div>
    <div class="house-recommended-container">
      <h2>Recommended for you</h2>
      <div class="recommended-cards">
        <CardItemRecommended />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-house-details {
  width: 1320px;
  margin: 0 auto;
  display: flex;
}
.house-details-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
}
.house-details-img {
  width: 800px;
  height: 550px;
  object-fit: cover;
  object-position: center;
}
.house-details-content {
  position: relative;
  padding: 40px 30px 20px 30px;
  background-color: var(--element-background-2);
}
.wrapper-house-address {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
}
.house-address {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: var(--text-primary);
}
.house-details-location {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.house-details-location img {
  width: 20px;
  margin-right: 10px;
}
.house-details-info {
  & div {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
}

.house-details-info img {
  width: 20px;
}

.house-details-icons {
  margin-right: 10px;
  display: flex;
}

.house-details-icons img {
  margin-right: 10px;
}

.details-info {
  margin-right: 26px;
}

.house-description {
  padding: 20px 0;
}
.container-btn {
  display: flex;
  & button {
    border: none;
    background-color: transparent;
    margin-left: 20px;
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

.house-recommended-container h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: 20px;
}
.house-recommended-container {
  width: 100%;
  padding: 100px 0 0 100px;
}

@media (min-width: 992px) and (max-width: 1319px) {
  .container-house-details {
    width: 100%;
    padding: 0 20px;
  }
  .house-details-img {
    width: auto;
    height: 395px;
  }

  .house-recommended-container {
    padding: 100px 0 0 50px;
  }
}

@media screen and (max-width: 991px) {
  .container-house-details {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .house-details-main {
    width: 100%;
  }

  .house-details-img {
    width: 100%;
    height: 100%;
  }

  .house-details-content {
    border-top-left-radius: 42px;
    border-top-right-radius: 42px;
    margin-top: -42px;
  }
  .house-recommended-container {
    padding: 36px 30px 0 30px;
  }
  .container-btn {
    position: absolute;
    top: 50px;
    right: 36px;
  }
  .house-details-content {
    position: static;
  }

  .btn-tabs img {
    opacity: 1;
  }
}
</style>
