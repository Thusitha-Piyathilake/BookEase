# BookEase - Home Services Booking Platform

BookEase is a full-stack web application that connects customers with service providers. Customers can browse services, book appointments, leave reviews, and manage bookings, while providers can manage their services and appointments. The system also includes an Admin Dashboard for platform management.

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
- View available services
- Search services
- Book services
- View upcoming bookings
- View booking history
- Cancel bookings
- Leave reviews
- Manage profile

---

## Provider

- Register & Login
- Create services
- Update services
- Delete services
- Manage bookings
- Accept bookings
- Complete bookings
- Cancel bookings
- View customer reviews
- Manage profile

---

## Admin

- Dashboard
- View platform statistics
- View all users
- Delete users
- View all services
- Delete services
- View all reviews
- Delete reviews

---

# Project Structure

```
backend/
│
├── src
│   ├── auth
│   ├── users
│   ├── services
│   ├── bookings
│   ├── reviews
│   ├── admin
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

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/bookease.git

cd bookease
```

---

## 2 Backend Installation

```bash
cd backend

npm install
```

---

## 3 Frontend Installation

```bash
cd frontend

npm install
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

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

Create a PostgreSQL database named

```
bookease
```

Update the `.env` file with your PostgreSQL credentials.

TypeORM will automatically create all tables because

```ts
synchronize: true
```

is enabled.

---

# Running the Application

## Backend

```bash
cd backend

npm install

npm run migration:run

npm run start:dev
```

Runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Running Migrations

This project currently uses

```ts
synchronize: true
```

during development.

No migrations are required.

For production, migrations should be generated using TypeORM.

Example:

```bash
npm run typeorm migration:generate
npm run typeorm migration:run
```

---

# API Documentation

Swagger documentation is available at

```
Swagger UI:
https://bookease-production-c4b5.up.railway.app/api
```

Swagger includes documentation for

- Authentication
- Users
- Services
- Bookings
- Reviews
- Admin
- DTO Schemas

---

# Authentication

JWT Authentication is implemented using

- Passport JWT
- NestJS Guards
- Role Guards

Supported roles

- CUSTOMER
- PROVIDER
- ADMIN

---

# Database Design

The project contains the following main entities.

- User
- Service
- Booking
- Review

Relationships

```
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

Validation is implemented using

- ValidationPipe
- class-validator
- DTOs

Common HTTP responses

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
- Reviews can only be created after a booking.
- Admin has full access to manage users, services, and reviews.
- JWT authentication is required for protected routes.

---

# Future Improvements

Possible future enhancements include

- Refresh Token Authentication
- Email Verification
- Password Reset
- Image Uploads
- Payment Gateway Integration
- Real-time Notifications
- Chat between Customer and Provider
- Google Maps Integration
- Docker Deployment
- Unit & Integration Testing


---

# API Modules

Authentication

- Register
- Login
- Profile

Users

- Customer
- Provider
- Admin

Services

- Create Service
- Update Service
- Delete Service
- Get Services

Bookings

- Create Booking
- Update Booking
- Cancel Booking
- Confirm Booking
- Complete Booking

Reviews

- Create Review
- Update Review
- Delete Review
- Average Rating

Admin

- Dashboard
- Users Management
- Services Management
- Reviews Management

---

# Technologies Used

Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport
- JWT
- Swagger

Frontend

- React
- React Router
- Axios
- CSS

Development Tools

- VS Code
- Postman
- Git
- GitHub

---

# Author

Thusitha Piyathilake

BSc (Hons) Information Technology
Specialization in Software Engineering
SLIIT

---