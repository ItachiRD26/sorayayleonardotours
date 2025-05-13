"use client";

import { motion } from "framer-motion";

interface PeopleCounterProps {
  people: number;
  setPeople: (value: number) => void;
}

export default function PeopleCounter({ people, setPeople }: PeopleCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of People
      </label>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setPeople(Math.max(1, people - 1))}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
        >
          -
        </button>
        <span className="text-xl font-semibold">{people}</span>
        <button
          onClick={() => setPeople(people + 1)}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
        >
          +
        </button>
      </div>
    </motion.div>
  );
}