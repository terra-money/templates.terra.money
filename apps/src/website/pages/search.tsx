import { useQueryBoundInput } from '@libs/use-query-bound-input';
import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { searchTemplateData, TemplatesJson } from 'terra-templates';
import { SeriesCard } from '../components/SeriesCard';
import { TemplateCard } from '../components/TemplateCard';
import { useTemplateData } from '../services/useTemplateData';

export interface SearchProps {
  className?: string;
}

function Component({ className }: SearchProps) {
  const { data } = useTemplateData();

  const { value } = useQueryBoundInput({ queryParam: 'search' });

  const { templates, serise } = useMemo<TemplatesJson>(() => {
    if (!data) {
      return {
        templates: [],
        serise: [],
      };
    } else if (!value || value.trim().length === 0) {
      return data;
    }

    return searchTemplateData(data, value);
  }, [data, value]);

  return (
    <div className={className}>
      <h1>Templates</h1>

      <ul className="templates" style={{ marginBottom: 60 }}>
        {templates.map((template) => (
          <TemplateCard key={'template:' + template.id} template={template} />
        ))}
      </ul>

      <h1>Series</h1>

      <ul className="series">
        {serise.map((item) => (
          <SeriesCard
            key={'series:' + item.id}
            series={item}
            templates={templates}
          />
        ))}
      </ul>
    </div>
  );
}

const StyledComponent = styled(Component)`
  h1 {
    font-size: var(--h1);
    font-weight: 500;
    line-height: 54px;

    color: #2043b5;

    margin: 36px 0 42px 0;
  }

  .templates,
  .series {
    list-style: none;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  @media (max-width: 1180px) {
    .templates,
    .series {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 930px) {
    .templates,
    .series {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: var(--h2);

      margin: 28px 20px 16px 20px;
    }

    .templates,
    .series {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;

export const Search = fixHMR(StyledComponent);
