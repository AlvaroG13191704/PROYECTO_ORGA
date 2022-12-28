import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useSocket } from "../../hooks";

export const Pool = () => {
  const [opacity, setOpacity] = useState(0);
  const [isPoolEmpty, setIsPoolEmpty] = useState(true)
  const { socket } = useSocket();

  const fillPool = () => {
    setOpacity(1);
    setIsPoolEmpty(false)
  };

  const emptyPool = () => {
    setOpacity(0);
    setIsPoolEmpty(true)
  };

  const handleDrainPool = () => {
    socket.emit("drain-pool");
  };

  const handleFillPool = () => {
    socket.emit("fill-pool");
  };

  const handlePoolPumpToggle = (isEmpty: boolean) => {
    if (isEmpty) {
      emptyPool();
    } else {
      fillPool();
    }
  }

  useEffect(() => {
    socket.on("pool-sensor-toggle", handlePoolPumpToggle);

    return () => {
      socket.off("pool-sensor-toggle", handlePoolPumpToggle);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <div className="w-1/2 h-1/2 outline-dashed  outline-[12px] outline-gray-400 rounded-lg">
        <motion.div
          initial={{ opacity: opacity ? 1 : 0 }}
          animate={{ opacity: opacity ? 1 : 0 }}
          transition={{ duration: 3 }}
          className="w-full h-full bg-[#75AEDC] flex flex-col"
        />
      </div>

      <div className="flex flex-row justify-between w-1/2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDrainPool}
          className="bg-red-600 hover:bg-red-500 py-2 rounded-md w-1/3 text-white text-xl"
        >
          Vaciar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFillPool}
          className="bg-green-600 hover:bg-green-500 py-2 rounded-md w-1/3 text-white text-xl"
        >
          Llenar
        </motion.button>
      </div>
    </div>
  );
};
