export interface Hotel {
  hotelId: number
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  description?: string
  starRating: number
  hasParking: boolean
  hasBreakfast: boolean
  hasLunch: boolean
  hasDinner: boolean
  hasSpa: boolean
  hasPool: boolean
  hasGym: boolean
  hasWiFi: boolean
  isPetFriendly: boolean
  checkInTime?: string
  checkOutTime?: string
  contactPhone?: string
  contactEmail?: string
  isActive: boolean
}

export interface HotelDate {
  hotelDateId: number
  startDate: string
  endDate: string
  availableRooms: number
  roomTypeId: number
  hotelId: number
  isActive: boolean
}

export interface HotelRoomType {
  roomTypeId: number
  name: string
  description?: string
  price: number
  capacity: number
  bedType: string
  hotelId: number
  isActive: boolean
}