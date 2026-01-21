// Сервис для работы с бронированиями
// Интеграция с бэкенд API

import { api } from '@/utils/api'

export interface BookingRequest {
  equipmentId: string
  startTime: string
  endTime?: string
  rentalType: 'remote' | 'in-person'
  files?: string[]
  location?: string
}

export interface Booking {
  id: string
  equipmentId: string
  equipment?: {
    id: string
    name: string
  }
  userId: string
  startTime: string
  endTime: string
  rentalType: 'remote' | 'in-person'
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  files?: string[]
  location?: string
  createdAt: string
  updatedAt: string
}

/**
 * Создать бронирование
 */
export async function createBooking(data: BookingRequest): Promise<Booking> {
  try {
    const response = await api.post<Booking>('/bookings', data)
    return response.data
  } catch (error) {
    console.error('Ошибка создания бронирования:', error)
    throw error
  }
}

/**
 * Получить список бронирований пользователя
 */
export async function getUserBookings(): Promise<Booking[]> {
  try {
    const response = await api.get<Booking[]>('/bookings')
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки бронирований:', error)
    return []
  }
}

/**
 * Получить детали бронирования
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const response = await api.get<Booking>(`/bookings/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки бронирования:', error)
    return null
  }
}

/**
 * Отменить бронирование
 */
export async function cancelBooking(id: string): Promise<void> {
  try {
    await api.delete(`/bookings/${id}`)
  } catch (error) {
    console.error('Ошибка отмены бронирования:', error)
    throw error
  }
}

/**
 * Обновить бронирование
 */
export async function updateBooking(
  id: string,
  data: Partial<BookingRequest>
): Promise<Booking> {
  try {
    const response = await api.put<Booking>(`/bookings/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Ошибка обновления бронирования:', error)
    throw error
  }
}
