import type React from "react"
import { Button } from "./ui/button"

const CTA: React.FC = () => {
  return (
    <div className="bg-deep-blue">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to simplify compliance?</span>
          <span className="block">Start using ComplianceAI today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Join thousands of companies that trust ComplianceAI for their compliance needs. Get certified faster and stay
          compliant with AI-powered automation.
        </p>
        <Button 
          className="mt-8 w-full sm:w-auto px-8 py-6 text-lg font-bold tracking-wider rounded-full bg-[#4318FF] hover:bg-[#3311DD] text-white border-0 shadow-[0_0_20px_rgba(67,24,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(67,24,255,0.6)]"
        >
          SCHEDULE A DEMO
        </Button>
      </div>
    </div>
  )
}

export default CTA
