import { Dispatch, SetStateAction, useState } from 'react';
import useDebounce from './use-debounce.hook';

type IUseDebouncedState<S> = [S, Dispatch<SetStateAction<S>>, S];

export default function useDebouncedState<S>(
  initialState: S | (() => S),
  delay: number
): IUseDebouncedState<S> {
  const [debouncedState, setDebouncedState] = useState(initialState);
  const [state, setState] = useState(initialState);
  const { debounceFunc } = useDebounce(delay);

  return [
    state,
    (newState: SetStateAction<S>) => {
      setState(newState);
      debounceFunc(() => {
        setDebouncedState(newState);
      });
    },
    debouncedState,
  ];
}
