'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Model3D from '@/components/Model3D'
import ImageWithFallback from '@/components/ImageWithFallback'
import styles from './EquipmentDetail.module.css'

interface EquipmentDetailProps {
  equipmentId: string
}

const equipmentData: Record<string, any> = {
  '1': {
    name: 'Oculus Rift CV1',
    type: 'VR Headset',
    image: '/equipment/oculus-rift.svg',
    image3d: '/equipment/oculus-rift-3d.glb',
    characteristics: {
      display: {
        type: 'OLED',
        resolutionPerEye: '1080×1200 пикселей',
        totalResolution: '2160×1200 пикселей (2K)',
        pixelDensity: '456 PPI',
        diagonal: '7 дюймов',
        refreshRate: '90 Гц',
        supportedFrequencies: '90, 75, 72, 60 Гц',
        responseTime: '3 мс',
        fov: '110 градусов',
      },
      sensors: {
        gyroscope: 'Да',
        accelerometer: 'Да',
        magnetometer: 'Да',
        infrared: 'Да',
        builtInTrackerRate: '1000 Гц',
        cameraTrackerRate: '60 Гц',
      },
      audio: {
        headphoneType: 'Встроенные',
        audioOutput: '3D пространственный звук',
      },
      connectivity: {
        videoOutput: 'HDMI 1.3',
        usbPorts: '3×USB 3.0 + 1×USB 2.0',
        power: 'От компьютера',
      },
      physical: {
        headsetWeight: '470 грамм',
        totalWeight: '560 грамм',
        adjustment: 'Регулируемая посадка',
      },
      package: {
        positionSensor: 'Есть (внешний)',
        controller: 'Oculus Touch (беспроводной)',
        gamepad: 'Xbox One',
        remote: 'Да',
        cables: 'USB и HDMI',
        batteries: '2 шт. (АА)',
      },
      tracking: {
        type: 'Внешний трекер + встроенные датчики',
        dof: '6DoF (со связанными контроллерами)',
        maxDistance: 'До 2-3 метров',
      },
      minRequirements: {
        os: 'Windows 7 SP1 64-bit и выше',
        processor: 'Intel Core i3-6100 / AMD FX4350 или лучше',
        ram: '8 ГБ или выше',
        graphics: 'NVIDIA GTX 1050TI / AMD RX 470 или лучше',
      },
      recommendedRequirements: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-4590 / AMD Ryzen 5 1500X',
        ram: '8+ ГБ RAM',
        graphics: 'NVIDIA GTX 1060 / AMD Radeon RX 480 или лучше',
        usb: 'Минимум 3 порта USB 3.0',
      },
    },
  },
  '2': {
    name: 'Пятиосевой фрезерный обрабатывающий центр',
    type: 'Milling Machine',
    manufacturer: 'SHARK',
    image: '/equipment/milling-machine.svg',
    characteristics: {
      manufacturer: 'SHARK',
      class: 'Горизонтальный обрабатывающий центр с ЧПУ',
      materials: 'Металлы, пластик, дерево',
      tooling: 'Различные типы фрез, сверл, резцов',
      software: 'Программы для ЧПУ, совместимые с оборудованием',
    },
  },
}

export default function EquipmentDetail({ equipmentId }: EquipmentDetailProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'3d' | 'jpg'>('jpg')
  const equipment = equipmentData[equipmentId]

  if (!equipment) {
    return (
      <div className={styles.container}>
        <Header showBack />
        <div className={styles.notFound}>Оборудование не найдено</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header showBack />
      
      <div className={styles.viewMode}>
        <button
          className={`${styles.modeButton} ${viewMode === '3d' ? styles.active : ''}`}
          onClick={() => setViewMode('3d')}
        >
          3D
        </button>
        <button
          className={`${styles.modeButton} ${viewMode === 'jpg' ? styles.active : ''}`}
          onClick={() => setViewMode('jpg')}
        >
          JPG
        </button>
      </div>

      <div className={styles.imageContainer}>
        {viewMode === '3d' && equipment.image3d ? (
          <Model3D 
            src={equipment.image3d} 
            fallbackImage={equipment.image}
            alt={equipment.name}
          />
        ) : (
          <ImageWithFallback 
            src={equipment.image} 
            alt={equipment.name} 
            className={styles.image}
            fallbackText={equipment.name}
          />
        )}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{equipment.name}</h1>
        
        <div className={styles.characteristics}>
          <h2 className={styles.sectionTitle}>Характеристики</h2>
          
          {equipment.characteristics.manufacturer && (
            <div className={styles.characteristic}>
              <span className={styles.label}>Производитель:</span>
              <span className={styles.value}>{equipment.characteristics.manufacturer}</span>
            </div>
          )}
          
          {equipment.characteristics.class && (
            <div className={styles.characteristic}>
              <span className={styles.label}>Класс/тип оборудования:</span>
              <span className={styles.value}>{equipment.characteristics.class}</span>
            </div>
          )}
          
          {equipment.characteristics.materials && (
            <div className={styles.characteristic}>
              <span className={styles.label}>Материалы:</span>
              <span className={styles.value}>{equipment.characteristics.materials}</span>
            </div>
          )}
          
          {equipment.characteristics.tooling && (
            <div className={styles.characteristic}>
              <span className={styles.label}>Оснастка:</span>
              <span className={styles.value}>{equipment.characteristics.tooling}</span>
            </div>
          )}
          
          {equipment.characteristics.software && (
            <div className={styles.characteristic}>
              <span className={styles.label}>Софт:</span>
              <span className={styles.value}>{equipment.characteristics.software}</span>
            </div>
          )}

          {/* Для Oculus Rift - детальные характеристики */}
          {equipment.characteristics.display && (
            <>
              <h3 className={styles.subsectionTitle}>Дисплей и оптика</h3>
              {Object.entries(equipment.characteristics.display).map(([key, value]) => (
                <div key={key} className={styles.characteristic}>
                  <span className={styles.label}>{key}:</span>
                  <span className={styles.value}>{value as string}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <button 
        className={styles.bookButton}
        onClick={() => router.push(`/booking/${equipmentId}`)}
      >
        Забронировать
      </button>
    </div>
  )
}
