# E-Commerce Backend

**مشروع متجر إلكتروني كامل (Backend) مبني بـ NestJS + Mongoose**

API قوية ومتكاملة لمتجر إلكتروني تدعم كل العمليات الأساسية للـ e-commerce مع أحدث التقنيات والمميزات.

---

## ✨ المميزات (Features)

- **نظام المستخدمين والصلاحيات**  
  - تسجيل دخول / تسجيل حساب (JWT + Refresh Token)  
  - OAuth بواسطة Google  
  - تأكيد البريد الإلكتروني وإعادة تعيين كلمة المرور

- **إدارة المنتجات**  
  - CRUD كامل للمنتجات  
  - تصنيفات (Category + Subcategory)  
  - Brands  
  - Suppliers (موردين)  
  - Tax (ضرائب)

- **سلة التسوق (Cart)**  
  - إضافة/حذف/تعديل المنتجات في السلة  
  - حساب الإجمالي تلقائياً

- **الطلبات (Orders)**  
  - إنشاء طلب + تتبع حالة الطلب  
  - تكامل الدفع بـ **Stripe**

- **التقييمات والمراجعات (Reviews)**

- **كوبونات الخصم (Coupons)**

- **رفع الملفات**  
  - رفع صور المنتجات والمستخدمين بـ **Cloudinary**

- **نظام الاستعلامات المتقدم**  
  - **Pagination**  
  - **Filtering**  
  - **Sorting**  
  - **Search**

- **طلبات إضافية (Requests)**  
  - نظام طلبات خاص (مثل طلب منتج غير متوفر أو استفسارات)

- **Validation قوي** باستخدام **class-validator** و **class-transformer**

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| التقنية              | الاستخدام                          |
|---------------------|------------------------------------|
| **NestJS**          | Framework الباك إند                |
| **Mongoose**        | ODM لـ MongoDB                     |
| **MongoDB**         | قاعدة البيانات                     |
| **class-validator** | Validation                         |
| **JWT + Refresh Token** | Authentication                  |
| **Passport + Google OAuth** | تسجيل دخول بجوجل               |
| **Cloudinary**      | رفع وتخزين الصور                   |
| **Stripe**          | بوابة الدفع                        |

---

## 📁 هيكل الموديلز (Models)

- `User`
- `Auth` (للـ tokens والـ sessions)
- `Product`
- `Category`
- `Subcategory`
- `Brand`
- `Supplier`
- `Tax`
- `Cart`
- `Order`
- `Review`
- `Coupon`
- `Request`

---

## 🚀 طريقة التشغيل (Installation)

### 1. Clone المشروع
```bash
git clone https://github.com/mohame04d/E-Commerce-Nest-
Bashnpm install
3. إعداد ملف .env
أنشئ ملف .env في الـ root واملأ المتغيرات التالية:
env# Database
MONGO_URI=

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
PORT=3000
NODE_ENV=development
4. تشغيل المشروع
Bash# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

📡 أهم الـ Endpoints (أمثلة)

POST /auth/register → تسجيل حساب
POST /auth/login → تسجيل دخول
GET /auth/google → Google OAuth
GET /products → جلب المنتجات (مع pagination, filter, sort)
POST /cart/add → إضافة للسلة
POST /orders → إنشاء طلب + دفع Stripe
POST /upload → رفع صور (Cloudinary)
POST /coupons/apply → تفعيل كوبون

(كل الموديولز لها Controller + Service + Module منفصلة ومُنظمة)

🧪 Testing
Bash# Unit + E2E tests
npm run test
npm run test:e2e

📋 TODO / Future Features

 Admin Dashboard (NestJS + React/Vue)
 Redis Cache
 Rate Limiting + Security Headers
 Email Service (Nodemailer + Templates)
 Multi-language support
 Docker + Docker Compose


🤝 Contributing

Fork المشروع
اعمل Branch جديد (feature/amazing-feature)
Commit (git commit -m 'Add amazing feature')
Push (git push origin feature/amazing-feature)
افتح Pull Request


Made with ❤️ using NestJS & Mongoosee/ecommerce-nestjs.git
cd ecommerce-nestjs

