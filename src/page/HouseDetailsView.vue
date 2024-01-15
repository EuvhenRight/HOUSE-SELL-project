<script setup lang="ts">
import bathIcon from '../assets/icons/ic_bath@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import constructionIcon from '../assets/icons/ic_construction_date@3x.png'
import garageIcon from '../assets/icons/ic_garage@3x.png'
import locationIcon from '../assets/icons/ic_location@3x.png'
import priceIcon from '../assets/icons/ic_price@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import BackToPages from '../components/Back-to-pages.vue'
import CardItemRecommended from '../components/Card-item-recommended.vue'
import EditDeleteButtons from '../components/Edit-delete-buttons.vue'

import { useRoute } from 'vue-router'
import { useHousesStore } from '../stores/store'
import { onMounted, ref } from 'vue'

// size monitor view
const housesStore = useHousesStore()
const route = useRoute()
const rawId = route.params.id as string
// Assuming you have 'id' available
const id = parseInt(rawId, 10)
const data = ref()

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
            <div class="house-address">
              {{ house?.location.street }} {{ house?.location.houseNumber }}
              {{
                house?.location.houseNumberAddition === 'undefined'
                  ? ''
                  : house?.location.houseNumberAddition
              }}
            </div>
            <div v-if="house?.madeByMe">
              <EditDeleteButtons :house="house" />
            </div>
          </div>
          <div class="house-details-location">
            <span><img :src="locationIcon" alt="Location Icon" /></span>
            {{ house?.location.city }} {{ house?.location.zip }}
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
              <p class="details-info">Built in {{ house?.constructionYear }}</p>
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
                <p class="details-info">{{ house?.hasGarage === true ? 'Yes' : 'No' }}</p></span
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
        <CardItemRecommended />
        <CardItemRecommended />
        <CardItemRecommended />
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
  margin-bottom: 50px;
}

@media (min-width: 992px) and (max-width: 1321px) {
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
    margin-bottom: 50px;
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
    margin-bottom: 75px;
  }
  .house-details-content {
    position: static;
  }
}
@media screen and (max-width: 480px) {
  .container-house-details {
    margin-bottom: 0;
  }
}
</style>
