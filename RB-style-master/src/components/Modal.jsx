"use client";

import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      {/* BOX */}
      <div className="bg-white w-[90%] md:w-[500px] rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg">{title || "Modal"}</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 text-sm text-gray-700">
          {children}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-4 py-1 text-sm bg-black text-white rounded hover:bg-gray-800">
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}