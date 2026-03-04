'use client'

import { useState, useEffect } from 'react'

interface PriceAlertProps {
  price: number
  floor: number
  showToast?: boolean
}

export function PriceAlert({ price, floor, showToast = true }: PriceAlertProps) {
  const [toastVisible, setToastVisible] = useState(false)
  const isBelow = price > 0 && price < floor
  const isNear = price >= floor && price < floor * 1.05

  useEffect(() => {
    if (isBelow && showToast) {
      setToastVisible(true)
      const timer = setTimeout(() => setToastVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isBelow, showToast])

  if (!isBelow && !isNear) return null

  return (
    <>
      {/* Inline indicator */}
      <div
        className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium ${
          isBelow
            ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            : 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
        }`}
      >
        <span className="text-base">{isBelow ? '🚨' : '⚠️'}</span>
        {isBelow
          ? `Preço abaixo do piso! (R$ ${price.toFixed(2)} < R$ ${floor.toFixed(2)})`
          : `Preço próximo do piso (R$ ${floor.toFixed(2)})`}
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-lg dark:bg-red-900/90 dark:text-red-200">
          <p className="font-semibold">Preço abaixo do piso!</p>
          <p className="text-xs opacity-80">Margem negativa. Revise seus custos.</p>
        </div>
      )}
    </>
  )
}
