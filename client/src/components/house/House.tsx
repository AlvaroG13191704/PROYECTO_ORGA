import { Garage, Modal, Pool, Room } from "../";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';

export const House = () => {
  const { socket } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [isPerimetralAlarmOn, setIsPerimetralAlarmOn] = useState(false)

  const openModal = () => {
    setIsOpen(true);
  };

  const handleResetPerimetralAlarm = (e: React.FormEvent<HTMLFormElement>, password: string, reset: () => void) => {
    e.preventDefault();
    socket.emit('perimetral-alarm-deactivate', password)
    reset();
  }

  const handleWarning = (message: string) => {
    toast(message, {
      icon: '🚨',
    });
  }

  const firePerimetralAlarm = () => {
    setIsPerimetralAlarmOn(true)
  }

  const resetPerimetralAlarm = () => {
    setIsPerimetralAlarmOn(false)
  }

  const handlePasscodeResponse = (remainingAttempts: number, success: boolean) => {
    if (success) {
      toast(`Alarma perimetral desactivada exitosamente!`);
    } else {
      toast(`Intentos restantes: ${remainingAttempts}`);
    }
  }

  useEffect(() => {
    socket.on('warning', handleWarning);
    socket.on('perimetral-alarm-fired', firePerimetralAlarm)
    socket.on('perimetral-alarm-reset', resetPerimetralAlarm)
    socket.on('perimetral-alarm-passcode', handlePasscodeResponse)


    return () => {
      socket.off('warning', handleWarning);
      socket.off('perimetral-alarm-fired', firePerimetralAlarm)
      socket.off('perimetral-alarm-reset', resetPerimetralAlarm)
      socket.off('perimetral-alarm-passcode', handlePasscodeResponse)
    }
  }, [])

  return (
    <>
      <div
        className={`
        border-2
      border-blue-500
        w-full
        h-full
        grid
        grid-rows-2 
        grid-flow-col
        gap-4
        auto-cols-fr
        ${isPerimetralAlarmOn ? 'border-red-500' : 'border-blue-500'}
        `}
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={handleResetPerimetralAlarm} />
    </>
  );
};
