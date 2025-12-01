import React from 'react';
import { CAREER_PATHS } from '../constants';
import { PathCategory } from '../types';
import { Icon } from '../components/Icon';
import { ArrowRight, CheckCircle2, FileText, GraduationCap, ExternalLink } from 'lucide-react';

interface PathSelectionProps {
  onSelectPath: (pathId: string) => void;
}

export const PathSelection: React.FC<PathSelectionProps> = ({ onSelectPath }) => {
  const [filter, setFilter] = React.useState<PathCategory | 'All'>('All');

  const filteredPaths = filter === 'All' 
    ? CAREER_PATHS 
    : CAREER_PATHS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-32 px-6 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                OpenPath Beta 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Choose Your Future.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Select one of 15 industry-aligned career paths. We provide the roadmap, resources, and daily discipline. You provide the effort.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-300">
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle2 className="text-emerald-400" size={18} /> 200 Days to Pro</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle2 className="text-emerald-400" size={18} /> 100% Free Resources</span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle2 className="text-emerald-400" size={18} /> Portfolio Ready</span>
            </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-slate-200 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex overflow-x-auto gap-2 no-scrollbar pb-1 md:pb-0 items-center justify-center">
            {['All', ...Object.values(PathCategory)].map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                        filter === cat 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Paths Grid */}
      <div className="max-w-7xl mx-auto -mt-20 relative z-10 px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaths.map(path => (
                <div key={path.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    
                    {/* Card Image Header */}
                    <div className="h-40 bg-slate-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                        <img src={path.image} alt={path.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm text-indigo-600">
                             <Icon name={path.icon} size={24} />
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className="text-xs font-bold text-white bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                                {path.totalDays} Days
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{path.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3 leading-relaxed">{path.description}</p>
                        
                        <div className="space-y-4 mb-6">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Roadmap Snapshot</div>
                            {path.phases.slice(0, 2).map((phase, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all"></div>
                                    <div>
                                        <span className="block font-semibold text-slate-700">{phase.name}</span>
                                        <span className="text-xs text-slate-400">Days {phase.days}</span>
                                    </div>
                                </div>
                            ))}
                             {path.phases.length > 2 && (
                                 <div className="text-xs text-indigo-500 pl-5 font-medium">+ {path.phases.length - 2} more phases</div>
                             )}
                        </div>

                        <button 
                            onClick={() => onSelectPath(path.id)}
                            className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-indigo-600 transition-all shadow-lg group-hover:shadow-indigo-200"
                        >
                            Start Path <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Essential Tools Section */}
      <div className="bg-slate-100 py-20 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Student Toolkit</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Essential tools to manage your academic life and professional presentation while you master your craft.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Resume Builder */}
                <a href="https://resume07-gules.vercel.app/" target="_blank" rel="noopener noreferrer" className="group bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText size={120} className="text-indigo-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">AI Resume Builder</h3>
                        <p className="text-slate-500 mb-6">Create ATS-optimized professional resumes in minutes. Don't let a bad format reject your hard work.</p>
                        <span className="text-indigo-600 font-bold flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                            Build My Resume <ArrowRight size={16} />
                        </span>
                    </div>
                </a>

                {/* Academic Manager */}
                <a href="https://academia07.vercel.app/#/" target="_blank" rel="noopener noreferrer" className="group bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={120} className="text-emerald-600" />
                    </div>
                    <div className="relative z-10">
                         <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Academic Manager</h3>
                        <p className="text-slate-500 mb-6">Keep track of your college grades, attendance, and assignments in one dashboard.</p>
                        <span className="text-emerald-600 font-bold flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                            Manage Academics <ArrowRight size={16} />
                        </span>
                    </div>
                </a>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
                 <Icon name="Layers" size={24} className="text-indigo-500" />
                 <span>OpenPath</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
                 <a href="https://piyush07-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group">
                    Developed by <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">Mayank & Rushan</span>
                    <ExternalLink size={12} />
                 </a>
                 <span className="hidden md:inline text-slate-700">|</span>
                 <span>© 2025 OpenPath Foundation</span>
            </div>
        </div>
      </footer>
    </div>
  );
};