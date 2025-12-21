# Software DT - Full-Stack MERN Booking Solution

🚀 **Overview**  
Software DT is a world-class digital flagship engineered in Bogotá. This platform is a full-stack MERN application (MongoDB, Express, React, Node.js) designed to bridge the gap between service providers and clients through a seamless booking and review ecosystem.  

As of late 2025, I am ranked #3 in GitHub contributions in Colombia. This project is the result of 5.5+ years of experience and Hardcore Coding, coding every single day without stopping, maintaining an unwavering streak of technical excellence.  

✨ **Key Features**  

- **Secure Authentication**: Multi-device JWT (JSON Web Tokens) integration. Log out on one device without interrupting sessions on others.  
- **Role-Based Access Control**: Distinct workflows for Users (Clients) and Employees (Service Providers).  
- **Provider Profiles**: Employees can showcase expertise, availability, and specializations.  
- **Booking System**: Real-time appointment scheduling and management.  
- **Review & Rating**: A transparent community feedback system to drive quality decisions.  
- **Cloud Integration**: Firebase-powered image storage for ultra-fast profile rendering.  

🛠️ **Technology Stack**  
**Backend**  
- Node.js & Express: Robust RESTful API architecture.  
- MongoDB: NoSQL database for flexible data modeling.  
- JWT & Firebase: Advanced security and cloud asset management.  

**Frontend**  
- React & Vite: Optimized for lightning-fast performance.  
- Redux & React Query: State management and efficient data synchronization.  
- Tailwind CSS: Custom design system for professional clarity.  

🎨 **Design System**  
Software DT uses a strictly defined visual identity to ensure a high-end corporate feel:  

| Element            | Color / Value                  | Class Name              |
|--------------------|--------------------------------|-------------------------|
| Primary Background | #DCDCDC (Gainsboro)            | bg-main                |
| Cards/Containers   | #FFFFFF (White)                | bg-card                |
| Accents            | #FFD700 (Gold) / #FEB60D       | text-gold / text-yellowColor |
| Typography         | #000000 (Pure Black)           | text-textColor         |

⚙️ **Installation & Setup**  

1. **Clone & Navigate**:  
   ```bash  
   git clone https://github.com/NietoDeveloper/SoftwareDT  
   cd SoftwareDT  
   ```  

2. **Install dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Environment Configuration**:  
   Ensure your `tailwind.config.js` is set to the official Software DT specifications:  
   ```javascript  
   /** @type {import('tailwindcss').Config} */  
   export default {  
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],  
     theme: {  
       extend: {  
         colors: {  
           gainsboro: "#DCDCDC",  
           gold: "#FFD700",  
           yellowColor: "#FEB60D",  
           headingColor: "#000000",  
           textColor: "#000000",  
         },  
         backgroundColor: {  
           main: "#DCDCDC",  
           card: "#FFFFFF",  
         },  
       },  
     },  
     plugins: [],  
   };  
   ```  

4. **Development Mode**:  
   ```bash  
   npm run dev  
   ```  

📈 **Performance & Commitment**  
I don't just write code; I build momentum.  

- **Hardcore Coding**: Coding every day without stopping (140+ day streak).  
- **Target**: On track to reach #1 in Colombia by Q1 2026. [View Ranking](https://github.com/users/NietoDeveloper/contributions)  
- **Trust**: Currently managing 3 active clients in production environments.  

🤝 **Contact & Collaboration**  
I am currently based in Bogotá, Colombia, and available for Remote Opportunities worldwide.  

- **Lead Developer**: Manuel Nieto  
- **Live Application**: [softwaredt.vercel.app](https://softwaredt.vercel.app)  
- **GitHub Profile**: [@NietoDeveloper](https://github.com/NietoDeveloper)