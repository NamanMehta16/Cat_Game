import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import "./styleSheet.css";

const MidArea = ({
  items,
  handleCoordinates,
  inputValues,
  setInputValues,
  handleButtonClick,
}) => {
  const dispatch = useDispatch();

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
                    className={`flex flex-row flex-wrap w-1/2 ${
                      item.color
                    } text-white px-2 py-1 my-2 text-sm cursor-pointer ${
                      item.type === "action" ? "button-style" : ""
                    }`}
                    onClick={(t) => {
                      handleButtonClick({
                        code: t.target.getAttribute("name"),
                        type: t.target.getAttribute("type"),
                        id: item.id,
                      });
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
                          placeholder="10"
                          value={inputValues[item.id] || ""}
                          onChange={(e) =>
                            handleInputChange(item.id, e.target.value)
                          }
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
