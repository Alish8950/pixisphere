import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <Box position="fixed" className="bg-white shadow-sm z-50 w-full">
      <Toolbar className="max-w-7xl mx-auto w-full px-4 py-3">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <Typography
            variant="h5"
            className="text-blue-600 font-bold cursor-pointer"
          >
            PixiSphere
          </Typography>
        </Link>
        <Box className="hidden md:flex items-center gap-4 ml-auto">
          <Button
            variant="outlined"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 px-6"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
