# 📚 Course & User Management API

A production-ready RESTful API built with **Node.js**, **Express.js v5**, and **MongoDB** for managing courses and user authentication. Supports full CRUD operations for courses with user registration and login functionality, using Mongoose ODM with comprehensive input validation and JWT-based authentication.

---

## 🗂️ Project Structure

```
my backend/
├── main.js                          # Entry point — sets up Express app, middleware & DB connection
├── package.json                     # Project metadata & dependencies
├── package-lock.json                # Dependency lock file
├── .env                             # Environment variables (MONGO_URL, JWT_SECRET, etc.)
│
├── controllers/                     # Business logic controllers
│   ├── auth/                        # Authentication controllers
│   │   ├── LoginUser.js             # POST /users/login — User login with JWT token generation
│   │   └── RegisterUser.js          # POST /users/register — User registration with password hashing
│   ├── courses/                     # Course controllers
│   │   ├── create.js                # POST /courses — Create a new course with validation
│   │   ├── delete.js                # DELETE /courses/:id — Delete a course by ID
│   │   ├── get.js                   # GET /courses — Get all courses with pagination support
│   │   ├── getMe.js                 # GET /courses/me — Get courses owned by authenticated user
│   │   └── patch.js                 # PATCH /courses/:id — Update a course with validation
│   └── users/
│       └── GetUsers.js              # GET /users — Get all users (admin only, protected route)
│
├── middleware/                      # Validation & security middleware
│   ├── global-router-handler.js     # 404 route handler for undefined routes
│   ├── jwtTokenVerify.js            # JWT token verification middleware for protected routes
│   ├── loginvalid.js                # Zod schema for login input validation
│   ├── post_course.js               # Zod schema for course creation/update validation
│   ├── registervalid.js             # Zod schema for user registration validation
│   ├── roleverefy.js                # Role verification middleware for admin-only routes
│   └── ratelimiter.js               # Rate limiting for authentication endpoints
│
├── models/                          # Mongoose ODM models
│   ├── courses.js                   # Course schema with name, price, and userId fields
│   └── users.js                     # User schema with username, email, password, role & timestamps
│
├── routes/                          # Express routers
│   ├── courses.js                   # Course routes with all CRUD endpoints
│   └── users.js                     # User & authentication routes
│
└── utils/                           # Utility functions
    ├── httpresstatus.js             # HTTP status constants (SUCCESS, FAIL, ERROR)
    └── roles.js                     # User role constants (ADMIN, USER)
```

---

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration** — Register new users with username, email, password, and role
- **User Login** — Authenticate users and generate JWT tokens with 1-hour expiration
- **JWT Token Verification** — Protect routes using Bearer token authentication
- **Password Hashing** — Secure password storage using bcrypt (10 salt rounds)
- **Role-Based Access Control** — Admin and User roles with different permissions
- **Helmet.js** — HTTP security headers for protection against common vulnerabilities
- **CORS** — Cross-Origin Resource Sharing enabled for API access
- **Rate Limiting** — Protection against brute force attacks on auth endpoints

### 📚 Course Management (CRUD)
- **Create Course** — Add new courses with name and price (user must be authenticated)
- **Get All Courses** — Retrieve all courses with pagination support (limit & page queries)
- **Get User's Courses** — Fetch courses owned by the authenticated user
- **Update Course** — Partially update course details (name and/or price, user must own the course)
- **Delete Course** — Remove a course by ID (user must own the course)

### 👥 User Management
- **Get All Users** — Retrieve all registered users (admin only, protected route)
- **User Exists Check** — Duplicate email/username prevention with 409 Conflict response
- **Role Assignment** — Users can be assigned ADMIN or USER roles during registration

### ✅ Input Validation
- **Zod Integration** — Schema-based validation for all inputs
- **Registration Validation** — Username (3-12 chars), email format, password (8-14 chars), role required
- **Login Validation** — Email format validation, password length check
- **Course Validation** — Name (max 100 chars), price (max 999999)
- **Additional Email Validation** — Validator.js for Mongoose schema validation

### 🛠️ Developer Experience
- **Global Error Handling** — 404 handler for undefined routes
- **Structured Responses** — Consistent JSON response format with status indicators
- **Environment Variables** — Configuration via .env file
- **MongoDB Connection** — Error handling with graceful shutdown
- **Nodemon** — Auto-restart during development
- **Health Check Endpoint** — `/health` endpoint for monitoring

---

## 🏃‍♂️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- MongoDB (local instance or MongoDB Atlas cloud)
- npm

### Installation

