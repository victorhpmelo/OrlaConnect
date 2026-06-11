import api from './api'

export interface ContactMessagePayload {
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
}

export interface BusinessRegistrationPayload {
  nome: string
  categoria: string
  cidade: string
  endereco: string
  telefone: string
  email: string
  website?: string
  descricao: string
}

export interface ContactApiResponse {
  success: boolean
  message: string
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<ContactApiResponse> {
  const { data } = await api.post<ContactApiResponse>('/contact/message', payload)
  return data
}

export async function sendBusinessRegistration(payload: BusinessRegistrationPayload): Promise<ContactApiResponse> {
  const { data } = await api.post<ContactApiResponse>('/contact/business-registration', payload)
  return data
}
