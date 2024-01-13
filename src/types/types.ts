export interface headerLinks {
  name: string
  title: string
  path: string
}

export interface headerMobileLinks {
  name: string
  title: string
  path: string
  icon: string
  iconActive: string
}

export interface HouseData {
  id: number
  image: string
  price: number
  rooms: {
    bedrooms: number
    bathrooms: number
  }
  size: number
  description: string
  location: {
    street: string
    houseNumber: number
    houseNumberAddition: string | null
    city: string
    zip: string
  }
  createdAt: string
  constructionYear: number
  hasGarage: boolean
  madeByMe: boolean
}

export interface HouseListing {
  id?: number | null
  image: string | null
  price: number
  bedrooms: number
  bathrooms: number
  size: number
  streetName: string
  houseNumber: number
  numberAddition: string | null
  city: string
  zip: string
  constructionYear: number
  hasGarage: boolean
  description: string
}
