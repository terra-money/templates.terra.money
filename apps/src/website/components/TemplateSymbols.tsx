import { fixHMR } from 'fix-hmr';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface TemplateSymbolsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  symbols: string[];
  size?: number;
  gap?: number;
}

const ROOT_URL = 'https://terra-money.github.io/templates';

function Component({ symbols, size, gap, ...divProps }: TemplateSymbolsProps) {
  return (
    <ul {...divProps}>
      {symbols.slice(0, 5).map((symbol) => (
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

  gap: ${({ gap = 8 }) => gap}px;

  li img {
    width: ${({ size = 50 }) => size}px;
    height: ${({ size = 50 }) => size}px;
  }
`;

export const TemplateSymbols = fixHMR(StyledComponent);
