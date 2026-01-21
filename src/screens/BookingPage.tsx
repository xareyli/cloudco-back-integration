'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Calendar from '@/components/Calendar'
import styles from './BookingPage.module.css'

interface BookingPageProps {
  equipmentId: string
}

export default function BookingPage({ equipmentId }: BookingPageProps) {
  const router = useRouter()
  const [step, setStep] = useState<'files' | 'time' | 'confirm'>('files')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [rentalType, setRentalType] = useState<'remote' | 'in-person'>('remote')

  const equipmentName = 'Oculus Rift CV1' // В реальном приложении загружать из API

  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  const handleNext = () => {
    if (step === 'files') {
      setStep('time')
    } else if (step === 'time') {
      if (selectedDate && selectedTime) {
        setStep('confirm')
      } else {
        alert('Пожалуйста, выберите дату и время')
      }
    }
  }

  const handleConfirm = () => {
    // Здесь будет логика подтверждения бронирования
    alert('Бронирование успешно создано! Файлы будут автоматически загружены за час до сессии.')
    router.push('/equipment')
  }

  return (
    <div className={styles.container}>
      <Header showBack />
      
      <div className={styles.content}>
        <div className={styles.steps}>
          <div className={`${styles.step} ${step === 'files' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>Файлы</div>
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.step} ${step === 'time' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>Время</div>
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.step} ${step === 'confirm' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepLabel}>Подтверждение</div>
          </div>
        </div>

        <h1 className={styles.title}>Бронирование: {equipmentName}</h1>

        {step === 'files' && (
          <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Выбор файлов для загрузки на машину</h2>
            <p className={styles.sectionDescription}>
              Выберите файлы, которые будут автоматически загружены на машину за час до начала сессии
            </p>

            <div className={styles.fileSelector}>
              <div className={styles.fileList}>
                {['project.gcode', 'model.stl', 'config.json', 'texture.png'].map((file) => (
                  <label key={file} className={styles.fileItem}>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file])
                        } else {
                          setSelectedFiles(selectedFiles.filter(f => f !== file))
                        }
                      }}
                    />
                    <span className={styles.fileName}>{file}</span>
                    <span className={styles.fileSize}>2.4 MB</span>
                  </label>
                ))}
              </div>

              <button className={styles.uploadButton}>
                📁 Загрузить файлы
              </button>
            </div>

            <div className={styles.rentalType}>
              <h3 className={styles.rentalTypeTitle}>Тип аренды</h3>
              <div className={styles.rentalTypeOptions}>
                <button
                  className={`${styles.rentalTypeButton} ${
                    rentalType === 'remote' ? styles.active : ''
                  }`}
                  onClick={() => setRentalType('remote')}
                >
                  <span className={styles.rentalTypeIcon}>🖥️</span>
                  <span className={styles.rentalTypeLabel}>Дистанционное управление</span>
                  <span className={styles.rentalTypeDesc}>Работайте из дома</span>
                </button>
                <button
                  className={`${styles.rentalTypeButton} ${
                    rentalType === 'in-person' ? styles.active : ''
                  }`}
                  onClick={() => setRentalType('in-person')}
                >
                  <span className={styles.rentalTypeIcon}>📍</span>
                  <span className={styles.rentalTypeLabel}>Личное присутствие</span>
                  <span className={styles.rentalTypeDesc}>Нужно прийти лично</span>
                </button>
              </div>
            </div>

            <button className={styles.nextButton} onClick={handleNext}>
              Далее
            </button>
          </div>
        )}

        {step === 'time' && (
          <div className={styles.stepContent}>
            {rentalType === 'remote' ? (
              <>
                <h2 className={styles.sectionTitle}>Выбор времени аренды</h2>
                <p className={styles.sectionDescription}>
                  Выберите дату и время начала аренды
                </p>
              </>
            ) : (
              <>
                <h2 className={styles.sectionTitle}>Выбор времени и места аренды</h2>
                <p className={styles.sectionDescription}>
                  Выберите дату, время и место для личного присутствия
                </p>
                <div className={styles.locationInfo}>
                  <p className={styles.locationText}>
                    📍 Адрес: Большая Московская ул., 126, корп. 3
                  </p>
                </div>
              </>
            )}

            <div className={styles.calendarSection}>
              <Calendar
                year={2025}
                month={7}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                unavailableDates={[1, 2, 3, 4, 12, 13, 19, 20, 26, 27]}
              />
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

            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                ⏰ Файлы будут автоматически загружены на машину за час до начала сессии
              </p>
            </div>

            <div className={styles.actions}>
              <button className={styles.backButton} onClick={() => setStep('files')}>
                Назад
              </button>
              <button className={styles.nextButton} onClick={handleNext}>
                Далее
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className={styles.stepContent}>
            <h2 className={styles.sectionTitle}>Подтверждение бронирования</h2>

            <div className={styles.confirmInfo}>
              <div className={styles.confirmItem}>
                <span className={styles.confirmLabel}>Оборудование:</span>
                <span className={styles.confirmValue}>{equipmentName}</span>
              </div>
              <div className={styles.confirmItem}>
                <span className={styles.confirmLabel}>Дата:</span>
                <span className={styles.confirmValue}>
                  {selectedDate} июля 2025
                </span>
              </div>
              <div className={styles.confirmItem}>
                <span className={styles.confirmLabel}>Время:</span>
                <span className={styles.confirmValue}>{selectedTime}</span>
              </div>
              <div className={styles.confirmItem}>
                <span className={styles.confirmLabel}>Тип:</span>
                <span className={styles.confirmValue}>
                  {rentalType === 'remote' ? 'Дистанционное управление' : 'Личное присутствие'}
                </span>
              </div>
              {selectedFiles.length > 0 && (
                <div className={styles.confirmItem}>
                  <span className={styles.confirmLabel}>Файлы:</span>
                  <span className={styles.confirmValue}>
                    {selectedFiles.length} файл(ов)
                  </span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.backButton} onClick={() => setStep('time')}>
                Назад
              </button>
              <button className={styles.confirmButton} onClick={handleConfirm}>
                Подтвердить бронирование
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
