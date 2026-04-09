🛒 E-Commerce API (NestJS + MongoDB)

A scalable and modular E-Commerce RESTful API built with NestJS and MongoDB (Mongoose).
The project follows best practices for clean architecture, authentication, and performance optimization.

🚀 Features
🔐 Authentication & Authorization
JWT Authentication
Refresh Token System
Google OAuth Login
👤 User Management
🛍️ Product Management
🧾 Orders & Cart System
🏷️ Categories & Subcategories
🎟️ Coupons & Discounts
⭐ Reviews & Ratings
🏢 Brands & Suppliers
💰 Tax Handling
📦 Request Management
🧠 Tech Stack
Backend Framework: NestJS
Database: MongoDB (Mongoose)
Validation: class-validator
Authentication: JWT + Refresh Tokens
OAuth: Google OAuth
File Upload: Cloudinary
Payment Integration: Stripe
📂 Project Modules
Auth Module
Users Module
Products Module
Cart Module
Orders Module
Categories Module
Subcategories Module
Coupons Module
Brands Module
Reviews Module
Tax Module
Suppliers Module
Request Module
⚙️ Advanced Features
🔎 Filtering (by price, category, brand, etc.)
📊 Sorting (asc / desc)
📄 Pagination (optimized queries)
☁️ Image Upload via Cloudinary
💳 Secure Payment with Stripe
🔐 Authentication Flow
User signs up / logs in
Server returns:
Access Token
Refresh Token
Access Token used for protected routes
Refresh Token used to generate new tokens
💳 Payment Flow (Stripe)
Create Order
Generate Payment Intent
Confirm Payment
Update Order Status
📦 Installation
# Clone the repo
git clone https://github.com/mohame04d/e-commerce-api.git

# Install dependencies
npm install

# Run the app
npm run start:dev
⚙️ Environment Variables

Create a .env file and add:

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret
📌 API Features
RESTful API Design
Modular Architecture
Scalable Code Structure
Error Handling Middleware
Secure Authentication

👨‍💻 Author

Mohamed Hakem

⭐ Support

If you like this project, give it a ⭐ on GitHub!
