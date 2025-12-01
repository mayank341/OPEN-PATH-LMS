export enum PathCategory {
  Development = "Development",
  Data = "Data & AI",
  Infrastructure = "Infrastructure",
  Design = "Design & Product",
  Specialized = "Specialized"
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: PathCategory;
  icon: string;
  image: string; // URL for the card image
  totalDays: number;
  phases: {
    name: string;
    days: string; // e.g., "1-40"
    description: string;
  }[];
}

export interface DayResource {
  type: 'video' | 'article' | 'doc' | 'tool';
  title: string;
  url: string;
  duration?: string; // e.g. "15 min read"
}

export interface DayTask {
  id: string; // now scoped like "p1-day-1"
  pathId: string;
  dayNumber: number;
  topic: string;
  phase: string;
  isPlacement?: boolean; // Triggers Placement Mode UI
  
  // The Trident
  input: {
    description: string;
    resources: DayResource[];
  };
  output: {
    description: string; // The build task
    submissionType: 'link' | 'code' | 'text' | 'file';
  };
  synthesis: {
    question: string; // Reflection question
    answerType: 'multiple-choice' | 'text';
  };
}

export interface UserProgress {
  // Auth fields
  email: string;
  name: string;
  isAuthenticated: boolean;

  // Progress fields
  selectedPathId: string | null;
  completedDays: string[]; // Array of task IDs (e.g. "p1-day-1")
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date string
  startDate: string;
  currentDay: number; // Track which day the user is viewing
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}