import { useQueryBoundInput } from '@libs/use-query-bound-input';
import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { searchTemplateData, TemplatesJson } from 'terra-templates';
import { TemplateCard } from 'website/components/TemplateCard';
import { useTemplateData } from '../services/useTemplateData';

export interface SearchProps {
  className?: string;
}

function Component({ className }: SearchProps) {
  const { data } = useTemplateData();

  const { value, updateValue } = useQueryBoundInput({ queryParam: 'search' });

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
      <input
        type="text"
        value={value ?? ''}
        onChange={({ target }) => updateValue(target.value)}
      />

      <h2 style={{ marginTop: 20 }}>Templates</h2>

      <ul className="templates">
        {templates.map((template) => (
          <TemplateCard template={template} />
        ))}
      </ul>

      <h2 style={{ marginTop: 20 }}>Series</h2>

      <ul>
        {serise.map(({ id, title }) => (
          <li key={'series:' + id}>
            <h3>
              <Link to={`/series/${id}`}>{title}</Link>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

const StyledComponent = styled(Component)`
  padding: 20px;

  input {
    width: 100%;
    font-size: 15px;
    padding: 10px;
  }

  .templates {
    list-style: none;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
`;

export const Search = fixHMR(StyledComponent);
