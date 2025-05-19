# PixiSphere - Photographer Booking Platform

PixiSphere is a modern web application for booking photographers, built with Next.js and Material-UI. The platform allows users to browse, filter, and book photographers based on various criteria.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd pixisphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add necessary environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technical Implementation Notes

### Filtering System
The application implements a comprehensive filtering system that includes:
- Category-based filtering
- Location-based filtering
- Price range filtering
- Rating-based filtering
- Search functionality with fuzzy matching

### Debounce Implementation
The application uses debouncing for performance optimization in two key areas:
1. **Search Input**: Implements a 500ms debounce to prevent excessive API calls while typing
2. **Price Range Slider**: Uses debouncing to prevent rapid state updates during slider movement

```javascript
// Custom debounce hook implementation
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### Search Logic
The application uses Fuse.js for fuzzy search implementation:
- Searches across photographer names and locations
- Configurable search threshold (currently set to 0.3)
- Includes score-based result ranking

### Image Handling
- Consistent image dimensions across the platform
- 4:3 aspect ratio for photographer profile images
- Responsive image loading with proper scaling
- Object-fit cover to prevent image distortion

### State Management
- Uses Redux for global state management
- Local state for UI components
- Efficient state updates with proper dependency arrays

## Project Structure
```
src/
├── app/
│   ├── (pages)/
│   │   └── category/
│   │       └── page.jsx
├── components/
│   ├── PhotographerCard.jsx
│   └── Header.jsx
├── customHooks/
│   └── useDebounce.js
└── store/
    └── photographerSlice.js
```

## Technologies Used
- Next.js 13+ (App Router)
- Material-UI
- Redux Toolkit
- Fuse.js
- Tailwind CSS

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
