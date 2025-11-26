# Powder Georgia - Migration Guide

## Обзор миграции

Проект успешно перенесен с **Gatsby** на **Next.js 16.0.4** с полной поддержкой i18n и современным UI стеком.

## Что было изменено

### Фреймворк и основные зависимости
- **Gatsby 5.11.0** → **Next.js 16.0.4**
- **React 18.2.0** → **React 19.2.0**
- **Tailwind CSS 3.3.2** → **Tailwind CSS 4**

### UI Компоненты
- **daisyUI** → **shadcn/ui**
- **Font Awesome Pro** → **lucide-react**
- Добавлены компоненты: Button, Card, Input, Textarea, Badge, Modal, Icon, Rating, Loader

### Интернационализация (i18n)
- **gatsby-plugin-react-i18next** → **next-intl**
- Поддержка языков: English (en), Georgian (ka), Russian (ru)
- Маршруты с префиксом языка: `/en`, `/ka`, `/ru`
- SEO поддержка с hreflang tags

### Структура проекта

```
src/
├── app/                          # App Router (Next.js 13+)
│   ├── [locale]/                # Динамический сегмент для языка
│   │   ├── page.tsx             # Главная страница
│   │   ├── tours/page.tsx        # Страница туров
│   │   ├── transfers/page.tsx    # Страница трансферов
│   │   ├── about/page.tsx        # О нас
│   │   ├── contact/page.tsx      # Контакты
│   │   ├── not-found.tsx         # 404 страница
│   │   └── layout.tsx            # Layout для локализованных маршрутов
│   ├── layout.tsx                # Корневой layout
│   ├── sitemap.ts                # XML sitemap для SEO
│   └── robots.ts                 # robots.txt для SEO
├── components/
│   ├── ui/                       # shadcn/ui компоненты
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Icon.tsx
│   │   └── ...
│   ├── Header/                   # Заголовок
│   ├── Footer/                   # Подвал
│   ├── NavMenu/                  # Навигация
│   ├── Contact/                  # Компоненты контактов
│   ├── Tours/                    # Компоненты туров
│   ├── Transfers/                # Компоненты трансферов
│   └── UI/                       # Кастомные UI компоненты
├── containers/                   # Layout контейнеры
├── hooks/                        # React hooks
│   └── useLocale.ts             # Hook для получения текущего языка
├── lib/                          # Утилиты
│   └── utils.ts                 # Функции для работы с классами (cn)
├── utils/                        # Бизнес-логика утилиты
│   └── index.ts                 # Форматирование, slugify и т.д.
├── types/                        # TypeScript типы
├── constants/                    # Константы приложения
├── mocks/                        # Mock данные
│   ├── tours.ts
│   ├── transfers.ts
│   └── contacts.ts
├── locales/                      # JSON файлы локализации
│   ├── en/
│   ├── ka/
│   └── ru/
├── assets/                       # Изображения и иконки
├── i18n.ts                       # Конфигурация next-intl
└── middleware.ts                 # Middleware для маршрутизации по языкам
```

## Установка и запуск

### Установка зависимостей
```bash
pnpm install
```

### Разработка
```bash
pnpm dev
```
Приложение будет доступно на `http://localhost:3000`

### Сборка для продакшена
```bash
pnpm build
pnpm start
```

### Проверка типов
```bash
pnpm exec tsc --noEmit
```

### Линтинг
```bash
pnpm lint
```

## Маршруты приложения

| Маршрут | Описание |
|---------|---------|
| `/en` | Главная страница (English) |
| `/en/tours` | Туры (English) |
| `/en/transfers` | Трансферы (English) |
| `/en/about` | О нас (English) |
| `/en/contact` | Контакты (English) |
| `/ka` | Главная страница (Georgian) |
| `/ru` | Главная страница (Russian) |

## Локализация

### Добавление новых переводов

1. Добавьте ключ в JSON файлы локализации:
   ```
   src/locales/
   ├── en/common.json
   ├── ka/common.json
   └── ru/common.json
   ```

2. Используйте в компонентах:
   ```tsx
   'use client'
   import { useTranslations } from 'next-intl'
   
   export const MyComponent = () => {
     const t = useTranslations()
     return <h1>{t('navigation.home')}</h1>
   }
   ```

### Переключение языка

Используйте компонент `LanguageSelect`:
```tsx
import { LanguageSelect } from '@/components/UI/LanguageSelect'

export const MyComponent = () => {
  return <LanguageSelect />
}
```

## Mock данные

Приложение использует mock данные вместо Contentful CMS. Данные находятся в:
- `src/mocks/tours.ts` - Туры
- `src/mocks/transfers.ts` - Трансферы
- `src/mocks/contacts.ts` - Контакты

Для подключения реального API:
1. Создайте API маршруты в `src/app/api/`
2. Замените импорты mock данных на API вызовы
3. Используйте Server Components для fetch операций

## SEO

### Метаданные страниц

Каждая страница имеет SEO метаданные:
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
  },
}
```

### Sitemap и Robots

- `src/app/sitemap.ts` - Автоматически генерирует sitemap.xml
- `src/app/robots.ts` - Конфигурация robots.txt

### hreflang Tags

Автоматически добавляются для всех языков в layout метаданных.

## Миграция с Gatsby

### Что осталось сделать

1. **Contentful интеграция** - Пока используются mock данные
   - Создайте API маршруты для fetch данных
   - Обновите компоненты для использования реальных данных

2. **Статические изображения** - Используйте Next.js Image компонент
   ```tsx
   import Image from 'next/image'
   
   <Image src="/path/to/image.jpg" alt="Description" width={400} height={300} />
   ```

3. **Динамические маршруты** - Для отдельных туров
   ```tsx
   // src/app/[locale]/tours/[id]/page.tsx
   export default function TourPage({ params }: { params: { id: string } }) {
     // ...
   }
   ```

## Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [lucide-react Icons](https://lucide.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## Контакты и поддержка

Для вопросов по миграции или использованию проекта, обратитесь к разработчику.
