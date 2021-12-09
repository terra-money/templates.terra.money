import { fixHMR } from 'fix-hmr';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TemplatesJson } from 'terra-templates';
import { GithubStarButton } from 'website/components/GithubStarButton';
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
          <Link to={`/template/${template.id}`}>
            {template.title} <GithubStarButton github={template.github} />
          </Link>
        </h3>
      </footer>
    </li>
  );
}

const StyledComponent = styled(Component)`
  --radius: 15px;

  border: 1px solid black;
  border-radius: var(--radius);

  .template-card-images {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }

  footer {
    h3 {
      font-size: 13px;
    }

    padding: 10px;
  }
`;

export const TemplateCard = fixHMR(StyledComponent);
