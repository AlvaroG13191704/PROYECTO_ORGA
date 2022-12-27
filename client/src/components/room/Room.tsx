import { useState } from "react";

export const Room = () => {

  // HOOKS
  const [room, setRoom] = useState(false);

  // FUNCTIONS
  const handleTurnOn = () => {
    setRoom(true);
    console.log("Turn on light room 1");
    setTimeout(() => {
      handleTurnOff();
    }, 2000);
  };

  const handleTurnOff = () => {
    setRoom(false);
    console.log("Turn off light room 1");
  };

  return (
    <div className={
      (room ? "bg-gray-200" : "bg-gray-400") + " box-content h-48 w-48 border-4 m-auto my-5"
    }
    onClick={handleTurnOn}
    >
      <h1 className="text-2xl font-bold text-center">Room </h1>
      {/* Light */}
      <div className={
        (room ? "bg-yellow-300 drop-shadow-xl shadow-yellow-500/100 blur-sm" : "bg-gray-500") + " rounded-full h-14 w-14 m-auto my-11"
      }></div>
    </div>
  )
}
