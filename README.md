#  Finance Data Processing & Access Control Backend

A modular, role-based backend system for managing financial records and dashboard analytics with strict access control.

---

##  Overview

This project implements a backend system for a finance dashboard where users interact with financial data based on their roles.

The system focuses on:

* Clean architecture
* Role-based access control (RBAC)
* Aggregated analytics
* Scalable backend design

---

##  Architecture

The application follows a **modular architecture**:

```
modules/
 ├── auth        → authentication logic
 ├── user        → user & role management
 ├── finance     → financial records & analytics
```

Each module contains:

* Model (data layer)
* Controller (request handling)
* Service (business logic)

---

##  Authentication & Authorization

### Authentication

* JWT-based authentication
* Token contains:

  * User ID
  * Role

### Authorization (RBAC)

| Role    | Permissions                          |
| ------- | ------------------------------------ |
| Viewer  | View records only                    |
| Analyst | View records + dashboard             |
| Admin   | Full access (CRUD + user management) |

Implemented using middleware:

* `auth.middleware.js`
* `role.middleware.js`

---

##  User Management

Features:

* Create users
* Assign roles (viewer, analyst, admin)
* Activate/deactivate users
* Admin-only access

---

##  Financial Records

Each record includes:

* Amount
* Type (income/expense)
* Category
* Date
* Notes
* CreatedBy

### Features:

* Create / Read / Update / Delete
* Filtering (type, category, date range)
* Pagination
* Soft delete support

---

##  Dashboard APIs

### Summary

* Total Income
* Total Expense
* Net Balance

### Category Breakdown

* Aggregated totals per category

### Trends

* Monthly financial trends

### Recent Activity

* Latest transactions

All implemented using **MongoDB Aggregation Pipelines**

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)

---

##  Validation & Error Handling

* Centralized error middleware
* Proper HTTP status codes

---

##  Database Design

### User

```
name, email, password, role, status
```

### Finance

```
amount, type, category, date, notes, createdBy, isDeleted
```

Indexes:

* date
* category

---

##  API Overview

### Auth

* POST /api/auth/signup
* POST /api/auth/signin
* POST /api/auth/admin  (for admin signup only single admin can register from this route)

### Users (Admin only)

* GET /api/users
* PATCH /api/users/:id/role
* PATCH /api/users/:id/status

### Finance

* POST /api/finance
* GET /api/finance (anyone can access this route)
* PATCH /api/finance/:id
* DELETE /api/finance/:id

### Dashboard

* GET /api/finance/summary
* GET /api/finance/category
* GET /api/finance/trends
* GET /api/finance/recent

---

##  Assumptions

* Single currency system
* Admin manages users
* No multi-tenant support
* Authentication is JWT-based only

---

##  Trade-offs

* MongoDB chosen for flexibility over strict relational constraints
* No external auth provider (kept simple for assignment)
* Minimal caching (focus on clarity over optimization)

---

##  Optional Enhancements Implemented

* Pagination
* Soft delete
* Aggregation pipelines
* Modular architecture

---

##  Setup Instructions

```bash
git clone https://github.com/Saurav3004/finance-backend.git
cd finance-backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

##  Testing

Use Postman or any API client.

Steps:

1. Register user
2. Login → get token
3. Use token in headers:

```
Authorization: Bearer <token>
```

##  API Documentation

You can explore and test all API endpoints using the Postman collection below:

 Postman Collection:  
https://www.postman.com/workspace/Building~173567c6-23a4-44e3-8b75-ba5cbc80010c/collection/28502822-2467ed2a-c033-4b1c-80b4-e777864395bf?action=share&source=copy-link&creator=28502822

###  How to Use

1. Open the link above  
2. Login using `/api/auth/signin`  
3. Copy the JWT token  
4. Add it in headers:
   Authorization: Bearer <your_token>
5. Test protected APIs  

---

##  Base URL

http://localhost:3000


---

##  Design Highlights

* Clear separation of concerns
* RBAC implemented via middleware
* Aggregation for analytics
* Scalable modular structure

---



##  Future Improvements

* Refresh tokens
* Rate limiting
* Swagger API docs
* Unit testing (Jest)
* Caching layer (Redis)

---

##  Author

Backend implementation for evaluation assignment demonstrating system design, data modeling, and backend engineering practices.
