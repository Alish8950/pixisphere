"use client";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import PhotographerCard from "../../../components/PhotographerCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "../../../customHooks/useDebounce";
import Fuse from 'fuse.js';

export default function CategoryListing() {
  const { photographers, loading } = useSelector((state) => state.photographer);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [filteredPhotographers, setFilteredPhotographers] =
    useState(photographers);

  // Configure Fuse.js options
  const fuseOptions = {
    keys: ['name', 'location'],
    threshold: 0.3,
    includeScore: true,
  };

  // Get unique cities from photographers
  const cities = ["all", ...new Set(photographers.map((p) => p.location))];

  useEffect(() => {
    let filtered = photographers;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (photographer) => photographer.category === selectedCategory
      );
    }

    // Apply city filter
    if (selectedCity !== "all") {
      filtered = filtered.filter(
        (photographer) => photographer.location === selectedCity
      );
    }

    // Apply rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(
        (photographer) => photographer.rating >= selectedRating
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (photographer) =>
        photographer.price >= debouncedPriceRange[0] &&
        photographer.price <= debouncedPriceRange[1]
    );

    // Apply fuzzy search
    if (debouncedSearchTerm) {
      const fuse = new Fuse(filtered, fuseOptions);
      const searchResults = fuse.search(debouncedSearchTerm);
      filtered = searchResults.map(result => result.item);
    }

    // Apply sorting
    const sortedPhotographers = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return 0; // Maintain original order
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredPhotographers(sortedPhotographers);
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedCity,
    selectedRating,
    sortBy,
    debouncedPriceRange,
    photographers,
  ]);

  // Skeleton loader component
  const PhotographerCardSkeleton = () => (
    <Box className="w-full h-full flex flex-col bg-white rounded-lg shadow-sm">
      <Skeleton variant="rectangular" height={200} />
      <Box className="p-4 flex-grow">
        <Skeleton variant="text" height={32} width="60%" />
        <Skeleton variant="text" height={24} width="40%" className="mt-1" />
        <Skeleton variant="text" height={24} width="30%" className="mt-2" />
        <Skeleton variant="text" height={28} width="50%" className="mt-2" />
        <Box className="mt-2 flex flex-wrap gap-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" width={60} height={24} />
          ))}
        </Box>
      </Box>
      <Box className="p-2">
        <Skeleton variant="rounded" height={40} />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl" className="py-12">
      <Box className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <Box className="w-full lg:w-1/4 lg:h-[calc(100vh-13rem)] lg:sticky lg:top-20">
          <Box className="bg-gray-50 rounded-xl shadow-sm p-6 overflow-y-auto">
            <Typography variant="h6" className="font-bold mb-6 text-gray-800">
              Filters
            </Typography>
            <Box className="flex flex-col w-full gap-4">
              <Box>
                <TextField
                  fullWidth
                  label="Search photographers"
                  variant="outlined"
                  className="bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  className="bg-white"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Maternity">Maternity</MenuItem>
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Couple">Couple</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  value={selectedCity}
                  label="City"
                  className="bg-white"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city === "all" ? "All Cities" : city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box className="bg-white p-4 rounded-lg">
                <Typography className="font-medium mb-2">Price Range</Typography>
                <Slider
                  value={priceRange}
                  min={0}
                  max={30000}
                  onChange={(_, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  className="mt-2"
                />
                <Box className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </Box>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  className="bg-white"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="recent">Recently Added</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>

              <Box className="bg-white p-4 rounded-lg">
                <Typography className="font-medium mb-2">Rating</Typography>
                {[4, 3, 2].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    control={
                      <Checkbox
                        checked={selectedRating === rating}
                        onChange={(e) =>
                          setSelectedRating(e.target.checked ? rating : 0)
                        }
                      />
                    }
                    label={`${rating}+ stars`}
                    className="block"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Content - Photographers Grid */}
        <Box className="w-full lg:w-3/4">
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Show skeleton loaders while loading
              Array.from(new Array(6)).map((_, index) => (
                <Box key={index}>
                  <PhotographerCardSkeleton />
                </Box>
              ))
            ) : filteredPhotographers.length === 0 ? (
              // Show Not Found UI when no photographers match the filters
              <Box className="col-span-full flex flex-col items-center justify-center py-12">
                <Typography variant="h5" className="text-gray-600 mb-4">
                  No photographers found
                </Typography>
                <Typography variant="body1" className="text-gray-500 text-center mb-6">
                  Try adjusting your filters or search criteria to find what you're looking for
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedCity("all");
                    setSelectedRating(0);
                    setSortBy("recent");
                    setPriceRange([0, 30000]);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Reset Filters
                </Button>
              </Box>
            ) : (
              // Show actual photographer cards
              filteredPhotographers
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((photographer) => (
                  <Box key={photographer.id}>
                    <PhotographerCard photographer={photographer} />
                  </Box>
                ))
            )}
          </Box>

          {/* Pagination - Only show when not loading */}
          {!loading && (
            <Box className="flex justify-center items-center gap-4 mt-12">
              <Button
                variant="outlined"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Previous
              </Button>
              <Typography className="text-gray-600">
                Page {page} of{" "}
                {Math.ceil(filteredPhotographers.length / itemsPerPage)}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setPage(page + 1)}
                disabled={
                  page >= Math.ceil(filteredPhotographers.length / itemsPerPage)
                }
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
