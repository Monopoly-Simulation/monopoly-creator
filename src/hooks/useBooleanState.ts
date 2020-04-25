import { useState } from 'react';

export default function useBooleanState(initial: boolean): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggleValue = () => {
    setValue(value => !value);
  }
  return [value, toggleValue];
}
