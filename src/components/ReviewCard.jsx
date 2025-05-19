'use client';

import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 mr-3 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
              {review.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {review.name}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <Rating 
            value={review.rating} 
            precision={0.5} 
            readOnly 
            size="small"
            className="text-yellow-400"
          />
        </div>
        <p className="text-gray-700 leading-relaxed">
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;