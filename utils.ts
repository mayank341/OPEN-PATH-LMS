// Utility logic for Streak Calculation and Date Management

export const calculateStreak = (lastActiveDate: string | null, currentStreak: number): number => {
  if (!lastActiveDate) return 1;
  
  const last = new Date(lastActiveDate);
  const now = new Date();
  
  // Reset hours to compare dates only (local time)
  last.setHours(0,0,0,0);
  now.setHours(0,0,0,0);
  
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 0) return currentStreak; // Already active today, maintain streak
  if (diffDays === 1) return currentStreak + 1; // Active yesterday, increment streak
  return 1; // Missed a day (or more), reset to 1
};

export const isSameDay = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.toDateString() === date2.toDateString();
};

export const getDayId = (dayNumber: number) => `day-${dayNumber}`;

export const getPlacementMode = (dayNumber: number) => dayNumber > 180;