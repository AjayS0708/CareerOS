# CareerOS Frontend

The Operating System for Your Career - React Frontend Application

## 🎨 Design System

### Brand Colors
- **Primary Blue**: `#1D4ED8`
- **Accent Purple**: `#7C3AED`
- **Background**: `#F8FAFC`
- **Text**: `#0F172A`

### UI Features
- Responsive sidebar navigation
- Modern card-based layout
- Soft shadows and rounded corners (`rounded-xl`)
- Gradient styling for key elements
- Custom scrollbars
- Smooth transitions and hover effects

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   └── layout/           # Layout components
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       └── Layout.jsx
│   │
│   ├── pages/               # Page components
│   │   ├── DashboardPage.jsx
│   │   └── PlaceholderPage.jsx
│   │
│   ├── styles/
│   │   └── index.css        # Global styles & Tailwind
│   │
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # Entry point
│
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Components Overview

### Common Components

#### Button
```jsx
<Button variant="primary" size="md" icon={Icon}>
  Click Me
</Button>
```
**Variants**: `primary`, `accent`, `outline`, `secondary`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`, `icon`

#### Card
```jsx
<Card variant="default" padding={true}>
  Content here
</Card>
```
**Variants**: `default`, `gradient`, `outlined`, `hover`

#### Badge
```jsx
<Badge variant="success" size="md" dot>
  Active
</Badge>
```
**Variants**: `info`, `success`, `warning`, `error`, `purple`, `primary`, `accent`, `applied`, `interview`, `rejected`, `shortlisted`, `declined`

#### Input
```jsx
<Input 
  label="Email"
  placeholder="Enter email"
  icon={Mail}
  iconPosition="left"
/>
```

#### Modal
```jsx
<Modal 
  isOpen={isOpen} 
  onClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

#### Loader
```jsx
<Loader size="md" text="Loading..." />
```

### Layout Components

#### Layout
Wraps the entire application with sidebar and header.

#### Sidebar
- Responsive navigation menu
- Mobile-friendly with overlay
- Active route highlighting
- User profile section at bottom

#### Header
- Search functionality
- Notification bell with badge
- User profile dropdown
- Mobile menu toggle

## 🎨 Styling Guidelines

### Tailwind Classes
- Use `rounded-xl` for cards and buttons
- Use `shadow-card` for elevated elements
- Use `transition-all duration-200` for smooth animations
- Use custom colors from theme config

### Custom Classes
- `.gradient-primary` - Primary blue to purple gradient
- `.gradient-accent` - Accent purple gradient
- `.custom-scrollbar` - Custom styled scrollbar
- `.card-hover` - Hover effect for cards

## 📱 Responsive Design

- **Mobile First**: Designed for mobile and scales up
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

- **Sidebar**: Slide-in on mobile, fixed on desktop (lg+)
- **Header**: Adapts layout for mobile/desktop
- **Grid layouts**: Stack on mobile, multi-column on larger screens

## 🔄 Current Pages

- ✅ **Dashboard** - Fully implemented with stats, recent applications, and job recommendations
- 🚧 **Job Search** - Placeholder (coming soon)
- 🚧 **Applications** - Placeholder (coming soon)
- 🚧 **Resume Builder** - Placeholder (coming soon)
- 🚧 **Learning Paths** - Placeholder (coming soon)
- 🚧 **Settings** - Placeholder (coming soon)

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📝 Notes

- All components are fully responsive
- Components follow accessibility best practices
- Uses semantic HTML elements
- Optimized for performance with React best practices
- Ready for API integration (proxy configured for `/api`)

## 🔜 Next Steps

1. Implement authentication pages (Login/Register)
2. Build Job Search page with filters
3. Create Applications tracking page
4. Implement Resume Builder
5. Add Learning Roadmaps feature
6. Connect to backend API
7. Add state management (Context/Redux)

---

Built with ❤️ for CareerOS
