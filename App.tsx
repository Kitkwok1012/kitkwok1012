import React, { useState, useEffect } from 'react';
import { getTripData } from './services/geminiService';
import { TripData } from './types';
import LoadingScreen from './components/LoadingScreen';
import DayView from './components/DayView';
import { PlaneTakeoff, RefreshCw, CalendarDays } from 'lucide-react';

const App: React.FC = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    const fetchTrip = async () => {
      // Always fetch fresh data for now since we are editing static data
      const data = await getTripData();
      setTripData(data);
      setLoading(false);
    };

    fetchTrip();
  }, []);

  const handleRefresh = () => {
      setLoading(true);
      setTimeout(async () => {
        const data = await getTripData();
        setTripData(data);
        setLoading(false);
      }, 500);
  };

  if (loading) return <LoadingScreen />;
  if (!tripData) return null;

  // Find the data for the active day
  const currentDayData = tripData.days.find(day => day.day === activeDay);

  return (
    <div className="min-h-screen bg-cool-bg font-sans text-cool-text antialiased">
      <div className="max-w-md mx-auto min-h-screen bg-cool-bg shadow-2xl relative border-x border-cool-border flex flex-col">
        
        {/* Header Section */}
        <header className="pt-6 pb-4 px-6 bg-white border-b border-cool-border sticky top-0 z-20">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-black text-cool-text tracking-tight flex items-center gap-2">
                        {tripData.title}
                    </h1>
                    <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-1 text-xs font-medium text-cool-textMuted bg-slate-100 px-2 py-1 rounded w-fit">
                            <CalendarDays size={12} className="text-cool-accent" />
                            <span>12月7日 - 12月12日</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-cool-textMuted bg-slate-100 px-2 py-1 rounded w-fit">
                            <PlaneTakeoff size={12} className="text-cool-accent" />
                            <span>UO850</span>
                            <span className="mx-1 text-slate-300">|</span>
                            <span>UO899</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Day Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {tripData.days.map((day) => (
                    <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day)}
                        className={`
                            flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-lg border transition-all duration-200
                            ${activeDay === day.day 
                                ? 'bg-cool-text text-white border-cool-text shadow-lg transform -translate-y-0.5' 
                                : 'bg-white border-cool-border text-slate-400 hover:border-cool-accent hover:text-cool-accent'}
                        `}
                    >
                        <span className="text-[10px] font-bold uppercase opacity-60">DAY</span>
                        <span className="text-xl font-bold">{day.day}</span>
                    </button>
                ))}
            </div>
        </header>

        {/* Main Content Area */}
        <main className="p-5 flex-1">
            {/* We key the DayView by activeDay to force a re-render and replay animations when switching tabs */}
            {currentDayData && <DayView key={activeDay} data={currentDayData} />}
        </main>

        {/* Floating Flight Info Bottom Sheet Hint */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-3 border border-slate-700">
                <span className="text-xs font-medium text-slate-300">Osaka 2025</span>
                <span className="w-1 h-1 bg-cool-accent rounded-full"></span>
                <span className="text-xs font-bold">Have fun!</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default App;