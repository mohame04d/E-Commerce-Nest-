🛒 E-Commerce API
🚀 Built with NestJS & MongoDB

A production-ready E-Commerce Backend API built using NestJS and MongoDB (Mongoose), designed with scalability, security, and clean architecture in mind.

✨ Highlights
🔐 Secure Authentication (JWT + Refresh Tokens + Google OAuth)
🛍️ Full E-Commerce System (Products, Cart, Orders)
💳 Stripe Payment Integration
☁️ Cloudinary File Upload
📊 Advanced Query Features (Filter, Sort, Pagination)
🧱 Modular & Scalable Architecture
🧠 Tech Stack
Category	Technology
Backend	NestJS
Database	MongoDB (Mongoose)
Auth	JWT, Refresh Tokens, Google OAuth
Validation	class-validator
File Upload	Cloudinary
Payments	Stripe
📦 Modules Overview
Auth
Users
Products
Cart
Orders
Categories & Subcategories
Coupons
Brands
Reviews
Tax
Suppliers
Requests
⚙️ Core Features
🔐 Authentication System
JWT-based authentication
Refresh token rotation
Google OAuth login
🛒 E-Commerce Logic
Product management
Shopping cart system
Order lifecycle management
💳 Payments
Stripe integration
Secure checkout flow
☁️ Media Upload
Image upload via Cloudinary
📊 Query Handling
Filtering (price, category, brand...)
Sorting (ASC / DESC)
Pagination (optimized performance)
🔄 API Flow Example
User → Auth → Products → Cart → Order → Payment → Confirmation
🚀 Getting Started
git clone https://github.com/mohame04d/E-Commerce-Nest-
cd E-Commerce-Nest-
npm install
npm run start:dev
⚙️ Environment Variables
PORT=3000
MONGO_URI=your_mongo_uri

JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_key
📈 Future Enhancements
⚡ Redis Caching
📊 Admin Dashboard
🔔 Real-time Notifications (Socket.IO)
📧 Email System
👨‍💻 Author

Mohamed Hakem

⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub — it really helps!
