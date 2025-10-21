# 🚀 Your Application Name - Frontend

This is the **Front (frontend)** repository for the **SoftwareDT application**

## 🌟 Technologies Used

| Technology | Description |
| :--- | :--- |
| **React** | A JavaScript library for building user interfaces. |
| **Vite** | A fast build tool for frontend development. |
| **Tailwind CSS** | A *utility-first* CSS framework for rapid and flexible styling. |
| **[Other Important Libraries]** | *Axios, React Router Dom* |

## 🏗️ Project Structure

An overview of the main directory structure:

my-app-frontend/
├── public/                \# Static files
├── src/
│   ├── assets/            \# Images, icons, etc.
│   ├── components/        \# Reusable components (Buttons, Cards, Headers)
│   ├── hooks/             \# Custom Hooks
│   ├── pages/             \# Components representing pages/views (Home, About, Login)
│   ├── styles/            \# Global or configuration CSS files (tailwind.css)
│   ├── utils/             \# Utility functions
│   ├── App.jsx            \# Main application component
│   └── main.jsx           \# Application entry point
├── index.html             \# The main HTML file
├── package.json           \# Dependencies and scripts
└── tailwind.config.js     \# Tailwind CSS configuration file

## ⚙️ Installation and Setup

Follow these steps to get a local copy of the project up and running.

### **Prerequisites**

Ensure you have **Node.js** (recommended version: [e.g., `v18.x`]) and **npm** or **yarn** installed on your system.

### **Steps**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/NietoDeveloper/SoftwareDT/tree/main/softwaredt
    cd front-sdt
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a file named `.env` in the project root. This file should contain the base URL of your **backend** (Node.js server):

    ```.env
    VITE_API_URL=http://localhost:3000/api/
    ```

    > **Note:** In Vite, environment variables must start with `VITE_` to be exposed to the client-side code.

4.  **Run the Project:**

    Start the Vite development server.

    ```bash
    npm run dev
    ```

    The project will be available at `http://localhost:5173`

## 📜 Available Scripts

In the project directory, you can run:

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the app for production to the `dist/` folder. |
| `npm run lint` | Runs the linter (if configured). |
| `npm run preview` | Serves the `dist` folder locally to check the production build. |


## 🎨 Styling and Customization with Tailwind CSS

Tailwind configuration is located in **`tailwind.config.js`**. If you need to add custom colors, fonts, or modify breakpoints, do it in that file.

Tailwind's base styles and any custom CSS are imported into **`src/styles/tailwind.css`** (or your chosen file) to be injected into the application.

## 🤝 Contribution

If you wish to contribute, please follow the standard Git workflow: *fork*, create a branch, make your changes, and submit a **Pull Request**.

1.  Fork the project.
2.  Create your feature branch
3.  Commit your changes (`git commit -m 'feat: Add AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the **[Choose License, e.g., MIT]** License. See the `LICENSE` file for more information.

## 📧 Contact

[Your Name or Team Name] - [Your Email]

Project Link: https://aws.amazon.com/es/what-is/repo/


# Manuel Nieto Software Developer

## 2025