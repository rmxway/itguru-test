# 📦 Products Table

React-приложение для управления каталогом товаров с авторизацией, поиском, сортировкой и возможностью добавления новых товаров.

## ✨ Возможности

🔐 Авторизация • 📋 Таблица с пагинацией • 🔍 Поиск • ⬆️⬇️ Сортировка • ➕ Добавление товаров • 📱 Адаптивный дизайн

## 🚀 Стек

**React 19** • **TypeScript** • **Vite 7** • **React Query** • **React Hook Form** • **Yup** • **Styled Components** • **React Router** • **Framer Motion**

## 📁 Структура проекта

Архитектура **Feature-Sliced Design (FSD)**:

```
src/
├── app/                   # Инициализация, провайдеры, глобальные стили
│   ├── components/        # ErrorBoundary, ProtectedRoute
│   ├── providers/         # QueryProvider, ThemeProvider
│   └── styles/            # GlobalStyles, theme, media
├── pages/                 # Страницы-роуты
│   ├── LoginPage/         # Авторизация
│   └── ProductsPage/      # Список товаров
├── widgets/               # Композитные блоки
│   ├── LoginForm/         # Форма входа + валидация
│   ├── ProductsTable/     # Таблица + пагинация + сортировка
│   └── AddProductForm/    # Форма добавления товара
└── shared/                # Переиспользуемый код
    ├── api/               # HTTP-клиенты (auth, products), interceptors
    ├── assets/            # SVG-иконки
    ├── constants/         # Константы
    ├── layouts/           # Container, Flex, Grid
    ├── lib/               
    │   ├── hooks/         # usePagination, useSort, useSearch, useProductsQuery
    │   ├── security/      # CSRF, CSP reporter
    │   ├── storage/       # authStorage, sortStorage
    │   └── utils/         # scrollLock, spaRedirect
    ├── types/             # TypeScript типы
    └── ui/                # Button, Input, Modal, Checkbox, Preloader
```

## 🔌 API

Используется [Dummy JSON](https://dummyjson.com/) — fake REST API для тестирования.

Для корректной работы API следует использовать VPN.

### Эндпоинты

**Авторизация:**

- `POST /auth/login` — вход (accessToken, refreshToken в теле ответа)
- `GET /auth/me` — проверка сессии (заголовок `Authorization: Bearer`)
- `POST /auth/refresh` — обновление токена (refreshToken в теле запроса)

**Товары:**

- `GET /products?limit=10&skip=0` — список с пагинацией
- `GET /products/search?q={query}` — поиск
- `POST /products/add` — добавление (симуляция)

**Тестовый аккаунт:** `emilys` / `emilyspass`

### Сортировка

Клиентская сортировка по полям:

- **Наименование** (title) — по алфавиту A-Z / Z-A
- **Цена** (price) — по возрастанию / убыванию
- **Рейтинг** (rating) — по возрастанию / убыванию

Выбранная сортировка автоматически сохраняется в `localStorage` и восстанавливается при следующем визите.

### Поиск

- **Серверный поиск** через `/products/search?q={query}`
- Поиск работает по наименованию товара
- Результаты поиска можно сбросить кнопкой очистки
- При активном поиске отображается количество найденных товаров

### Добавление товара

Модальная форма с валидацией (React Hook Form + Yup):

- **Наименование** — обязательное, минимум 3 символа
- **Цена** — обязательное, положительное число
- **Вендор** — обязательное, минимум 2 символа
- **Артикул** — обязательное, минимум 3 символа

После успешного добавления:

- Отображается toast-уведомление
- Список товаров автоматически обновляется
- Форма закрывается

> ⚠️ **Важно:** API симулирует добавление — товар не сохраняется на сервере, но отображается в таблице локально.

## ⚙️ Быстрый старт

```bash
# Установка
yarn install

# Разработка
yarn dev          # http://localhost:5173

# Production
yarn build
yarn preview

# Линтинг
yarn lint         # проверка
yarn lint:fix     # автофикс
yarn format       # prettier
```

## 🌐 Деплой

Автоматический деплой на **GitHub Pages** через GitHub Actions при пуше в `master`.

**Настройка:**

1. Settings → Pages → Build and deployment → **GitHub Actions**
2. После пуша: `https://<username>.github.io/<repo-name>/`

**Ручной запуск:** Actions → Deploy to GitHub Pages → Run workflow

## 🎯 Ключевые особенности

**Архитектура:**

- Feature-Sliced Design — модульная структура
- Кастомные хуки для бизнес-логики
- Композиция UI-компонентов

**UX/UI:**

- Адаптивный дизайн (mobile-first)
- Анимации (Framer Motion)
- Toast-уведомления
- Модальные окна (блокировка скролла, ESC, backdrop click)

**Производительность:**

- React Query — кэширование и автообновление
- Мемоизация колбэков
- Lazy loading изображений

**Безопасность:**

- CSRF защита
- CSP reporter
- ErrorBoundary
- Автообновление токенов

**Состояние:**

- LocalStorage/SessionStorage — токены (accessToken, refreshToken) и данные пользователя
- Передача токена в заголовке `Authorization: Bearer`
- Опция «Запомнить меня» — localStorage (постоянно) или sessionStorage (до закрытия вкладки)

## 📝 Примечания

- Используется Dummy JSON API — добавление товаров симулируется (не сохраняется на сервере)
- Токены хранятся в localStorage/sessionStorage (без cookies) — работает на production (GitHub Pages) без CORS
- Refresh token при 401 — автоматическое обновление сессии
- Yarn Berry (v4) с Plug'n'Play

