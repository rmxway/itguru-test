# Products Table

Тестовое React-приложение: авторизация, таблица товаров (DummyJSON), поиск, сортировка, локальное добавление строк.

## Возможности

Авторизация, пагинация, поиск, сортировка колонок, оптимистичное добавление товара в кэш React Query, адаптивная вёрстка.

## Стек

React 19, TypeScript, Vite 7, **axios** (интерцепторы refresh при 401), TanStack Query, React Hook Form, Yup, styled-components, React Router, react-hot-toast.

## Структура `src/`

```
src/
├── app/              # провайдеры, ErrorBoundary, ProtectedRoute, тема
├── pages/            # LoginPage, ProductsPage (index.tsx + styled.ts)
├── widgets/          # LoginForm, ProductsTable, AddProductForm
└── shared/
    ├── api/          # config, httpClient (api + publicApi), auth, products
    ├── types/        # domain.ts + UI-типы (единая точка DTO и форм)
    ├── lib/          # hooks, storage, errors (getErrorMessage), logging, utils
    └── ui/           # Button, Input, Modal, …
```

## Переменные окружения

- `VITE_BASE_PATH` — базовый путь для деплоя (по умолчанию `/`). Используется в Vite `base` и в `BrowserRouter`.

Базовый URL API: в dev прокси Vite `/api` → `API_REMOTE_URL` из [`src/shared/constants`](src/shared/constants/index.ts); в production — прямой запрос на тот же URL.

## API (DummyJSON)

Нужен доступ к [dummyjson.com](https://dummyjson.com/) (при блокировке — VPN).

Эндпоинты: `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh`, `GET /products`, `GET /products/search`.

Тестовый пользователь (пример из документации DummyJSON): **emilys** / **emilyspass**.

## Скрипты (Yarn)

```bash
yarn install
yarn dev          # http://localhost:5173
yarn build
yarn preview
yarn lint
yarn lint:fix
yarn format
```

## Деплой

При необходимости — GitHub Pages и `VITE_BASE_PATH` под подкаталог репозитория.

## Поведение

- Токены в `localStorage` / `sessionStorage`, заголовок `Authorization: Bearer`.
- При 401 запросы с `api` проходят через обновление refresh-токена (`publicApi`); при неудаче — редирект на `/login`.
- Ошибки сети / запросов нормализуются через `getErrorMessage` / `getProductsErrorMessage`; в таблице и на проверке `/me` есть кнопка «Повторить».
- Добавление товара только в клиентском кэше (API симулирует успех).
