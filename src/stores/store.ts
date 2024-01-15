import type { HouseData } from '@/types/types'
import { defineStore } from 'pinia'
import type { HouseListing } from './../types/types'
import { apiService } from './../utils/api-service'

export const useHousesStore = defineStore('HouseStore', {
  state: () => {
    return {
      housesData: [] as HouseData[], // HOUSE DATA ARRAY STATE
      houseData: {} as HouseData, // HOUSE DATA STATE
      sortedBy: null as boolean | null, // TRIGGER SORT STATE
      searchData: [] as HouseData[], // SEARCH DATA ARRAY
      searchValue: null as string | null, // SEARCH VALUE STATE
      newHouse: {} as HouseListing | null, // NEW HOUSE STATE
      editHouse: {} as HouseListing | null, // EDIT HOUSE STATE
      changePrice: true as boolean, // CHANGE PRICE STATE
      changeSize: true as boolean // CHANGE SIZE STATE
    }
  },
  getters: {
    // SEARCH DATA ARRAY GETTER
    searchHousesCount: (state) => state.searchData.length,
    filteredHouses: (state) => {
      const searchData = state.housesData.filter((house) => {
        const searchQueryLower = state.searchValue || ''.toLowerCase()

        const matchesCondition = (property: string, value: HouseData[keyof HouseData]) => {
          return value.toString().toLowerCase().includes(searchQueryLower)
        }
        return (
          matchesCondition('location.street', house.location.street) ||
          matchesCondition('location.houseNumber', house.location.houseNumber) ||
          matchesCondition('price', house.price) ||
          matchesCondition('location.zip', house.location.zip) ||
          matchesCondition('size', house.size) ||
          matchesCondition('size m2', house.size + ' m2') ||
          matchesCondition('location.city', house.location.city)
        )
      })
      state.searchData = searchData
    }
  },
  actions: {
    // ACTIONS FOR HOUSES
    async getDataHouses() {
      try {
        const response = await apiService<HouseData[]>(import.meta.env.VITE_API_MAIN_URL, 'GET')
        this.housesData = response.data || []
        this.sortHousesByPrice()
      } catch (error) {
        console.error(error)
      }
    },
    async getHouseById(id: number) {
      try {
        const response = await apiService<HouseData>(
          `${import.meta.env.VITE_API_MAIN_URL}/${id}`,
          'GET'
        )
        this.houseData = response.data || null
      } catch (error) {
        console.error('Error in API request:', error)
      }
    },
    async postCreateHouse(params: FormData) {
      try {
        const response = await apiService<HouseListing>(
          import.meta.env.VITE_API_MAIN_URL,
          'POST',
          params
        )
        this.newHouse = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async postUploadImage(id: number, params: FormData) {
      try {
        const response = await apiService<HouseListing>(
          `${import.meta.env.VITE_API_MAIN_URL}/${id}/upload`,
          'POST',
          params
        )
        this.newHouse = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async postEditHouse(id: number, params: FormData) {
      try {
        const response = await apiService<HouseListing>(
          `${import.meta.env.VITE_API_MAIN_URL}/${id}`,
          'POST',
          params
        )
        this.editHouse = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async postEditUploadImage(id: number, params: FormData) {
      try {
        const response = await apiService<HouseListing>(
          `${import.meta.env.VITE_API_MAIN_URL}/${id}/upload`,
          'POST',
          params
        )
        this.editHouse = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteHouseItem(id: number) {
      try {
        await apiService<HouseData>(`${import.meta.env.VITE_API_MAIN_URL}/${id}`, 'DELETE')
      } catch (error) {
        console.error(error)
      }
    },
    sortHousesByPrice(): void {
      // TOGGLE SORTING ORDER
      this.changePrice = !this.changePrice

      // SORT BY PRICE
      if (this.changePrice) {
        this.housesData.sort((a, b) => a.price - b.price)
      } else {
        this.housesData.sort((a, b) => b.price - a.price)
      }
      // TRIGGER A REACTIVITY UPDATE
      this.housesData = [...this.housesData]
      this.sortedBy = true
    },
    sortHousesBySize(): void {
      // TOGGLE SORTING ORDER
      this.changeSize = !this.changeSize

      if (this.changeSize) {
        this.housesData.sort((a, b) => a.size - b.size)
      } else {
        this.housesData.sort((a, b) => b.size - a.size)
      }
      // TRIGGER A REACTIVITY UPDATE
      this.housesData = [...this.housesData]
      this.sortedBy = false
    }
  }
})
