import React from "react";

const PaintCard = ({ paint, onUpdate }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg sm:w-full md:w-1/2 lg:w-1/3">
            <div className="p-4 flex flex-col">
                <h5 className="text-gray-900 font-bold">{paint.name}</h5>
                <p className="text-gray-700 text-sm">
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
                        className="border px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full w-auto"
                        value={paint.stock}
                        onChange={(e) =>
                            onUpdate(paint, e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default PaintCard;
