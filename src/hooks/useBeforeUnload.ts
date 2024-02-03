import { useEffect } from 'react';

/**
 * Custom hook to set beforeunload event
 * Display confirmation dialogue before the user leaves the page
 *
 */
export const useBeforeUnload = () => {
  useEffect(() => {
    // Display the confirmation dialogue when the user leaves the page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // To show a confirmation dialogue
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
