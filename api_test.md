# Water Logist API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### OTP Operations

#### Send OTP
- **Method**: POST
- **Endpoint**: `/otp/send`
- **Headers**: 
  - Content-Type: application/json
- **Request Body**:
```json
{
    "email": "john@example.com",
    "purpose": "PASSWORD_RESET"  // or "REGISTRATION" or "LOGIN_VERIFICATION"
}
```
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "message": "OTP sent successfully",
        "otp": "123456"  // Only in development
    }
}
```

#### Verify OTP
- **Method**: POST
- **Endpoint**: `/otp/verify`
- **Headers**: 
  - Content-Type: application/json
- **Request Body**:
```json
{
    "email": "john@example.com",
    "otp": "123456",
    "purpose": "PASSWORD_RESET"  // or "REGISTRATION" or "LOGIN_VERIFICATION"
}
```
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "verified": true
    },
    "message": "OTP verified successfully"
}
```

#### Reset Password with OTP
- **Method**: POST
- **Endpoint**: `/otp/reset-password`
- **Headers**: 
  - Content-Type: application/json
- **Request Body**:
```json
{
    "email": "john@example.com",
    "otp": "123456",
    "newPassword": "newPassword123"
}
```
- **Success Response** (200):
```json
{
    "success": true,
    "message": "Password reset successfully"
}
```

### Register Customer
- **Method**: POST
- **Endpoint**: `/customers/register`
- **Headers**: 
  - Content-Type: application/json
- **Request Body**:
```json
{
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "password": "password123"
}
```
- **Success Response** (201):
```json
{
    "success": true,
    "data": {
        "id": "customer_id",
        "email": "john@example.com"
    },
    "message": "Registered"
}
```
- **Error Response** (400):
```json
{
    "success": false,
    "message": "Email already in use"
}
```

### Login Customer
- **Method**: POST
- **Endpoint**: `/customers/login`
- **Headers**: 
  - Content-Type: application/json
- **Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "token": "jwt_token_here",
        "user": {
            "id": "customer_id",
            "email": "john@example.com"
        }
    },
    "message": "Logged in"
}
```
- **Error Response** (401):
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

## Customer Management

### List All Customers
- **Method**: GET
- **Endpoint**: `/customers`
- **Headers**: 
  - Authorization: Bearer {token}
- **Success Response** (200):
```json
{
    "success": true,
    "data": [
        {
            "_id": "customer_id",
            "name": "John Doe",
            "phone": "+1234567890",
            "email": "john@example.com",
            "isActive": true,
            "createdAt": "2025-10-30T00:00:00.000Z",
            "updatedAt": "2025-10-30T00:00:00.000Z"
        }
    ]
}
```

### Get Customer by ID
- **Method**: GET
- **Endpoint**: `/customers/:id`
- **Headers**: 
  - Authorization: Bearer {token}
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "_id": "customer_id",
        "name": "John Doe",
        "phone": "+1234567890",
        "email": "john@example.com",
        "isActive": true,
        "createdAt": "2025-10-30T00:00:00.000Z",
        "updatedAt": "2025-10-30T00:00:00.000Z"
    }
}
```
- **Error Response** (404):
```json
{
    "success": false,
    "message": "Not found"
}
```

### Update Customer
- **Method**: PUT
- **Endpoint**: `/customers/:id`
- **Headers**: 
  - Authorization: Bearer {token}
  - Content-Type: application/json
- **Request Body**:
```json
{
    "name": "John Updated",
    "phone": "+1234567890",
    "email": "john.updated@example.com"
}
```
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "_id": "customer_id",
        "name": "John Updated",
        "phone": "+1234567890",
        "email": "john.updated@example.com",
        "isActive": true,
        "createdAt": "2025-10-30T00:00:00.000Z",
        "updatedAt": "2025-10-30T00:00:00.000Z"
    },
    "message": "Updated"
}
```

### Delete Customer
- **Method**: DELETE
- **Endpoint**: `/customers/:id`
- **Headers**: 
  - Authorization: Bearer {token}
- **Success Response** (200):
```json
{
    "success": true,
    "data": {
        "_id": "customer_id",
        "name": "John Doe",
        "phone": "+1234567890",
        "email": "john@example.com",
        "isActive": true,
        "createdAt": "2025-10-30T00:00:00.000Z",
        "updatedAt": "2025-10-30T00:00:00.000Z"
    },
    "message": "Deleted"
}
```

## Testing Instructions

1. First, register a new customer using the register endpoint
2. Login with the registered credentials to get the JWT token
3. Use the JWT token in the Authorization header for all other requests
4. Test CRUD operations in the following order:
   - List all customers
   - Get a specific customer by ID
   - Update customer information
   - Delete customer

## Common Error Responses

- **401 Unauthorized**:
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

- **404 Not Found**:
```json
{
    "success": false,
    "message": "Not found"
}
```

- **500 Server Error**:
```json
{
    "success": false,
    "message": "Operation failed",
    "error": "Error details here"
}
```