"use client";

import { useState, useEffect } from "react";
import { intervalToDuration, formatDuration } from "date-fns";

type CountdownTimerProps = {
  endDate: Date;
  prefix?: string;
  className?: string;
};

export default function CountdownTimer({ endDate, prefix, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (now > endDate) {
        setTimeLeft(null);
        return;
      }
      const duration = intervalToDuration({ start: now, end: endDate });
      setTimeLeft(duration);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return <span className={className}>Finished</span>;
  }

  return (
    <span className={className}>
      {prefix}
      {formatDuration(timeLeft, {
        format: ["days", "hours", "minutes", "seconds"],
        zero: false,
        delimiter: ', '
      }).split(',').slice(0, 2).join(', ')}
    </span>
  );
}
