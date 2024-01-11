import type { HouseData } from '@/types/types'
import { defineStore } from 'pinia'
import type { HouseListing } from './../types/types'
import { apiService } from './../utils/api-service'

export const useHousesStore = defineStore('HouseStore', {
  state: () => {
    return {
      housesData: [] as HouseData[],
      houseData: {} as HouseData,
      sortedBy: null as boolean | null, // triggered by price or size
      searchData: [] as HouseData[],
      searchValue: null as string | null, // Search value input field
      newHouse: {} as HouseListing | null
    }
  },
  getters: {
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
        console.log(this.newHouse, 'newHouse')
        console.log(response.data, 'response.data') // response.data
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
        console.log(this.newHouse)
      } catch (error) {
        console.error(error)
      }
    },
    sortHousesByPrice(): void {
      // Sort by price
      this.housesData.sort((a, b) => a.price - b.price)

      // Trigger a reactivity update
      this.housesData = [...this.housesData]
      this.sortedBy = true
    },
    sortHousesBySize(): void {
      // Sort by size
      this.housesData.sort((a, b) => a.size - b.size)

      // Trigger a reactivity update
      this.housesData = [...this.housesData]
      this.sortedBy = false
    }
  }
})
