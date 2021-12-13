import { useQueryBoundInput } from '@libs/use-query-bound-input';
import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import { MdOutlineSearch } from 'react-icons/all';
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
      <div className="search">
        <MdOutlineSearch />
        <input
          type="text"
          value={value ?? ''}
          onChange={({ target }) => updateValue(target.value)}
        />
      </div>

      <h2>Templates</h2>

      <ul className="templates">
        {templates.map((template) => (
          <TemplateCard key={'template:' + template.id} template={template} />
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
  padding: var(--layout-padding);

  .search {
    display: flex;
    align-items: center;

    background-color: #ffffff;
    border: 1px solid #e7ebf6;

    height: 45px;
    padding: 0 14px;
    border-radius: 5px;

    svg {
      font-size: 24px;
    }

    input {
      border: 0;
      outline: none;

      font-size: 18px;
      font-weight: 500;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 500;

    color: #2043b5;

    margin: 40px 0 20px 0;
  }

  input {
    width: 100%;
    font-size: 15px;
    padding: 10px;
  }

  .templates {
    list-style: none;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  @media (max-width: 1600px) {
    .templates {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 1300px) {
    .templates {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 1000px) {
    .templates {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 750px) {
    .templates {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .templates {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export const Search = fixHMR(StyledComponent);
