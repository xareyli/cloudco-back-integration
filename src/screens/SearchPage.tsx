'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import SearchResultCard from '@/components/SearchResultCard'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './SearchPage.module.css'

const searchResults = {
  address: [
    {
      id: '1',
      name: 'ГОАУ Новгородский Квантор...',
      address: 'Большая Московская ул., 39, корп. 1',
      hours: '9:00-19:00',
      status: 'open' as const,
    },
    {
      id: '2',
      name: 'ГОАУ Новгородский Квантор...',
      address: 'Большая Московская ул., 39, корп. 1',
      hours: '9:00-19:00',
      status: 'closed' as const,
    },
    {
      id: '3',
      name: 'Фрезерный станок',
      address: 'Большая Московская ул., 126, корп. 3',
      hours: '10:00-17:00',
      status: 'open' as const,
      distance: '1.26 км от вас',
      type: 'equipment',
    },
    {
      id: '4',
      name: 'Фрезерный станок',
      address: 'Большая Московская ул., 126, корп. 3',
      hours: '10:00-17:00',
      status: 'closed' as const,
      distance: '1.26 км от вас',
      type: 'equipment',
    },
  ],
  specialists: [
    {
      id: '1',
      name: 'Евгений Просвирнин',
      type: 'specialist',
      avatar: '/profile.jpg',
    },
  ],
  services: [],
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<any[]>([])
  const [searchType, setSearchType] = useState<'address' | 'specialists' | 'services'>('address')
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (debouncedSearchQuery) {
      // Простая фильтрация по типу поиска
      const filtered = searchResults[searchType].filter(item =>
        item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (item.address && item.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [debouncedSearchQuery, searchType])

  return (
    <div className={styles.container}>
      <Header showBack />
      <SearchBar
        placeholder="Поиск"
        value={searchQuery}
        onChange={setSearchQuery}
      />
      
      <div className={styles.searchTabs}>
        <button
          className={`${styles.tab} ${searchType === 'address' ? styles.active : ''}`}
          onClick={() => setSearchType('address')}
        >
          По адресу
        </button>
        <button
          className={`${styles.tab} ${searchType === 'specialists' ? styles.active : ''}`}
          onClick={() => setSearchType('specialists')}
        >
          По специалистам
        </button>
        <button
          className={`${styles.tab} ${searchType === 'services' ? styles.active : ''}`}
          onClick={() => setSearchType('services')}
        >
          По услугам
        </button>
      </div>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map(result => (
            <SearchResultCard key={result.id} result={result} />
          ))
        ) : searchQuery ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>Ничего не найдено</p>
            <p className={styles.emptyHint}>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💡</div>
            <p>Введите запрос для поиска</p>
          </div>
        )}
      </div>
    </div>
  )
}
