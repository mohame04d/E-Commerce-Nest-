# 🛒 E-Commerce Backend API

A fully-featured **E-Commerce backend system** built with **NestJS**, **MongoDB**, and **Mongoose**. This system manages products, categories, users, suppliers, coupons, and requests with authentication and secure operations.

The project is designed with modularity, scalability, and clean architecture principles in mind.

---

## 🏗 Modules Implemented

I developed and handled the following modules:

- 👤 **Authentication & Authorization (auth)** – secure login/signup using **JWT** and **Bcrypt** for password hashing  
- 👥 **Users Management**  
- 🏷 **Category**  
- 🏷 **Subcategory**  
- 🏭 **Brand**  
- 🎟 **Coupon Management**  
- 📦 **Product Management**  
- 📝 **Requests** (customer or supplier requests)  
- 🏢 **Suppliers**  

Each module follows a modular structure with proper validation, error handling, and database relations.

---

## ⚙️ Technologies Used

This project was built using:

- **NestJS** – Node.js framework for building scalable APIs  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **JWT (JSON Web Token)** – Secure authentication  
- **Bcrypt** – Password hashing  
- **Joi / Class-Validator** – Data validation  
- **Axios** – External API calls (if needed)  
- **Node-Cron** – Optional scheduled tasks  

---

## 🔥 Key Features

- ✅ Full authentication system with **JWT & Bcrypt**  
- ✅ User roles and authorization  
- ✅ Product CRUD operations  
- ✅ Category, Subcategory, and Brand management  
- ✅ Coupon and discount management  
- ✅ Supplier and request management  
- ✅ Advanced filtering, sorting, pagination, and field limiting  
- ✅ Clean modular structure for easy scalability  
- ✅ Secure API routes with proper validation and error handling  

---

## 🛠 API Capabilities

The API supports:

- CRUD operations for all modules  
- Authentication & secure user sessions  
- Advanced query features (Filter, Sort, Pagination, Search)  
- Relational references using Mongoose `.populate()`  
- Input validation and error handling  

---

## 📂 Architecture

The project follows:

- Modular and clean architecture  
- Separation of concerns  
- Reusable utility classes (e.g., API Features)  
- Proper folder structure for controllers, services, and schemas  

---

## 📌 Future Improvements

- Add caching with Redis for products and categories  
- Add email notifications for users and suppliers  
- Implement rate limiting for API endpoints  
- Dockerize the project for production deployment  
- CI/CD pipeline for automated testing and deployment  

---

## 📌 Notes

- Passwords are securely hashed with **Bcrypt**  
- Authentication and authorization handled using **JWT**  
- Designed with **NestJS best practices** for scalability and maintainability
