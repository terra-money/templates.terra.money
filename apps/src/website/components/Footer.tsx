import { fixHMR } from 'fix-hmr';
import React from 'react';
import styled from 'styled-components';

export interface FooterProps {
  className?: string;
}

function Component({ className }: FooterProps) {
  return (
    <footer className={className}>
      <a href="https://terra.money" target="_blank" rel="noreferrer">
        Terraform Labs
      </a>

      <a href="https://docs.terra.money" target="_blank" rel="noreferrer">
        Docs
      </a>

      <a href="https://github.com/terra-money" target="_blank" rel="noreferrer">
        Github
      </a>
    </footer>
  );
}

const StyledComponent = styled(Component)`
  margin-top: 100px;
  margin-bottom: 100px;

  font-size: 14px;
  line-height: 150%;

  a {
    text-decoration: none;

    color: var(--color-text);

    margin-right: 24px;

    &[href="https://terra.money"]
    {
      font-weight: 500;

      margin-right: 80px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 600px) {
    margin-top: 50px;
    margin-bottom: 50px;

    padding: 0 20px;

    display: flex;

    a {
      &[href="https://terra.money"]
      {
        flex: 1;
      }
    }
  }
`;

export const Footer = fixHMR(StyledComponent);
