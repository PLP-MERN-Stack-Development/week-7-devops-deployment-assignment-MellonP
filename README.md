
# 🐞 MERN Bug Tracker

A full-stack Bug Tracker app built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to report, view, update, and delete bugs in a project—ideal for development teams managing issues collaboratively.

---

## 🚀 Features

* Create, read, update, delete (CRUD) bug reports
* Real-time project tracking (with project & reporter fields)
* MongoDB for persistent data storage
* RESTful API architecture
* Frontend and backend deployed with CI/CD support
* Environment-based configuration using `.env`

---

## 🧱 Tech Stack

Frontend: React, Axios, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Deployment: Render / Railway / Netlify
DevOps: Git, GitHub, CI/CD
Testing: (Optional) Jest / Postman

---

## 🔧 Project Structure

mern-bug-tracker/
├── client/             
├──  ├── public
 ├── src
 | ├── components
 | | ├── pages
server/               # Express backend
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Custom error handling
│   └── server.js         # Main server entry
├── .env                  # Environment config
└── README.md             # You're reading it!

---

## 📦 Installation

### 1. Clone the repo

git clone [https://github.com/MellonP/mern-bug-tracker.git](https://github.com/MellonP/mern-bug-tracker.git)
cd mern-bug-tracker

### 2. Setup environment variables

Create a `.env` file in `/server/`:

PORT=3001
MONGODB\_URI=mongodb://localhost:27017/bugtracker
NODE\_ENV=development

### 3. Install dependencies

# Backend

cd server
npm install

# Frontend

cd ../client
npm install

---

## 🧪 Running the App

### Development Mode

# Start backend

cd server
npm run dev

# Start frontend (in separate terminal)

cd client
npm run dev

---

## 🌐 API Endpoints

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /api/bugs      | Get all bugs     |
| POST   | /api/bugs      | Create a new bug |
| GET    | /api/bugs/\:id | Get bug by ID    |
| PATCH  | /api/bugs/\:id | Update bug by ID |
| DELETE | /api/bugs/\:id | Delete bug by ID |

### Bug Schema (Sample)

{
"title": "Bug title",
"description": "Bug details",
"status": "open",
"project": "<projectId>",
"reporter": "<userId>"
}

---

## ✅ Deployment

Frontend and backend can be deployed separately.

backend: localhost:27017/mern_deployment

frontend: 

---

## 📸 Screenshots

Bug Dashboard
(./Screenshot%202025-07-21%20114108.png)


---

## 👨‍💻 Author

Mellon Pakkies
Week 7 - MERN Deployment & DevOps Assignment
GitHub: [https://github.com/MellonP]

---

## 📄 License

MIT License – feel free to fork, contribute, and customize.

---

Let me know if you want me to convert this into a downloadable `.md` file too!
