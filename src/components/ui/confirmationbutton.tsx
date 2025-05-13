"use client";

import { motion } from "framer-motion";

interface ConfirmationButtonProps {
  onConfirm: () => void;
}

export default function ConfirmationButton({ onConfirm }: ConfirmationButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mt-8"
    >
      <button
        onClick={onConfirm}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Confirm Your Reservation
      </button>
    </motion.div>
  );
}