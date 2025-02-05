import React, { useState } from 'react';
import { Home, Calendar, Bell, MessageSquare } from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Appointments from './components/Appointments';
import QAForum from './components/QAForum';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(() => {
    const userData = localStorage.getItem('userData');
    return !!userData;
  });
  const [activeTab, setActiveTab] = useState<'home' | 'appointments' | 'notifications' | 'qa'>('home');

  if (!isOnboarded) {
    return <Onboarding onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto pb-16">
        {/* Main Content */}
        <div className="p-4">
          {activeTab === 'home' && <Dashboard />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'appointments' && <Appointments />}
          {activeTab === 'qa' && <QAForum />}
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-full ${
                activeTab === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Home className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`p-2 rounded-full ${
                activeTab === 'appointments' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`p-2 rounded-full ${
                activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`p-2 rounded-full ${
                activeTab === 'qa' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App