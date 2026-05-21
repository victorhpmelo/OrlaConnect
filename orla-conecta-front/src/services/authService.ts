import api from './api'
import { User } from '../types/User'

export async function register(userData: Partial<User>) {
  const response = await api.post('/api/users/client', userData)
  return response.data
}