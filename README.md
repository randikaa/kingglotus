# Dynamic Frame Layout - Music & Art Platform

A modern Next.js application for managing and showcasing music, tattoos, and news content with a comprehensive admin dashboard.

## 🚀 Features

- **Content Management**: Full CRUD operations for music, tattoos, and news
- **Admin Dashboard**: Complete admin panel with analytics and management tools
- **Contact System**: Handle user messages and contributions
- **Database Integration**: Supabase backend with real-time updates
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Tag Management**: Organize content with custom tags
- **Featured Content**: Highlight important content sections

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🚀 Quick Setup

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd DynamicFrameLayout
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup
Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

### 4. Database Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the content from `scripts/fix-tables.sql`
4. Run the script to create all necessary tables

### 5. Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

\`\`\`
├── app/
│   ├── admin/
│   │   └── dashboard/          # Admin dashboard
│   ├── api/                    # API routes
│   │   ├── music/             # Music CRUD operations
│   │   ├── tattoos/           # Tattoo CRUD operations
│   │   ├── news/              # News CRUD operations
│   │   ├── contact-messages/  # Contact form handling
│   │   └── contributions/     # Contribution management
│   ├── contact/               # Contact page
│   ├── music/                 # Music showcase
│   ├── tattoo/                # Tattoo gallery
│   └── news/                  # News section
├── components/                # Reusable components
├── lib/                       # Utility functions
├── scripts/                   # Database scripts
└── hooks/                     # Custom React hooks
\`\`\`

## 🔐 Admin Access

1. Navigate to `/admin`
2. Use the default credentials or set up your own authentication
3. Access the dashboard at `/admin/dashboard`

## 🎯 API Endpoints

### Music
- `GET /api/music` - Get all music
- `POST /api/music` - Create new music
- `PUT /api/music/[id]` - Update music
- `DELETE /api/music/[id]` - Delete music

### Tattoos
- `GET /api/tattoos` - Get all tattoos
- `POST /api/tattoos` - Create new tattoo
- `PUT /api/tattoos/[id]` - Update tattoo
- `DELETE /api/tattoos/[id]` - Delete tattoo

### News
- `GET /api/news` - Get all news
- `POST /api/news` - Create new news
- `PUT /api/news/[id]` - Update news
- `DELETE /api/news/[id]` - Delete news

### Contact Messages
- `GET /api/contact-messages` - Get all messages
- `POST /api/contact-messages` - Create new message
- `PUT /api/contact-messages/[id]` - Update message status

### Contributions
- `GET /api/contributions` - Get all contributions
- `POST /api/contributions` - Create new contribution
- `PUT /api/contributions/[id]` - Update contribution status

## 🎨 Features Overview

### Admin Dashboard
- **Overview**: Statistics and recent activity
- **Content Management**: Add, edit, delete music, tattoos, and news
- **Message Management**: Handle contact form submissions
- **Contribution Tracking**: Monitor and manage user contributions
- **Tag System**: Organize content with custom tags
- **Featured Content**: Highlight content in different sections

### Frontend Features
- **Responsive Design**: Optimized for all devices
- **Dark Theme**: Modern dark interface
- **Smooth Animations**: Framer Motion animations
- **Search & Filter**: Find content easily
- **Contact Forms**: User communication system

## 🔧 Customization

### Adding New Content Types
1. Create database table in `scripts/fix-tables.sql`
2. Add API routes in `app/api/[content-type]/`
3. Update admin dashboard with new tab
4. Create frontend pages for display

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize components in `components/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- Ensure Node.js 18+ support
- Set environment variables
- Run `npm run build` and `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details
4. Contact support team

---

**Happy coding! 🎉**
