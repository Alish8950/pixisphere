import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const QueryModal = ({ open, onClose, photographer, onSubmit, formData, onInputChange }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="font-bold text-gray-800">
            Send Inquiry to {photographer.name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={onSubmit} className="space-y-4">
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              required
            />
            <TextField
              fullWidth
              label="Event Date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="eventType"
                value={formData.eventType}
                onChange={onInputChange}
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
                value={formData.package}
                onChange={onInputChange}
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
                value={formData.message}
                onChange={onInputChange}
                required
              />
            </Box>
          </Box>

          <Box className="flex justify-end mt-6 gap-4">
            <Button
              variant="outlined"
              onClick={onClose}
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
  );
};

export default QueryModal; 