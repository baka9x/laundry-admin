'use client';

import { getGreeting } from '@/lib/greeting';
import { useEffect, useState } from 'react';

interface GreetingTextProps {
  initialGreeting: { greetingText: string; greetingClass: string };
}

const GreetingText: React.FC<GreetingTextProps> = ({ initialGreeting }) => {
  const [greeting, setGreeting] = useState(initialGreeting);

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`font-bold ${greeting.greetingClass}`}>{greeting.greetingText}</span>
  );
};

export default GreetingText;