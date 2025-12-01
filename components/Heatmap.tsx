import React from 'react';

// Generates a mock GitHub-style contribution graph
export const Heatmap: React.FC<{ completedDays: string[] }> = ({ completedDays }) => {
  // Generate 12 weeks of data roughly
  const weeks = 12;
  const daysPerWeek = 7;
  
  // Mock logic to show some pattern based on "completedDays" length
  // In a real app, this would map specific dates to cells
  const grid = Array.from({ length: weeks * daysPerWeek }).map((_, i) => {
    // Randomize slightly for "lived-in" feel if empty, or map real data
    const isCompleted = completedDays.length > i; 
    return isCompleted;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>Recent Activity</span>
        <span>Last 3 Months</span>
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-1 w-full h-24">
        {grid.map((active, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-sm ${
              active ? 'bg-emerald-500' : 'bg-slate-200'
            }`}
            title={active ? `Task Completed` : 'No activity'}
          />
        ))}
      </div>
    </div>
  );
};