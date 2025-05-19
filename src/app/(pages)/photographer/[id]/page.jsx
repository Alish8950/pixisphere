"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Chip,
  Button,
  Tabs,
  Tab,
  Rating,
  Modal,
  IconButton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReviewCard from "../../../../components/ReviewCard";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

export default function PhotographerProfile() {
  const { photographers, loading } = useSelector((state) => state.photographer);
  const params = useParams();
  const [tabValue, setTabValue] = useState(0);
  const photographerId = parseInt(params.id);
  const photographer = photographers.find((p) => p.id == photographerId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryData, setQueryData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
    package: 'standard'
  });

  const handleOpenGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  const handleCloseModal = () => {
    setShowGallery(false);
    setSelectedImageIndex(null);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prev) =>
        (prev - 1 + photographer.portfolio.length) %
        photographer.portfolio.length
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % photographer.portfolio.length);
  };

  const handleOpenQueryModal = () => {
    setShowQueryModal(true);
  };

  const handleCloseQueryModal = () => {
    setShowQueryModal(false);
    setQueryData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: '',
      package: 'standard'
    });
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    console.log('Query Data:', {
      ...queryData,
      photographerId,
      photographerName: photographer.name
    });
    handleCloseQueryModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Container className="py-8">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!photographer) {
    return (
      <Container className="py-8">
        <Typography>Photographer not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-12">
      <Box className="flex flex-col md:flex-row gap-8 mb-12">
        <Box className="w-full md:w-1/3">
          <CardMedia
            component="img"
            image={photographer.profilePic}
            alt={photographer.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
          <Button
            variant="contained"
            startIcon={<PhotoLibraryIcon />}
            onClick={() => handleOpenGallery(0)}
            className="w-full !mt-4 bg-purple-600 hover:bg-purple-700"
          >
            View Portfolio
          </Button>
        </Box>
        <Box className="flex-1">
          <Typography variant="h3" className="font-bold mb-3 text-gray-800">
            {photographer.name}
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-gray-600 mb-4 flex items-center"
          >
            {photographer.location}
          </Typography>
          <Box className="flex items-center mb-6">
            <Rating
              value={photographer.rating}
              precision={0.1}
              readOnly
              className="text-yellow-400"
            />
            <Typography className="ml-2 text-gray-600">
              {photographer.rating} ({photographer.reviews.length} reviews)
            </Typography>
          </Box>
          <Typography variant="h4" className="text-purple-600 font-bold mb-6">
            Starting from ₹{photographer.price.toLocaleString()}
          </Typography>

          <Box className="mb-4">
            <Typography
              variant="subtitle1"
              className="font-medium text-gray-700 mb-2"
            >
              Photography Styles
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {photographer.styles.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  color="primary"
                  className="bg-purple-600"
                />
              ))}
            </Box>
          </Box>

          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-medium text-gray-700 mb-2"
            >
              Specializations
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {photographer.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  className="border-purple-200 text-purple-600"
                />
              ))}
            </Box>
          </Box>

          <Typography className="mb-8 text-gray-700 leading-relaxed">
            {photographer.bio}
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
            onClick={handleOpenQueryModal}
          >
            Send Inquiry
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        className="mb-8 border-b border-gray-200"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 500,
            minWidth: 120,
          },
          "& .Mui-selected": {
            color: "#9333ea !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#9333ea",
          },
        }}
      >
        <Tab label="Reviews" />
        <Tab label="Pricing" />
      </Tabs>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          <Typography variant="h4" className="font-bold mb-6 text-gray-800">
            Customer Reviews
          </Typography>
          {photographer.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h4" className="font-bold mb-6 text-gray-800">
            Pricing Packages
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
              <Typography variant="h5" className="font-bold mb-3 text-gray-800">
                Basic Package
              </Typography>
              <Typography variant="h3" className="text-purple-600 font-bold mb-6">
                ₹{Math.floor(photographer.price * 0.8).toLocaleString()}
              </Typography>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  1 Hour Session
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  15 Edited Photos
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  Online Gallery
                </li>
              </ul>
              <Button
                variant="outlined"
                className="border-purple-600 text-purple-600 w-full py-3 hover:bg-purple-50"
              >
                Select Package
              </Button>
            </Card>

            <Card className="h-full p-6 border-2 border-purple-600 hover:shadow-lg transition-shadow duration-300">
              <Typography variant="h5" className="font-bold mb-3 text-gray-800">
                Standard Package
              </Typography>
              <Typography variant="h3" className="text-purple-600 font-bold mb-6">
                ₹{photographer.price.toLocaleString()}
              </Typography>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  2 Hour Session
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  30 Edited Photos
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  Online Gallery + Prints
                </li>
              </ul>
              <Button
                variant="contained"
                className="bg-purple-600 hover:bg-purple-700 w-full py-3"
              >
                Select Package
              </Button>
            </Card>

            <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
              <Typography variant="h5" className="font-bold mb-3 text-gray-800">
                Premium Package
              </Typography>
              <Typography variant="h3" className="text-purple-600 font-bold mb-6">
                ₹{Math.floor(photographer.price * 1.5).toLocaleString()}
              </Typography>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  Full Day Coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  50+ Edited Photos
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="material-icons mr-2 text-purple-600">
                    check_circle
                  </span>
                  Premium Album Included
                </li>
              </ul>
              <Button
                variant="outlined"
                className="border-purple-600 text-purple-600 w-full py-3 hover:bg-purple-50"
              >
                Select Package
              </Button>
            </Card>
          </Box>
        </Box>
      )}

      {/* Query Modal */}
      <Modal
        open={showQueryModal}
        onClose={handleCloseQueryModal}
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-bold text-gray-800">
              Send Inquiry to {photographer.name}
            </Typography>
            <IconButton onClick={handleCloseQueryModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleQuerySubmit} className="space-y-4">
            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={queryData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={queryData.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={queryData.phone}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Event Date"
                name="eventDate"
                type="date"
                value={queryData.eventDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  name="eventType"
                  value={queryData.eventType}
                  onChange={handleInputChange}
                  label="Event Type"
                >
                  <MenuItem value="wedding">Wedding</MenuItem>
                  <MenuItem value="maternity">Maternity</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                  <MenuItem value="portrait">Portrait</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Package</InputLabel>
                <Select
                  name="package"
                  value={queryData.package}
                  onChange={handleInputChange}
                  label="Package"
                >
                  <MenuItem value="basic">Basic Package</MenuItem>
                  <MenuItem value="standard">Standard Package</MenuItem>
                  <MenuItem value="premium">Premium Package</MenuItem>
                </Select>
              </FormControl>
              <Box className="col-span-2">
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={queryData.message}
                  onChange={handleInputChange}
                  required
                />
              </Box>
            </Box>

            <Box className="flex justify-end mt-6 gap-4">
              <Button
                variant="outlined"
                onClick={handleCloseQueryModal}
                className="mr-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Send Inquiry
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Full Gallery Modal */}
      <Modal
        open={showGallery}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <Box className="bg-white bg-opacity-95 w-full h-full flex flex-col">
          {/* Top Bar */}
          <Box className="flex justify-between items-center p-4">
            <IconButton
              onClick={handleCloseModal}
              className="text-white hover:bg-white hover:bg-opacity-10"
            >
              <CloseIcon />
            </IconButton>
            <Typography className="text-white">
              {selectedImageIndex + 1} / {photographer.portfolio.length}
            </Typography>
          </Box>

          {/* Main Image */}
          <Box className="flex-1 flex items-center justify-center">
            {selectedImageIndex !== null && (
              <img
                src={photographer.portfolio[selectedImageIndex]}
                alt="Portfolio"
                className="max-h-[calc(100vh-100px)] max-w-[90vw] object-contain"
              />
            )}
          </Box>

          {/* Navigation */}
          <Box className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <IconButton
              onClick={handlePreviousImage}
              className="text-white hover:bg-white hover:bg-opacity-10 pointer-events-auto"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              className="text-white hover:bg-white hover:bg-opacity-10 pointer-events-auto"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
