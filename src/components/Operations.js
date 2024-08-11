import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from './Sidebar';
import MidArea from './MidArea';
import {sideAreaElements} from '../../src/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setMidAreaElements } from '../reducer';
import "./styleSheet.css"




const Operations = () => {
  const store = useSelector((state) => state.store.value)
  const [midAreaItems, setMidAreaItems] = useState([]);
  const dispatch = useDispatch();

React.useEffect(()=>{
  setMidAreaItems(store.midAreaElements)
},[store.midAreaElements])
  const onDragEnd = (result) => {
    console.log("result", result)
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }


    if (source.droppableId === 'droppable-sidebar' && destination.droppableId === 'droppable-midArea') {
      const draggedItem = sideAreaElements.find(item => item.id === draggableId);

      if (draggedItem) {
        let isEventPresent = midAreaItems.find(item => item.type === 'event');
        if (draggedItem.type == "event" && isEventPresent) {
          alert(`An Event ${isEventPresent.content} is Already present remove that before adding a new event`)
          return
        }
        if (draggedItem.type == "event") {
          dispatch(setMidAreaElements([{ ...draggedItem, id: `midArea-${draggableId}-${Date.now()}` }, ...midAreaItems,]));
        }
        else {
          dispatch(setMidAreaElements([...midAreaItems, { ...draggedItem, id: `midArea-${draggableId}-${Date.now()}` }]));
        }

      }
    }

    // When dragged from the mid area back to the sidebar
    if (source.droppableId === 'droppable-midArea' && destination.droppableId === 'droppable-sidebar') {
      dispatch(setMidAreaElements(midAreaItems.filter(item => item.id !== draggableId)));
    }

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="w-1/3 h-full">
        <Sidebar items={sideAreaElements} />
      </div>
      <div className="w-2/3 h-full">
      <div className="top-right-buttons">
        <button className="run-button" onClick={()=>{}}>
          Run
        </button>
        <button className="replay-button" onClick={()=>{}}>
          Replay
        </button>
      </div>
        <MidArea items={store.midAreaElements} />
      </div>

    </DragDropContext>
  );
};

export default Operations;
