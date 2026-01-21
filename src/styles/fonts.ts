import { Onest as OnestFont, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'

// Onest - шрифт без засечек (подключен через Google Fonts)
export const Onest = OnestFont({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

// Playfair Display - бесплатная альтернатива CalvinoDisplayItalic (с засечками, italic)
// Используется как fallback, если локальный CalvinoDisplayItalic не найден
const PlayfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  style: ['italic'],
  variable: '--font-playfair',
  display: 'swap',
})

// Попытка загрузить локальный CalvinoDisplayItalic
// Если файл отсутствует, используется Playfair Display
let calvinoFont
try {
  calvinoFont = localFont({
    src: [
      {
        path: '../assets/fonts/CalvinoDisplayItalic.woff2',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../assets/fonts/CalvinoDisplayItalic.woff',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../assets/fonts/CalvinoDisplayItalic.ttf',
        weight: '400',
        style: 'italic',
      },
    ],
    variable: '--font-calvino',
    display: 'swap',
    fallback: ['serif', 'Georgia', 'Times New Roman', 'Times'],
  })
} catch (error) {
  // Если локальный файл не найден, используем Playfair Display
  calvinoFont = PlayfairDisplay
}

export const Calvino = calvinoFont
