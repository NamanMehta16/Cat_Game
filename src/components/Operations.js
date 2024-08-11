import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Sidebar from "./Sidebar";
import MidArea from "./MidArea";
import { sideAreaElements } from "../../src/constants";
import { useDispatch, useSelector } from "react-redux";
import { setMidAreaElements, setPosition } from "../actions";
import "./styleSheet.css";

const Operations = () => {
  const store = useSelector((state) => state.value);
  const [midAreaItems, setMidAreaItems] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, angle: 0 });
  const [history, setHistory] = useState([]);
  const [busyFlag, setBusyFlag] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setMidAreaItems(store.midAreaElements);
  }, [store.midAreaElements]);
  React.useEffect(() => {
    dispatch(setPosition(coordinates));
    if (busyFlag != "replay") {
      setHistory((prevHistory) => [
        ...prevHistory,
        { x: coordinates.x, y: coordinates.y, angle: coordinates.angle },
      ]);
    }
  }, [coordinates]);
  React.useEffect(() => {
    if (store.catClick > 0) {
      handleRunButton("cat");
    }
  }, [store.catClick]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === "droppable-sidebar" &&
      destination.droppableId === "droppable-midArea"
    ) {
      const draggedItem = sideAreaElements.find(
        (item) => item.id === draggableId
      );
      if (draggedItem) {
        let isEventPresent = midAreaItems.find((item) => item.type === "event");
        if (draggedItem.type == "event" && isEventPresent) {
          alert(
            `An Event ${isEventPresent.content} is Already present remove that before adding a new event`
          );
          return;
        }
        if (draggedItem.type == "event") {
          dispatch(
            setMidAreaElements([
              { ...draggedItem, id: `midArea-${draggableId}-${Date.now()}` },
              ...midAreaItems,
            ])
          );
        } else {
          dispatch(
            setMidAreaElements([
              ...midAreaItems,
              { ...draggedItem, id: `midArea-${draggableId}-${Date.now()}` },
            ])
          );
        }
      }
    }
    if (
      source.droppableId === "droppable-midArea" &&
      destination.droppableId === "droppable-sidebar"
    ) {
      dispatch(
        setMidAreaElements(
          midAreaItems.filter((item) => item.id !== draggableId)
        )
      );
    }
  };
  const handleButtonClick = (item) => {
    if (item.type === "action" && !busyFlag) {
      setBusyFlag(true);
      handleCoordinates(item, inputValues[item.id]);
      setBusyFlag(false);
    }
  };
  const handleCoordinates = (item, from) => {
    setCoordinates((prevCoordinates) => {
      const { x, y, angle } = prevCoordinates;
      const angleInRadians = angle * (Math.PI / 180);
      let newX = x;
      let newY = y;
      let newAngle = angle;

      if (item.code === "move") {
        const moveDistance = parseInt(inputValues[item.id] || 10);
        newX += moveDistance * Math.cos(angleInRadians);
        newY += moveDistance * Math.sin(angleInRadians);
      } else if (item.code === "turnAnti") {
        newAngle -= parseInt(inputValues[item.id] || 10);
      } else {
        newAngle += parseInt(inputValues[item.id] || 10);
      }

      if (from === "event") {
      }

      return { x: newX, y: newY, angle: newAngle };
    });
  };

  const handleRunButton = async (event) => {
    if (
      !midAreaItems[0] ||
      !midAreaItems[0].type ||
      midAreaItems[0].type !== "event" ||
      midAreaItems[0].code === (event === "cat" ? "run" : "cat")
    ) {
      let eventMsg = event === "cat" ? "Cat" : "Run";
      alert(`Place Click ${eventMsg} Event block to execute functionality`);
      return;
    } else if (midAreaItems.length < 2) {
      alert("Place Action blocks to execute run functionality");
      return;
    }

    if (!busyFlag) {
      setBusyFlag(true);
      for (let i = 1; i < midAreaItems.length; i++) {
        if (i == 1) {
          setHistory([{ x: 0, y: 0, angle: 0 }]);
        }
        const item = midAreaItems[i];
        await new Promise((resolve) => {
          setTimeout(() => {
            handleCoordinates(item, "event");
            if (i == midAreaItems.length - 1) {
              setBusyFlag(false);
            }
            resolve();
          }, 300);
        });
      }
    }
  };
  const handleReplay = async () => {
    setBusyFlag("replay");
    if (history.length <= 1) {
      alert(
        "Nothing to Replay at the Moment Perform some action to get Replay!!"
      );
      setBusyFlag(false);
      return;
    }
    if (!busyFlag) {
      for (let i = 0; i < history.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setCoordinates({
              x: history[i].x,
              y: history[i].y,
              angle: history[i].angle,
            });
            resolve();
          }, 300);
          setHistory([]);
          setBusyFlag(false);
        });
      }
      setHistory([]);
    }
    setBusyFlag(false);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-1/3 h-full">
        <Sidebar items={sideAreaElements} />
      </div>
      <div className="w-2/3 h-full">
        <div className="top-right-buttons">
          <button
            className="run-button"
            onClick={() => {
              handleRunButton();
            }}
          >
            Run
          </button>
          <button
            className="replay-button"
            onClick={() => {
              handleReplay();
            }}
          >
            Replay
          </button>
        </div>
        <MidArea
          items={store.midAreaElements}
          handleCoordinates={handleCoordinates}
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleButtonClick={handleButtonClick}
        />
      </div>
    </DragDropContext>
  );
};

export default Operations;
