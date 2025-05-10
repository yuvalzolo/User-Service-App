# Moonshot User Service

This project implements a scalable microservice using Apollo GraphQL server with CRUD functionality, PostgreSQL persistence, and AWS SNS integration, all containerized via Docker and optionally deployable in a serverless architecture.

---

## 🚀 Tech Stack

* TypeScript
* Node.js
* Apollo Server (GraphQL)
* PostgreSQL (via TypeORM)
* Docker + Docker Compose (with Swarm mode for replicas)
* AWS SNS (email notifications)
* React + Vite (frontend)

---

## 📦 Folder Structure

```
moonshot-user-service/
├── src/                  # Backend source code
├── user-ui/             # Frontend React UI
├── docs/                # Serverless architecture diagram and explanation
├── .env                 # Sample environment variables
├── docker-compose.yml   # Service definitions
└── README.md            # This file
```

---

## 🛠️ Setup Instructions

### ✅ Prerequisites

* Docker & Docker Compose installed
* Node.js (v18+) for local testing
* AWS credentials (for SNS)

### 1. Clone the repository

```bash
git clone https://github.com/yuvalzolo/User-Service-App.git
cd moonshot-user-service
```

### 2. Set environment variables

Create a `.env` file with:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=users_db
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_SNS_TOPIC_ARN=arn:aws:sns:...:your-topic

⚠️ Important:
Copy .env.example to .env and fill in your own values, especially for AWS keys if you wish to test email notifications.
```

### 3. Run the project using Docker Compose

```bash
docker build -t moonshot-user-service .
docker stack deploy -c docker-compose.yml moonshot-service
```

> 🛠 Note: Use `docker swarm init` first if needed.

### 4. Run the frontend (in another terminal)

```bash
cd user-ui
npm install
npm run dev
```

Then open: `http://localhost:5173`

---

## ✍️ Tests

Tests are located in src/tests folder.
Make sure that the service is deployed using this command -
docker stack deploy -c docker-compose.yml moonshot-service
then run tests locally using-
npm run test

---

## 📎 Serverless

See [docs/serverless\_architecture.md](docs/serverless_architecture.md) for an AWS-based serverless architecture diagram and explanation.