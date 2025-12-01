import React from 'react';
import { UserProgress, CareerPath } from '../types';
import { CAREER_PATHS } from '../constants';
import { Lock, CheckCircle2, Circle } from 'lucide-react';

interface CurriculumMapProps {
  user: UserProgress;
  onClose: () => void;
  onSelectDay: (day: number) => void;
}

export const CurriculumMap: React.FC<CurriculumMapProps> = ({ user, onClose, onSelectDay }) => {
  const path = CAREER_PATHS.find(p => p.id === user.selectedPathId);
  if (!path) return null;

  // Group phases logic
  const getPhaseForDay = (day: number) => {
    // Basic mapping based on standard structure from constants or fallback
    // In a real DB this would be exact. Here we approximate based on the Path config in constants.
    // However, constants.ts phases are strings like "1-40". We need to parse.
    return path.phases.find(p => {
        const [start, end] = p.days.split('-').map(Number);
        return day >= start && day <= end;
    });
  };

  const renderDayCell = (day: number) => {
    const isCompleted = user.completedDays.includes(`day-${day}`);
    const isLocked = day > user.completedDays.length + 1;
    const isCurrent = day === user.completedDays.length + 1;

    return (
        <button
            key={day}
            onClick={() => {
                if (!isLocked) {
                    onSelectDay(day);
                    onClose();
                }
            }}
            disabled={isLocked}
            className={`
                aspect-square rounded-md flex items-center justify-center text-xs font-bold relative group
                ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                ${isCurrent ? 'bg-indigo-600 text-white ring-2 ring-indigo-200' : ''}
                ${isLocked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'hover:scale-110 transition-transform'}
            `}
        >
            {isCompleted ? <CheckCircle2 size={14} /> : isLocked ? <Lock size={12} /> : day}
            
            {/* Tooltip */}
            {!isLocked && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] p-1 rounded whitespace-nowrap z-10">
                    Day {day}
                </div>
            )}
        </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-white lg:bg-slate-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10">
            <div>
                <h2 className="text-lg font-bold text-slate-800">Curriculum Map</h2>
                <p className="text-sm text-slate-500">{path.title}</p>
            </div>
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium"
            >
                Close Map
            </button>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {path.phases.map((phase, idx) => {
                const [start, end] = phase.days.split('-').map(Number);
                const days = Array.from({length: end - start + 1}, (_, i) => start + i);
                
                return (
                    <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="mb-4">
                            <h3 className="font-bold text-indigo-900 text-lg">{phase.name}</h3>
                            <p className="text-sm text-slate-500">{phase.description} • Days {phase.days}</p>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                            {days.map(d => renderDayCell(d))}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
};