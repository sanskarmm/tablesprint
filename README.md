🚀 Tablesprint

📌 Description

Tablesprint is a modern and intuitive web application for managing products, categories, and subcategories. Featuring a powerful interface, it enables seamless product management with user authentication, secure data storage, and a responsive UI.

✨ Features

✔ User Authentication - Secure JWT-based authentication.✔ CRUD Operations - Manage products, categories, and subcategories effortlessly.✔ Client-Side Rendering - Built with React for a smooth user experience.✔ MySQL Database - Relational database for structured data management.✔ Cloudinary Integration - Efficient image storage and management.✔ Responsive UI - Fully optimized for various screen sizes with Bootstrap.

🛠 Tech Stack

🔹 Frontend:

⚛️ React.js

🔗 Axios (for HTTP requests)

🎨 Bootstrap (for responsive UI)

🔹 Backend:

🚀 Node.js

🔥 Express.js (Web framework for Node.js)

🔐 JWT (for authentication)

🗄 MySQL (for database)

☁️ Cloudinary (for image storage)

🔹 Other Tools:

📦 npm (Package manager)

🔑 bcryptjs (For hashing passwords)

📋 Prerequisites

Ensure you have the following installed on your local machine:

🟢 Node.js (v14 or higher)

📦 npm (v6 or higher)

🗄 MySQL (v5.7 or higher)

🚀 Installation

1️⃣ Clone the repository:

git clone https://github.com/sanskarmm/tablesprint.git

2️⃣ Navigate to the project directory:

cd tablesprint

3️⃣ Set up environment variables:

Create a .env file in the root directory and add the following:

PORT=5000
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
MYSQL_HOST=localhost
MYSQL_USERNAME=your-mysql-username
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE_NAME=your-mysql-database-name

🔹 Replace placeholders with actual values.

4️⃣ Install dependencies:

npm install

5️⃣ Start the development server:

Backend:

cd backend
npm run dev

Frontend:

cd frontend
npm run dev

🔑 User Authentication

📌 Register a User

Use Postman or ThunderClient to send a POST request to:

POST http://localhost:5000/api/v1/user/register

Example User JSON:

{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}

Alternatively, generate a hashed password using Node.js:

const bcrypt = require('bcryptjs');
const password = "12345678";
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword);

Insert the user manually into MySQL:

INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'johndoe@gmail.com', 'hashed_password_here');

📊 Dashboard & Features

🎯 Login - Visit http://localhost:5173/ to log in.🎯 Manage Items - Add, edit, and delete products, categories, and subcategories.🎯 Interactive UI - Perform actions effortlessly through an intuitive dashboard.

📂 Database Schema

🔹 Users Table - Stores user details (name, email, password).🔹 Categories Table - Stores product categories.🔹 Subcategories Table - Stores category sub-divisions.🔹 Products Table - Stores product details, including category and subcategor
