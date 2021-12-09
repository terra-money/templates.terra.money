import { fixHMR } from 'fix-hmr';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface HeaderProps {
  className?: string;
}

function Component({ className }: HeaderProps) {
  return (
    <header className={className}>
      <h1>
        <Link to="/">Terra templates</Link>
      </h1>
    </header>
  );
}

const StyledComponent = styled(Component)`
  height: 60px;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: lightgray;
`;

export const Header = fixHMR(StyledComponent);
