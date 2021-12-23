import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TemplateCard } from 'website/components/TemplateCard';
import { useTemplateData } from '../services/useTemplateData';

export interface SeriesProps {
  className?: string;
}

function Component({ className }: SeriesProps) {
  const { data } = useTemplateData();

  const { seriesId } = useParams<'seriesId'>();

  const series = useMemo(() => {
    return data?.serise.find(({ id }) => seriesId === id);
  }, [data?.serise, seriesId]);

  if (!data || !series) {
    return <div className={className}>In progress...</div>;
  }

  return (
    <div className={className}>
      <header>
        <h1>{series.title}</h1>
      </header>

      <ul className="templates">
        {data.templates
          .filter(({ id }) => series.templates.includes(id))
          .map((template) => (
            <TemplateCard key={'template:' + template.id} template={template} />
          ))}
      </ul>
    </div>
  );
}

const StyledComponent = styled(Component)`
  header {
    margin-top: 36px;

    color: var(--color-text);

    h1 {
      font-size: 36px;
      font-weight: 500;
    }

    margin-bottom: 24px;
  }

  .templates {
    list-style: none;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  @media (max-width: 1180px) {
    .templates {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 930px) {
    .templates {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    header {
      margin-top: 28px;
      padding: 0 20px;

      h1 {
        font-size: 24px;
      }
    }

    .templates {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;

export const Series = fixHMR(StyledComponent);
