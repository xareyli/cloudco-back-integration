// Сервис для работы с оборудованием
// Интеграция с бэкенд API

import { api } from '@/utils/api'

export interface Equipment {
  id: string
  name: string
  type: string
  manufacturer?: string
  address: string
  hours: string
  status: 'open' | 'closed' | 'maintenance'
  distance?: string
  image?: string
  image3d?: string
  characteristics?: Record<string, any>
}

export interface EquipmentFilters {
  type?: string
  status?: 'open' | 'closed'
  search?: string
}

/**
 * Получить список оборудования
 */
export async function getEquipmentList(filters?: EquipmentFilters): Promise<Equipment[]> {
  try {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    
    const query = params.toString()
    const endpoint = query ? `/equipment?${query}` : '/equipment'
    
    const response = await api.get<Equipment[]>(endpoint)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки оборудования:', error)
    // Возвращаем пустой массив при ошибке (fallback на hardcoded данные)
    return []
  }
}

/**
 * Получить детали оборудования по ID
 */
export async function getEquipmentById(id: string): Promise<Equipment | null> {
  try {
    const response = await api.get<Equipment>(`/equipment/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки оборудования:', error)
    return null
  }
}

/**
 * Проверить доступность оборудования
 */
export async function checkEquipmentAvailability(
  equipmentId: string,
  startTime: string,
  endTime?: string
): Promise<boolean> {
  try {
    const params = new URLSearchParams({ startTime })
    if (endTime) params.append('endTime', endTime)
    
    const response = await api.get<{ available: boolean }>(
      `/equipment/${equipmentId}/availability?${params}`
    )
    return response.data.available
  } catch (error) {
    console.error('Ошибка проверки доступности:', error)
    return false
  }
}
