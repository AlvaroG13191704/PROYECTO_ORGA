import { FormEvent, useEffect, useState } from "react";
import { useSocket } from "../../hooks";
import { Modal } from "../modal";
import { toast } from 'react-hot-toast';

export const Garage = () => {
  //HOOKS
  const [openGarage, setOpenGarage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { socket } = useSocket();

  //FUNCTIONS
  const handleOpenGarage = (remainingAttempts: number, success: boolean) => {

    // ? Do something with remainingAttempts, maybe a warning message

    if (success) {

      setOpenGarage(true);
      console.log("Garage is open");
      // close
      setTimeout(() => {
        toast(`Cerrando garage!`);
        setOpenGarage(false);
      }, 7000);

      toast(`Abriendo garage!`);
    } else {
      toast(`Intentos restantes: ${remainingAttempts}`);
    }

  };


  const handlePasscodeRequest = (event: FormEvent, passcode: string, reset: () => void) => {
    event.preventDefault();
    socket.emit('garage-door-open', passcode);
    reset();
  }

  useEffect(() => {

    socket.on('garage-door-passcode', handleOpenGarage)

    return () => {
      socket.off('garage-door-passcode', handleOpenGarage)
    }
  }, [])

  return (
    <div className="bg-gray-300 box-content border-2  m-auto my-5">
      <h1 className="text-2xl font-bold text-center">Garage</h1>
      {/* Button */}
      <div className="flex justify-center">
        <button
          className="bg-green-600 hover:bg-green-500 text-white font-bold m-2 py-2 px-4 rounded shadow-lg shadow-green-500/50"
          onClick={() => setIsOpen(true)}
        >
          Open Garage
        </button>
      </div>
      {/* Line left */}
      <div
        className={
          (openGarage
            ? "translate-x-full duration-[5000ms]"
            : "translate-y-full duration-[5000ms]") +
          " w-4/4 mt-56 h-3 bg-black"
        }
      ></div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={handlePasscodeRequest} />
    </div>
  );
};
