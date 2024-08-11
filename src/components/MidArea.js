import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../reducer';
import "./styleSheet.css";

const MidArea = ({ items }) => {
  const store = useSelector((state) => state.store.value);
  const dispatch = useDispatch();

  // State to hold the input value for each item
  const [inputValues, setInputValues] = useState({});

  const handleAction = (item, value) => {
    console.log(item.id)
    console.log("value", inputValues)
    let x = store.x;
    let y = store.y;
    let angle = store.angle;
    const angleInRadians = angle * (Math.PI / 180);

    if (item.code === "move") {
      const moveDistance = parseInt(value, 10) || 10; // Default to 10 if input is invalid
      x += moveDistance * Math.cos(angleInRadians);
      y += moveDistance * Math.sin(angleInRadians);
    } else if (item.code === "turnAnti") {
      angle -= parseInt(value, 10) || 10;
    } else {
      angle += parseInt(value, 10) || 10;
    }

    dispatch(setPosition({ x, y, angle }));
  };

  const handleButtonClick = (item) => {
    if (item.type === "action") {
      handleAction(item, inputValues[item.id]);
    }
  };

  const handleInputChange = (itemId, value) => {
    setInputValues({
      ...inputValues,
      [itemId]: value,
    });
  };

  return (
    <>
      <Droppable droppableId="droppable-midArea">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 h-full overflow-auto p-2"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    name={item.code}
                    type={item.type}
                    className={`flex flex-row flex-wrap w-1/2 ${item.color} text-white px-2 py-1 my-2 text-sm cursor-pointer ${item.type === "action" ? "button-style" : ""}`}
                    onClick={(t) => {
                      handleButtonClick({ code: t.target.getAttribute('name'), type: t.target.getAttribute('type'), id: item.id });
                    }}
                  >
                    {item.type === "event" ? (
                      item.content
                    ) : (
                      <>
                        {item.content.split("by")[0]} by
                        <input
                          type="number"
                          className="ml-2 mr-2 w-12 text-black"
                          placeholder='10'
                          value={inputValues[item.id] || ""}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                        />
                        {item.code === "move" ? "steps" : "°"}
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>

  );
};

export default MidArea;
