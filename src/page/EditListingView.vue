<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHousesStore } from '../stores/store'
import { useRouter, useRoute } from 'vue-router'

import BackToPages from '../components/Back-to-pages.vue'
import DynamicForm from '../components/Dynamic-form.vue'

import type { HouseListing } from '../types/types'

const housesStore = useHousesStore()
const currentValues = ref({})
const newEditedHouse = ref<HouseListing>()

const router = useRouter()
const route = useRoute()

// ASSUMING YOU HAVE 'id' AVAILABLE
const rawId = route.params.id as string
const id = parseInt(rawId, 10)
// PROMISES AND TIMEOUTS
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

onMounted(async () => {
  // FETCH VALUES OF HOUSE BY ID FROM STORE
  await housesStore.getHouseById(id)

  currentValues.value = {
    streetName: housesStore.houseData[0].location.street,
    houseNumber: housesStore.houseData[0].location.houseNumber,
    numberAddition:
      housesStore.houseData[0].location.houseNumberAddition === 'undefined'
        ? ''
        : housesStore.houseData[0].location.houseNumberAddition,
    zip: housesStore.houseData[0].location.zip,
    city: housesStore.houseData[0].location.city,
    constructionYear: housesStore.houseData[0].constructionYear,
    hasGarage: housesStore.houseData[0].hasGarage,
    description: housesStore.houseData[0].description,
    image: housesStore.houseData[0].image,
    bedrooms: housesStore.houseData[0].rooms.bedrooms,
    bathrooms: housesStore.houseData[0].rooms.bathrooms,
    size: housesStore.houseData[0].size,
    price: housesStore.houseData[0].price
  }
})
// SUBMIT FORM
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

    // POST FORM DATA TO API
    await housesStore.postEditHouse(id, formData)
    // ADDED EDIT DATA OF HOUSE TO STORE
    if (housesStore.editHouse) {
      newEditedHouse.value = housesStore?.editHouse
    }

    const formUploadImage = new FormData()
    // UPLOAD IMAGE IF CHECK "BLOP" IS TRUE
    if (values.image instanceof Blob) {
      formUploadImage.append('image', image, image.name)

      // UPLOAD IMAGE AFTER WAITING 1 SECOND
      await delay(1000)
      await housesStore.postEditUploadImage(housesStore.houseData[0].id, formUploadImage)
    }
    // REDIRECT TO HOUSE DETAILS BY ID
    router.push({ name: 'HouseDetails', params: { id: newEditedHouse.value?.id } })
  } catch (error) {
    console.error('Error during form submission:', error)
  }
}
const handleSubmit = (values: HouseListing) => {
  submitForm(values)
}
</script>
<template>
  <div class="background-edit-listing">
    <div class="container-edit-listing-view">
      <div class="wrapper-back-to-pages">
        <BackToPages />
        <h2 class="title-edit-listing">Edit listing</h2>
      </div>
      <DynamicForm @on-submit="handleSubmit" :currentValues="currentValues" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-edit-listing-view {
  margin: 0 auto;
  width: 1320px;
}
.background-edit-listing {
  background-image: url(../assets/images/img_background@3x.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.title-edit-listing {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
@media (min-width: 993px) and (max-width: 1321px) {
  .container-edit-listing-view {
    width: 100%;
    padding: 0 20px;
  }
}
@media screen and (max-width: 992px) {
  .container-edit-listing-view {
    width: 100%;
    padding: 60px 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 480px) {
    .container-edit-listing-view {
      padding: 80px 20px;
      margin-bottom: 0;
    }
  }
}
</style>
