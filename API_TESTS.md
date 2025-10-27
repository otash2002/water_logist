# Water Logistics API Testing Guide

Base URL: `http://localhost:5000`

## Authentication
All routes except register and login require Bearer token:
```
Authorization: Bearer your_token_here
```

## Customer Endpoints

### 1. Register Customer
- **URL**: POST `/api/customers/register`
- **Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+998901234567",
    "password": "password123"
}
```
- **Response**: Returns token and user info

### 2. Login Customer
- **URL**: POST `/api/customers/login`
- **Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response**: Returns token and user info

### 3. List All Customers
- **URL**: GET `/api/customers`
- **Auth**: Required
- **Response**: Returns array of customers

### 4. Get Customer by ID
- **URL**: GET `/api/customers/:id`
- **Auth**: Required
- **Example**: `/api/customers/6523a89b1234567890abcdef`

### 5. Update Customer
- **URL**: PUT `/api/customers/:id`
- **Auth**: Required
- **Body** (all fields optional):
```json
{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "+998901234568"
}
```

### 6. Delete Customer
- **URL**: DELETE `/api/customers/:id`
- **Auth**: Required
- **Example**: `/api/customers/6523a89b1234567890abcdef`

## Address Endpoints

### 1. Create Address
- **URL**: POST `/api/addresses`
- **Auth**: Required
- **Body**:
```json
{
    "name": "Main Office",
    "email": "office@example.com",
    "phone": "+998901234570",
    "password": "address123"
}
```

### 2. List All Addresses
- **URL**: GET `/api/addresses`
- **Auth**: Required

### 3. Get Address by ID
- **URL**: GET `/api/addresses/:id`
- **Auth**: Required
- **Example**: `/api/addresses/6523a89b1234567890abcdef`

### 4. Update Address
- **URL**: PUT `/api/addresses/:id`
- **Auth**: Required
- **Body** (all fields optional):
```json
{
    "name": "Updated Office",
    "email": "updated.office@example.com",
    "phone": "+998901234571"
}
```

### 5. Delete Address
- **URL**: DELETE `/api/addresses/:id`
- **Auth**: Required

## District Endpoints

### 1. Create District
- **URL**: POST `/api/districts`
- **Auth**: Required
- **Body**:
```json
{
    "name": "Central District",
    "email": "central@example.com",
    "phone": "+998901234580",
    "password": "district123"
}
```

### 2. List All Districts
- **URL**: GET `/api/districts`
- **Auth**: Required

### 3. Get District by ID
- **URL**: GET `/api/districts/:id`
- **Auth**: Required
- **Example**: `/api/districts/6523a89b1234567890abcdef`

### 4. Update District
- **URL**: PUT `/api/districts/:id`
- **Auth**: Required
- **Body** (all fields optional):
```json
{
    "name": "Updated District",
    "email": "updated.district@example.com",
    "phone": "+998901234581"
}
```

### 5. Delete District
- **URL**: DELETE `/api/districts/:id`
- **Auth**: Required

## Testing Flow

1. First register a customer:
```bash
curl -X POST http://localhost:5000/api/customers/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+998901234567",
    "password": "password123"
}'
```

2. Login and save the token:
```bash
curl -X POST http://localhost:5000/api/customers/login \
-H "Content-Type: application/json" \
-d '{
    "email": "test@example.com",
    "password": "password123"
}'
```

3. Use the token for other requests:
```bash
curl -X GET http://localhost:5000/api/customers \
-H "Authorization: Bearer your_token_here"
```

## Response Format

Success Response:
```json
{
    "success": true,
    "message": "Success message here",
    "data": {
        // Response data here
    }
}
```

Error Response:
```json
{
    "success": false,
    "message": "Error message here",
    "details": [] // Optional error details
}
```

## Validation Rules

- Phone numbers must be in format: +998XXXXXXXXX
- Email must be valid format
- Password minimum length: 6 characters
- Name minimum length: 2 characters