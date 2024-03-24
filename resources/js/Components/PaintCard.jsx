import React from "react";

const PaintCard = ({ paint, onUpdate }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg sm:w-full md:w-1/2 lg:w-1/3 mb-4">
            <div className="p-4">
                <h5 className="text-gray-900 font-bold text-lg mb-2">{paint.name}</h5>
                <p className="text-gray-700 text-sm mb-2">
                    Colour Code: {paint.colour_code}
                </p>
                <div className="flex items-center">
                    <label
                        htmlFor={`stock-${paint.id}`}
                        className="mr-2 text-gray-700 text-sm"
                    >
                        Stock:
                    </label>
                    <input
                        id={`stock-${paint.id}`}
                        type="number"
                        className="border px-2 py-1 rounded-md focus:ring-1 focus:ring-blue-500 w-full w-auto [appearance:textfield]"
                        defaultValue={paint.stock}
                        onBlur={(e) => onUpdate(paint, e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaintCard;
