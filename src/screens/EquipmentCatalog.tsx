'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import EquipmentCard from '@/components/EquipmentCard'
import styles from './EquipmentCatalog.module.css'

const equipmentItems = [
  {
    id: '1',
    name: 'Oculus Rift CV1',
    type: 'VR Headset',
    address: 'Большая Московская ул., 126, корп. 3',
    hours: '10:00-17:00',
    status: 'open',
    distance: '1.26 км от вас',
    image3d: '/equipment/oculus-rift-3d.glb',
    image: '/equipment/oculus-rift.svg',
  },
  {
    id: '2',
    name: 'Пятиосевой фрезерный обрабатывающий центр',
    type: 'Milling Machine',
    manufacturer: 'SHARK',
    address: 'Большая Московская ул., 126, корп. 3',
    hours: '10:00-17:00',
    status: 'open',
    distance: '1.26 км от вас',
    image: '/equipment/milling-machine.svg',
  },
  {
    id: '3',
    name: 'Фрезерный станок',
    type: 'Milling Machine',
    address: 'Большая Московская ул., 126, корп. 3',
    hours: '10:00-17:00',
    status: 'closed',
    distance: '1.26 км от вас',
    image: '/equipment/milling-machine-2.svg',
  },
]

export default function EquipmentCatalog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = equipmentItems.filter(item => {
    if (type && item.type.toLowerCase() !== type.toLowerCase()) {
      return false
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleEquipmentClick = (id: string) => {
    router.push(`/equipment/${id}`)
  }

  return (
    <div className={styles.container}>
      <Header showBack />
      <SearchBar
        placeholder="Поиск оборудования"
        value={searchQuery}
        onChange={setSearchQuery}
      />
      
      <div className={styles.equipmentList}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onClick={() => handleEquipmentClick(item.id)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>Оборудование не найдено</p>
          </div>
        )}
      </div>
    </div>
  )
}
