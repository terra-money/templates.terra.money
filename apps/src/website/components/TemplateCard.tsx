import { fixHMR } from 'fix-hmr';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TemplatesJson } from 'terra-templates';
import { TemplateImages } from 'website/components/TemplateImages';

export interface TemplateCardProps {
  className?: string;
  template: TemplatesJson['templates'][number];
}

function Component({ className, template }: TemplateCardProps) {
  return (
    <li className={className}>
      <TemplateImages
        className="template-card-images"
        images={template.images}
      />

      <footer>
        <h3>
          <Link to={`/template/${template.id}`}>{template.title}</Link>
        </h3>

        {template.tags && (
          <ul>
            {template.tags.map((tag) => (
              <li key={'tag:' + tag}>
                <button>{tag}</button>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </li>
  );
}

const StyledComponent = styled(Component)`
  min-width: 0;

  --radius: 5px;

  background-color: #ffffff;
  border: 1px solid #e7ebf6;
  border-radius: var(--radius);

  .template-card-images {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }

  footer {
    height: 80px;

    h3 {
      max-width: 100%;

      font-size: 13px;

      a {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        text-decoration: none;
        font-weight: 500;
      }

      margin-bottom: 12px;
    }

    ul {
      list-style: none;
      padding: 0;

      display: flex;
      gap: 5px;

      button {
        outline: none;
        background-color: transparent;
        border: 1px solid #e7ebf6;

        font-size: 12px;
        padding: 7px 10px;
        border-radius: 4px;
      }
    }

    padding: 15px;
  }
`;

export const TemplateCard = fixHMR(StyledComponent);
