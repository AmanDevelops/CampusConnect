import React, { useState } from 'react';
import { Calendar, Users, Trophy, Coins } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onParticipate: (activity: Activity) => void;
}

export function ActivityCard({ activity, onParticipate }: ActivityCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const icons = {
    club: Users,
    academic: Trophy,
    hackathon: Calendar,
  };
  
  const Icon = icons[activity.type];

  const handleParticipate = () => {
    setIsProcessing(true);
    onParticipate(activity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold">{activity.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">+{activity.coinsReward}</span>
        </div>
      </div>
      
      <p className="mt-3 text-gray-600">{activity.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{activity.date}</span>
        <button
          onClick={handleParticipate}
          disabled={isProcessing}
          className={`px-4 py-2 rounded-md transition-colors ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
        >
          {isProcessing ? 'Processing...' : activity.registrationFee ? `Register (${activity.registrationFee} coins)` : 'Participate'}
        </button>
      </div>
    </div>
  );
}