import React from 'react';

interface ComplianceScoreProps {
  score: number;
}

export default function ComplianceScore({ score }: ComplianceScoreProps) {
  return (
    <div className="bg-[#1E1E1E] border border-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Compliance Score</h2>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-gray-300"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-green-500"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
            />
            <text
              x="18"
              y="20.5"
              className="text-xs font-bold text-green-500"
              textAnchor="middle"
              fill="currentColor"
              dominantBaseline="middle"
            >
              {score}%
            </text>
          </svg>
        </div>
      </div>
      <p className="text-center text-green-600 mt-4">
        Your current compliance score is {score}%. Keep up the good work!
      </p>
    </div>
  );
}