# Farm2Home 🌾

A modern, full-stack marketplace platform connecting local farmers directly with consumers. Built with Next.js, Supabase, and designed with a mobile-first, fully responsive approach.

![Farm2Home](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)

## ✨ Features

### For Farmers
- **Product Management**: Easy-to-use dashboard for managing inventory, pricing, and stock
- **Order Tracking**: Real-time order notifications and status management
- **Direct Payments**: Secure payment processing with transparent pricing
- **Analytics Dashboard**: Track revenue, sales, and customer insights
- **Mobile-Responsive**: Manage your farm business on any device

### For Buyers
- **Fresh Marketplace**: Browse seasonal produce from local farms
- **Advanced Filtering**: Search and filter by category, price, and location
- **Direct Communication**: Chat with farmers about products
- **Order History**: Track all your purchases and delivery status
- **Secure Checkout**: Safe and easy payment processing

### Technical Features
- ✅ **Fully Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Real-time Updates** - Live order status and notifications
- ✅ **Authentication** - Secure user authentication with Supabase
- ✅ **Role-based Access** - Separate dashboards for farmers and buyers
- ✅ **Image Management** - Product image upload with fallback support
- ✅ **Currency Support** - Indian Rupees (₹) throughout the platform
- ✅ **Accessibility** - WCAG compliant with screen reader support
- ✅ **Dark Mode Ready** - Theme support built-in

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts for analytics
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/Cosmic-hackers/farm2home1.0.git
cd farm2home1.0
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Environment Configuration**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Important**: Never commit `.env.local` to version control

4. **Database Setup**

Run the Supabase migrations (if available) or set up your database schema manually.

5. **Run Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified).

## 🗄️ Database Schema

### Core Tables
- `profiles` - User profiles (farmers & buyers)
- `farms` - Farm information and details
- `products` - Product listings with pricing
- `orders` - Order management and tracking
- `order_items` - Individual items in orders
- `messages` - Direct messaging between users

## 🎨 Key Components

### Responsive Features
- **Mobile Navigation**: Hamburger menu for dashboard and marketplace
- **Adaptive Layouts**: Grid systems that adjust to screen size
- **Touch-Friendly**: Optimized button sizes and spacing
- **Mobile Filters**: Slide-out filter panels for marketplace

### Dashboard Components
- Product management with inline editing
- Order status tracking with delivery toggle
- Revenue analytics with charts
- Customer order history

### Marketplace Components
- Product grid with category filtering
- Advanced search functionality
- Mobile-responsive product cards
- Shopping bag with order count badge

## 🔧 Common Issues & Fixes

### Peer Dependency Errors
```bash
npm install --legacy-peer-deps
```

### Missing Packages
```bash
npm install react-is --legacy-peer-deps
```

### React Version Issues
```bash
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps
```

### Supabase Storage Issues
The app includes a fallback mechanism that stores images locally in `public/products/` if Supabase Storage is unavailable.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are tested across these breakpoints for optimal user experience.

## 🛣️ Roadmap

- [ ] Payment gateway integration
- [ ] Advanced analytics for farmers
- [ ] Review and rating system
- [ ] Delivery tracking with maps
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Cosmic Hackers** - [GitHub Organization](https://github.com/Cosmic-hackers)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made with ❤️ for local farmers and communities**
