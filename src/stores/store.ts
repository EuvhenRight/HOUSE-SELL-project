import { HouseData } from '@/types/types'
import { defineStore } from 'pinia'
import { apiService } from './../utils/api-service'

export const useHousesStore = defineStore('HouseStore', {
  state: () => {
    return {
      housesData: [] as HouseData[],
      houseData: {} as HouseData,
      sortedBy: null as boolean | null,
      searchData: [] as HouseData[],
      searchQuery: '' as string
    }
  },
  getters: {
    searchHousesCount: (state) => state.searchData.length,
    filteredHouses: (state) => {
      const searchData = state.housesData.filter((house) => {
        const searchQueryLower = state.searchQuery.toLowerCase()

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
