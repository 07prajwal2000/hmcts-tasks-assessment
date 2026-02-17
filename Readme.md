# HMCTS Coding Challenge

A modern, full-stack task management application built for the HMCTS assessment.

## Key Achievements

- **Full-Stack Implementation**: Developed a complete CRUD application for managing tasks with a clear separation of concerns.
- **High-Performance Backend**: Built a RESTful API using **Bun** and **Hono.js**, emphasizing speed and minimal footprint.
- **Type-Safe Data Management**: Leveraged **Drizzle ORM** for PostgreSQL interactions and **Zod** for strict request validation and schema enforcement.
- **Modular Frontend**: Built a responsive UI with **React Router v7**, featuring reusable components (`TaskCard`, `TaskForm`) for maintainability.
- **Reliability & Testing**: Implemented comprehensive unit tests for backend services to ensure business logic integrity.
- **Seamless Orchestration**: Simplified development environment setup using **Docker Compose** for database management.

## Tech Stack

- **Backend**: Bun, Hono.js, Drizzle ORM, Zod.
- **Frontend**: React (React Router v7), Vite, Tailwind CSS.
- **Database**: PostgreSQL.
- **Testing**: Bun Test.
- **Infrastructure**: Docker.

## Getting Started

1. **Database**: Spin up the PostgreSQL instance:
   ```bash
   docker-compose up -d
   ```
2. **Backend**:
   ```bash
   cd api
   bun install
   bun db:push
   bun dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   bun install
   bun dev
   ```

---

_Developed as part of the assessment process._
