'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import ServiceCard from '@/components/ServiceCard'
import styles from './HomePage.module.css'

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backgroundPattern}></div>
      
      <SearchBar 
        placeholder="Поиск"
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <div className={styles.servicesGrid}>
        <ServiceCard
          title="Арендовать компьютер"
          image="/computer.svg"
          onClick={() => router.push('/equipment?type=computer')}
        />
        <ServiceCard
          title="Использовать оборудование"
          image="/equipment.svg"
          onClick={() => router.push('/equipment')}
        />
      </div>

      <div className={styles.featuresLink}>
        <button 
          className={styles.featuresButton}
          onClick={() => router.push('/features')}
        >
          Узнать больше о возможностях платформы →
        </button>
      </div>
    </div>
  )
}
