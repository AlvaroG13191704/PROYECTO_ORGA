import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(password);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-5 w-full">
          <Dialog.Title className="text-lg font-semibold">
            Confirmar contraseña
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="password">Contraseña</label>
            <input
              name="password"
              type="password"
              onChange={handlePasswordChange}
            />
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              type="submit"
            >
              Confirmar
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
