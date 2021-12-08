import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface QueryBoundInputProps {
  queryParam: string;
}

interface QueryBoundInputReturn {
  value: string | null;
  updateValue: (nextValue: string | null) => void;
}

export function useQueryBoundInput({
  queryParam,
}: QueryBoundInputProps): QueryBoundInputReturn {
  const location = useLocation();

  const [value, setValue] = useState<string | null>(() => {
    const params = new URLSearchParams(globalThis.location.search);

    if (params.has(queryParam)) {
      return params.get(queryParam);
    }

    return null;
  });

  useEffect(() => {
    setValue(() => {
      const params = new URLSearchParams(location.search);

      if (params.has(queryParam)) {
        return params.get(queryParam);
      }

      return null;
    });
  }, [location, queryParam]);

  const updateValue = useCallback(
    (nextValue: string | null) => {
      setValue(nextValue);

      const params = new URLSearchParams(globalThis.location.search);

      if (nextValue) {
        params.set(queryParam, nextValue);
      } else {
        if (params.has(queryParam)) {
          params.delete(queryParam);
        }
      }

      globalThis.history.pushState(
        '',
        '',
        globalThis.location.pathname + '?' + params.toString(),
      );
    },
    [queryParam],
  );

  return {
    value,
    updateValue,
  };
}
