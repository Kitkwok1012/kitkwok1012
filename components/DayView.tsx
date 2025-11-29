import React from 'react';
import { MapPin, ShoppingBag, Train, Clock, Sun, Cloud, CloudRain, CloudSun, Thermometer } from 'lucide-react';
import { DayPlan } from '../types';

interface DayViewProps {
  data: DayPlan;
}

const WeatherIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'sun': return <Sun className="w-8 h-8 text-amber-400" />;
    case 'cloud': return <Cloud className="w-8 h-8 text-slate-400" />;
    case 'rain': return <CloudRain className="w-8 h-8 text-blue-400" />;
    case 'cloud-sun': return <CloudSun className="w-8 h-8 text-orange-400" />;
    default: return <Sun className="w-8 h-8 text-amber-400" />;
  }
};

const DayView: React.FC<DayViewProps> = ({ data }) => {
  return (
    <div className="space-y-5 pb-24">
      
      {/* Header & Weather Card */}
      <div 
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-cool-border flex flex-col animate-fade-in"
        style={{ animationDelay: '0ms' }}
      >
        <div className="p-5 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-cool-text text-white text-xs font-bold px-2 py-0.5 rounded">
                        DAY {data.day}
                    </span>
                    <span className="text-cool-textMuted font-mono font-medium text-sm">
                        {data.date}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-cool-text leading-tight">{data.theme}</h2>
            </div>
            <div className="text-right flex flex-col items-end">
                <WeatherIcon icon={data.weather.icon} />
                <div className="flex items-center gap-1 mt-1 text-cool-textMuted text-xs font-medium">
                    <Thermometer size={12} />
                    <span>{data.weather.temp}</span>
                </div>
                <span className="text-[10px] text-slate-400">{data.weather.condition}</span>
            </div>
        </div>
      </div>

      {/* Transport Card */}
      <div 
        className="bg-slate-800 rounded-xl p-5 shadow-md text-white relative overflow-hidden animate-fade-in"
        style={{ animationDelay: '100ms' }}
      >
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Train size={100} />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Train size={18} className="text-blue-400" />
          <h3 className="font-bold text-slate-200 text-sm tracking-wide">交通指南</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed relative z-10">
          {data.transportation}
        </p>
      </div>

      {/* Shopping Card */}
      {data.shopping.length > 0 && (
        <div 
          className="bg-white rounded-xl p-5 shadow-sm border border-cool-border animate-fade-in"
          style={{ animationDelay: '150ms' }}
        >
            <div className="flex items-center gap-2 mb-3">
            <ShoppingBag size={18} className="text-cool-accent" />
            <h3 className="font-bold text-cool-text text-sm">重點購物</h3>
            </div>
            <div className="flex flex-wrap gap-2">
            {data.shopping.map((shop, idx) => (
                <span key={idx} className="bg-slate-50 text-xs font-semibold px-3 py-1.5 rounded text-slate-700 border border-slate-200">
                {shop}
                </span>
            ))}
            </div>
        </div>
      )}

      {/* Timeline */}
      <div 
        className="bg-white rounded-xl p-0 shadow-sm border border-cool-border overflow-hidden animate-fade-in"
        style={{ animationDelay: '200ms' }}
      >
        <div className="p-4 bg-slate-50 border-b border-cool-border flex items-center gap-2">
            <Clock size={16} className="text-cool-textMuted" />
            <h3 className="font-bold text-cool-text text-sm">詳細行程</h3>
        </div>
        
        <div className="p-5">
            <div className="relative border-l-2 border-cool-border ml-3 space-y-8">
            {data.schedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative pl-8 group animate-fade-in"
                  style={{ animationDelay: `${300 + (idx * 100)}ms` }}
                >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-4 border-cool-accent rounded-full z-10"></div>
                
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-cool-accent bg-blue-50 px-2 py-0.5 rounded">
                        {item.time}
                        </span>
                    </div>
                    <h4 className="font-bold text-cool-text text-base flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    {item.title}
                    </h4>
                    <p className="text-sm text-cool-textMuted mt-1 leading-relaxed">
                    {item.description}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;