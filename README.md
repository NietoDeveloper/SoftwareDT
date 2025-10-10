#  Software-DT

Next.js + Node.js + Vite

### Overview

This is a web application built using Next.js for the frontend, Node.js for the backend server, and Vite for fast development and building. The main application logic is contained within a single primary file, which includes the server setup.
Prerequisites

Node.js (v16 or higher)
npm or Yarn

### Installation

Clone the repository:git clone <https://github.com/NietoDeveloper/SoftwareDT>


Navigate to the project directory:cd


Install dependencies:npm install



### Development

To start the development server:
npm run dev


Vite will serve the frontend at http://localhost:5173.
The Node.js server will run within the main application file.

Build
To build the application for production:
npm run build

Production
To start the production server:
npm start

Project Structure

main.js: The primary file containing the Node.js server and core application logic.
pages/: Next.js pages for the frontend.
public/: Static assets.
vite.config.js: Vite configuration for frontend development and build.

Scripts

npm run dev: Runs Vite for frontend and Node.js server concurrently.
npm run build: Builds the Next.js app with Vite.
npm run start: Starts the production Node.js server.


### Features

    User Authentication: Supports secure user authentication using JWT (JSON Web Tokens). Users and doctors can securely log in with multiple devices, and logging out on one device does not affect their session on other devices.

    Authorization: Implements role-based authorization to ensure that only authenticated users and doctors can access their respective functionalities.

    Profile Management: Users can upload a profile picture, and doctors can showcase their experience, specialization, and availability for appointments.

    Appointment Booking: Users can book appointments with their preferred doctors and view/manage their upcoming appointments.

    Review System: Users can leave reviews for doctors, allowing others to make informed decisions when choosing a doctor.
    
### Manuel Nieto, Software Developer.
