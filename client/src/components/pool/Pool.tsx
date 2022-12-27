import { useState } from "react";
import { motion } from "framer-motion";

export const Pool = () => {
  const [opacity, setOpacity] = useState(0);

  const fillPool = () => {
    setOpacity(1);
  };

  const emptyPool = () => {
    setOpacity(0);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
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
          onClick={emptyPool}
          className="bg-red-600 hover:bg-red-500 py-2 rounded-md w-1/3 text-white text-xl"
        >
          Vaciar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={fillPool}
          className="bg-green-600 hover:bg-green-500 py-2 rounded-md w-1/3 text-white text-xl"
        >
          Llenar
        </motion.button>
      </div>
    </div>
  );
};
