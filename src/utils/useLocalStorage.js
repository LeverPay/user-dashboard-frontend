import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue !== null) {
      try {
      
        return JSON.parse(localStorageValue);
      } catch (e) {
        console.error(`Error parsing JSON for key "${key}":`, e);
        localStorage.removeItem(key); // Remove corrupted data
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key); // Remove item if value is undefined
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

function detectNetwork(phoneNumber) {
  if (
    phoneNumber.startsWith("0803") ||
    phoneNumber.startsWith("0806") ||
    phoneNumber.startsWith("0813") ||
    phoneNumber.startsWith("0814") ||
    phoneNumber.startsWith("0816") ||
    phoneNumber.startsWith("0903") ||
    phoneNumber.startsWith("0906") ||
    phoneNumber.startsWith("0703") ||
    phoneNumber.startsWith("0706")
  ) {
    return { name: "MTN", biller_id: 348 };
  } else if (
    phoneNumber.startsWith("0802") ||
    phoneNumber.startsWith("0808") ||
    phoneNumber.startsWith("0812") ||
    phoneNumber.startsWith("0902") ||
    phoneNumber.startsWith("0701") ||
    phoneNumber.startsWith("0708")
  ) {
    return { name: "Airtel", biller_id: 2774 };
  } else if (
    phoneNumber.startsWith("0805") ||
    phoneNumber.startsWith("0807") ||
    phoneNumber.startsWith("0815") ||
    phoneNumber.startsWith("0905") ||
    phoneNumber.startsWith("0705")
  ) {
    return { name: "Glo", biller_id: 3070 };
  } else if (
    phoneNumber.startsWith("0809") ||
    phoneNumber.startsWith("0817") ||
    phoneNumber.startsWith("0818") ||
    phoneNumber.startsWith("0909") ||
    phoneNumber.startsWith("0908")
  ) {
    return { name: "9mobile", biller_id: 205 };
  } else {
    return null;
  }
}

export { useLocalState, detectNetwork };
