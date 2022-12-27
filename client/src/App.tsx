import { Garage, Pool, Room } from "./components";

export const App = () => {
  return (
    <>
      <div className="w-screen  h-screen flex justify-center align-middle">
        <Pool />
      </div>
      <Garage />
      <Room />
    </>
  );
};
