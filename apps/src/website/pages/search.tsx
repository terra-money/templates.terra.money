import { useQueryBoundInput } from '@libs/use-query-bound-input';
import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { searchTemplateData, TemplatesJson } from 'terra-templates';
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

      <h2>Templates</h2>

      <ul>
        {templates.map(({ id, title, github, categories }) => (
          <li key={id}>
            <h3>
              <Link to={`/template/${id}`}>{title}</Link>
            </h3>
          </li>
        ))}
      </ul>

      <h2>Series</h2>

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
  // TODO
`;

export const Search = fixHMR(StyledComponent);
