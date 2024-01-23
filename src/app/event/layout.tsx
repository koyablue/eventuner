"use client";

import { ToastContainer } from "react-toastify";

export default function NewEventPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
