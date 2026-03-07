🎯 Expert Session Booking System

A Real-Time Expert Session Booking System built with React, Node.js, Express and Socket.io.

🚀 Features
- ✅ Expert Listing with Search & Filter & Pagination
- ✅ Expert Detail with Real-time Slot Updates
- ✅ Booking Form with Validation
- ✅ My Bookings with Status Tracking
- ✅ Socket.io Real-time Updates
- ✅ Double Booking Prevention
- ✅ REST API with proper folder structure

🛠️ Tech Stack
| Frontend | Backend | Database | Real-time |
|---|---|---|---|
| React + Vite | Node.js + Express | Local JSON | Socket.io |

📁 Project Structure
```
expert-booking/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ExpertList.jsx
│       │   ├── ExpertDetail.jsx
│       │   ├── BookingForm.jsx
│       │   └── MyBookings.jsx
│       └── App.jsx
└── .gitignore
```

## ⚙️ How to Run

### Backend
```bash
cd backend
npm install
node server.js
```

 Frontend
```bash
cd frontend
npm install
npm run dev
```

 🌐 Open in Browser
```
http://localhost:5173
```

## 📡 API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /experts | Get all experts |
| GET | /experts/:id | Get expert by ID |
| POST | /bookings | Create booking |
| PATCH | /bookings/:id/status | Update status |
| GET | /bookings?email= | Get bookings by email |
