import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cool-bg text-cool-text p-4">
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-cool-accent animate-spin mb-4" />
        <h2 className="text-lg font-bold text-cool-text">正在載入行程...</h2>
        <p className="text-sm text-cool-textMuted mt-1">Osaka Trip 2024</p>
      </div>
    </div>
  );
};

export default LoadingScreen;