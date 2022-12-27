import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useSocket } from "../../hooks";

interface RoomProps {
  roomNumber: number;
}

export const Room = ({ roomNumber }: RoomProps) => {
  // HOOKS
  const [room, setRoom] = useState(false);
  const { socket } = useSocket();

  const handleRoomLightToggle = (targetRoomNumber: number) => {
    if (targetRoomNumber === roomNumber) {
      setRoom(!room);
    }
  }

  useEffect(() => {

    socket.on("room-light-toggle", handleRoomLightToggle);

    return () => {
      socket.off("room-light-toggle", handleRoomLightToggle);
    };

  }, []);

  return (
    <>
      <motion.div
        className={
          (room ? "bg-gray-300" : "bg-gray-400") +
          " box-content h-full w-full border-4"
        }
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
