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
        <Link to="/">
          Terra <span>templates</span>
        </Link>
      </h1>
    </header>
  );
}

const StyledComponent = styled(Component)`
  height: 68px;
  padding: 0 var(--layout-padding);

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-menu-bg);

  h1 {
    font-size: 20px;

    a {
      color: #ffffff;
      text-decoration: none;

      span {
        font-weight: 400;
      }
    }
  }
`;

export const Header = fixHMR(StyledComponent);
