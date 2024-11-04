*ran and submitted on **Github Codespaces***

# File Metadata Microservice - FreeCodeCamp Backend Development and APIs

This repository hosts a **File Metadata Microservice** project as part of the **FreeCodeCamp Backend Development and APIs** curriculum. The service allows users to upload a file and receive a JSON response with the file's metadata, including its name, type, and size.

## Project Overview

This microservice is built using:
- **Node.js** and **Express** for server-side logic.
- **Multer** for handling file uploads.
- **CORS** for enabling cross-origin requests.
- **dotenv** for environment variable management.

## Features

- **File Upload Endpoint**: The service provides an endpoint to upload a file via HTTP POST. The file's metadata (original name, type, and size) is returned as a JSON response.
- **User-Friendly UI**: A simple interface is served at the root endpoint for users to upload their files.
- **Robust Error Handling**: The app includes middleware to handle errors and ensure proper feedback in case of issues.

## How to Run the Project

1. **Clone the repository**:
   `git clone https://github.com/mstephjuan/project-filemetadata/file-metadata-microservice`

2. **Install dependencies**:
   `npm install`

3. **Create a `.env` file** (optional) and define the `PORT` variable if you want to use a custom port.

4. **Run the app**:
   `npm start`

5. **Access the service**:
   Navigate to `http://localhost:3000` (or the port specified in `.env`) in your web browser to access the front-end interface.

## API Endpoint

- **POST `/api/fileanalyse`**: This endpoint accepts a file upload and responds with:
  ```json
  {
    "name": "filename.txt",
    "type": "text/plain",
    "size": 12345
  }
  ```

## Error Handling

The app includes an error-handling middleware that logs errors and returns a JSON response with the error message if something goes wrong during the upload process.
