import { fixHMR } from 'fix-hmr';
import 'github-markdown-css/github-markdown-light.css';
import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useCopyClipboard from 'react-use-clipboard';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { GithubStarButton } from 'website/components/GithubStarButton';
import { TemplateImages } from 'website/components/TemplateImages';
import { useReadMe } from 'website/services/useReadMe';
import { useTemplateData } from '../services/useTemplateData';

export interface TemplateProps {
  className?: string;
}

function Component({ className }: TemplateProps) {
  const { data } = useTemplateData();

  const { templateId } = useParams<'templateId'>();

  const template = useMemo(() => {
    return data?.templates.find(({ id }) => templateId === id);
  }, [data?.templates, templateId]);

  const readme = useReadMe(template?.github);

  const [isCopied, copy] = useCopyClipboard(
    `npx terra-templates get ${template?.id}`,
    {
      successDuration: 1000 * 5,
    },
  );

  if (!template) {
    return <div className={className}>In progress...</div>;
  }

  return (
    <div className={className}>
      <section>
        <h1>
          {template.title} <GithubStarButton github={template.github} />
        </h1>

        <ul>
          <li>
            Github:{' '}
            <a href={template.github} target="_blank" rel="noreferrer">
              {template.github}
            </a>
          </li>
          <li>
            Tags:{' '}
            <div style={{ display: 'inline-flex', gap: 10 }}>
              {template.tags?.map((tag) => (
                <span key={'tag' + tag}>{tag}</span>
              ))}
            </div>
          </li>
        </ul>

        <div className="get-command">
          <code>npx terra-templates get {template.id}</code>{' '}
          {isCopied ? 'Copied' : <button onClick={copy}>Copy</button>}
        </div>

        <TemplateImages images={template.images} style={{ maxWidth: 600 }} />
      </section>

      {readme && (
        <article className="markdown-body">
          <Markdown children={readme} remarkPlugins={[remarkGfm]} />
        </article>
      )}
    </div>
  );
}

const StyledComponent = styled(Component)`
  section {
    padding: 20px;
    background-color: skyblue;

    .get-command {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 30px;
    }
  }

  article {
    padding: 20px;
  }
`;

export const Template = fixHMR(StyledComponent);
