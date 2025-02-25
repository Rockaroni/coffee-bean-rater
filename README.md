# Coffee Bean Rater
A mobile-first application for coffee enthusiasts to rate and discover coffee beans through image recognition.

## Features

- Scan coffee bean bags using your phone's camera
- View and add ratings for coffee beans
- Personal coffee journal to track your ratings
- Community-driven coffee bean reviews
- Image recognition for quick bean identification

## Tech Stack

- Frontend: React Native
- Backend: Node.js/Express
- Database: MongoDB
- Image Processing: TensorFlow.js
- Authentication: Firebase Auth
- Cloud Storage: Firebase Storage

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- React Native development environment
- MongoDB
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install mobile app dependencies
   cd ../mobile
   npm install
   ```

3. Set up environment variables (see .env.example)
4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start mobile app
   cd ../mobile
   npm start
   ```

## Project Structure

```
coffee-bean-rater/
├── backend/           # Node.js/Express backend
├── mobile/           # React Native mobile app
├── shared/           # Shared types and utilities
└── docs/             # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
