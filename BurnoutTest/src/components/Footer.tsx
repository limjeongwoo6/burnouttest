import React from 'react'
import { Mail, Shield, FileText } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HaruBurnoutTest</h3>
            <p className="text-secondary-300 mb-4">
              건강한 마음으로 더 나은 하루를 만들어가는 것을 목표로 합니다.
            </p>
            <div className="flex items-center space-x-2 text-secondary-400">
              <Shield className="h-4 w-4" />
              <span className="text-sm">개인정보 보호 보장</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <div className="flex items-center space-x-2 text-secondary-300">
              <Mail className="h-4 w-4" />
              <a 
                href="mailto:ljw88718@gmail.com" 
                className="hover:text-white transition-colors"
              >
                ljw88718@gmail.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">법적 고지</h3>
            <div className="space-y-2 text-sm text-secondary-300">
              <p>이 검사는 의학적 진단 도구가 아닙니다.</p>
              <p>정보 제공을 위한 선별 도구입니다.</p>
              <div className="flex items-center space-x-2 mt-3">
                <FileText className="h-4 w-4" />
                <span>정확한 진단은 전문가와 상담하세요.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-secondary-400 text-sm">
            © 2025 HaruBurnoutTest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
