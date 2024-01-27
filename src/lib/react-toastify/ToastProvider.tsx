"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";

import { ToastContainer } from "react-toastify";

// https://github.com/fkhadra/react-toastify/issues/963

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  // https://fkhadra.github.io/react-toastify/how-to-style#css-classes-as-function
  const contextClass = {
    success: "bg-emerald-500",
    error: "bg-orange-600",
    info: "bg-gray-600",
    warning: "bg-yellow-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) => contextClass[context?.type || "default"] +
        " relative flex p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-md"}
      />
    </>
  );
}