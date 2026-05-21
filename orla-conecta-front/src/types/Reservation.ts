import { Companion } from "./Companion"
import { Payment } from "./Payment"

export interface Reservation {
  reservationId: number
  userId: number
  packageId?: number
  roomTypeId?: number
  hotelId?: number
  startDate: string
  endDate: string
  totalPrice: number
  numberOfGuests: number
  status: string
  isActive: boolean
  payments: Payment[]
  companions: Companion[]
}