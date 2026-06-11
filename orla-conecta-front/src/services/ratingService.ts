import api from './api'

export interface Review {
  reviewId: number
  userId: number
  reviewType: string
  hotelId: number | null
  rating: number
  comment: string | null
  createdAt: string
  isActive: boolean
}

export interface CreateReview {
  userId: number
  reviewType: 'HOTEL' | 'PACKAGE' | 'ACTIVITY'
  hotelId?: number
  rating: number
  comment?: string
}

/** Fetch all reviews for a hotel */
export async function getHotelReviews(hotelId: number): Promise<Review[]> {
  const res = await api.get<Review[]>(`/hotel/${hotelId}/reviews`)
  return res.data
}

/** Submit a new review for a hotel */
export async function createHotelReview(hotelId: number, review: Omit<CreateReview, 'reviewType'>): Promise<Review> {
  const res = await api.post<Review>(`/hotel/${hotelId}/reviews`, {
    ...review,
    reviewType: 'HOTEL',
    hotelId,
  })
  return res.data
}

/** Calculate average rating from a list of reviews */
export function averageRating(reviews: Review[]): number {
  if (!reviews.length) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}
