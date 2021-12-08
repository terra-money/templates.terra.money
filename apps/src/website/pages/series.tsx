import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTemplateData } from '../services/useTemplateData';

export interface SeriesProps {
  className?: string;
}

function Component({ className }: SeriesProps) {
  const { data } = useTemplateData();

  const { seriesTitle } = useParams<'seriesTitle'>();

  const series = useMemo(() => {
    return data?.serise.find(({ title }) => seriesTitle === title);
  }, [data?.serise, seriesTitle]);

  if (!data || !series) {
    return <div className={className}>In progress...</div>;
  }

  return (
    <div className={className}>
      <h1>{series.title}</h1>
      <ul>
        {data.templates
          .filter(({ id }) => series.templates.includes(id))
          .map(({ id, title }) => (
            <li key={'template-' + id}>
              <Link to={`/template/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

const StyledComponent = styled(Component)`
  // TODO
`;

export const Series = fixHMR(StyledComponent);
