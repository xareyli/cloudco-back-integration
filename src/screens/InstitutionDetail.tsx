'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import ImageWithFallback from '@/components/ImageWithFallback'
import styles from './InstitutionDetail.module.css'

interface InstitutionDetailProps {
  institutionId: string
}

const institutionData: Record<string, any> = {
  '1': {
    name: 'ГОДУ Новгородский Кванториум',
    address: 'Большая Московская ул., 39, корп. 1',
    hours: 'Закрыто до 09:00',
    phone: '+7 (8162) 63-79-55',
    website: 'kvantorium53.ru',
    images: ['/institution/kvantorium-1.svg'],
    courses: [
      {
        id: '2',
        title: 'Информационные технологии и проектная деятельность',
        spotsLeft: 2,
      },
      {
        id: '1',
        title: 'VR/AR Квантум',
        spotsLeft: 2,
      },
    ],
  },
}

export default function InstitutionDetail({ institutionId }: InstitutionDetailProps) {
  const router = useRouter()
  const institution = institutionData[institutionId]

  if (!institution) {
    return (
      <div className={styles.container}>
        <Header showBack />
        <div className={styles.notFound}>Учреждение не найдено</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header showBack />
      
      <div className={styles.imageCarousel}>
        <ImageWithFallback 
          src={institution.images[0]} 
          alt={institution.name} 
          className={styles.image}
          fallbackText={institution.name}
        />
        <div className={styles.carouselDots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.name}>{institution.name}</h1>
        <p className={styles.address}>{institution.address}</p>
        <p className={styles.hours}>{institution.hours}</p>

        <div className={styles.actions}>
          <button className={styles.primaryButton}>Записаться</button>
          <button className={styles.secondaryButton}>
            📍 Маршрут
          </button>
          <button className={styles.secondaryButton}>
            📤 Поделиться
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Контакты</h2>
          <div className={styles.contact}>
            <span className={styles.contactValue}>{institution.phone}</span>
            <span className={styles.contactAction}>Позвонить</span>
          </div>
          <div className={styles.contact}>
            <span className={styles.contactValue}>{institution.website}</span>
            <span className={styles.contactAction}>Перейти</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Направления обучения</h2>
            <button className={styles.seeAll}>→</button>
          </div>
          <div className={styles.coursesGrid}>
            {institution.courses.map((course: any) => (
              <div key={course.id} className={styles.courseCard}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <button 
                  className={styles.courseButton}
                  onClick={() => router.push(`/course/${course.id}`)}
                >
                  Записаться
                </button>
                <p className={styles.spotsLeft}>Осталось {course.spotsLeft} места</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
