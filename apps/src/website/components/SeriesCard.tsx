import { fixHMR } from 'fix-hmr';
import React, { DetailedHTMLProps, LiHTMLAttributes, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TemplatesJson } from 'terra-templates';
import { TemplateSymbols } from 'website/components/TemplateSymbols';

export interface SeriesCardProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  templates: TemplatesJson['templates'];
  series: TemplatesJson['serise'][number];
}

function Component({ templates, series, ...liProps }: SeriesCardProps) {
  const includeTemplates = useMemo(() => {
    const includes = new Set(series.templates);
    return templates.filter(({ id }) => includes.has(id)).slice(0, 6);
  }, [series.templates, templates]);

  return (
    <li {...liProps}>
      <Link to={`/series/${series.id}`}>
        <ul className="sereis-templates">
          {includeTemplates.map(({ id, title, symbols }) => (
            <li key={'template' + id}>
              <h4>{title}</h4>
              <TemplateSymbols
                className="symbols"
                symbols={symbols}
                size={14}
                gap={2}
              />
            </li>
          ))}
        </ul>

        <h3>{series.title}</h3>
      </Link>
    </li>
  );
}

const StyledComponent = styled(Component)`
  --radius: 8px;

  background-color: #ffffff;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius);

  a {
    min-width: 0;
    min-height: 261px;

    color: var(--color-text);

    text-decoration: none;
  }

  h3 {
    height: 80px;
    padding: 0 28px;

    font-size: var(--h3);
    font-weight: 500;
    line-height: 1.5;

    display: flex;
    align-items: center;
  }

  .sereis-templates {
    list-style: none;
    padding: 28px;

    min-width: 0;

    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);

    background-color: var(--color-card-border);

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 55px);
    grid-column-gap: 8px;
    grid-row-gap: 8px;

    > li {
      padding: 5px;

      min-width: 0;
      border-radius: 5px;

      background-color: #ffffff;

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h4 {
        font-size: 5px;
        color: var(--color-card-border);
      }

      > .symbols {
        align-self: flex-end;
        filter: blur(0.5px);
        opacity: 0.8;
      }
    }
  }

  @media (max-width: 600px) {
    --radius: 0;

    a {
      border-left: 0;
      border-right: 0;
    }

    h3 {
      padding: 0 20px;
    }

    .sereis-templates {
      padding: 20px;
    }
  }
`;

export const SeriesCard = fixHMR(StyledComponent);
