'use client'
import { useState, useEffect } from 'react'

type ActionButtonProps = {
  value: number
  onClick: () => void
  disabled?: boolean
}

const ActionButton = ({ value, onClick, disabled }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative w-full h-14
      flex items-center justify-center
      text-2xl font-mono
      bg-[#1c1c1c] hover:bg-[#252525]
      border border-white/[0.04]
      rounded-xl transition-all duration-200
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${value > 0 ? 'text-[#00FFFF]' : 'text-red-500'}
    `}
  >
    {value > 0 ? `+${value}` : value}
  </button>
)

type ActionGridProps = {
  onAction: (value: number) => void
  disabled?: boolean
}

export function ActionGrid({ onAction, disabled }: ActionGridProps) {
  const [buttons, setButtons] = useState<number[]>([])

  const generateRandomButtons = () => {
    const newButtons: number[] = []
    
    // Generate 6 random values
    for (let i = 0; i < 6; i++) {
      const isPositive = Math.random() < 0.5
      
      if (isPositive) {
        // Random value between 1 and 3
        newButtons.push(Math.floor(Math.random() * 3) + 1)
      } else {
        // Random value between -6 and -1
        newButtons.push(-(Math.floor(Math.random() * 6) + 1))
      }
    }

    // Shuffle array
    return newButtons.sort(() => Math.random() - 0.5)
  }

  // Initial button generation
  useEffect(() => {
    setButtons(generateRandomButtons())
  }, [])

  const handleAction = (value: number) => {
    if (disabled) return
    onAction(value)
    // Generate new random buttons after each action
    setButtons(generateRandomButtons())
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((value, index) => (
          <ActionButton
            key={`${value}-${index}`}
            value={value}
            onClick={() => handleAction(value)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}