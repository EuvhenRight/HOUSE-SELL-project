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
      newHouse: {} as HouseListing | null,
      editHouse: {} as HouseListing | null,
      ascendingOrder: true as boolean
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
      // Toggle sorting order
      this.ascendingOrder = !this.ascendingOrder
      // Set rotatingIcon to true when sorting is active

      // Sort by price
      if (this.ascendingOrder) {
        this.housesData.sort((a, b) => a.price - b.price)
      } else {
        this.housesData.sort((a, b) => b.price - a.price)
      }
      // Trigger a reactivity update
      this.housesData = [...this.housesData]
      this.sortedBy = true
    },
    sortHousesBySize(): void {
      // Toggle sorting order
      this.ascendingOrder = !this.ascendingOrder

      if (this.ascendingOrder) {
        this.housesData.sort((a, b) => a.size - b.size)
      } else {
        this.housesData.sort((a, b) => b.size - a.size)
      }

      // Trigger a reactivity update
      this.housesData = [...this.housesData]
      this.sortedBy = false
    }
  }
})
