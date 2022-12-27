import { useState } from "react";

export const Garage = () => {

  //HOOKS 
  const [openGarage, setOpenGarage] = useState(false);


  //FUNCTIONS
  const handleOpenGarage = () => {
    setOpenGarage(true);
    console.log('Garage is open')
    // close
    setTimeout(() => {
      setOpenGarage(false);
    }, 7000);
  };
  return (
    <div className="bg-gray-300 box-content h-80 w-80 border-4  m-auto my-5">

      <h1 className="text-2xl font-bold text-center">Garage</h1>
      {/* Button */}
      <div className="flex justify-center">
        <button className="bg-green-600 hover:bg-green-500 text-white font-bold m-2 py-2 px-4 rounded shadow-lg shadow-green-500/50"
          onClick={handleOpenGarage}
        >
          Open Garage
        </button>
      </div>
      {/* Line left */}
      <div className={(openGarage? "translate-x-full duration-[5000ms]": "translate-y-full duration-[5000ms]") + " w-4/4 mt-56 h-3 bg-black"}></div>
    </div>
  );
};

