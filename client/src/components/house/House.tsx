import { Garage, Modal, Pool, Room } from "../";
import { motion } from "framer-motion";
import { useState } from "react";

export const House = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
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
            onClick={openModal}
            className="cursor-pointer w-32 h-20 mt-2 bg-orange-500 hover:bg-orange-400
           rounded-md text-white font-medium"
          >
            Desactivar
          </motion.button>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-4 auto-cols-fr p-5">
          <Room roomNumber={1} />
          <Room roomNumber={2} />
          <Room roomNumber={3} />
          <Room roomNumber={4} />
        </div>
        <div className="auto">
          <Pool />
        </div>
        <div className="">
          <Garage />
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
