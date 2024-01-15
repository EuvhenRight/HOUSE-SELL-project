<script setup lang="ts">
import { useHousesStore } from '../stores/store'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ houseId: number }>()
const emit = defineEmits(['close-pop-up'])

const housesStore = useHousesStore()
const containerRef = ref<HTMLElement | null>(null)
const router = useRouter()
const currentRout = router.currentRoute.value.name === 'Home'
const id = props.houseId

const handleClickInside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value?.contains(event.target as HTMLElement)) {
    emit('close-pop-up')
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickInside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickInside)
})
// FETCH DELETE HOUSE BY ID
const deleteHouse = async (id: number) => {
  await housesStore.deleteHouseItem(id)
  currentRout ? emit('close-pop-up') : router.push({ name: 'Home' })
  await housesStore.getDataHouses()
}
const onClosePopUp = () => {
  emit('close-pop-up')
}
</script>

<template>
  <div class="container-delete-pop-up">
    <div class="pop-up-body">
      <div class="popup-form" noValidate>
        <h2>Delete listing</h2>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
        <button @click="deleteHouse(id)" class="delete-submit-button" type="submit">
          YES, DELETE
        </button>
        <button class="delete-go-back-button" @click="onClosePopUp" type="button">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-delete-pop-up {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-up-body {
  position: absolute;
  width: 500px;
  height: 300px;
  text-align: center;
  border-radius: 15px;
  border-color: black;
  background: var(--element-background-2);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  padding: 50px;
}
.popup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popup-form h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}
.popup-form p {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}
.popup-form button {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: var(--element-background-2);
}

.delete-submit-button {
  margin-top: 40px;
  background-color: var(--element-primary);
  & :hover {
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
  }
}

.delete-go-back-button {
  margin-top: 20px;
  background-color: var(--element-secondary);
}

.delete-go-back-button:hover {
  transition: 0.2s ease-in-out;
  transform: scale(1.02);
}

.delete-submit-button:hover {
  transition: 0.2s ease-in-out;
  transform: scale(1.02);
}

@media screen and (max-width: 550px) {
  .container-delete-pop-up {
    padding: 0 20px;
  }
  .pop-up-body {
    width: 100%;
    position: relative;
  }
  .popup-form p {
    font-size: 12px;
  }
  .popup-form button {
    font-size: 12px;
  }
  .popup-form h2 {
    font-size: 18px;
  }
}
</style>
