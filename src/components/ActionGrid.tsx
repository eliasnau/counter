'use client'
import { useState } from 'react'

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

const POSSIBLE_ACTIONS = [
  [1, -3, 3, -2, 1, -4],
  [2, -4, 1, -3, 2, -5],
  [3, -5, 2, -4, 1, -6],
  [1, -2, 3, -3, 2, -4],
  [2, -3, 1, -5, 3, -6]
]

type ActionGridProps = {
  onAction: (value: number) => void
  disabled?: boolean
}

export function ActionGrid({ onAction, disabled }: ActionGridProps) {
  const [currentActionSet, setCurrentActionSet] = useState(0)

  const handleAction = (value: number) => {
    if (disabled) return
    
    onAction(value)
    
    // Switch to next action set
    setCurrentActionSet((prev) => (prev + 1) % POSSIBLE_ACTIONS.length)
  }

  const currentActions = POSSIBLE_ACTIONS[currentActionSet]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {currentActions.map((value, index) => (
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