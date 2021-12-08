import { fixHMR } from 'fix-hmr';
import styled from 'styled-components';
import React from 'react';

export interface CliProps {
  className?: string;
}

function Component({ className }: CliProps) {
  return <div className={className}>Cli</div>;
}

const StyledComponent = styled(Component)`
  // TODO
`;

export const Cli = fixHMR(StyledComponent);
