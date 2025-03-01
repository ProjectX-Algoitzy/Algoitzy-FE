import React, { useState, useEffect, useContext } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value])
  return debouncedValue
}