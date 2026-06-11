import api from './api'
import { User } from '../types/User'

export async function register(userData: Partial<User>) {
  const response = await api.post('/users/client', userData)
  return response.data
}

export interface LoginResponse {
  token: string
  name: string
  email: string
  phoneNumber: string | null
  picture: string | null
  needsProfileCompletion: boolean
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { email, password })
  return response.data
}

export interface StoredUser {
  name: string
  email: string
  picture: string | null
}

export function getCurrentUser(): StoredUser | null {
  const saved = localStorage.getItem('user')
  return saved ? (JSON.parse(saved) as StoredUser) : null
}

export function dispatchAuthChange() {
  window.dispatchEvent(new Event('auth-changed'))
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  dispatchAuthChange()
}