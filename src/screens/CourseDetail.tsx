'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import ImageWithFallback from '@/components/ImageWithFallback'
import styles from './CourseDetail.module.css'

interface CourseDetailProps {
  courseId: string
}

const courseData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'VR/AR Квантум',
    institution: 'ГОДУ Новгородский Кванториум',
    address: 'Большая Московская ул., 39, корп. 1',
    spotsLeft: 2,
    images: ['/institution/kvantorium-1.svg'],
    description: 'Интересуетесь наукой и техникой? Собираетесь стать великим создателем игр? Мечтаете освоить новейшие информационные технологии, игровые движки, хотите собрать собственные VR очки, создать свою первую 3D-модель или научиться обрабатывать панорамные видеоролики? Всё это у нас!',
  },
  '2': {
    id: '2',
    title: 'Информационные технологии и проектная деятельность',
    institution: 'ГОДУ Новгородский Кванториум',
    address: 'Большая Московская ул., 39, корп. 1',
    spotsLeft: 2,
    images: ['/institution/kvantorium-1.svg'],
    description: 'Курс по информационным технологиям и проектной деятельности для начинающих и продвинутых студентов.',
  },
}

export default function CourseDetail({ courseId }: CourseDetailProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [agreedToDataProcessing, setAgreedToDataProcessing] = useState(true)
  const [wantReminder, setWantReminder] = useState(true)
  const [addToCalendar, setAddToCalendar] = useState(false)

  const course = courseData[courseId]

  if (!course) {
    return (
      <div className={styles.container}>
        <Header showBack />
        <div className={styles.notFound}>Направление не найдено</div>
      </div>
    )
  }

  // Генерация недоступных дат (выходные дни)
  const generateUnavailableDates = () => {
    const unavailable: number[] = []
    for (let i = 1; i <= 31; i++) {
      const date = new Date(2025, 6, i)
      const dayOfWeek = date.getDay()
      // Выходные дни недоступны, кроме некоторых
      if ((dayOfWeek === 0 || dayOfWeek === 6) && 
          !(i >= 5 && i <= 6) && 
          !(i >= 12 && i <= 13) && 
          !(i >= 19 && i <= 20) && 
          !(i >= 26 && i <= 27)) {
        unavailable.push(i)
      }
    }
    return unavailable
  }

  const unavailableDates = generateUnavailableDates()
  const availableTimes = ['14:00', '16:00']

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert('Пожалуйста, выберите дату и время')
      return
    }
    // Здесь будет логика бронирования
    alert(`Запись на ${selectedDate} в ${selectedTime} успешно создана!`)
  }

  return (
    <div className={styles.container}>
      <Header showBack />
      
      <div className={styles.imageCarousel}>
        <ImageWithFallback 
          src={course.images[0]} 
          alt={course.title} 
          className={styles.image}
          fallbackText={course.title}
        />
        <div className={styles.carouselDots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.address}>{course.address}</p>
        <p className={styles.spotsLeft}>Осталось {course.spotsLeft} свободных места</p>

        <div className={styles.description}>
          <p>{course.description}</p>
        </div>

        <div className={styles.consultationSection}>
          <h2 className={styles.sectionTitle}>Записаться на консультацию</h2>
          <p className={styles.sectionSubtitle}>Расскажем про направления и запишем на занятия</p>

          <div className={styles.calendarSection}>
            <div className={styles.calendar}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const date = new Date(2025, 6, day)
                const dayOfWeek = date.getDay()
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
                const unavailable = unavailableDates.includes(day)
                const selected = selectedDate === day.toString()

                return (
                  <button
                    key={day}
                    className={`${styles.calendarDay} ${
                      unavailable ? styles.unavailable : ''
                    } ${isWeekend ? styles.weekend : ''} ${
                      selected ? styles.selected : ''
                    }`}
                    onClick={() => !unavailable && setSelectedDate(day.toString())}
                    disabled={unavailable}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          <div className={styles.timeSection}>
            <h3 className={styles.timeTitle}>Время:</h3>
            <div className={styles.timeSlots}>
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`${styles.timeSlot} ${
                    selectedTime === time ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button className={styles.bookButton} onClick={handleBook}>
            Забронировать
          </button>

          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={agreedToDataProcessing}
                onChange={(e) => setAgreedToDataProcessing(e.target.checked)}
              />
              <span>
                Я согласен/согласна на обработку{' '}
                <u>персональных данных</u>
              </span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={wantReminder}
                onChange={(e) => setWantReminder(e.target.checked)}
              />
              <span>Я хочу получить напоминание о записи на почту</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={addToCalendar}
                onChange={(e) => setAddToCalendar(e.target.checked)}
              />
              <span>Добавить событие в личный календарь</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
