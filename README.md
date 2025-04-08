# Phone Book

This is a fullstack demo project that features a Spring Boot backend, a MySQL database, and a Vite React frontend built with TypeScript. This repository supports running the entire stack using Docker Compose.

## Docker Setup and Running

This project includes a `docker-compose.yml` which sets up the database, backend, and frontend.

### Prerequisites

- Docker and Docker Compose must be installed.

### Running with Docker

1. **Clone the Repository**

2. **Build and Start the Containers:**

   Run the following command in the project's root directory containing `docker-compose.yml`:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application:**
   - **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.
   - **Backend API:** Available at [http://localhost:8080/api/contacts](http://localhost:8080/api/contacts).
   - **MySQL:** Runs on port 3306 (data is persisted in a Docker volume).

## AWS environment

Build the Docker images locally, tag and push them into AWS Elastic Container Registry (ECR).

Once your images are in ECR, use AWS Elastic Container Service (ECS) to run your containers. Alternatively, you can use Amazon Elastic Kubernetes Service (EKS).

Benefits to use AWS enviroment are scalability and availability. Additionally, it is easy to integrate with other AWS services like load balancers and logging.

## Building Without Docker

If you prefer to run the application components on your local machine:

### Prerequisites

- **Java:** Java Development Kit (JDK) version 24 recommended.
- **Node.js:** Node.js version 23 recommended.
- **MySQL:** Install and run MySQL on your local machine.
- **Maven:** Install Maven for building the Spring Boot backend.

### Backend Setup

1. **Configure MySQL:**

   - Create a database named `phonebookdb` in your MySQL server.
   - Update the backend configuration in `src/main/resources/application.properties` with your MySQL connection settings (forexample username and password that you used).

2. **Build the Backend:**

   - In the backend folder, run the following command to build the application:

     ```bash
     mvn clean install
     ```

   - Execute the jar file:
     ```bash
     java -jar target/phonebook-backend-0.0.1-SNAPSHOT.jar
     ```

### Frontend Setup

1. **Install Dependencies:**

   In the frontend directory, run:

   ```bash
   npm install
   ```

2. **Run the Frontend:**

   For development:

   ```bash
   npm run dev
   ```