```bash
# Navigate to the project directory
cd my backend

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### Running the Server

```bash
# Development mode (with auto-reload via nodemon)
npm run dev
```

Server runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint          | Description                         | Auth Required |
|--------|-------------------|-------------------------------------|---------------|
| `POST` | `/users/register` | Register a new user                 | No            |
| `POST` | `/users/login`    | Login user & get JWT token          | No            |

### Users

| Method | Endpoint | Description              | Auth Required | Role Required |
|--------|----------|--------------------------|---------------|---------------|
| `GET`  | `/users` | Get all registered users | Yes (JWT)     | Admin         |

### Courses

| Method  | Endpoint           | Description                           | Auth Required |
|---------|--------------------|---------------------------------------|---------------|
| `GET`   | `/courses`         | Get all courses (paginated)           | Yes (JWT)     |
| `POST`  | `/courses`         | Create a new course                   | Yes (JWT)     |
| `GET`   | `/courses/me`      | Get courses owned by authenticated user | Yes (JWT)     |
| `PATCH` | `/courses/:id`     | Update a course (must own it)         | Yes (JWT)     |
| `DELETE`| `/courses/:id`     | Delete a course (must own it)         | Yes (JWT)     |

---

## 📥 Request Body Examples

### POST `/users/register` — Register a new user
```json
{
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### POST `/users/login` — Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST `/courses` — Create a course
```json
{
  "name": "JavaScript Fundamentals",
  "price": 49.99
}
```

### PATCH `/courses/:id` — Update a course
```json
{
  "name": "Advanced JavaScript",
  "price": 79.99
}
```

---

## 📤 Response Examples

### GET `/courses` — Success
```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "_id": "65abc123...",
        "userId": "65def456...",
        "name": "JavaScript Fundamentals",
        "price": 49.99,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

### POST `/users/register` — Success
```json
{
  "status": "success",
  "message": "user registred successfuly",
  "data": {
    "id": "65abc123...",
    "userName": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### POST `/users/login` — Success
```json
{
  "status": "success",
  "message": "user logged in successfully",
  "data": {
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET `/courses?page=1&limit=10` — Pagination
```json
{
  "status": "success",
  "data": {
    "courses": [...]
  }
}
```

### Error Response — Validation Failed
```json
{
  "status": "fail",
  "message": "invalid email or password",
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["userName"],
      "message": "Required"
    }
  ]
}
```

### Error Response — User Already Exists
```json
{
  "status": "fail",
  "message": "user already exist try to login"
}
```

### Error Response — 404 Not Found
```json
{
  "status": "error",
  "data": {
    "message": "Route not found",
    "path": "/invalid-route"
  }
}
```

---

## 🔐 Authentication (JWT)

This API uses **JWT (JSON Web Tokens)** for securing protected routes.

### Protected Endpoints
- `GET /users` — Requires valid JWT token in Authorization header and admin role
- `GET /courses` — Requires valid JWT token in Authorization header
- `POST /courses` — Requires valid JWT token in Authorization header
- `GET /courses/me` — Requires valid JWT token in Authorization header
- `PATCH /courses/:id` — Requires valid JWT token in Authorization header and course ownership
- `DELETE /courses/:id` — Requires valid JWT token in Authorization header and course ownership

### Token Format
Include the token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

### Token Details
- **Algorithm:** HS256
- **Payload:** User ID (`sub` claim) and role
- **Expiration:** 1 hour

### Example Request with Token
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📦 Dependencies

| Package      | Version    | Purpose                                    |
|--------------|------------|--------------------------------------------|
| `express`    | ^5.2.1     | Web framework                              |
| `mongoose`   | ^9.2.1     | MongoDB ODM                                |
| `mongodb`    | ^7.1.0     | MongoDB driver                             |
| `dotenv`     | ^17.3.1    | Environment variables management          |
| `helmet`     | ^8.1.0     | HTTP security headers                      |
| `cors`       | ^2.8.6     | Cross-Origin Resource Sharing              |
| `bcrypt`     | ^6.0.0     | Password hashing                           |
| `zod`        | ^4.3.6     | Schema validation                          |
| `validator`  | ^13.15.26  | Email validation                           |
| `jsonwebtoken` | ^9.0.3   | JWT token generation & verification       |
| `express-rate-limit` | ^8.2.1 | Rate limiting for API endpoints        |
| `nodemon`    | ^3.1.11    | Auto-restart during development            |

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB
- **ODM:** Mongoose v9
- **Validation:** Zod, Validator.js
- **Security:** Helmet, Bcrypt, JWT, Rate Limiting
- **Module System:** ES Modules (`import/export`)

---

## 📋 Data Schemas

### User Schema
```javascript
{
  userName: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true, 
    lowercase: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    validate: [validator.isEmail, "Enter a valid email"]
  },
  password: { 
    type: String, 
    required: true, 
    select: false  // Excluded from queries by default
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  timestamps: { 
    createdAt: Date, 
    updatedAt: Date 
  }
}
```

### Course Schema
```javascript
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  timestamps: { 
    createdAt: Date, 
    updatedAt: Date 
  }
}
```

---

## 🔒 Environment Variables

| Variable      | Description                      | Required |
|---------------|----------------------------------|----------|
| `MONGO_URL`   | MongoDB connection string       | Yes      |
| `JWT_SECRET`  | Secret key for JWT tokens       | Yes      |

---

## 📝 License
