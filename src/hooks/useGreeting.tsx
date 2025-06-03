import { useState, useEffect } from 'react';

function useGreeting(timeZone = null) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Determine time zone: use the dynamic timeZone if provided, otherwise use the browser's time zone
    const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const updateGreeting = () => {
      const date = new Date();
      const timeInTimeZone = new Date(date.toLocaleString('en-US', { timeZone: zone }));
      const hours = timeInTimeZone.getHours();
      if (hours >= 6 && hours < 12) {
        setGreeting('Good Morning');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Good Afternoon');
      } else if (hours >= 18 && hours < 20) {
        setGreeting('Good Evening');
      } else {
        setGreeting('Good Night');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [timeZone]); // Dependency on timeZone to update when the time zone changes

  return greeting;
}

export default useGreeting;
