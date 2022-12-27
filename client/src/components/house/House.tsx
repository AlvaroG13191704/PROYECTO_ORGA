import { Garage, Pool, Room } from "../";
import { motion } from "framer-motion";

export const House = () => {
  return (
    <>
      <div
        className="border-2 border-red-500 w-full h-full grid grid-rows-2 
                     grid-flow-col gap-4 auto-cols-fr"
      >
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer w-32 h-20 mt-2 bg-orange-500 hover:bg-orange-400
           rounded-md text-white font-medium"
          >
            Desactivar
          </motion.button>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-4 auto-cols-fr p-5">
          <Room id={1} />
          <Room id={2} />
          <Room id={3} />
          <Room id={4} />
        </div>
        <div className="auto">
          <Pool />
        </div>
        <div className="">
          <Garage />
        </div>
      </div>
    </>
  );
};
