import React, { useState, useEffect } from 'react';
import { Bell, Syringe, MessageCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'breastfeeding' | 'vaccination' | 'general';
  message: string;
  time: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Demo notifications
    const interval = setInterval(() => {
      const demoNotifications = [
        {
          id: Date.now().toString(),
          type: 'breastfeeding',
          message: 'Time to feed your baby',
          time: new Date().toLocaleTimeString(),
        },
      ];
      setNotifications(prev => [...prev, ...demoNotifications]);
    }, 30000); // Demo: New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'breastfeeding':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'vaccination':
        return <Syringe className="w-5 h-5 text-green-500" />;
      case 'general':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="flex items-center p-3 bg-gray-50 rounded-md"
          >
            {getIcon(notification.type)}
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}