"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Box className="max-w-2xl w-full text-center">
        <Box className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/404.svg"
            alt="404 Illustration"
            fill
            className="object-contain"
            priority
          />
        </Box>
        
        <Typography variant="h1" className="text-6xl font-bold text-gray-800 mb-4">
          404
        </Typography>
        
        <Typography variant="h2" className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </Typography>
        
        <Typography variant="body1" className="text-gray-600 mb-8">
          The page you're looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>

        <Box className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="contained"
            component={Link}
            href="/"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
          >
            Go to Homepage
          </Button>
          
          <Button
            variant="outlined"
            component={Link}
            href="/category"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
          >
            Browse Photographers
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 