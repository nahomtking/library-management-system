# Library Management System

A library management system backend built with NestJS, Prisma ORM, and PostgreSQL.

## Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Language:** TypeScript

## Database Schema

The database contains three main models:

- **User:** Stores user information and roles (`PATRON` or `LIBRARIAN`).
- **Genre:** Stores book genres and their descriptions.
- **Book:** Stores book information and references its genre.

### Schema Decisions

The `Book` model references the `Genre` model through a `genreId` foreign key instead of storing the genre name directly.

This creates a one-to-many relationship: one genre can have many books, while each book belongs to one genre.

Using a separate `Genre` table avoids repeating genre names across book records, keeps genre information consistent, and allows a genre to be updated in one place. The foreign key also helps maintain referential integrity by ensuring that each book references an existing genre.

## Database Seeding

The Prisma seed script (`api/prisma/seed.ts`) creates or verifies:

- 5 genres
- 20 books distributed across those genres

## Setup

### 1. Install dependencies

```bash
cd api
npm install
```

### 2. Configure the database

Create an `.env` file inside the `api` directory and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

Replace the placeholders with your database connection details.

### 3. Run database migrations

From the `api` directory:

```bash
npx prisma migrate dev
```

### 4. Seed the database

```bash
npx prisma db seed
```

### 5. Build the application

```bash
npm run build
```

## Project Structure

```text
library-management-system/
├── README.md
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── prisma/
    │   │   ├── prisma.module.ts
    │   │   └── prisma.service.ts
    │   ├── app.module.ts
    │   └── main.ts
    ├── .env.example
    └── prisma.config.ts
```

## Environment Variables

The project uses `DATABASE_URL` to connect to PostgreSQL. The actual `.env` file contains private credentials and must not be committed. Use `.env.example` as the configuration template.