import React from 'react'
import { Brain, Heart } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-secondary-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">HaruBurnoutTest</h1>
              <p className="text-sm text-secondary-600">건강한 마음으로 더 나은 하루를</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-danger-500 animate-pulse" />
            <span className="text-sm text-secondary-600">정신건강 케어</span>
          </div>
        </div>
      </div>
    </header>
  )
}
