# Software-DT

MERN Stack

## Overview

This is a web application built using Next.js for the frontend, Node.js for the backend server, and Vite for fast development and building. The main application logic is contained within a single primary file, which includes the server setup.   CRUD (Create, Read, Update, Delete) application built with MERN. The system allows users to create an account, book appointments with their preferred service, and leave reviews, on the other hand, can create profiles showcasing their experience, specialization, and availability for appointments. Once a Employee-service sets up their profile, they can log in to manage their appointments.

## Prerequisites

Node.js (v16 or higher)
npm or Yarn

## Technology Stack

### Backend

    Node.js/Express: Handles server-side logic and provides RESTful APIs for frontend interaction.
    MongoDB: Utilized as the database to store user accounts, doctor profiles, appointments, and reviews.
    JWT (JSON Web Tokens): Implements authentication and authorization mechanisms using access tokens and refresh tokens.
    Firebase: Stores user profile pictures for improved user experience.

### Frontend

    React: Builds the user interface to interact with the backend APIs.
    React Router: Provides route protection and navigation within the application.
    Redux: Manages session data such as user profiles and authentication status.
    Axios and React Query: Efficiently consume backend APIs for seamless data retrieval and manipulation.
    Tailwind CSS: Utilized for styling and enhancing the overall user experience.

## Installation

Clone the repository:git clone <https://github.com/NietoDeveloper/SoftwareDT>

### Navigate to the project directory:cd


### Install dependencies:npm install


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

## Manuel Nieto

## NietoSoftwareDeveloper

### 2025

### Features

    User Authentication: Supports secure user authentication using JWT (JSON Web Tokens). Users and doctors can securely log in with multiple devices, and logging out on one device does not affect their session on other devices.

    Authorization: Implements role-based authorization to ensure that only authenticated users and doctors can access their respective functionalities.

    Profile Management: Users can upload a profile picture, and doctors can showcase their experience, specialization, and availability for appointments.

    Appointment Booking: Users can book appointments with their preferred doctors and view/manage their upcoming appointments.

    Review System: Users can leave reviews for doctors, allowing others to make informed decisions when choosing a doctor.

