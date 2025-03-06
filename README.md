🏨 Hotel Booking & Check-in System

This is a full-stack web application for managing hotel bookings and check-ins.
The project ensures each user can book only one hotel once, and allows users to check in to booked hotels with family details.
📚 Tech Stack
Frontend

    React.js (UI)
    Redux Toolkit (State Management)
    Axios (API Calls)
    React Router (Navigation)

Backend

    Node.js (Server)
    Express.js (Routing)
    Prisma ORM (Database Access)

Database

    PostgreSQL

✨ Features

✅ View Hotels - Fetch available hotels from backend (stored in PostgreSQL).
✅ Book Hotel - Users can book only one hotel at a time (per user).
✅ Hotel Status Tracking - Each hotel has a status field (pending, booked, checked-in).
✅ Check-in Process - After booking, users can check in and submit family details (name, Aadhar, etc.).
📂 Project Structure

root/
├── backend/
│   ├── prisma/                 # Prisma schema & migrations
│   ├── routes/                  # Express routes (hotels, bookings, check-ins)
│   ├── controllers/             # Business logic for each route
│   ├── models/                   # Prisma models (Hotel, Booking, User, CheckIn)
│   ├── server.js                 # Entry point (Express server)
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── hotelsSlice.js    # Redux slice for hotels state
│   │   │
│   │   ├── components/
│   │   │   ├── HotelList.js      # Hotel listing component
│   │   │   ├── CheckInForm.js    # Form for family member check-in
│   │   │
│   │   ├── pages/
│   │   │   ├── MyCheckIns.js     # Page to show all user check-ins
│   │
│   │   ├── App.js
│   │   ├── index.js
│
├── README.md

🛠️ Backend (Node.js + Express + Prisma + PostgreSQL)
Hotel Model (Prisma)

model Hotel {
  id          Int      @id @default(autoincrement())
  name        String
  location    String
  price       Int
  status      String   @default("pending") // pending, booked, checked-in
  bookedBy    Int?     // User ID who booked the hotel
  checkInDetails Json? // Stored family member details after check-in
}

Booking Flow

    User books hotel → status = booked, bookedBy = userID
    User checks in → status = checked-in, checkInDetails = JSON data

🌐 Backend API Endpoints
Method	Endpoint	Description
GET	/api/hotels	Fetch all hotels
POST	/api/hotels/book/:id	Book hotel (user can book only once)
POST	/api/hotels/checkin/:id	Check in to hotel with family details
🔗 Frontend (React.js + Redux Toolkit)
State Management

    Hotels Slice: Stores all hotels and their statuses.
    Check-in Slice: Stores user's check-in history.

Booking Process

    Hotel List Page fetches all hotels from /api/hotels.
    Book Now button triggers:
        bookHotel action (updates local state to booked for the hotel).
        Axios POST request to /api/hotels/book/:id (updates in PostgreSQL via Prisma).

Check-in Process

    Check-in Form allows users to enter family member names & Aadhar numbers.
    Submitting the form triggers:
        checkInHotel action (adds check-in data to Redux).
        Axios POST request to /api/hotels/checkin/:id (updates in PostgreSQL via Prisma).



🚀 Running the Project
Backend Setup

cd backend
npm install
npx prisma migrate dev
npm start

    Make sure PostgreSQL is running.
    Update DATABASE_URL in .env (PostgreSQL connection string).

Example .env:

DATABASE_URL="postgresql://username:password@localhost:5432/hotelDB"

Frontend Setup

cd frontend
npm install
npm start

    Frontend runs on http://localhost:3000.
    Backend runs on http://localhost:5000.

Proxy (optional)

Set proxy in frontend/package.json:

"proxy": "http://localhost:5000"

👤 User-Specific Features

    Each user can book only one hotel.
    Once booked, hotel status changes from pending to booked.
    After check-in, status changes to checked-in.
    Check-in details (family members) are stored in PostgreSQL in checkInDetails JSON field.

📋 Example User Flow

    User logs in (if implemented).
    Visits Hotel List Page, sees available hotels.
    Clicks Book Now on a hotel.
    Fills Check-in Form after booking (family names + Aadhar).
