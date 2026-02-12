# Community Access Assistant

An AI-powered web application that helps citizens understand and access government schemes and public services. The system simplifies complex government language, provides personalized recommendations based on user profiles, and ensures inclusive access to public benefits.

## Features

- **User Profile Collection** - Simple questionnaire to gather demographic and socioeconomic information
- **AI-Powered Scheme Matching** - Intelligent filtering to show only relevant government benefits
- **Language Simplification** - Complex government jargon translated to easy-to-understand language
- **Family Member Support** - Identifies benefits for all eligible family members
- **Privacy-Focused** - All user data processed client-side, never transmitted to servers
- **Multi-language Support** - Available in English, Tamil, and Hindi

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: CSS
- **Testing**: Jest + React Testing Library

## Project Structure

```
packages/
├── client/          # React frontend application
├── server/          # Express backend API
└── shared/          # Shared types, utilities, and matching engine
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abinayaravi07/community-access-assistant.git
   cd community-access-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the shared package:
   ```bash
   cd packages/shared
   npm run build
   cd ../..
   ```

### Running the Application

**Option 1: Run both servers together**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd packages/server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd packages/client
npm run dev
```

Then open http://localhost:3000 in your browser.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /api/schemes` | Get all government schemes |
| `GET /api/schemes/:id` | Get scheme by ID |
| `GET /api/schemes/category/:category` | Get schemes by category |
| `GET /api/search?q=query` | Search schemes |

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## License

This project is private.
