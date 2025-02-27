// This is a simplified service for fetching prayer times
// In a real app, you'd fetch from an API or calculate them
import { useState, useEffect } from 'react';

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

// Mock data based on the provided HTML
const mockData: DayPrayers[] = [
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

// Helper function to get next prayer and countdown
const getNextPrayer = (prayers: PrayerTime[]): {
  name: string;
  countdown: string;
} => {
  // In a real app, you would:
  // 1. Get current time
  // 2. Find the next prayer time
  // 3. Calculate the time difference
  
  // For this example, we'll just return hardcoded data
  return {
    name: 'Maghrib',
    countdown: '-00:05:23'
  };
};

// Custom hook for prayer times
export const usePrayerTimes = () => {
  const [prayerData, setPrayerData] = useState<DayPrayers[]>(mockData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayerInfo, setNextPrayerInfo] = useState({
    name: 'Maghrib',
    countdown: '-00:05:23'
  });

  // Simulate API call
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      try {
        // Here you would fetch real data
        setPrayerData(mockData);
        setNextPrayerInfo(getNextPrayer(mockData[0].times));
        setIsLoading(false);
      } catch (e) {
        setError('Failed to load prayer times');
        setIsLoading(false);
      }
    }, 500);
  }, []);

  return {
    prayerData,
    isLoading,
    error,
    nextPrayerInfo
  };
};
