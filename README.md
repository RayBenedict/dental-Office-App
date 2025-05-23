# Dental Office Online Scheduling System

## Prerequisites

Ensure you have the following installed on your system:
- **Docker**
- **Docker Compose**
- **Node.js** (for local frontend development)

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/RayBenedict/dental-Office-App.git
cd dental-Office-App

```

### 2. Ensure Docker is Installed
Verify that Docker is installed and running:
```bash
docker --version
docker-compose --version
```

### 3. Start the Services
Run the following command to build and start the services:
```bash
docker-compose up --build
```

This will:
- Start the backend on **port 5000**
- Start the frontend on **port 80**
- Start the PostgreSQL database

### 4. Verify Backend is Running
Once the services are up, verify if the backend is running by using:
```bash
curl http://localhost:5000/api/dentists
```
If the backend is running correctly, you should receive a JSON response.

### 5. Running the Frontend Locally (Optional)
If you prefer running the frontend locally instead of inside Docker:
```bash
cd dental-office-frontend
npm install
npm run dev
```
This will start the frontend on [http://localhost:5173/](http://localhost:5173/).

## Notes
- Ensure that the `.env` files are correctly configured.
- If there are issues, check the logs using:
  ```bash
  docker-compose logs backend
  docker-compose logs frontend
  ```
- If you update environment variables, restart the containers:
  ```bash
  docker-compose down
  docker-compose up --build
  ```

## Stopping the Services
To stop all running containers:
```bash
docker-compose down