# Water Logistics API Documentation

Base URL: `http://localhost:5000`

## Authentication
All routes except customer/staff registration and login require Bearer token:
```
Authorization: Bearer your_token_here
```

## Role-Based Access
The API implements role-based access control with the following roles:
- `customer`: Basic access to own data and orders
- `staff`: Access to assigned deliveries and basic operations
- `manager`: District management and advanced operations
- `admin`: Full system access

## Customer Endpoints

### 1. Register Customer
- **URL**: POST `/api/customers/register`
- **Access**: Public
- **Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+998901234567",
    "password": "password123"
}
```
- **Response**: Returns user info and authentication token

### 2. Login Customer
- **URL**: POST `/api/customers/login`
- **Access**: Public
- **Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response**: Returns user info and authentication token

### 3. Get Customer Profile
- **URL**: GET `/api/customers/profile`
- **Auth**: Required (Customer)
- **Response**: Returns customer's own profile data

### 4. Update Customer Profile
- **URL**: PUT `/api/customers/profile`
- **Auth**: Required (Customer)
- **Body** (all fields optional):
```json
{
    "name": "John Updated",
    "phone": "+998901234568"
}
```

## Address Endpoints

### 1. Create Address
- **URL**: POST `/api/addresses`
- **Auth**: Required (Customer)
- **Body**:
```json
{
    "district": "district_id",
    "street": "123 Main St",
    "building": "45A",
    "apartment": "12",
    "floor": 3,
    "notes": "Near the park"
}
```

### 2. List Customer Addresses
- **URL**: GET `/api/addresses`
- **Auth**: Required (Customer)
- **Query Parameters**:
  - `active`: Boolean to filter active/inactive addresses
  - `district`: Filter by district ID

### 3. Update Address
- **URL**: PUT `/api/addresses/:id`
- **Auth**: Required (Customer, own addresses only)
- **Body** (all fields optional):
```json
{
    "street": "Updated Street",
    "building": "46B",
    "notes": "Updated location details"
}
```

## District Endpoints

### 1. Create District
- **URL**: POST `/api/districts`
- **Auth**: Required (Admin only)
- **Body**:
```json
{
    "name": "Central District",
    "description": "Central area of the city",
    "deliveryFee": 10000,
    "boundaries": "Central district boundaries description",
    "manager": "staff_id"
}
```

### 2. List Districts
- **URL**: GET `/api/districts`
- **Auth**: Required
- **Query Parameters**:
  - `active`: Boolean to filter active/inactive districts
  - `manager`: Filter by manager ID

### 3. Update District
- **URL**: PUT `/api/districts/:id`
- **Auth**: Required (Admin or assigned Manager)
- **Body** (all fields optional):
```json
{
    "name": "Updated District Name",
    "deliveryFee": 12000,
    "manager": "new_manager_id"
}
```

## Order Endpoints

### 1. Create Order
- **URL**: POST `/api/orders`
- **Auth**: Required (Customer)
- **Body**:
```json
{
    "address": "address_id",
    "items": [
        {
            "productName": "Water Bottle 19L",
            "quantity": 2,
            "price": 15000
        }
    ],
    "notes": "Please deliver in the morning"
}
```

### 2. List Orders
- **URL**: GET `/api/orders`
- **Auth**: Required
- **Query Parameters**:
  - `status`: Filter by order status
  - `from`: Start date
  - `to`: End date
  - `page`: Page number
  - `limit`: Items per page
  - `sort`: Sort field
  - `customer`: Filter by customer (Admin/Manager only)

### 3. Get Order Details
- **URL**: GET `/api/orders/:id`
- **Auth**: Required (Customer: own orders, Staff: assigned orders, Admin/Manager: all)

### 4. Update Order Status
- **URL**: PUT `/api/orders/:id`
- **Auth**: Required (Staff/Manager/Admin)
- **Body**:
```json
{
    "status": "confirmed",
    "staff": "staff_id",
    "notes": "Delivery scheduled for tomorrow"
}
```

## Payment Endpoints

### 1. Create Payment
- **URL**: POST `/api/payments`
- **Auth**: Required (Staff/Manager/Admin)
- **Body**:
```json
{
    "order": "order_id",
    "amount": 30000,
    "method": "cash",
    "transactionId": "optional_transaction_id"
}
```

### 2. List Payments
- **URL**: GET `/api/payments`
- **Auth**: Required (Admin/Manager)
- **Query Parameters**:
  - `status`: Payment status
  - `method`: Payment method
  - `from`: Start date
  - `to`: End date
  - `page`: Page number
  - `limit`: Items per page

## Common Patterns

### Pagination
All list endpoints support pagination with these query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

### Error Handling
Error responses follow this format:
```json
{
    "success": false,
    "message": "Error description",
    "details": [
        {
            "field": "fieldName",
            "message": "Specific error for this field"
        }
    ]
}
```

### Request Limits
- Rate limit: 100 requests per 15 minutes
- Payload size limit: 10MB
- Maximum items per page: 100

### Data Validation Rules
- Phone numbers: Must match `^\\+998\\d{9}$`
- Email: Must be valid format
- Password: Minimum 6 characters
- Names: 2-50 characters
- IDs: Valid MongoDB ObjectId