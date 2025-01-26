Tablesprint
Description: Tablesprint is a web application designed for managing products, categories, and subcategories. It offers a robust interface for product management with features like user registration, authentication, and data storage through MySQL. This project provides an intuitive and easy-to-use platform for managing a diverse range of items.

Features
User Registration & Authentication: Secure login system with JWT authentication.
CRUD Operations: Perform create, read, update, and delete operations on products, categories, and subcategories.
Client-Side Rendering: The frontend is powered by React for a dynamic user experience.
JWT-based Authentication: Ensures secure user sessions.
MySQL Database: Relational database used for managing user and product data.
Cloudinary Integration: For managing and storing images used for products.
Tech Stack
Frontend:

React.js
Axios (for HTTP requests)
Bootstrap (for responsive UI)
Backend:

Node.js
Express.js (Web framework for Node.js)
JWT (for authentication)
MySQL (for database)
Cloudinary (for image storage)
Other Tools:

npm (Package manager for dependencies)
bcryptjs (for hashing passwords)
Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (v14 or higher)
npm (v6 or higher)
MySQL (v5.7 or higher)
Installation
Follow these steps to set up the project locally:

1. Clone the repository:
bash

git clone https://github.com/carnage111/tablesprint.git
2. Navigate to the project directory:
bash

cd tablesprint
3. Create a .env file with the necessary environment variables:
In the root of the project, create a .env file and add the following variables:

env

PORT=5000
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
MYSQL_HOST=localhost
MYSQL_USERNAME=your-mysql-username
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE_NAME=your-mysql-database-name
Note: Replace your-* placeholders with your actual values.

4. Install dependencies:
Run the following command to install the necessary packages for both frontend and backend:

bash

npm install
5. Start the development server:
Open two terminals, one for the backend and one for the frontend.

Backend:
bash

cd backend
npm run dev
Frontend:
bash

cd frontend
npm run dev
Usage
Register a User
To register a user, you can either use Postman or ThunderClient (VS Code Extension) to send a POST request to:

bash

POST http://localhost:5000/api/v1/user/register
Example User JSON:
json
{
  "name": "john doe",  // Updated name
  "email": "johndoe@gmail.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
Alternatively, you can manually insert the user into the MySQL database. Here's how you can generate a hashed password using Node.js:

js
Copy
Edit
const bcrypt = require('bcryptjs');
const password = "12345678";
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword);
Once you generate the hashed password, you can insert the user into your database:

sql

INSERT INTO users (name, email, password) 
VALUES ('john doe', 'johndoe@gmail.com', 'hashed_password_here');
Login
After successfully registering, navigate to http://localhost:5173/ in your browser.

Enter your registered email and password.
Click the Login button.
Dashboard
Once logged in, you will be redirected to the dashboard, where you can perform actions on products, categories, and subcategories.

Add Items: Use the Add Category, Add Subcategory, and Add Product buttons in their respective sections.
Edit/Delete Items: You can modify or remove items by clicking on the edit or delete icons in the action column.
Database Schema
Here is an overview of the key tables in the database:

Users Table:

Stores user information (name, email, password).
Categories Table:

Stores category data for organizing products.
Subcategories Table:

Stores subcategory data that belongs to categories.
Products Table:

Stores information about products, including their categories and subcategories.
