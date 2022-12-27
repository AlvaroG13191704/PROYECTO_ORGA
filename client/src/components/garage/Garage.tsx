import { useState } from "react";

export const Garage = () => {

  //HOOKS 
  const [openGarage, setOpenGarage] = useState(false);

  //FUNCTIONS
  const handleOpenGarage = () => {
    setOpenGarage(true);
    console.log('Garage is open')
    // show modal to insert password

  };
  return (
    <div className="bg-gray-300 box-content h-80 w-80 border-4 border-b-black m-auto my-5">
      <h1 className="text-2xl font-bold text-center">Garage</h1>
      {/* Button */}
      <div className="flex justify-center">
        <button className="bg-green-600 hover:bg-green-500 text-white font-bold m-2 py-2 px-4 rounded shadow-lg shadow-green-500/50"
          onClick={handleOpenGarage}
        >
          Open Garage
        </button>
        </div>
    </div>
  );
};

