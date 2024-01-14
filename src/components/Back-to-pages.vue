<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMonitorSize } from '../utils/monitor-sizes'

import ArrowBack from '../assets/icons/ic_back_grey@3x.png'
import ArrowWithWhite from '../assets/icons/ic_back_white@3x.png'

const { base, xs, sm } = useMonitorSize()
const router = useRouter()

const editPageRoute = router.currentRoute.value.name === 'editListing'
// setup arrow image
const currentArrow = () => {
  return router.currentRoute.value.name === 'HouseDetails' ? ArrowWithWhite : ArrowBack
}
</script>

<template>
  <div :class="{ 'back-to-pages': !base && !xs && !sm, 'back-to-pages-mobile': base || xs || sm }">
    <button>
      <img
        v-if="base || xs || sm"
        :src="currentArrow()"
        alt="ArrowBack"
        @click="$router.push({ name: 'Home' })"
      />
      <img
        v-else
        :src="ArrowBack"
        alt="ArrowBack"
        @click="
          editPageRoute ? $router.push({ name: 'HouseDetails' }) : $router.push({ name: 'Home' })
        "
      />
    </button>
    <span v-if="!base && !xs && !sm">{{
      editPageRoute ? 'Back to details page' : 'Back to overview'
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.back-to-pages {
  padding: 50px 0 30px 0;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 12px;
    opacity: 0.5;
  }

  & button:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
    transform: scale(1.1);
  }
  & img {
    width: 20px;
  }
}

.back-to-pages-mobile {
  padding: 0;
  position: absolute;
  top: 40px;
  left: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 12px;
  }
  & button:hover {
    transition: 0.3s ease-in-out;
    transform: scale(1.1);
  }
  & img {
    width: 26px;
  }
}
</style>
