import { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import AIBackgroundGenerator from "./aiback";
import UserInfo from "./UserInfo";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();


  const [selectedBackground, setSelectedBackground] = useState(null);

  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isinfodrop, setIsinfodrop] = useState(false);


  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Dyn Background */}
      <div
        style={{
          backgroundImage: selectedBackground ? `url(${selectedBackground})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="fixed top-0 left-0 right-0 bottom-0 -z-10"
      ></div>

<div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Pawsome 🐾</h1>
          <p>Pets never Lie❤️</p>
        </div>

        {/* Background sel Dropdwn */}
        <div className="relative pointer-events-auto">
        <button
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            className="bg-orange-500 hover:bg-orange-700 text-white p-2 rounded-md font-semibold mt-4"
        >
            Select AI Background
        </button>
        {isDropdownVisible && (
            <div className="absolute mt-2 bg-white border rounded-lg shadow-lg p-2 w-64 z-20">
                <AIBackgroundGenerator setBackground={setSelectedBackground} />
            </div>
        )}
        </div>

        {/* UserInfo Dropdwn */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <button
            onClick={() => setIsinfodrop(!isinfodrop)}
            className="bg-orange-500 hover:bg-orange-700 text-white p-2 w-32 rounded-md font-semibold mt-4"
          >
            UserInfo
          </button>
          {isinfodrop && (
       
              <UserInfo />
    
          )}
        </div>

        {/* Camera and Green Screen Controls */}
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-orange-500 hover:bg-orange-700 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              body.classList.toggle("greenScreen");
            }}
            className="pointer-events-auto bg-orange-500 hover:bg-orange-700 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-orange-500 hover:bg-orange-700 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
