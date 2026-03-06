# 📦 Products Table

React-приложение для управления каталогом товаров с авторизацией и таблицей продуктов.

## 🚀 Технологии

- **React 19** + **TypeScript**
- **Vite 7** — сборка и dev-сервер
- **React Query** — работа с серверным состоянием
- **React Hook Form** + **Yup** — формы и валидация
- **Styled Components** — стилизация
- **React Router** — маршрутизация

## 📁 Структура проекта

```
src/
├── app/           # Инициализация приложения, провайдеры, стили
├── pages/         # Страницы (Login, Products)
├── widgets/       # Виджеты (LoginForm, ProductsTable)
└── shared/        # Общие компоненты, API, хуки, утилиты
```

## 🔌 Dummy JSON API

Приложение использует [Dummy JSON](https://dummyjson.com/) — бесплатный fake REST API для разработки и тестирования.

**Base URL:** `https://dummyjson.com`

### Авторизация

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/auth/login` | Вход: `username`, `password` → `accessToken`, `refreshToken` |
| GET | `/auth/me` | Текущий пользователь (требует Bearer token) |
| POST | `/auth/refresh` | Обновление токена |

**Проверка авторизации:** наличие токена в `localStorage` или `sessionStorage` (опция «Запомнить меня»). Защищённые маршруты (`/products`, `/`) редиректят на `/login` при отсутствии токена.

**Тестовые данные:** можно использовать любые учётные записи из `/users` (например, `emilys` / `emilyspass`).

### Товары

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/products` | Список товаров с пагинацией (`limit`, `skip`) |

### Валидация форм

Форма входа валидируется через Yup: логин от 3 символов, пароль от 6 символов.

## ⚙️ Установка и запуск

```bash
# Установка зависимостей
yarn install

# Запуск dev-сервера
yarn dev

# Сборка для production
yarn build

# Превью production-сборки
yarn preview
```

## 🛠️ Скрипты

| Команда         | Описание                     |
| --------------- | ---------------------------- |
| `yarn dev`      | Запуск dev-сервера           |
| `yarn build`    | Сборка проекта               |
| `yarn preview`  | Превью production-сборки     |
| `yarn lint`     | Проверка ESLint              |
| `yarn lint:fix` | Исправление ошибок ESLint    |
| `yarn format`   | Форматирование кода Prettier |
