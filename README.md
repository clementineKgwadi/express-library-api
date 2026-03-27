# Express-Library-Api

The Library-API is a RESTful API built using Node.js and TypeScript that allows a community library to manage authors and books efficiently. The API supports CRUD operations, input validation, and centralized error handling to ensure consistent and reliable responses.

---

## Core Features

**Authors**

- Create new author
- List all authors
- Get author by Id
- Update author 
- Delete author 
- List Books by an author

**Books**

- Create new book 
- List all books 
- Get book by Id 
- Update book
- Delete book

## Middleware

- **Logger**: logs the HTTP method and URL of each incoming request.
- **Input Validation**: validates request data using `express-validator` and returns errors if data is invalid.
- **Error Handling**: centralized handler for all errors.
- **Not Found**: catches requests to undefined routes and forwards a 404 error.

---

## Built with

- Node.js
- TypeScript
- Express
- express-validator

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/clementineKgwadi/express-library-api.git
cd express-library-api
```

### 2. Open the project in VS Code
```bash
code .
```

### 3. Change to dev branch
```bash
 git checkout dev
```

### 4. Install Dependencies on your terminal
```bash
npm install
```

### 5. Run the Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```
**Note:** If port 3000 is already in use, you can override it by setting the PORT environment variable in server.ts or a .env file.

---

## API Endpoints

**Authors:**

- **POST** `/authors` – Create a new author
- **GET** `/authors` – Get all authors
- **GET** `/authors/:id` – Get author by ID 
- **PUT** `/authors/:id` – Update an existing author
- **DELETE** `/authors/:id` – Delete an author 
- **GET** `/authors/:id/books` - List all books by a specific author

**Books:**

- **POST** `/books` - Create a new book   
- **GET** `/books` - Get all books
- **GET** `/books/:id` -  Get book by ID       
- **PUT** `/books/:id` - Update an existing book
- **DELETE** `/books/:id` - Delete a book

---

## Testing & Documentation

- After starting the server, you can use **Postman** (or any API client) to test the endpoints listed above.
- All endpoints return consistent JSON responses.
- Endpoints have been tested using Postman to ensure correct CRUD functionality and error handling.

---

