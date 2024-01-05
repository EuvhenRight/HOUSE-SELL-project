<script setup lang="ts">
import BackToPages from '../components/Back-to-pages.vue'
import DynamicForm from '../components/Dynamic-form.vue'
import { formSchema } from '../utils/form-scheme'
</script>

<template>
  <div class="background-listing">
    <div class="container-listing-view">
      <div class="wrapper-back-to-pages">
        <BackToPages />
        <h2 class="title-listing">Create new listing</h2>
      </div>
      <DynamicForm :schema="formSchema" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-listing-view {
  margin: 0 auto;
  width: 1320px;
}
.background-listing {
  background-image: url(../assets/images/img_background@3x.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.title-listing {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

@media (min-width: 993px) and (max-width: 1321px) {
  .container-listing-view {
    width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .container-listing-view {
    width: 100%;
    padding: 40px 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
