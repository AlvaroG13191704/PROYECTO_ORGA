import { FormEvent, useEffect, useState } from "react";
import { useSocket } from "../../hooks";

export const Garage = () => {
  //HOOKS
  const [openGarage, setOpenGarage] = useState(false);
  const { socket } = useSocket();
  const [passcode, setPasscode] = useState('');

  //FUNCTIONS
  const handleOpenGarage = (remainingAttempts: number, success: boolean) => {

    // ? Do something with remainingAttempts, maybe a warning message

    if (success) {

      setOpenGarage(true);
      console.log("Garage is open");
      // close
      setTimeout(() => {
        setOpenGarage(false);
      }, 5000);

    }

  };


  // TODO: implement passcode form on a modal

  const handlePasscodeRequest = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('garage-door-open', passcode);
    setPasscode('');
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
    </div>
  );
};
