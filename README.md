# CareerOS - The Operating System for Your Career

A comprehensive SaaS career management platform built with the MERN stack to help job seekers manage their job search, track applications, build resumes, and advance their careers.

## 🚀 Features

### ✅ Implemented
- **User Authentication** - Register, login, logout with JWT tokens
- **Protected Routes** - Secure access to authenticated features
- **Dashboard** - Real-time statistics and recent applications
- **Job Management** - Browse and search job listings with advanced filters
- **Application Tracking** - Track job applications with status management
- **Interview Scheduling** - Manage interview schedules and feedback
- **Offer Management** - Track job offers and negotiations
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **Modern UI Components** - Card, Button, Badge, Input, Modal, Loader

### 🚧 Coming Soon
- Resume Builder with ATS scoring
- Learning Paths and Career Roadmaps
- Job Search across multiple platforms
- Interview Preparation resources
- Career Analytics and Insights
- Email Notifications
- Calendar Integration

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd project-demo
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5001

# MongoDB
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Security
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=7200000

# CORS
CORS_ORIGIN=http://localhost:3000

# API
API_PREFIX=/api/v1
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

### 4. Seed Sample Data (Optional)
```bash
cd backend
node seedJobs.js
```

This will populate the database with 8 sample job listings.

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on http://localhost:5001

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

## 📁 Project Structure

```
project-demo/
├── backend/
│   ├── config/
│   │   └── config.js           # Environment configuration
│   ├── controllers/
│   │   ├── auth.controller.js  # Authentication logic
│   │   ├── job.controller.js   # Job management
│   │   └── application.controller.js
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Job.js              # Job schema
│   │   └── Application.js      # Application schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   └── health.routes.js
│   ├── utils/
│   │   └── db.js               # MongoDB connection
│   ├── server.js               # Entry point
│   ├── seedJobs.js             # Seed script
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/         # Reusable UI components
    │   │   └── layout/         # Layout components
    │   ├── pages/
    │   │   ├── DashboardPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── PlaceholderPage.jsx
    │   ├── services/
    │   │   ├── api.js          # Axios instance
    │   │   ├── authService.js
    │   │   ├── jobService.js
    │   │   └── applicationService.js
    │   ├── styles/
    │   │   └── index.css       # Global styles
    │   ├── utils/
    │   │   └── constants.js
    │   ├── App.jsx             # Main app component
    │   └── main.jsx            # Entry point
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)
- `PUT /api/v1/auth/profile` - Update profile (Protected)
- `PUT /api/v1/auth/change-password` - Change password (Protected)
- `POST /api/v1/auth/logout` - Logout (Protected)

### Jobs
- `GET /api/v1/jobs` - Get all jobs with filters
- `GET /api/v1/jobs/:id` - Get single job
- `GET /api/v1/jobs/trending` - Get trending jobs
- `GET /api/v1/jobs/recommendations` - Get recommendations (Protected)
- `GET /api/v1/jobs/stats` - Get job statistics
- `POST /api/v1/jobs` - Create job (Protected)
- `PUT /api/v1/jobs/:id` - Update job (Protected)
- `DELETE /api/v1/jobs/:id` - Delete job (Protected)

### Applications
- `GET /api/v1/applications` - Get all applications (Protected)
- `GET /api/v1/applications/:id` - Get single application (Protected)
- `GET /api/v1/applications/stats` - Get statistics (Protected)
- `GET /api/v1/applications/recent` - Get recent applications (Protected)
- `POST /api/v1/applications` - Create application (Protected)
- `PUT /api/v1/applications/:id` - Update application (Protected)
- `DELETE /api/v1/applications/:id` - Delete application (Protected)
- `PATCH /api/v1/applications/:id/status` - Update status (Protected)
- `POST /api/v1/applications/:id/interviews` - Add interview (Protected)
- `POST /api/v1/applications/:id/offer` - Add offer (Protected)
- `PATCH /api/v1/applications/:id/archive` - Toggle archive (Protected)

### Health
- `GET /api/v1/health` - Health check

## 🎨 UI Components

The project includes a comprehensive design system:

- **Button** - 6 variants, 4 sizes, with icon support
- **Card** - 4 variants (default, gradient, outlined, hover)
- **Badge** - 11 variants with dot and icon support
- **Input** - Full-featured form input with validation
- **Modal** - Configurable modal dialog
- **Loader** - Loading spinner

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Rate limiting on login attempts
- Account lockout after failed attempts
- Secure HTTP headers with Helmet
- CORS configuration
- Input validation
- XSS protection

## 📝 Development Notes

### Authentication Flow
1. User registers/logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with each API request
5. Server validates token via middleware

### Protected Routes
All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Database Models

#### User
- Authentication and profile information
- Skills, experience, and bio
- Login attempt tracking
- Account lock mechanism

#### Job
- Job listings with detailed information
- Salary range and benefits
- Skills and requirements
- Location type (remote/hybrid/onsite)
- Application tracking

#### Application
- Job application tracking
- Status management
- Interview scheduling
- Offer management
- Contact information
- Timeline tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Ajay Sriram

## 🙏 Acknowledgments

- Inter font by Google Fonts
- Lucide icons
- Tailwind CSS team
- MongoDB team
- React team

---

**Happy Job Hunting! 🎯**
