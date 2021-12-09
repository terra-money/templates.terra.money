import gitUrlParse from 'git-url-parse';
import React, { useMemo } from 'react';
import GitHubButton from 'react-github-btn';

export interface GithubStarButtonProps {
  github: string;
}

export function GithubStarButton({ github }: GithubStarButtonProps) {
  const { owner, name } = useMemo(() => {
    return gitUrlParse(github);
  }, [github]);

  return (
    <GitHubButton
      href={`https://github.com/${owner}/${name}`}
      data-show-count="true"
      aria-label={`Star ${owner}/${name} on GitHub`}
    >
      Star
    </GitHubButton>
  );
}
