# tools.rmv.fyi

Professional tooling platform for developers and makers. Browse, discover, and share the best tools in the ecosystem.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Jabir-Srj/tools-rmv-fyi.git
cd tools-rmv-fyi
```

2. **Start PostgreSQL** (using Docker)
```bash
docker-compose up -d
```

3. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run dev
```

Backend runs on: `http://localhost:3001`

4. **Setup Frontend** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

5. **Prisma Studio** (optional, to view database)
```bash
cd backend
npm run prisma:studio
```

Opens at: `http://localhost:5555`

---

## 📁 Project Structure

```
tools-rmv-fyi/
├── frontend/              # Next.js 16 + TypeScript + Tailwind
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
├── backend/               # Express.js + TypeScript
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── database/              # SQL migrations
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Zustand** - State management

### Backend
- **Express.js** - API server
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Joi** - Validation

### DevOps
- **Docker** - Containerization
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment

---

## 📋 Features (Roadmap)

### Phase 1: MVP (Week 1-2)
- [x] Project setup
- [ ] Landing page
- [ ] Tool directory
- [ ] Authentication (signup/login)
- [ ] Basic CRUD operations

### Phase 2: Core Features (Week 3-4)
- [ ] User profiles
- [ ] Tool collections (curated lists)
- [ ] Reviews & ratings
- [ ] Search & filters
- [ ] Admin moderation

### Phase 3: Growth (Week 5+)
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] API for third parties
- [ ] Monetization (featured listings)
- [ ] Mobile app

---

## 🔌 API Endpoints

### Tools
```
GET    /api/tools              # List all tools
GET    /api/tools/:id          # Get tool details
POST   /api/tools              # Create tool (auth required)
PUT    /api/tools/:id          # Update tool (auth required)
DELETE /api/tools/:id          # Delete tool (auth required)
GET    /api/tools/search?q=    # Search tools
```

### Users
```
POST   /api/auth/signup        # Register
POST   /api/auth/login         # Login
POST   /api/auth/logout        # Logout
GET    /api/users/:id          # Get profile
PUT    /api/users/:id          # Update profile
```

### Reviews
```
GET    /api/tools/:id/reviews  # Get reviews
POST   /api/tools/:id/reviews  # Add review (auth required)
DELETE /api/reviews/:id        # Delete review (auth required)
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Set environment variables
3. Deploy automatically on push

### Database (Supabase/Railway)
- PostgreSQL managed hosting
- Automatic backups
- Free tier available

---

## 📚 Development Commands

### Backend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

### Frontend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Lint code
```

---

## 🔐 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tools_rmv_dev
JWT_SECRET=your-secret-key-here
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Author

Built with ❤️ by **Jabir**

- GitHub: [@Jabir-Srj](https://github.com/Jabir-Srj)
- Email: jabir@rmv.fyi
- Location: Kuala Lumpur, Malaysia

---

## 🙏 Acknowledgments

- Inspired by Minipedia
- Built with modern web technologies
- Community-driven development

---

**Let's build something awesome! 🚀**
