

# E-Commerce Admin Dashboard

A modern E-Commerce admin dashboard built with Next.js, Material-UI, and TypeScript. This application follows a modular architecture with clear separation of concerns, allowing admin users to manage carts and products efficiently.

## Features

- User authentication (login/logout)
- Cart Management:
  - View carts with pagination
  - Filter carts by date range
  - Create new carts with multiple products
  - View cart details in modal
  - Delete carts with confirmation
- Modern UI with Material Design
- Toast notifications for user feedback
- Form validation and error handling
- Responsive design

## Tech Stack

- Next.js 15.3+
- TypeScript
- Material UI v5
- React Hook Form with Yup validation
- Context API for state management
- Notistack for toast notifications

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ecommerce-admin.git
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
  /app                    # Next.js app directory
    /auth                 # Authentication module
      /hooks
        useLogin.ts      # Core authentication logic
    /cart                # Cart management module
      /api               # Cart-related API functions
      /components        # Cart-specific components
      /hooks            # Cart-related hooks
    /login               # Login module
      /components        # Login-specific components
        LoginContainer.tsx
        LoginForm.tsx
        LoadingContainer.tsx
      /hooks            # Login-related hooks
        useLoginForm.ts      # Form validation logic
        useLoginFormState.ts # Form UI state management
  /components           # Shared components
  /contexts            # Application contexts
    AuthContext.tsx    # Authentication state
    CartContext.tsx    # Cart management state
    NotificationContext.tsx  # Toast notifications
    ThemeContext.tsx   # Material UI theme
  /types              # TypeScript type definitions
  /utils             # Utility functions
```

## Module Organization

### Authentication Module (`/app/auth`)

- Core authentication logic
- Login state management
- API integration

### Cart Module (`/app/cart`)

- Cart management functionality
- Cart-specific components
- Cart-related hooks for state and operations

### Login Module (`/app/login`)

- Login page components
- Form state management
- Form validation

## API Endpoints

- `POST /api/auth/login`: Authentication endpoint
- Cart endpoints:
  - `GET /api/carts`: Fetch all carts
  - `POST /api/carts`: Create a new cart
  - `PUT /api/carts/:id`: Update cart
  - `DELETE /api/carts/:id`: Delete cart

## State Management

The application uses React Context API for state management:

- `AuthContext`: Manages authentication state and user session
- `CartContext`: Handles cart operations and state
- `NotificationContext`: Manages toast notifications
- `ThemeContext`: Controls Material-UI theme settings

## Development Notes

- The project follows a modular architecture for better maintainability
- Each module (auth, cart, login) is self-contained with its own components and hooks
- Shared functionality is extracted into contexts and utility functions
- Type safety is enforced throughout the application with TypeScript
- The current implementation uses mock data for demonstration purposes

## Notes

- This is a demo application with mock data and authentication
- The cart data is currently stored in memory and will reset on server restart
