<script setup lang="ts">
import emptyHousesImg from '../assets/images/img_empty_houses@3x.png'
import CardItem from '../components/Card-item.vue'
import CreateNewBtn from '../components/Create-new-btn.vue'
import SearchBar from '../components/Search-bar.vue'
import SortHouses from '../components/Sort-houses.vue'

import { useHousesStore } from '../stores/store'
import { HouseData } from '../types/types'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const housesStore = useHousesStore()
// REACTIVE DATA
const data = ref<HouseData[]>([])

// WATCH FOR CHANGES
watch(
  () => housesStore.housesData,
  (newData) => {
    data.value = newData
  }
)
onMounted(async () => {
  await housesStore.getDataHouses()
  data.value = housesStore?.housesData
})
// WATCH FOR CHANGES
watch(
  () => housesStore.searchData,
  (newData) => {
    data.value = newData
  }
)
// COMPUTED FUNCTION CHANGES WHEN SEARCH VALUE CHANGES AND COUNT OF HOUSES
const resultString = computed(() =>
  housesStore.searchHousesCount === 1
    ? `${housesStore.searchHousesCount} result found`
    : `${housesStore.searchHousesCount} results found`
)
</script>

<template>
  <div class="container-home-view">
    <section class="home-view-top">
      <div class="container-search-view">
        <h2>Houses</h2>
        <RouterLink to="/new_listing"> <CreateNewBtn /></RouterLink>
      </div>
      <div class="container-sort-view">
        <SearchBar />
        <Sort-houses />
      </div>
    </section>
    <!-- DEFAULT VIEW WHEN NO SEARCH -->
    <section class="container-home-main" v-if="!housesStore.searchValue">
      <ul class="list-houses" v-auto-animate>
        <li v-for="(house, index) in data" :key="index">
          <CardItem :house="house" />
        </li>
      </ul>
    </section>
    <!-- SEARCH VIEW WHEN SEARCHING -->
    <section v-if="housesStore.searchValue" class="container-home-search">
      <div v-if="housesStore.searchHousesCount > 0">
        <h2>{{ resultString }}</h2>
        <ul class="list-houses" v-auto-animate>
          <li v-for="(house, index) in housesStore.searchData" :key="index">
            <CardItem :house="house" />
          </li>
        </ul>
      </div>
      <!-- EMPTY HOUSES VIEW -->
      <div v-if="housesStore.searchHousesCount === 0" class="container-empty-houses">
        <img :src="emptyHousesImg" alt="Not Found" />
        <p>No results found</p>
        <p>Please try another keyword.</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.container-home-view {
  margin: 30px auto 0;
  width: 1320px;
}
.container-home-search h2 {
  margin: 30px 0 20px 0;
}
.home-view-top {
  display: flex;
  flex-direction: column;
}
.container-sort-view {
  display: flex;
  justify-content: space-between;
}
.container-search-view {
  display: flex;
  justify-content: space-between;
}
.container-search-view a {
  text-decoration: none;
}

.list-houses li {
  list-style: none;
}
.container-empty-houses {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin-top: 50px;
  color: var(--text-secondary);

  & img {
    width: 400px;
    margin: 50px 0;
  }
}
@media (min-width: 993px) and (max-width: 1321px) {
  .container-home-view {
    width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .container-home-view {
    width: 100%;
    padding: 40px 20px;
    margin: 0 auto;
  }
  .container-home {
    width: 100%;
  }
  .container-search-view {
    & h2 {
      margin-left: 40%;
    }
  }
  .container-sort-view {
    margin-top: 30px;
  }
}
@media (max-width: 806px) {
  .container-sort-view {
    flex-direction: column;
  }
}
</style>
