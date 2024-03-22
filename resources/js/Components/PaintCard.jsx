import React from 'react';

const PaintCard = ({ paint }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 flex flex-col">  {/* Add flex properties */}
          <h5 className="text-gray-900 font-bold">{paint.name}</h5>
          <p className="text-gray-700 text-sm mb-3">Colour Code: {paint.colour_code}</p>
          <p className="text-gray-700 text-sm">Stock: {paint.stock}</p>
        </div>
      </div>
    );
  };

export default PaintCard;
