import { fixHMR } from 'fix-hmr';
import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TemplatesJson } from 'terra-templates';
import { TemplateSymbols } from './TemplateSymbols';
import { TemplateTags } from './TemplateTags';

export interface TemplateCardProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  template: TemplatesJson['templates'][number];
}

function Component({ template, ...liProps }: TemplateCardProps) {
  return (
    <li {...liProps}>
      <Link to={`/template/${template.id}`}>
        <h3>{template.title}</h3>
        {template.tags && <TemplateTags tags={template.tags} />}
        <div className="spacer"> </div>
        <TemplateSymbols className="symbols" symbols={template.symbols} />
      </Link>
    </li>
  );
}

const StyledComponent = styled(Component)`
  a {
    min-width: 0;
    min-height: 261px;

    padding: 28px;

    background-color: #ffffff;
    border: 1px solid var(--color-card-border);
    border-radius: 8px;

    color: var(--color-text);

    text-decoration: none;

    display: flex;
    flex-direction: column;
  }

  h3 {
    font-size: var(--h3);
    font-weight: 500;
    line-height: 1.5;

    margin-bottom: 12px;
  }

  .spacer {
    flex: 1;
  }

  .symbols {
    align-self: flex-end;
  }

  @media (max-width: 600px) {
    a {
      border-left: 0;
      border-right: 0;
      border-radius: 0;

      min-height: 180px;

      padding: 20px;
    }
  }
`;

export const TemplateCard = fixHMR(StyledComponent);
