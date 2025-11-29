# Louna Test Project

Проект на TypeScript с Fastify для работы с Skinport API и покупкой товаров.

## Технологии

- **TypeScript** (strict mode)
- **Fastify** - веб-фреймворк
- **PostgreSQL** - база данных (пакет `postgres`)
- **Redis** - кэширование (пакет `ioredis`)
- **Typia** - валидация схем (runtime валидация на основе TypeScript типов)
- **node-pg-migrate** - миграции базы данных

## Установка

### Использование Docker Compose

1. Установите зависимости:

```bash
npm install
```

2. Запустите PostgreSQL и Redis через Docker Compose:

```bash
docker compose up -d
```

3. Настройте переменные окружения (создайте `.env` файл на основе `.env.example`):

```bash
cp .env.example .env
```

4. Запустите миграции:

```bash
npm run migrate:up
```

SQL схема напрямую:

```bash
psql -h localhost -U postgres -d louna_test -f database-schema.sql
```

## Запуск

### Разработка

```bash
npm run dev
```

### Продакшн

```bash
npm run build
npm start
```

## Миграции

Применить миграции:

```bash
npm run migrate:up
```

Откатить миграции:

```bash
npm run migrate:down
```

## Тестовые данные

После применения миграций в базе данных будут созданы:

- 3 тестовых пользователя с балансами
- 6 тестовых продуктов с дробными ценами

## Docker Compose

Проект включает `docker compose.yml` для удобного запуска зависимостей:

- **PostgreSQL 15** на порту `5432`
- **Redis 7** на порту `6379`

### Команды Docker Compose

Запустить сервисы:

```bash
docker compose up -d
# или через npm
npm run docker:up
```

Остановить сервисы:

```bash
docker compose down
# или через npm
npm run docker:down
```

Остановить и удалить volumes (удалит все данные):

```bash
docker compose down -v
```

Просмотр логов:

```bash
docker compose logs -f
# или через npm
npm run docker:logs
```

Проверка статуса:

```bash
docker compose ps
# или через npm
npm run docker:ps
```

## Переменные окружения

Создать файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

### Основные переменные:

- **PORT** - Порт сервера (по умолчанию: 3000)
- **HOST** - Хост сервера (по умолчанию: 0.0.0.0)
- **POSTGRES_HOST** - Хост PostgreSQL (по умолчанию: localhost)
- **POSTGRES_PORT** - Порт PostgreSQL (по умолчанию: 5432)
- **POSTGRES_USER** - Пользователь PostgreSQL (по умолчанию: postgres)
- **POSTGRES_PASSWORD** - Пароль PostgreSQL (по умолчанию: postgres)
- **POSTGRES_DB** - Имя базы данных (по умолчанию: louna_test)

- **REDIS_URL** - Строка подключения к Redis

- **SKINPORT_API_URL** - URL API Skinport (по умолчанию: https://api.skinport.com/v1/items)
- **SKINPORT_APP_ID** - ID приложения для Skinport API (по умолчанию: 730)
- **SKINPORT_CURRENCY** - Валюта для Skinport API (по умолчанию: USD)
- **SKINPORT_CACHE_TTL** - Время жизни кэша в секундах (по умолчанию: 300)
