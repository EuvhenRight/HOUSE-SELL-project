<script setup lang="ts">
import ArrowBack from '../assets/icons/ic_back_grey@3x.png'
</script>

<template>
  <div class="back-to-pages">
    <button>
      <img :src="ArrowBack" alt="ArrowBack" />
    </button>
    <span>Back to overview</span>
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
</style>
