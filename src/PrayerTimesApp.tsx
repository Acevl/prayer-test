import React, { useState, useEffect } from 'react';
import './styles.css';

interface PrayerTime {
  name: string;
  time: string;
  isActive?: boolean;
}

interface DayPrayers {
  date: string;
  hijriDate: string;
  times: PrayerTime[];
}

const PrayerTimesApp: React.FC = () => {
  const [countdown, setCountdown] = useState<string>('-00:05:23');
  const [activeTab, setActiveTab] = useState<'prayers' | 'info'>('prayers');
  
  // Sample data based on the provided HTML
  const prayerData: DayPrayers[] = [
    {
      date: 'Sunday, 5 January 2025',
      hijriDate: '28 Rabi\'ul Awal, 1445 H',
      times: [
        { name: 'Fajr', time: '6:36' },
        { name: 'Zuhr', time: '12:15' },
        { name: 'Asr', time: '14:30', isActive: true },
        { name: 'Maghrib', time: '16:18', isActive: true },
        { name: 'Esha', time: '17:38' }
      ]
    },
    {
      date: 'Monday, 6 January 2025',
      hijriDate: '26 Rabi\'ul Awal, 1445 H',
      times: [
        { name: 'Fajr', time: '6:36' },
        { name: 'Zuhr', time: '12:15' },
        { name: 'Asr', time: '14:30' },
        { name: 'Maghrib', time: '16:18' },
        { name: 'Esha', time: '17:38' }
      ]
    }
  ];

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      // This is just a visual simulation - in a real app you'd calculate the actual time to next prayer
      const [hours, minutes, seconds] = countdown.substring(1).split(':').map(Number);
      let newSeconds = seconds - 1;
      let newMinutes = minutes;
      let newHours = hours;
      
      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }
      
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }
      
      setCountdown(`-${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(() => {
          console.log('ServiceWorker registration successful');
        }).catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
      });
    }
  }, []);
  
  return (
    <div className="pb-20">
      {/* Fixed Header with menu and countdown */}
      <div className="fixed-header bg-green-600 text-white p-6 w-full z-20">
        <button className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-medium">Maghrib will begin in</div>
          <div className="bg-yellow-400 text-black rounded-full px-3 py-1 font-medium">
            {countdown}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content pt-32">
        {/* Prayer times today card */}
        <div className="prayer-card bg-white mx-4 p-6 mb-6 relative z-10">
          <h2 className="text-green-600 text-center text-lg font-medium mb-4">PRAYER TIMES TODAY</h2>
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">{prayerData[0].date}</h3>
            <p className="text-gray-600">{prayerData[0].hijriDate}</p>
          </div>
          
          <div>
            {prayerData[0].times.map((prayer, index) => (
              <div 
                key={index} 
                className={`prayer-row flex justify-between ${prayer.isActive ? 'is-time' : ''}`}
              >
                <div className={`text-xl ${prayer.isActive ? 'text-green-600' : 'text-gray-700'} font-medium`}>
                  {prayer.name}
                </div>
                <div className={`text-xl ${prayer.isActive ? 'text-green-600' : ''}`}>
                  {prayer.time}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Future prayer times section */}
        <div className="mx-4 mb-6">
          <h2 className="text-green-600 text-center text-lg font-medium mb-4">FUTURE PRAYER TIMES</h2>
          
          <div className="prayer-card bg-white p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">{prayerData[1].date}</h3>
              <p className="text-gray-600">{prayerData[1].hijriDate}</p>
            </div>
            
            <div>
              {prayerData[1].times.map((prayer, index) => (
                <div key={index} className="prayer-row flex justify-between">
                  <div className="text-xl text-gray-700 font-medium">{prayer.name}</div>
                  <div className="text-xl">{prayer.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Future times button */}
        <div className="mx-4 mb-24">
          <button className="w-full bg-green-600 text-white font-medium py-4 rounded-lg text-lg">
            FUTURE TIMES
          </button>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-8 z-30">
        <div 
          className={`bottom-nav-item ${activeTab === 'prayers' ? 'active' : ''}`}
          onClick={() => setActiveTab('prayers')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
          </svg>
          <span className="mt-1 text-sm">Prayers</span>
        </div>
        
        <div 
          className={`bottom-nav-item ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v.01M12 8v4" />
          </svg>
          <span className="mt-1 text-sm">Info</span>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesApp;
