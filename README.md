# Boundry Frontend

## Description

Boundry Frontend is the client-side application of the MERN stack Boundry platform, a modern real estate listing website built with React. It provides an intuitive and responsive user interface for browsing property listings, user authentication, managing personal listings, and administrative functions. The frontend communicates with the Boundry Backend API to deliver a seamless user experience for property search, listing management, and user interactions.

## Features

- **Landing Page**: Hero section, featured listings, global reach showcase, and company information.
- **User Authentication**: Secure login and registration forms with validation.
- **Property Search**: Advanced search with filters, image galleries, and map integration.
- **Property Details**: Detailed property pages with agent information and contact options.
- **User Dashboard**: Manage personal listings, profile settings, and account information.
- **Listing Management**: Create, edit, and delete property listings with image uploads.
- **Admin Panel**: Administrative interface for managing users and moderating listings.
- **Responsive Design**: Mobile-first design using Tailwind CSS and shadcn/ui components.
- **Interactive Maps**: Integrated MapLibre GL for property location visualization.
- **Animations**: Smooth transitions and animations powered by Framer Motion.
- **Real-time Notifications**: Toast notifications for user feedback using Sonner.

## Tech Stack

- **Framework**: React 19 with Vite for fast development and building
- **Routing**: React Router DOM for client-side navigation
- **State Management**: Redux Toolkit with RTK Query for API state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **HTTP Client**: Axios for API requests
- **Maps**: MapLibre GL for interactive maps
- **Animations**: Framer Motion for smooth UI transitions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React and React Icons
- **Theming**: next-themes for dark/light mode support
- **Build Tools**: Vite, ESLint for code quality

## How It Works

The frontend is structured as a single-page application (SPA) with the following architecture:

1. **Entry Point**: `main.jsx` sets up React, Redux store, and routing.
2. **App Component**: `App.jsx` handles global state and renders the main layout with protected routes.
3. **Routing**: Client-side routing with React Router, including protected and admin routes.
4. **State Management**: Redux Toolkit manages global state, with RTK Query handling API calls and caching.
5. **Components**: Modular components organized by feature (auth, landing, search, etc.).
6. **Pages**: Top-level page components that compose multiple components.
7. **Store**: Redux slices and API endpoints for data management.
8. **UI Library**: shadcn/ui provides consistent, accessible components.
9. **Styling**: Tailwind CSS for utility-first styling with custom design tokens.

The app communicates with the backend API via Axios, with automatic request/response handling through RTK Query.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Boundry Backend running (for API calls)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Raza-Aziz/Boundry-Frontend.git
   cd Boundry-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The app will start on `http://localhost:5173` and proxy API requests to `http://localhost:5000`.

4. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

5. **Lint the code**:
   ```bash
   npm run lint
   ```

## Environment Variables

The frontend uses Vite's environment variable system. Create a `.env.local` file in the root directory if you need to customize:

```env
# API Base URL (defaults to proxy in development)
VITE_API_BASE_URL=http://localhost:5000/api

# Other environment-specific variables can be added here
```

In development, API calls are proxied through Vite to avoid CORS issues. In production, ensure the backend is accessible.

## Usage

Once the development server is running:

1. **Landing Page**: Visit the home page to see featured listings and platform information.
2. **Authentication**: Register or login to access user features.
3. **Search Properties**: Use the search page with filters to find properties.
4. **View Details**: Click on property cards to see detailed information.
5. **Manage Listings**: Authenticated users can create and manage their property listings.
6. **Profile Settings**: Update personal information and preferences.
7. **Admin Functions**: Admin users have access to user management and listing moderation.

### Key Pages

- `/` - Landing page with hero, features, and listings
- `/search` - Property search with filters and results
- `/auth` - Login and registration
- `/property/:id` - Detailed property view
- `/dashboard/listings` - User's property listings
- `/dashboard/profile` - Profile settings
- `/admin/*` - Administrative functions

## Deployment

The app is configured for deployment on Vercel with `vercel.json`. For other platforms:

1. Build the project: `npm run build`
2. Serve the `dist` folder with any static server
3. Ensure the backend API is accessible and CORS is configured

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
