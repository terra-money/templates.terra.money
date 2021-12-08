import { createQueryFn } from '@libs/react-query-utils';
import { useQuery } from 'react-query';
import { getTemplateData } from 'terra-templates';

const queryFn = createQueryFn(getTemplateData);

export function useTemplateData() {
  return useQuery(['template-data'], queryFn, {
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });
}
