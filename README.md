
# Team Manager API Documentation

This document provides the details for using the Team Manager API.

---

## 1. Authentication

### 1.1. Register
**POST /auth/register**  
Description: Register a new user. A verification code is sent to the provided email.  

#### Body:
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

### 1.2. Verify
**POST /auth/verify**  
Description: Verify a user's email with the code sent during registration.  

#### Body:
```json
{
    "email": "string",
    "code": "string"
}
```

### 1.3. Login
**POST /auth/login**  
Description: Authenticate a user and receive a JWT.  

#### Body:
```json
{
    "email": "string",
    "password": "string"
}
```

---

## 2. Teams

### 2.1. Create Team
**POST /teams**  
Description: Add a new team for the authenticated user.  

#### Headers:
`Authorization: Bearer <JWT>`  

#### Body:
```json
{
    "name": "string",
    "players": [
        {
            "name": "string",
            "position": "string"
        }
    ]
}
```

### 2.2. Get Teams
**GET /teams**  
Description: Retrieve all teams created by the authenticated user.  

#### Headers:
`Authorization: Bearer <JWT>`  

---

## 3. Sedes

### 3.1. Create Sede
**POST /sedes**  
Description: Add a new sede (location).  

#### Headers:
`Authorization: Bearer <JWT>`  

#### Body:
```json
{
    "name": "string"
}
```

### 3.2. Get Sedes
**GET /sedes**  
Description: Retrieve all sedes created by the authenticated user.  

#### Headers:
`Authorization: Bearer <JWT>`  

---

## 4. Tournaments and Leagues

### 4.1. Create Tournament/League
**POST /tournaments** or **POST /leagues**  
Description: Create a new tournament or league with specified parameters.  

#### Headers:
`Authorization: Bearer <JWT>`  

#### Body:
```json
{
    "name": "string",
    "date": "YYYY-MM-DD",
    "sede": "string",
    "teams": ["teamId1", "teamId2"]
}
```

### 4.2. Get Tournaments/Leagues
**GET /tournaments** or **GET /leagues**  
Description: Retrieve all tournaments or leagues created by the authenticated user.  

#### Headers:
`Authorization: Bearer <JWT>`  

### 4.3. Generate Matches
**POST /tournaments/:id/matches** or **POST /leagues/:id/matches**  
Description: Automatically generate matches for a tournament or league.  

#### Headers:
`Authorization: Bearer <JWT>`  

### 4.4. Get Matches for Tournament/League
**GET /tournaments/:id** or **GET /leagues/:id**  
Description: Retrieve tournament or league details, including matches.  

#### Headers:
`Authorization: Bearer <JWT>`  
