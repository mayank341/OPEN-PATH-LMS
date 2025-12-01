import React, { useState, useEffect } from 'react';
import { getDayTask } from '../constants';
import { UserProgress, DayTask } from '../types';
import { calculateStreak, isSameDay } from '../utils';
import { Icon } from '../components/Icon';
import { Heatmap } from '../components/Heatmap';
import { AITutor } from '../components/AITutor';
import { CurriculumMap } from './CurriculumMap';
import { 
  CheckCircle2, Circle, ExternalLink, Flame, 
  Menu, ArrowLeft, ArrowRight, Briefcase, 
  ChevronRight, Lock, Map, RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardProps {
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  onLogout: () => void;
  onChangePath: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, setUser, onLogout, onChangePath }) => {
  // Defaults to Day 1 if currentDay not set
  const [currentDayNumber, setCurrentDayNumber] = useState(user.currentDay || 1);
  const [showMap, setShowMap] = useState(false);
  
  // Load task based on current day and path
  const currentTask = getDayTask(user.selectedPathId || 'p1', currentDayNumber);
  
  // Track status of current viewing day
  // Filter completedDays to only count days for this specific path to determine "locked" state
  const completedDaysForPath = user.completedDays.filter(id => id.startsWith(`${user.selectedPathId}-`));
  
  const isLocked = currentDayNumber > completedDaysForPath.length + 1;
  const isCompleted = user.completedDays.includes(currentTask.id);
  
  const [taskStatus, setTaskStatus] = useState({
    input: isCompleted,
    output: isCompleted,
    synthesis: isCompleted
  });

  const [showTutor, setShowTutor] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reset task status when changing days
  useEffect(() => {
    const completed = user.completedDays.includes(currentTask.id);
    setTaskStatus({
      input: completed,
      output: completed,
      synthesis: completed
    });
  }, [currentDayNumber, user.completedDays, currentTask.id]);

  // Handle task part completion
  const handleComplete = (part: 'input' | 'output' | 'synthesis') => {
    const newStatus = { ...taskStatus, [part]: true };
    setTaskStatus(newStatus);

    // Check if full day is done
    if (newStatus.input && newStatus.output && newStatus.synthesis) {
       if (!user.completedDays.includes(currentTask.id)) {
         
         // Gamification Logic
         const newStreak = calculateStreak(user.lastActiveDate, user.currentStreak);
         
         // Confetti Effect
         confetti({
           particleCount: 150,
           spread: 80,
           origin: { y: 0.6 },
           colors: ['#6366f1', '#10b981', '#f59e0b']
         });

         setUser(prev => ({
           ...prev,
           completedDays: [...prev.completedDays, currentTask.id],
           currentStreak: newStreak,
           longestStreak: Math.max(newStreak, prev.longestStreak),
           lastActiveDate: new Date().toISOString(),
           currentDay: currentDayNumber // Save progress
         }));
       }
    }
  };

  const isDayComplete = taskStatus.input && taskStatus.output && taskStatus.synthesis;

  // Navigation Handlers
  const handleNextDay = () => {
    if (currentDayNumber < 200) setCurrentDayNumber(d => d + 1);
  };
  
  const handlePrevDay = () => {
    if (currentDayNumber > 1) setCurrentDayNumber(d => d - 1);
  };

  // If map is open, render map overlay
  if (showMap) {
      return (
        <CurriculumMap 
            user={user} 
            onClose={() => setShowMap(false)}
            onSelectDay={(day) => {
                setCurrentDayNumber(day);
                setShowMap(false);
            }}
        />
      );
  }

  // Calculate Progress Percentage
  const progressPercent = Math.min(100, Math.round((completedDaysForPath.length / 200) * 100));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xl tracking-tight">
                <Icon name="Layers" className="text-indigo-600" />
                <span>OpenPath</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 truncate max-w-[150px]">
                {user.name || 'Student'}
              </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Stats Widget */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full ${user.currentStreak > 0 ? 'bg-orange-100 ring-2 ring-orange-50' : 'bg-slate-100'}`}>
                       <Flame className={`${user.currentStreak > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-slate-400'}`} size={20} />
                    </div>
                    <div>
                        <div className="font-black text-slate-800 text-2xl leading-none">{user.currentStreak}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Day Streak</div>
                    </div>
                </div>
             </div>
             <Heatmap completedDays={user.completedDays} />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <button 
                type="button"
                onClick={() => setShowMap(false)}
                className="w-full text-left px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-bold flex items-center gap-3 border border-indigo-100 shadow-sm"
            >
                <Icon name="Activity" size={20} />
                Daily Trident
            </button>
            
            {/* Conditional Placement Link */}
            {(user.completedDays.length > 170 || currentDayNumber > 170) && (
                 <button type="button" className="w-full text-left px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-bold flex items-center gap-3 mt-2 border border-emerald-100 animate-pulse">
                    <Briefcase size={20} />
                    Placement Mode
                </button>
            )}

            <button 
                type="button"
                onClick={() => setShowMap(true)}
                className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium flex items-center gap-3 transition-colors"
            >
                <Map size={20} />
                Curriculum Map
            </button>
          </nav>
          
          {/* Day Navigation in Sidebar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Jump</div>
             <div className="grid grid-cols-5 gap-1.5">
                {[...Array(10)].map((_, i) => {
                    // Show a window of days around current
                    const d = Math.max(1, currentDayNumber - 4) + i;
                    if(d > 200) return null;
                    const pathSpecificId = `${user.selectedPathId}-day-${d}`;
                    const isDone = user.completedDays.includes(pathSpecificId);
                    const isCurr = d === currentDayNumber;
                    
                    // Simple lock check for sidebar
                    const isLockedBtn = d > completedDaysForPath.length + 1;

                    return (
                        <button 
                            key={d}
                            onClick={() => setCurrentDayNumber(d)}
                            disabled={isLockedBtn}
                            className={`
                                text-xs h-8 rounded-md flex items-center justify-center font-bold transition-all
                                ${isCurr ? 'bg-indigo-600 text-white shadow-md transform scale-105' : 
                                  isDone ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 
                                  'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'}
                                ${isLockedBtn && 'opacity-50 cursor-not-allowed'}
                            `}
                        >
                            {d}
                        </button>
                    )
                })}
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2">
            <button 
                type="button"
                onClick={onChangePath} 
                className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
                <RefreshCw size={16} /> Change Path
            </button>
            <button 
                type="button"
                onClick={onLogout} 
                className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
                <Icon name="LogOut" size={16} /> Log Out
            </button>

            {/* Sidebar Footer Credit */}
            <div className="pt-2 mt-2 border-t border-slate-50 text-center">
                 <a href="https://piyush07-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-300 hover:text-indigo-500 transition-colors inline-flex items-center gap-1 group">
                    Dev by <span className="font-semibold text-slate-400 group-hover:text-indigo-500">Mayank & Rushan</span>
                    <ExternalLink size={8} />
                </a>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Placement Mode Banner */}
        {currentTask.isPlacement && (
            <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs font-bold text-center tracking-widest uppercase flex items-center justify-center gap-2">
                <Briefcase size={12} /> Placement Readiness Mode Active
            </div>
        )}

        {/* Global Progress Bar */}
        <div className="bg-slate-200 h-1 w-full">
            <div className="bg-indigo-600 h-1 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Day {currentTask.dayNumber}: {currentTask.topic}
                        {isLocked && <Lock size={16} className="text-slate-400" />}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                            {currentTask.phase}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{progressPercent}% Path Complete</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setShowTutor(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
                >
                    <Icon name="Sparkles" size={18} />
                    <span className="hidden sm:inline">AI Tutor</span>
                </button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50">
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                
                {/* Day Navigation Bar */}
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                    <button 
                        onClick={handlePrevDay}
                        disabled={currentDayNumber === 1}
                        className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent font-medium text-sm transition-all"
                    >
                        <ArrowLeft size={16} /> Previous Day
                    </button>
                    
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                        Day {currentDayNumber} of 200
                    </span>

                    <button 
                        onClick={handleNextDay}
                        disabled={!isCompleted && currentDayNumber >= completedDaysForPath.length + 1}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:text-slate-500 font-bold text-sm transition-all"
                    >
                        Next Day <ArrowRight size={16} />
                    </button>
                </div>

                {isLocked ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-6 ring-1 ring-slate-100">
                            <Lock size={48} className="text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Day {currentDayNumber} is Locked</h2>
                        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                            Complete Day {currentDayNumber - 1} to unlock this content. 
                            <br/><span className="text-sm">OpenPath requires consistency. One step at a time.</span>
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Introduction / Context */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-3 relative z-10">Today's Mission</h2>
                            <p className="text-slate-600 leading-relaxed text-lg relative z-10 max-w-3xl">
                                {currentTask.input.description.split('.')[0]}. 
                                {currentTask.isPlacement 
                                    ? " This module is critical for your employability." 
                                    : " Focus on understanding the core concepts before building."}
                            </p>
                        </div>

                        {/* THE TRIDENT */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* 1. INPUT (Learn) */}
                            <div className={`flex flex-col relative overflow-hidden rounded-2xl border-2 transition-all duration-300 group ${taskStatus.input ? 'border-emerald-500/50 bg-emerald-50/20' : 'border-blue-100 bg-white hover:border-blue-300 hover:shadow-lg'}`}>
                                <div className="h-1.5 bg-blue-500 w-full"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                <Icon name="BookOpen" size={20} />
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800">Input</h3>
                                        </div>
                                        {taskStatus.input ? <CheckCircle2 className="text-emerald-500" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>}
                                    </div>
                                    <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">{currentTask.input.description}</p>
                                    <div className="space-y-3">
                                        {currentTask.input.resources.map((res, idx) => (
                                            <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl group/link transition-all">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide bg-blue-100 px-2 py-0.5 rounded-full">{res.type}</span>
                                                    <ExternalLink size={14} className="text-slate-400 group-hover/link:text-blue-500 transition-colors" />
                                                </div>
                                                <div className="font-bold text-slate-800 text-sm leading-tight mt-2">{res.title}</div>
                                            </a>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => handleComplete('input')}
                                        disabled={taskStatus.input}
                                        className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${taskStatus.input ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'}`}
                                    >
                                        {taskStatus.input ? 'Completed' : 'Mark as Learned'}
                                    </button>
                                </div>
                            </div>

                            {/* 2. OUTPUT (Build) */}
                            <div className={`flex flex-col relative overflow-hidden rounded-2xl border-2 transition-all duration-300 group ${taskStatus.output ? 'border-emerald-500/50 bg-emerald-50/20' : 'border-violet-100 bg-white hover:border-violet-300 hover:shadow-lg'}`}>
                                <div className="h-1.5 bg-violet-500 w-full"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
                                                <Icon name="Code" size={20} />
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800">Output</h3>
                                        </div>
                                        {taskStatus.output ? <CheckCircle2 className="text-emerald-500" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>}
                                    </div>
                                    <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">{currentTask.output.description}</p>
                                    
                                    <div className="bg-slate-900 rounded-xl p-4 mb-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                                        <div className="flex items-center gap-2 text-slate-400 mb-3 border-b border-slate-800 pb-2">
                                            <Icon name="Terminal" size={14} />
                                            <span className="font-semibold">requirements.txt</span>
                                        </div>
                                        <div className="text-violet-200 space-y-1">
                                            {currentTask.output.submissionType === 'code' ? <span className="text-slate-500">// Write code to:</span> : <span className="text-slate-500">// Action items:</span>}
                                            {currentTask.output.description.split('. ').map((s, i) => (
                                                <div key={i} className="pl-0 flex">
                                                   <span className="text-slate-600 mr-2 select-none">{i+1}.</span> 
                                                   <span>{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleComplete('output')}
                                        disabled={taskStatus.output}
                                        className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${taskStatus.output ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-200'}`}
                                    >
                                        {taskStatus.output ? 'Submitted' : 'Confirm Build'}
                                    </button>
                                </div>
                            </div>

                            {/* 3. SYNTHESIS (Reflect) */}
                            <div className={`flex flex-col relative overflow-hidden rounded-2xl border-2 transition-all duration-300 group ${taskStatus.synthesis ? 'border-emerald-500/50 bg-emerald-50/20' : 'border-purple-100 bg-white hover:border-purple-300 hover:shadow-lg'}`}>
                                <div className="h-1.5 bg-purple-500 w-full"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                                <Icon name="PenTool" size={20} />
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800">Synthesis</h3>
                                        </div>
                                        {taskStatus.synthesis ? <CheckCircle2 className="text-emerald-500" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>}
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
                                        <p className="text-sm text-purple-900 font-medium italic">"{currentTask.synthesis.question}"</p>
                                    </div>
                                    
                                    <div className="flex-1">
                                        {!taskStatus.synthesis ? (
                                            <textarea 
                                                className="w-full h-full min-h-[100px] p-4 text-sm border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-shadow placeholder:text-slate-300"
                                                placeholder="Type your reflection here to solidify the concept..."
                                            ></textarea>
                                        ) : (
                                            <div className="h-full p-6 bg-white border-2 border-dashed border-emerald-200 rounded-xl text-sm text-emerald-700 flex flex-col items-center justify-center text-center">
                                                <CheckCircle2 size={32} className="mb-2" />
                                                <span className="font-semibold">Reflection Captured</span>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => handleComplete('synthesis')}
                                        disabled={taskStatus.synthesis}
                                        className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${taskStatus.synthesis ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'}`}
                                    >
                                        {taskStatus.synthesis ? 'Reflected' : 'Submit Reflection'}
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Completion Banner */}
                        {isDayComplete && (
                            <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-xl text-center animate-in zoom-in duration-300 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-black mb-2 tracking-tight">Day {currentDayNumber} Crushed! 🚀</h2>
                                    <p className="mb-6 text-emerald-50 font-medium text-lg">You are consistently building your future. Keep this momentum.</p>
                                    <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-md border border-white/30 hover:bg-white/30 transition-colors cursor-default">
                                        <Flame className="text-orange-300 fill-orange-300 animate-pulse" />
                                        <span className="font-bold tracking-wide">{user.currentStreak} DAY STREAK ACTIVE</span>
                                    </div>
                                </div>
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
      </main>

      {/* AI Tutor Modal */}
      <AITutor 
        isOpen={showTutor} 
        onClose={() => setShowTutor(false)} 
        topic={currentTask.topic}
        phaseContext={currentTask.phase}
      />
    </div>
  );
};