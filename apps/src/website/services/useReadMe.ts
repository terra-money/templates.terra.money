import { useEffect, useState } from 'react';

export function getGithubRawUrl(github: string): string {
  const url = github
    .replace('github.com', 'raw.githubusercontent.com')
    .replace(/\/(blob|tree)/, '');

  return github.split('/').length === 5 ? url + '/main' : url;
}

export function useReadMe(github?: string) {
  const [readme, setReadme] = useState<string | null>(null);

  useEffect(() => {
    if (!github) {
      return;
    }

    fetch(getGithubRawUrl(github) + '/README.md')
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.text();
        }
      })
      .then((text) => setReadme(text))
      .catch(() => setReadme(null));
  }, [github]);

  return readme;
}
