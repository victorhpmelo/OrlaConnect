import { Payment } from "./Payment"
import { Reservation } from "./Reservation"

export interface Role {
  id: number
  name: string
  userRoles: UserRole[]
}

export interface UserRole {
  userId: number
  roleId: number
  user: User
  role: Role
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  phoneNumber: string
  createDate: string
  isActive: boolean

  // CLIENT
  cpf?: string
  addressStreet?: string
  addressCity?: string
  addressState?: string
  addressZipCode?: string

  // SERVICE_PROVIDER
  companyName?: string
  cnpj?: string
  companyLegalName?: string

  // ATTENDANT
  employerCompanyName?: string
  employeeId?: string

  userRoles: UserRole[]
  reservations: Reservation[]
  payments: Payment[]
}

export interface CreateClientDTO {
  name: string
  email: string
  phoneNumber: string
  password: string
  cpf: string
  addressStreet?: string
  addressCity?: string
  addressState?: string
  addressZipCode?: string
}

export interface CreateAttendantDTO {
  name: string
  employerCompanyName: string
  employeeId: string
  email: string
  phoneNumber: string
  password: string
}

export interface CreateServiceProviderDTO {
  responsibleName: string
  companyName: string
  cnpj: string
  companyLegalName: string
  email: string
  phoneNumber: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}