# EMS Backend Setup Instructions

## Prerequisites
1. Node.js installed
2. MySQL server running
3. Database `ems_db` created

## Database Setup
```sql
CREATE DATABASE ems_db;
USE ems_db;

CREATE TABLE Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ContactNumber VARCHAR(20),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Install Dependencies
```bash
cd service
npm install
```

## Environment Configuration
Create a `.env` file in the service folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=abhik
DB_NAME=ems_db
PORT=3001
```

## Start Server
```bash
npm start
```

## API Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user  
- GET `/api/auth/logout` - Logout user
- PUT `/admin/:adminId` - Update admin profile

## Expected Request Format
### Register:
```json
{
  "Name": "John Doe",
  "Email": "john@example.com", 
  "Password": "password123"
}
```

### Login:
```json
{
  "Email": "john@example.com",
  "Password": "password123"  
}
```
