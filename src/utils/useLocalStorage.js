// import { useEffect, useState } from "react";

// function useLocalState(defaultValue, key) {
//   const [value, setValue] = useState(() => {
//     const localStorageValue = localStorage.getItem(key);

//     return localStorageValue !== null
//       ? JSON.parse(localStorageValue)
//       : defaultValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }

// export { useLocalState };
import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    // Try to parse the stored value. If parsing fails, return the default value.
    try {
      return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };
