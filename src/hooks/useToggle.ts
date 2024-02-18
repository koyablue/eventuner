import { useState, useCallback } from "react";

export const useToggle = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const set = useCallback((newState: boolean) => {
    setState(newState);
  }, []);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return { state, set, toggle };
};
