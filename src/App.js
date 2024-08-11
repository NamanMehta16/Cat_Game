import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import Operations from "./components/Operations"
import PreviewArea from "./components/PreviewArea";

export default function App() {
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 w-3/4 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
         <Operations/>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
