import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = ({ items }) => (
  <Droppable droppableId="droppable-sidebar">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
      >
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`flex flex-row flex-wrap ${item.color} text-white px-2 py-1 my-2 text-sm cursor-pointer`}
              >
                {item.content}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default Sidebar;
