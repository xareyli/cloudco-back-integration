'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import SearchResultCard from '@/components/SearchResultCard'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './SearchPage.module.css'
import { getInstitutions } from '@/services/institutionService'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<any[]>([])
  const [searchType, setSearchType] = useState<'address' | 'specialists' | 'services'>('address')

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (debouncedSearchQuery) {
      const doSearch = async () => {
        const items = await getInstitutions();

        // Простая фильтрация по типу поиска
        const filtered = items.filter(item =>
          item.name?.toLowerCase?.()?.includes?.(searchQuery) ||
          (item.address && item.address.toLowerCase().includes(searchQuery))
        )

        setResults(filtered)
      }

      doSearch();
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
