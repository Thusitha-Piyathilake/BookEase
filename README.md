# BookEase - Home Services Booking Platform

BookEase is a full-stack web application that connects customers with trusted service providers. Customers can browse services, make bookings, leave reviews, and manage appointments, while providers can manage their services and bookings. The platform also includes an Admin Dashboard for managing users, services, and reviews.

---

# Project Overview

BookEase is built using a modern full-stack architecture.

## Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Passport.js
- Swagger API Documentation

## Frontend

- React
- React Router
- Axios
- CSS

---

# Features

## Customer

- Register & Login
- Browse available services
- Search services
- Book services
- View upcoming bookings
- View booking history
- Cancel bookings
- Leave reviews
- Manage profile
- Booking calendar

---

## Provider

- Register & Login
- Create services
- Update services
- Delete services
- Manage bookings
- Confirm bookings
- Complete bookings
- Cancel bookings
- View customer reviews
- Manage profile

---

## Admin

- Dashboard
- View platform statistics
- Manage users
- Manage services
- Manage reviews

---

# Project Structure

```text
backend/
│
├── src
│   ├── auth
│   ├── users
│   ├── services
│   ├── bookings
│   ├── reviews
│   ├── admin
│   ├── migrations
│   └── common
│
└── package.json

frontend/
│
├── src
│   ├── components
│   ├── pages
│   ├── routes
│   ├── services
│   └── assets
│
└── package.json
```

---

# Installation Steps

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/bookease.git

cd bookease
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Your_DB_Password
DB_NAME=bookease_db

JWT_SECRET=bookease-super-secret-key
JWT_EXPIRES_IN=1d

PORT=5000
```

---

# Database Setup

1. Create a PostgreSQL database named:

```text
bookease_db
```

2. Update your `.env` file with your PostgreSQL credentials.

3. Run the database migrations:

```bash
npm run migration:run
```

This will create all required database tables.

---

# Running the Application

## Backend

```bash
cd backend

npm install

npm run migration:run

npm run start:dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Running Migrations

Generate a new migration after changing entities:

```bash
npm run migration:generate
```

Run pending migrations:

```bash
npm run migration:run
```

Revert the latest migration:

```bash
npm run migration:revert
```

---

# API Documentation

Swagger documentation is available at:

```text
https://bookease-production-c4b5.up.railway.app/api
```

Swagger includes documentation for:

- Authentication
- Users
- Services
- Bookings
- Reviews
- Admin
- DTO Schemas

---

# Authentication

JWT Authentication is implemented using:

- Passport JWT
- NestJS Guards
- Role Guards

Supported Roles:

- CUSTOMER
- PROVIDER
- ADMIN

---

# Database Design

Main Entities:

- User
- Service
- Booking
- Review

Relationships:

```text
User
│
├── Services
├── Bookings
└── Reviews

Service
│
└── Bookings

Booking
│
└── Review
```

---

# Validation & Error Handling

Validation is implemented using:

- ValidationPipe
- class-validator
- DTOs

Common HTTP Responses:

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

# Assumptions Made

- A customer can create multiple bookings.
- Providers manage only their own services.
- Reviews can only be created after a completed booking.
- Admin has full access to manage users, services, and reviews.
- JWT authentication is required for protected routes.

---

# Future Improvements

- Refresh Token Authentication
- Email Verification
- Password Reset
- Payment Gateway Integration
- Real-time Notifications
- Chat between Customer and Provider
- Google Maps Integration
- Docker Deployment
- Unit & Integration Testing

---

# API Modules

## Authentication

- Register
- Login
- Profile

## Users

- Customer
- Provider
- Admin

## Services

- Create Service
- Update Service
- Delete Service
- Get Services

## Bookings

- Create Booking
- Cancel Booking
- Confirm Booking
- Complete Booking
- Booking History

## Reviews

- Create Review
- Update Review
- Delete Review
- Average Rating

## Admin

- Dashboard
- Users Management
- Services Management
- Reviews Management

---

# Technologies Used

## Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport
- JWT
- Swagger

## Frontend

- React
- React Router
- Axios
- CSS

## Development Tools

- VS Code
- Postman
- swagger
- Git
- GitHub


## Deployed links
```text
https://bookease-puce.vercel.app/
```

---

# Author

**Thusitha Piyathilake**

BSc (Hons) Information Technology  
Specialization in Software Engineering  
SLIIT