import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue !== null) {
      try {
        return JSON.parse(localStorageValue);
      } catch (e) {
        console.error(`Error parsing JSON for key "${key}":`, e);
        localStorage.removeItem(key);
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };




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


