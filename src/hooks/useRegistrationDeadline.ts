import { useEffect, useState } from 'react';
import { registrationDeadlinePassed } from '../data/events';

type RegistrationDeadline = { registrationClosesAt: string };
const MAX_TIMEOUT_MS = 2_147_483_647;

/** Recheck on return to the page and close the entry at its explicit deadline. */
export function useRegistrationDeadline(activity: RegistrationDeadline): boolean {
  const deadline = activity.registrationClosesAt;
  const [closed, setClosed] = useState(() => registrationDeadlinePassed(activity));

  useEffect(() => {
    let timer: number | undefined;

    const refresh = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;

      const deadlineTime = Date.parse(deadline);
      const now = new Date();
      const isClosed = !Number.isFinite(deadlineTime)
        || registrationDeadlinePassed({ registrationClosesAt: deadline }, now);
      setClosed(isClosed);

      if (!isClosed) {
        timer = window.setTimeout(
          refresh,
          Math.min(Math.max(deadlineTime - now.getTime(), 1), MAX_TIMEOUT_MS),
        );
      }
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };

    refresh();
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [deadline]);

  return closed;
}
