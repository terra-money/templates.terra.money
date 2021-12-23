import { fixHMR } from 'fix-hmr';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface TemplateSymbolsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  symbols: string[];
}

const ROOT_URL = 'https://terra-money.github.io/templates';

function Component({ symbols, ...divProps }: TemplateSymbolsProps) {
  return (
    <ul {...divProps}>
      {symbols.map((symbol) => (
        <li key={symbol}>
          <img src={`${ROOT_URL}/symbols/${symbol}`} alt={symbol} />
        </li>
      ))}
    </ul>
  );
}

const StyledComponent = styled(Component)`
  list-style: none;
  padding: 0;

  display: flex;

  gap: 8px;
`;

export const TemplateSymbols = fixHMR(StyledComponent);
