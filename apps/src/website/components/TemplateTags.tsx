import { fixHMR } from 'fix-hmr';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface TemplateTagsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  tags: string[];
}

function Component({ tags, ...ulProps }: TemplateTagsProps) {
  return (
    <ul {...ulProps}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

const StyledComponent = styled(Component)`
  list-style: none;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    padding: 0 14px;
    height: 22px;

    font-size: 12px;
    line-height: 18px;
    font-weight: 500;

    background-color: var(--color-card-border);
    border-radius: 16px;

    display: grid;
    place-content: center;
  }
`;

export const TemplateTags = fixHMR(StyledComponent);
