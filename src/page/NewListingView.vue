<script setup lang="ts">
import BackToPages from '../components/Back-to-pages.vue'
import DynamicForm from '../components/Dynamic-form.vue'

import { ref } from 'vue'
import { useHousesStore } from '../stores/store'
import { useRouter } from 'vue-router'
import type { HouseListing } from '../types/types'

const housesStore = useHousesStore()
const currentValues = ref({})
const newCreatedHouse = ref<HouseListing>()
const router = useRouter()
// Promises and timeouts
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

    await housesStore.postCreateHouse(formData)
    if (housesStore.newHouse) {
      newCreatedHouse.value = housesStore?.newHouse
    }
    const formUploadImage = new FormData()
    formUploadImage.append('image', image, image.name)

    await delay(1000) // Adjust the delay as needed
    // Upload image after 1 second

    if (housesStore.newHouse?.id) {
      await housesStore.postUploadImage(housesStore.newHouse.id, formUploadImage)
    }
    // Redirect to house details with id
    router.push({ name: 'HouseDetails', params: { id: newCreatedHouse.value?.id } })
  } catch (error) {
    console.error('Error during form submission:', error)
  }
}
const handleSubmit = (values) => {
  submitForm(values)
}
</script>
<template>
  <div class="background-listing">
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
