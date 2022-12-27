import { useState } from "react";
import { motion } from "framer-motion";

interface RoomProps {
  id: number;
}

export const Room = ({ id }: RoomProps) => {
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
    <>
      <motion.div
        className={
          (room ? "bg-gray-300" : "bg-gray-400") +
          " box-content h-full w-full border-4"
        }
        onClick={handleTurnOn}
      >
        <h1 className="text-2xl font-bold text-center ">Room </h1>
        {/* Light */}
        <div
          className={
            (room
              ? "bg-yellow-300 drop-shadow-xl shadow-yellow-500/100 blur-sm"
              : "bg-gray-500") + " rounded-full h-14 w-14 m-auto my-11"
          }
        ></div>
      </motion.div>
    </>
  );
};
