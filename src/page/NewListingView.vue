<script setup lang="ts">
import { ref } from 'vue'
import { useHousesStore } from '../stores/store'
import { useRouter } from 'vue-router'

import BackToPages from '../components/Back-to-pages.vue'
import DynamicForm from '../components/Dynamic-form.vue'
import Spinner from '../components/Spinner-c.vue'

import type { HouseListing } from '../types/types'

const housesStore = useHousesStore()
const currentValues = ref({})
const newCreatedHouse = ref<HouseListing>()
const router = useRouter()
// PROMISES AND TIMEOUTS
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const submitForm = async (values) => {
  try {
    const formData = new FormData()
    const {
      price,
      bedrooms,
      bathrooms,
      size,
      streetName,
      houseNumber,
      numberAddition,
      zip,
      city,
      constructionYear,
      hasGarage,
      description,
      image
    } = values

    formData.append('price', price)
    formData.append('bedrooms', bedrooms)
    formData.append('bathrooms', bathrooms)
    formData.append('size', size)
    formData.append('streetName', streetName)
    formData.append('houseNumber', houseNumber)
    formData.append('numberAddition', numberAddition)
    formData.append('zip', zip)
    formData.append('city', city)
    formData.append('constructionYear', constructionYear)
    formData.append('hasGarage', hasGarage)
    formData.append('description', description)

    // FETCH VALUES OF HOUSE BY ID TO STORE
    await housesStore.postCreateHouse(formData)
    if (housesStore.newHouse) {
      newCreatedHouse.value = housesStore?.newHouse
    }
    // UPLOAD IMAGE
    const formUploadImage = new FormData()
    formUploadImage.append('image', image, image.name)
    // UPLOAD IMAGE AFTER 1 SECOND
    await delay(1000)

    if (housesStore.newHouse?.id) {
      await housesStore.postUploadImage(housesStore.newHouse.id, formUploadImage)
    }
    // REDIRECT TO HOUSE DETAILS PAGE
    router.push({ name: 'HouseDetails', params: { id: newCreatedHouse.value?.id } })
  } catch (error) {
    console.error('Error during form submission:', error)
  }
}
const handleSubmit = (values: HouseListing) => {
  housesStore.spinnerLoaderTime = true
  submitForm(values)
  housesStore.spinnerLoaderTime = false
}
</script>
<template>
  <div v-if="housesStore.spinnerLoaderTime">
    <Spinner />
  </div>
  <div v-else class="background-listing">
    <div class="container-listing-view">
      <div class="wrapper-back-to-pages">
        <BackToPages />
        <h2 class="title-listing">Create new listing</h2>
      </div>
      <DynamicForm @on-submit="handleSubmit" :currentValues="currentValues" />
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
@media screen and (max-width: 992px) {
  .container-listing-view {
    width: 100%;
    padding: 60px 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 480px) {
    .container-listing-view {
      padding: 80px 20px;
      margin-bottom: 0;
    }
  }
}
</style>
