# Subscription Tracker API

## Overview

A comprehensive REST API for managing user subscriptions with authentication, authorization, and automated reminders. Built with Node.js, Express, and MongoDB, this API provides secure endpoints for user management, subscription tracking, and renewal notifications.

## Key Features

- **User Authentication**: JWT-based auth with sign-up, login, and logout
- **Subscription Management**: Full CRUD operations for tracking subscriptions
- **Automated Workflows**: Integration with Upstash for scheduled tasks
- **Email Notifications**: Renewal reminders via Nodemailer
- **Rate Limiting**: Protection against brute force attacks (100 requests/15 minutes)
- **Error Handling**: Custom middleware for consistent error responses
- **Data Persistence**: MongoDB storage with Mongoose ODM

## API Endpoints

### Authentication Routes (`/api/v1/auth`)
| Method | Endpoint    | Description               | Auth Required |
|--------|-------------|---------------------------|---------------|
| POST   | /sign-up    | Register new user         | No            |
| POST   | /sign-in    | User login                | No            |
| POST   | /sign-out   | User logout               | Yes           |

### User Routes (`/api/v1/users`)
| Method | Endpoint          | Description               | Auth Required |
|--------|-------------------|---------------------------|---------------|
| GET    | /                 | Get all users             | Yes           |
| GET    | /:id              | Get user by ID            | Yes           |
| POST   | /                 | Create new user           | Yes           |
| PATCH  | /:id              | Update user               | Yes           |
| DELETE | /:id              | Delete user               | Yes           |
| GET    | /subscriptions    | Get user subscriptions    | Yes           |

### Subscription Routes (`/api/v1/subscriptions`)
| Method | Endpoint               | Description                     | Auth Required |
|--------|------------------------|---------------------------------|---------------|
| GET    | /                      | Get all subscriptions           | Yes           |
| GET    | /:id                   | Get subscription by ID          | Yes           |
| POST   | /                      | Create new subscription         | Yes           |
| PATCH  | /:id                   | Update subscription             | Yes           |
| DELETE | /:id                   | Delete subscription             | Yes           |
| GET    | /user/:id              | Get all user subscriptions      | Yes           |
| PUT    | /:id/cancel            | Cancel subscription             | Yes           |
| PUT    | /upcoming-renewals     | Get upcoming renewals           | Yes           |

### Workflow Routes (`/api/v1/workflows`)
| Method | Endpoint               | Description                     | Auth Required |
|--------|------------------------|---------------------------------|---------------|
| POST   | /subscription/reminder | Send subscription reminders     | Yes           |

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "statusCode": 404,
    "message": "Not Found"
  }
}
```

## Security Features

- **JWT Authentication**: Required for protected routes
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: Bcrypt for secure password storage
- **Environment Variables**: Sensitive configuration stored securely

## Technologies Used

### Core Stack
- **Node.js** (v18+) - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Security
- **jsonwebtoken** - Authentication
- **bcrypt** - Password hashing
- **express-rate-limit** - Request throttling
- **Arcjet** - Additional security layer

### Additional Services
- **Upstash Redis** - Workflow database
- **Upstash Workflows** - Task scheduling
- **Nodemailer** - Email notifications
- **Day.js** - Date manipulation

## Getting Started

1. Clone the repository:
```bash
git clone (https://github.com/Rukkyoo/sub-tracker-api)
cd sub-tracker-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sub-tracker
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

4. Start development server:
```bash
npm run dev
```

## Deployment Options

The API can be deployed to:
- **Render**
- **Railway**
- **Vercel** (serverless)
- **AWS Elastic Beanstalk**
- **Heroku**

## License

MIT License - See [LICENSE](LICENSE) for details.
