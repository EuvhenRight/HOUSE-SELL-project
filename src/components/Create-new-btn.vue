<script setup lang="ts">
import IconPlusMobile from '../assets/icons/ic_plus_grey@3x.png'
import IconPlus from '../assets/icons/ic_plus_white@3x.png'
import { useMonitorSize } from '../utils/monitor-sizes'

const { xs, sm } = useMonitorSize()
</script>

<template>
  <button v-if="!xs && !sm" class="create-btn">
    <span>
      <img :src="IconPlus" alt="IconPlus" />
    </span>
    <span class="create-btn-text">CREATE NEW</span>
  </button>
  <!-- Mobile View -->
  <button v-if="xs || sm" class="create-btn-mobile">
    <span>
      <img :src="IconPlusMobile" alt="IconPlusMobile" />
    </span>
  </button>
</template>

<style scoped>
.create-btn {
  padding: 10px;
  background-color: var(--element-primary);
  border: none;
  border-radius: 8px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & img {
    height: 20px;
    margin-right: 20px;
  }
}
.create-btn-mobile {
  padding: 0;
  background-color: var(--element-background-1);
  width: auto;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & img {
    height: 20px;
    margin-right: 20px;
  }
}

.create-btn-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--element-background-2);
}
</style>
