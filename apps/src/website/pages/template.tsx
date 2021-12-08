import { fixHMR } from 'fix-hmr';
import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useCopyClipboard from 'react-use-clipboard';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
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
      <h1>{template.title}</h1>

      <p>
        <code>npx terra-templates get {template.id}</code>
        {isCopied ? 'Copied' : <button onClick={copy}>Copy</button>}
      </p>

      <p>
        <a href={template.github} target="_blank" rel="noreferrer">
          {template.github}
        </a>
      </p>

      {readme && (
        <>
          <hr />
          <Markdown children={readme} remarkPlugins={[remarkGfm]} />
        </>
      )}
    </div>
  );
}

const StyledComponent = styled(Component)`
  // TODO
`;

export const Template = fixHMR(StyledComponent);
