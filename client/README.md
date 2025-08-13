# Employee Management Client

This is the React client application for the Employee Management System.

## Features

- **Authentication**: Login system for administrators
- **Employee Management**: CRUD operations for employees
- **Skill Management**: CRUD operations for skills
- **Employee-Skill Association**: Add/remove skills from employees
- **Search Functionality**: Search employees and skills
- **Responsive Design**: Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Running backend server (should be on port 3001)

## Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

## Running the Application

1. Start the development server:
   ```bash
   yarn start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn start` - Starts the development server
- `yarn build` - Builds the app for production
- `yarn test` - Runs the test suite
- `yarn eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.tsx     # Navigation header
├── views/              # Page components
│   ├── login.tsx      # Login page
│   ├── employees.tsx  # Employee management page
│   └── skills.tsx     # Skill management page
├── redux/              # State management
│   ├── store.ts       # Redux store configuration
│   └── actions/       # Redux actions and slices
│       ├── admin_actions.ts
│       ├── employee_actions.ts
│       └── skill_actions.ts
└── App.tsx            # Main application component
```

## API Configuration

The client is configured to proxy API requests to `http://localhost:3001` (the backend server). Make sure your backend server is running on this port.

## Technologies Used

- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for HTTP requests
