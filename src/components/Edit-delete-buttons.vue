<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useMonitorSize } from '../utils/monitor-sizes'
import { ref } from 'vue'

import deleteIcon from '../assets/icons/ic_delete@3x.png'
import editIcon from '../assets/icons/ic_edit@3x.png'
import deleteWhiteIcon from '../assets/icons/ic_delete_white@3x.png'
import editWhiteIcon from '../assets/icons/ic_edit_white@3x.png'
import DeleteListingPopUp from '../components/Delete-listing-pop-up.vue'

import type { HouseData } from '../types/types'

const props = defineProps<{ house: HouseData }>()
// MONITOR SIZE MIDDLEWARE
const { base, xs, sm } = useMonitorSize()
// STATE VARIABLES
const popUpCurrentBehavior = ref<boolean>(false)

const route = useRoute()
const currentRoute = route.name === 'Home'

const toggleOpenDelPopUp = () => {
  popUpCurrentBehavior.value = true
}
const toggleCloseDelPopUp = () => {
  popUpCurrentBehavior.value = false
}
</script>

<template>
  <DeleteListingPopUp
    v-if="popUpCurrentBehavior"
    :houseId="props.house.id"
    @close-pop-up="toggleCloseDelPopUp"
  />
  <div
    :class="
      currentRoute ? 'container-btn' : !base && !xs && !sm ? 'container-btn' : 'mobile-container'
    "
  >
    <RouterLink :to="{ name: 'editListing', params: { id: house?.id } }">
      <button class="btn-tabs">
        <img
          :src="currentRoute ? editIcon : !base && !xs && !sm ? editIcon : editWhiteIcon"
          alt="Edit Icon"
        />
      </button>
    </RouterLink>
    <button class="btn-tabs" @click="toggleOpenDelPopUp">
      <img
        :src="currentRoute ? deleteIcon : !base && !xs && !sm ? deleteIcon : deleteWhiteIcon"
        alt="Delete Icon"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.container-btn {
  display: flex;
  & button {
    border: none;
    background-color: transparent;
    margin-left: 15px;
    z-index: 99;
  }
}
.btn-tabs img {
  width: 20px;
  opacity: 0.9;
  cursor: pointer;
}
.btn-tabs img:hover {
  opacity: 1;
  transition: 0.3s ease-in-out;
  transform: scale(1.1);
}
@media screen and (max-width: 991px) {
  .mobile-container {
    position: absolute;
    top: 20px;
    right: 20px;
    & button {
      border: none;
      background-color: transparent;
      margin: 15px 15px 0 0;
      z-index: 99;
    }
  }
}
@media screen and (max-width: 768px) {
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
