import {
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const GalleryModal = ({ open, onClose, portfolio, selectedImageIndex, onPrevious, onNext }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white bg-opacity-95 w-full h-full flex flex-col">
        {/* Top Bar */}
        <Box className="flex justify-between items-center p-4">
          <IconButton
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-10"
          >
            <CloseIcon />
          </IconButton>
          <Typography className="text-white">
            {selectedImageIndex + 1} / {portfolio.length}
          </Typography>
        </Box>

        {/* Main Image */}
        <Box className="flex-1 flex items-center justify-center">
          {selectedImageIndex !== null && (
            <img
              src={portfolio[selectedImageIndex]}
              alt="Portfolio"
              className="max-h-[calc(100vh-100px)] max-w-[90vw] object-contain"
            />
          )}
        </Box>

        {/* Navigation */}
        <Box className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <IconButton
            onClick={onPrevious}
            className="text-white hover:bg-white hover:bg-opacity-10 pointer-events-auto"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={onNext}
            className="text-white hover:bg-white hover:bg-opacity-10 pointer-events-auto"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default GalleryModal; 