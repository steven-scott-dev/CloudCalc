📱 CloudCalc - React Frontend
CloudCalc is a stylish, responsive calculator web app built with React and MathJS. It lets users sign up, log in, perform calculations, and view their history — all powered by a connected backend API.

🚀 Features
    
    🔐 User Signup / Login with JWT

    🧮 Real-time expression evaluation using mathjs

    📜 History saved per user (via backend API)

    💾 Auth token saved to localStorage

    🌈 Fully styled with custom CSS

    📱 Responsive design for desktop and mobile

    🧰 Tech Stack
React — UI framework

Axios — For HTTP requests

MathJS — Evaluates user expressions

CSS — Custom calculator styling

JWT — Auth token stored locally

⚙️ Setup & Development
1. 📦 Install Dependencies
bash
Copy code
npm install
2. 🧪 Run Locally
bash
Copy code
npm start
This will start the React development server at:

arduino
Copy code
http://localhost:3000
Make sure your backend is running on port 5000 (or update API URLs accordingly).

🔨 Build for Production
bash
Copy code
npm run build
This creates a build/ folder with a production-optimized version of your app.

To test the build locally:

bash
Copy code
npm install -g serve
serve -s build

🌐 API Integration
The frontend expects the backend to be hosted at http://localhost:5000.

Endpoints used:

POST /users/signup

POST /users/login

GET /api/history

POST /api/history

These require a valid JWT token in the Authorization header (after login/signup).

🧠 Auth Flow Summary
Signup/Login sends credentials to backend

If successful, token is returned

Token is stored in localStorage

Future requests (like fetching history) use the token in headers




👨‍💻 Author
Created by Clay Scott