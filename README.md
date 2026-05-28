# FAQ Management System Portal

A modern community-driven FAQ Management Portal built using React, Node.js, Express, and JSON-based storage.

This platform allows students to:

* Search official FAQs
* Ask new community questions
* Submit answers to unresolved questions
* Upvote helpful resolved answers
* Admin verify answers
* Promote highly upvoted community questions into official FAQs

---

# Features

## Student Features

* Search FAQs instantly
* Ask new questions
* Submit answers to unresolved questions
* Upvote verified community answers
* Dark themed modern UI
* Responsive design

## Admin Features

* Verify submitted answers
* Delete inappropriate questions
* Moderate community content
* Approve answers before public visibility

## Community Features

* Crowd-sourced FAQ generation
* Upvote system
* One user = one upvote
* Auto FAQ promotion after threshold upvotes

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* CSS3
* Local Storage

## Backend

* Node.js
* Express.js
* JSON File Storage

---

# Folder Structure

## Frontend

src/
│
├── components/
│ ├── faq/
│ └── layout/
│
├── pages/
│ ├── QueryPage.jsx
│ ├── QuestionPage.jsx
│ ├── PostFAQPage.jsx
│ ├── FAQManagementPage.jsx
│ └── LoginPage.jsx
│
├── routes/
├── data/
├── App.jsx
└── App.css

---

## Backend

backend/
│
├── controllers/
│ └── questionController.js
│
├── routes/
│ └── questionRoutes.js
│
├── data/
│ └── questions.json
│
├── server.js
└── package.json

---

# Authentication

Two demo roles are available:

## Admin

Username: admin
Password: admin123

## Student

Username: student
Password: student123

---

# Community Workflow

## Step 1

Student asks a new question.

## Step 2

Community students submit answers.

## Step 3

Admin verifies the correct answer.

## Step 4

Resolved question appears in:

* Resolved Community Questions

## Step 5

Users upvote useful answers.

## Step 6

If upvotes reach threshold:

* Question gets promoted into Official FAQ.

---

# Upvote System Logic

* Each user can upvote only once.
* Duplicate upvotes are prevented.
* Helpful answers gain visibility.
* Questions with high upvotes become official FAQs.

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Frontend Setup

```bash
cd faq-system

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# API Endpoints

## Get Questions

```http
GET /questions
```

## Add Question

```http
POST /questions
```

## Add Answer

```http
POST /questions/:id/answer
```

## Verify Answer

```http
PUT /questions/:questionId/verify/:answerId
```

## Upvote Question

```http
PUT /questions/:id/upvote
```

## Delete Question

```http
DELETE /questions/:id
```

---

# Future Improvements

* JWT Authentication
* MongoDB Integration
* Real-time Notifications
* AI-based FAQ Suggestions
* Leaderboard System
* Spam Detection
* Email Notifications
* Search Auto-Correction

---

# Project Goal

The goal of this project is to reduce repetitive student queries by building a collaborative FAQ ecosystem where:

* Students help students
* Admins validate answers
* Useful answers become permanent FAQs

---

# Author

Developed as a modern FAQ and Community Support Portal project using MERN-inspired architecture.
