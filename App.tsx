import React, { useState, useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { PathSelection } from './pages/PathSelection';
import { Auth } from './pages/Auth';
import { UserProgress } from './types';

// Initial state mock
const DEFAULT_USER: UserProgress = {
  name: '',
  email: '',
  isAuthenticated: false,
  selectedPathId: null,
  completedDays: [], 
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  startDate: new Date().toISOString(),
  currentDay: 1
};

function App() {
  const [user, setUser] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('openpath_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('openpath_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (name: string, email: string) => {
    setUser(prev => ({
        ...prev,
        isAuthenticated: true,
        name,
        email
    }));
  };

  const handleSelectPath = (pathId: string) => {
    setUser(prev => ({ 
        ...prev, 
        selectedPathId: pathId,
        startDate: new Date().toISOString(),
        lastActiveDate: new Date().toISOString(),
        // Reset current day view to 1 for the new path
        currentDay: 1
    }));
  };

  const handleChangePath = () => {
      const confirmChange = window.confirm(
          "Are you sure you want to change your learning path? Your progress on the current path will be saved, but your streak might be affected if you don't complete a task today."
      );

      if (confirmChange) {
          setUser(prev => ({
              ...prev,
              selectedPathId: null
          }));
      }
  };

  const handleLogout = () => {
      // Clear sensitive info but maybe keep progress? 
      // For this demo, we reset auth state but keep data "in db" (localStorage) 
      // effectively simulating a logout.
      
      setUser(prev => ({ 
          ...prev, 
          isAuthenticated: false 
      }));
  };

  // Routing Logic
  
  // 1. Not Authenticated -> Auth Page
  if (!user.isAuthenticated) {
      return <Auth onLogin={handleLogin} />;
  }

  // 2. Authenticated but No Path Selected -> Path Selection
  if (!user.selectedPathId) {
    return <PathSelection onSelectPath={handleSelectPath} />;
  }

  // 3. Authenticated & Path Selected -> Dashboard
  return (
    <Dashboard 
        user={user} 
        setUser={setUser} 
        onLogout={handleLogout}
        onChangePath={handleChangePath}
    />
  );
}

export default App;