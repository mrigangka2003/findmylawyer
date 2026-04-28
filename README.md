# 🧑‍⚖️ findMyLawyer

A modern full-stack web application to connect clients with lawyers efficiently. Built using **MERN stack** (MongoDB, Express, React, Node.js), this project features authentication, appointment booking, secure API integration, and a responsive UI.

---

## 🚀 Features

- 🔐 User Authentication (Sign In / Sign Up)
- 👨‍⚖️ Lawyer Listings with Profiles and Fees
- 📅 Appointment Booking System
- 🌓 Dark-themed, minimalistic UI using Tailwind CSS
- ☁️ File uploads via Multer + Cloudinary
- 🔒 JWT-based secure authentication
- 🧑‍💻 Built with TypeScript (both frontend and backend)

---

## 🏗️ Tech Stack

| Layer         | Tech |
|---------------|------|
| Frontend      | React, Tailwind CSS, Lucide React, React Router DOM |
| Backend       | Node.js, Express.js, TypeScript |
| Database      | MongoDB with Mongoose |
| Authentication| JWT (jsonwebtoken), bcrypt |
| File Uploads  | Multer, Cloudinary |
| Environment   | dotenv |
| Others        | CORS, Validator.js |

---

## 📂 Folder Structure

.
├── config/ # DB connection config
├── controllers/ # Request handlers
├── middlewares/ # Auth, error handling, etc.
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── src/ # Frontend React app (sign-in, sign-up, home)
├── uploads/ # Temporary storage for Multer
├── constants.ts # Environment constants
├── index.ts # Express server entry
├── ...

---

## 🔧 Environment Variables

Create a `.env` file in the root with the following keys:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<your-mongo-uri>
DB_NAME=findmylawyer
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🛠️ Installation & Running Locally
📦 Backend
bash
Copy
Edit
cd findmylawyer
npm install
npm run dev
🌐 Frontend
If frontend is inside src as a separate React app:

bash
Copy
Edit
cd src
npm install
npm start
📸 Screenshots (Optional)
Add UI screenshots like sign-in, lawyer profile, appointment form, etc.

✨ Future Improvements
✅ Role-based access (Admin / Lawyer / Client)

📅 Calendar integration

📨 Email confirmations

🌍 Geo-location based lawyer search

📄 License
This project is licensed under the MIT License.

🤝 Contributing
Feel free to fork the repo and submit pull requests. Suggestions are welcome!

👤 Author
Mrigangka Datta
GitHub • LinkedIn