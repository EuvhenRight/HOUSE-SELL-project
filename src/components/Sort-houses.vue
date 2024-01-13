<script setup lang="ts">
import { useHousesStore } from '../stores/store'
import iconArrow from '../assets/icons/icon-arrow.svg'

const houseStore = useHousesStore()
</script>

<template>
  <div class="container-sort">
    <ul class="sort-list">
      <li
        @click="houseStore.sortHousesByPrice"
        class="price-list"
        :class="{ 'active-list': houseStore.sortedBy }"
      >
        Price
        <img
          v-if="houseStore.ascendingOrder"
          class="icon-arrow"
          :src="iconArrow"
          alt="Arrow Icon"
        />
        <img v-else class="icon-arrow rotate" :src="iconArrow" alt="Arrow Icon" />
      </li>
      <li
        @click="houseStore.sortHousesBySize"
        class="size-list"
        :class="{ 'active-list': !houseStore.sortedBy }"
      >
        Size
        <img
          v-if="houseStore.ascendingOrder"
          class="icon-arrow"
          :src="iconArrow"
          alt="Arrow Icon"
        />
        <img v-else class="icon-arrow rotate" :src="iconArrow" alt="Arrow Icon" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container-sort {
  margin: 20px 0;
}
.sort-list {
  display: flex;
}
.sort-list li {
  list-style: none;
  color: var(--element-background-2);
  background-color: var(--element-tertiary-2);
  width: 150px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.price-list {
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-list {
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

li.active-list {
  background-color: var(--element-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

@media (max-width: 806px) {
  .sort-list li {
    width: 100%;
  }
}
</style>
