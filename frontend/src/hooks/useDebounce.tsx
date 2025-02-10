import { useEffect, useRef } from "react";

const useDebounce = (cb, timeout) => {
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return function (...args) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      cb(...args);
    }, timeout);
  };
};

export default useDebounce;
