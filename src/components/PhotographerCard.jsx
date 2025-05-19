'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Button, Box, Rating } from '@mui/material';
import Link from 'next/link';

const PhotographerCard = ({ photographer }) => {
  return (
    <Card className="w-full h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardMedia
        component="img"
        height="240"
        width="100%"
        image={photographer.profilePic}
        alt={photographer.name}
        className="object-cover aspect-[4/3]"
      />
      <CardContent className="flex-grow">
        <Typography variant="h5" className="font-bold mb-1">
          {photographer.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">
          {photographer.location}
        </Typography>
        <Box className="flex items-center mb-2">
          <Rating value={photographer.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" className="ml-1 text-gray-600">
            ({photographer.rating})
          </Typography>
        </Box>
        <Typography variant="h6" className="text-purple-600 font-bold mb-2">
          Starting at ₹{photographer.price.toLocaleString()}
        </Typography>
        <Box className="mt-2 flex flex-wrap gap-1">
          {photographer.tags.map((tag) => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              className="bg-purple-100 text-purple-800"
            />
          ))}
        </Box>
      </CardContent>
      <Box className="p-2">
        <Button
          fullWidth
          variant="contained"
          component={Link}
          href={`/photographer/${photographer.id}`}
          className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
        >
          View Profile
        </Button>
      </Box>
    </Card>
  );
};

export default PhotographerCard;