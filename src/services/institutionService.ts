// Сервис для работы с учреждениями
// Интеграция с бэкенд API

import { api } from '@/utils/api'

export interface Institution {
  id: string
  name: string
  address: string
  hours: string
  phone?: string
  website?: string
  images: string[]
  courses?: Course[]
}

export interface Course {
  id: string
  title: string
  institutionId: string
  description?: string
  spotsLeft: number
  totalSpots: number
  images?: string[]
}

/**
 * Получить список учреждений
 */
export async function getInstitutions(): Promise<Institution[]> {
  try {
    const response = await api.get<Institution[]>('/institutions')
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки учреждений:', error)
    return []
  }
}

/**
 * Получить детали учреждения
 */
export async function getInstitutionById(id: string): Promise<Institution | null> {
  try {
    const response = await api.get<Institution>(`/institutions/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки учреждения:', error)
    return null
  }
}

/**
 * Получить курсы учреждения
 */
export async function getInstitutionCourses(institutionId: string): Promise<Course[]> {
  try {
    const response = await api.get<Course[]>(`/institutions/${institutionId}/courses`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки курсов:', error)
    return []
  }
}

/**
 * Получить детали курса
 */
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const response = await api.get<Course>(`/courses/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки курса:', error)
    return null
  }
}

/**
 * Записаться на курс
 */
export interface CourseBookingRequest {
  courseId: string
  date: string
  time: string
  agreeToDataProcessing: boolean
  wantReminder?: boolean
  addToCalendar?: boolean
}

export async function bookCourse(data: CourseBookingRequest): Promise<{ success: boolean; bookingId?: string }> {
  try {
    const response = await api.post<{ id: string }>('/courses/book', data)
    return { success: true, bookingId: response.data.id }
  } catch (error) {
    console.error('Ошибка записи на курс:', error)
    throw error
  }
}
