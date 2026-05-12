# School Ecosystem Management System

A full-stack School Ecosystem Management System developed to improve communication and collaboration between students, teachers, parents, and administrators within a school environment.

The platform provides features such as attendance tracking, assignment management, notifications, event participation, leave applications, and real-time communication.

---

# Contributors

- Tanya Sri (E0123028)
- SAKTHI R (E0123009)
- Tharanya Ganesan (E0123030)

---

# Team Contributions

## Frontend
- **Initialisation** – Tanya Sri (E0123028)
- **Frontend Development** – SAKTHI R (E0123009)

## Backend
- **Initialisation** – Tanya Sri (E0123028)
- **Controllers & Middleware Development** – Tharanya Ganesan (E0123030)
- **Routes, Models & Socket Development** – Tanya Sri (E0123028)

---

# Features

## Student Module
- View attendance percentage
- View marks and academic performance
- Apply for leave
- Participate in school events
- Receive announcements and notifications

## Teacher Module
- Assign homework and assignments
- Upload marks and attendance
- Communicate with parents and students
- Manage classroom activities

## Parent Module
- Track student attendance and performance
- Communicate with teachers
- Receive notifications and announcements

## Admin Module
- Manage users and roles
- Publish announcements and holidays
- Manage events and notifications
- Monitor overall system activities

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Socket.io

---

# Project Structure

```bash
school-ecosystem/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── package.json
│
└── README.md
```

---

# Project Setup

## Clone Repository

```bash
git clone https://github.com/SAKTHI-R-22/school-ecosystem.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

Backend server will run on:

```bash
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the backend folder and configure the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Modules Included

- Authentication & Authorization
- Attendance Management
- Assignment Management
- Event Participation
- Leave Management
- Notification System
- Real-time Communication using Socket.io

---

# Future Enhancements

- Mobile Application Support
- AI-Based Student Performance Analytics
- Online Examination Module
- Video Conferencing for Virtual Classes
- QR-Based Attendance System
- Cloud Deployment and Scalability
- Multi-school Management Support

---

# Conclusion

The School Ecosystem Management System simplifies school operations by creating a centralized platform for communication, academic tracking, and administrative management. The project enhances collaboration between students, teachers, parents, and administrators while improving efficiency and accessibility.

---