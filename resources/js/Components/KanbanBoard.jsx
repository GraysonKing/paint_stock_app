import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import PaintCard from "@/Components/PaintCard";

const KanbanBoard = (paintData) => {
    const [paints, setPaints] = useState(paintData.paintData);
    const [columns, setColumns] = useState([
        { id: 0, title: "Available", items: [] },
        { id: 1, title: "Running Low", items: [] },
        { id: 2, title: "Out of Stock", items: [] },
    ]);

    // reorders paints to their correct columns
    const reorderPaints = () => {
        const newColumns = [...columns];
        const low = 10;
        const out = 0;

        paints.forEach(paint => {
            console.log(paint, 'paint');

            if (paint['stock'] === out)
                newColumns[2].items.push(paint);
            else if (paint['stock'] <= low)
                newColumns[1].items.push(paint);
            else
                newColumns[0].items.push(paint);

            setColumns(newColumns);
        });
    };

    // moves a card within its column
    const reorderCard = (column, sourceIndex, destinationIndex) => {
        const newPaints = [...column.items]; // extract paints from column.
        const [removed] = newPaints.splice(sourceIndex, 1); // delete moved paint from old index.
        newPaints.splice(destinationIndex, 0, removed); // add moved paint to new index.
        return newPaints;
    };

    // moves a paint card from one column to another.
    const moveCard = (
        sourceColumn,
        destinationColumn,
        droppableSource,
        droppableDestination
    ) => {
        // extract paints from source and destination columns
        const sourcePaints = [...sourceColumn.items];
        const destinationPaints = [...destinationColumn.items];
        console.log(sourcePaints, "sourcePaints before move");
        console.log(destinationPaints, "destinationPaints before move");
        const [removed] = sourcePaints.splice(droppableSource.index, 1); // delete moved paint from old index in source paints.
        destinationPaints.splice(droppableDestination.index, 0, removed); // add moved paint to new index in destination paints.

        console.log(sourcePaints, "sourcePaints after move");
        console.log(destinationPaints, "destinationPaints after move");
        const result = {};
        result[droppableSource.droppableId] = sourcePaints;
        result[droppableDestination.droppableId] = destinationPaints;

        console.log(result, "result");
        return result;
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        // Get indexes of the source and destination columns.
        const sourceIndex = parseInt(source.droppableId);
        const destinationIndex = parseInt(destination.droppableId);
        console.log(sourceIndex, "source");
        console.log(destinationIndex, "destination");
        if (sourceIndex === destinationIndex) {
            // Moving within the same column
            const items = reorderCard(
                columns[sourceIndex],
                source.index,
                destination.index
            );
            const newColumns = [...columns];
            newColumns[sourceIndex].items = items; // put edited items list into new columns
            setColumns(newColumns);
        } else {
            // Moving to another column
            const result = moveCard(
                columns[sourceIndex],
                columns[destinationIndex],
                source,
                destination
            );
            const newColumns = [...columns];
            console.log(result, "result right before setColumns");
            newColumns[sourceIndex].items = result[source.droppableId];
            newColumns[destinationIndex].items =
                result[destination.droppableId];
            console.log(newColumns, "newColumns after move.");
            setColumns(newColumns);
        }

        // TODO: Update stock for paint once moved.
    };

    useEffect(() => {
        reorderPaints();
    }, []);

    return (
        <div className="display-flex">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-2">
                    {columns.map((column) => (
                        <Droppable key={column.id} droppableId={`${column.id}`}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2>{column.title}</h2>
                                    {column.items.map((paint, index) => (
                                        <Draggable
                                            key={paint.id}
                                            draggableId={paint.name}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <PaintCard paint={paint} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;
