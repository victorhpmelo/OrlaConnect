export interface Payment {
  paymentId: number
  userId: number
  reservationId: number
  amount: number
  paymentDate: string
  paymentMethod: string
  status: string
  isActive: boolean
}