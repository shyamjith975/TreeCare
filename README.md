# TreeCare - Rural Tree Service & Land Support Workforce Platform

A comprehensive cross-platform application connecting coconut tree owners with verified climbers and rural workers for harvesting, maintenance, monitoring, and logistics coordination.

## 🚀 Tech Stack

### Backend
- **Express.js** - Fast, minimal web framework
- **Prisma ORM** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **AWS S3** - Image storage
- **Stripe/Razorpay** - Payment processing
- **Twilio** - SMS/WhatsApp notifications

### Mobile
- **React Native** - Cross-platform mobile
- **Expo** - Managed React Native framework
- **React Navigation** - Navigation solution
- **Redux** - State management
- **Socket.io** - Real-time updates

### Web
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Query** - Data fetching

## ✨ Features

### Customer App
- 📱 OTP-based registration
- 🏠 Multiple property management
- 📅 Service booking with time slots
- 🔓 Unattended service execution
- 📸 Photo proof uploads
- 💰 Subscription plans (Basic/Standard/Premium)
- 🔍 Land monitoring requests
- 🚚 Transport coordination
- 👥 Neighbor group booking
- ⭐ Worker ratings & reviews
- 💳 Secure payment processing
- 📊 Service history & analytics

### Worker App (Climber & Rural Workers)
- ✅ ID verification system
- 📍 Service radius configuration
- 📅 Availability calendar management
- 💼 Job acceptance & tracking
- 📷 Before/after photo uploads
- 🌳 Tree health checklist
- 🥥 Harvest count reporting
- 💵 Earnings dashboard
- ⭐ Rating & badge system
- 📈 Performance analytics

### Village Coordinator
- 📱 Offline booking support
- 👥 Worker assignment management
- ✔️ Completion verification
- 💸 Commission tracking
- 👴 Elderly customer assistance

### Admin Dashboard (Web)
- ✅ Worker verification
- 📊 Analytics dashboard
- 💰 Pricing management
- 🛡️ Dispute resolution
- 📋 Subscription management
- 🚗 Transport provider management
- 📈 Revenue tracking

## 📁 Project Structure

```
TreeCare/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   ├── mobile/
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── navigation/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   └── utils/
│   │   └── package.json
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   └── styles/
│       └── package.json
├── packages/
│   ├── shared-types/
│   └── shared-utils/
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd apps/backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

### Mobile Setup

```bash
cd apps/mobile
npm install
npm start
```

### Web Setup

```bash
cd apps/web
npm install
npm run dev
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP and get token
- `POST /api/auth/logout` - Logout user

### Customers
- `GET /api/customers/profile` - Get customer profile
- `POST /api/customers/properties` - Add property
- `GET /api/customers/properties` - List properties
- `POST /api/customers/bookings` - Create booking
- `GET /api/customers/bookings` - List bookings

### Workers
- `GET /api/workers/profile` - Get worker profile
- `POST /api/workers/availability` - Set availability
- `POST /api/workers/jobs/:jobId/accept` - Accept job
- `POST /api/workers/jobs/:jobId/complete` - Complete job
- `GET /api/workers/earnings` - View earnings

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `GET /api/addons` - List add-on services

### Subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions` - List subscriptions
- `PATCH /api/subscriptions/:id` - Update subscription

## 🔐 Security

- Role-based access control (RBAC)
- JWT token authentication
- Secure password hashing with bcrypt
- CORS enabled
- Rate limiting
- Input validation & sanitization
- Environment variable protection

## 🌍 Future Expansion

Architecture supports adding:
- Arecanut climbing services
- Rubber tapping services
- Banana harvesting
- Pepper harvesting
- Farm spraying services
- AI tree health detection
- Yield prediction
- Weather alert integration

## 📋 Environment Variables

See `.env.example` files in each app directory for required variables.

## 🤝 Contributing

Contributions are welcome! Please follow the guidelines in CONTRIBUTING.md

## 📝 License

MIT License - see LICENSE file for details

## 📧 Support

For support, email support@treecare.app or open an issue on GitHub.