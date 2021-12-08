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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cli">CLI</Link>
        </li>
      </ul>
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

  ul {
    list-style: none;
    padding: 0;

    display: flex;
    gap: 10px;
  }
`;

export const Header = fixHMR(StyledComponent);
