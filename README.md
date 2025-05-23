# Shaasium Auth Service

A scalable and secure authentication microservice built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and [TypeScript], designed for multi-tenant or modular BaaS platforms. Part of the **Shaasium** backend suite.

## 🚀 Features

- 🧑‍💻 User registration & login
- 🔐 Password hashing with `bcrypt`
- 🔑 JWT-based authentication
- 🌐 RESTful API design
- 🗃️ Supports PostgreSQL or MongoDB (dynamic at startup)
- 📦 Prisma ORM for type-safe database access
- ✅ Input validation with `class-validator`
- 📁 Modular code structure using NestJS best practices

---

## 📦 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL / MongoDB (dynamically chosen)
- **Security**: JWT, bcrypt
- **Validation**: class-validator, class-transformer

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tanmayvaij/shaasium-auth.git
cd shaasium-auth
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file based on the `.env.example` file.

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Set Up the Database

Run Prisma migrations (SQL only):

```bash
npx prisma migrate deploy
```

For MongoDB, no need to run this command.

Note:
If you want to use a different database provider (e.g., PostgreSQL, MySQL, or MongoDB), you must manually update the provider field in your prisma/schema.prisma

### 5. build the Server

```bash
npm run build
```

---

### 6. Run the Server

```bash
npm run start
```

---

## 📑 API Endpoints

| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| POST   | `/auth/signup`  | Register a new user              |
| POST   | `/auth/signin`  | Login with credentials           |
| GET    | `/auth/verify`  | Check auth token                 |


---

## 📘 API Documentation (Swagger)

Interactive API docs available at: /api

Automatically generated via `@nestjs/swagger`. Use it to explore endpoints, test requests, and view schemas.

---
