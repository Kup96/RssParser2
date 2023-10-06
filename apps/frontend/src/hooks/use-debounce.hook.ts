import { MutableRefObject, useCallback, useRef } from 'react';
// eslint-disable-next-line
// @ts-ignore
import { debounce, DebouncedFunc } from 'lodash';

interface IUseDebounce {
  debounceFunc(func: { (): Promise<void> | void }): Promise<void>;
  cancelFunc(): void;
}

export default function useDebounce(delay = 0): IUseDebounce {
  const debouncer: MutableRefObject<
    DebouncedFunc<() => Promise<void>> | undefined
  > = useRef(undefined);

  const cancelFunc = useCallback((): void => {
    if (debouncer.current) debouncer.current?.cancel();
  }, [debouncer]);

  const execDebounceFunc = useCallback(
    (func: { (): Promise<void> }) =>
      debounce(async () => {
        await func();
      }, delay),
    [delay]
  );

  const debounceFunc = useCallback(
    async (func: { (): Promise<void> }): Promise<void> => {
      cancelFunc();

      debouncer.current = execDebounceFunc(func);
      debouncer.current();
    },
    [cancelFunc, execDebounceFunc]
  );

  return { debounceFunc, cancelFunc };
}
