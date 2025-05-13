"use client"

import { motion } from "framer-motion"

interface Child {
  id: number
  age: number | null
}

interface PersonSelectorProps {
  name: string
  setName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  adults: number
  setAdults: (value: number) => void
  childGuests: Child[]
  setChildGuests: (value: Child[]) => void
}

export default function PersonSelector({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  adults,
  setAdults,
  childGuests,
  setChildGuests,
}: PersonSelectorProps) {
  const addChild = () => {
    setChildGuests([...childGuests, { id: Date.now(), age: null }])
  }

  const removeChild = (id: number) => {
    setChildGuests(childGuests.filter((child) => child.id !== id))
  }

  const handleAgeChange = (id: number, age: number) => {
    setChildGuests(childGuests.map((child) => (child.id === id ? { ...child, age } : child)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Reservation Details</h2>

      /* Contact Details */
      <div className="flex flex-col gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      /* People Section */
      <h2 className="text-2xl font-bold mb-6 text-center">Select People</h2>

      /* Adults */
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Adults:</p>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 bg-gray-200 rounded-lg" onClick={() => setAdults(Math.max(1, adults - 1))}>
            -
          </button>
          <span className="text-xl">{adults}</span>
          <button className="px-3 py-1 bg-gray-200 rounded-lg" onClick={() => setAdults(adults + 1)}>
            +
          </button>
        </div>
      </div>

      /* Children */
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Children:</p>
          <button onClick={addChild} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add Child
          </button>
        </div>

        {childGuests.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            {childGuests.map((child, index) => (
              <div key={child.id} className="flex items-center gap-4">
                <p className="w-24 font-medium">Child {index + 1} - Age:</p>
                <select
                  value={child.age ?? ""}
                  onChange={(e) => handleAgeChange(child.id, Number.parseInt(e.target.value))}
                  className="border rounded-lg p-2 flex-1"
                >
                  <option value="">Select age</option>
                  {Array.from({ length: 18 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} years
                    </option>
                  ))}
                </select>
                <button onClick={() => removeChild(child.id)} className="text-red-500 font-bold hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
