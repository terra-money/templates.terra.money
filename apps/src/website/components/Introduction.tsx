import { fixHMR } from 'fix-hmr';
import React from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import bg from './assets/introduction.png';
import { ReactComponent as Logo } from './assets/logo.svg';

export interface IntroductionProps {
  className?: string;
}

function Component({ className }: IntroductionProps) {
  const isRoot = useMatch('/');

  if (!isRoot) {
    return null;
  }

  return (
    <div className={className}>
      <h1>
        <Logo />
        <br />
        Terra <span>Templates</span>
      </h1>

      <p>
        Quick start terra web app and
        <br />
        smart contract by running one command
      </p>
    </div>
  );
}

const StyledComponent = styled(Component)`
  width: 100vw;
  height: 355px;

  background-color: var(--color-menu-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${bg}');
  background-size: cover;

  display: grid;
  place-content: center;
  text-align: center;

  color: white;

  font-size: 14px;

  svg {
    width: 36px;
    margin-bottom: 13px;
  }

  h1 {
    font-size: 31px;
    letter-spacing: -0.65px;

    span {
      font-weight: normal;
    }

    margin-bottom: 47px;
  }

  p {
    font-size: 20px;
    letter-spacing: -0.3px;
  }

  @media (max-width: 1300px) {
    height: 300px;
  }

  @media (max-width: 700px) {
    height: 187px;
    background-size: 270% 100%;

    svg {
      width: 20px;
      margin-bottom: 6px;
    }

    h1 {
      font-size: 17px;
      margin-bottom: 20px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const Introduction = fixHMR(StyledComponent);
