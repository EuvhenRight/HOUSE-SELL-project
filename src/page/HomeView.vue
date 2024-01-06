<script setup lang="ts">
import CardItem from '../components/Card-item.vue'
import CreateNewBtn from '../components/Create-new-btn.vue'
import SearchBar from '../components/Search-bar.vue'
import SortHouses from '../components/Sort-houses.vue'

import { useHousesStore } from '../stores/store'
import { HouseData } from '../types/types'
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const housesStore = useHousesStore()
const data = ref<HouseData[]>([])

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
    <section class="container-home-main">
      <ul class="list-houses" v-auto-animate>
        <li v-for="(house, index) in data" :key="index">
          <CardItem :house="house" />
        </li>
      </ul>
    </section>
    <!-- <section class="container-home-search">
      <h2>Results searching</h2>
      <CardItem />
      <div class="container-empty-houses">
        <img :src="emptyHousesImg" alt="Not Found" />
        <p>No results found</p>
        <p>Please try another keyword.</p>
      </div>
    </section> -->
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
