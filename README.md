# PixiSphere - Photographer Booking Platform

A modern web application for booking photographers, built with Next.js and Material-UI.

## Features

- Browse photographers by category and location
- View detailed photographer profiles
- Portfolio gallery with image navigation
- Send inquiries to photographers
- Review system
- Responsive design
- Modern UI with Material-UI components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pixisphere.git
cd pixisphere
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the JSON server for the database:
```bash
npx json-server --watch db.json --port 3001
```

4. In a new terminal, start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── category/
│   │   │   └── page.jsx
│   │   └── photographer/
│   │       └── [id]/
│   │           └── page.jsx
├── components/
│   ├── modals/
│   │   ├── QueryModal.jsx
│   │   └── GalleryModal.jsx
│   ├── PhotographerCard.jsx
│   ├── ReviewCard.jsx
│   └── Header.jsx
├── customHooks/
│   ├── useDebounce.js
│   └── useFetch.js
└── store/
    └── photographerSlice.js
```

## Component Architecture

### Modal Components
The application uses modular modal components for better code organization and reusability:

1. **QueryModal**
   - Handles photographer inquiry form
   - Features:
     - Contact information input
     - Event details selection
     - Package selection
     - Message composition

2. **GalleryModal**
   - Displays photographer's portfolio
   - Features:
     - Full-screen image view
     - Image navigation
     - Image counter
     - Responsive design

### Image Handling
- Consistent image dimensions across the platform
- 4:3 aspect ratio for photographer profile images
- Responsive image loading with proper scaling
- Object-fit cover to prevent image distortion

### State Management
- Uses Redux for global state management
- Local state for UI components
- Efficient state updates with proper dependency arrays

## Technologies Used
- Next.js 13+ (App Router)
- Material-UI
- Redux Toolkit
- Fuse.js
- Tailwind CSS
- JSON Server (for development database)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
