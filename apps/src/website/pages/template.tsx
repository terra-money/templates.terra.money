import { fixHMR } from 'fix-hmr';
import 'github-markdown-css/github-markdown-light.css';
import React, { useMemo } from 'react';
import { BsTerminalFill, MdCheck, MdOpenInNew } from 'react-icons/all';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useCopyClipboard from 'react-use-clipboard';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
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
      <header>
        <h1>
          {template.title}{' '}
          <a href={template.github} target="_blank" rel="noreferrer">
            <MdOpenInNew />
          </a>
        </h1>

        <div className="get-command">
          <code>npx terra-templates get {template.id}</code>
          {isCopied ? (
            <button>
              <MdCheck />
            </button>
          ) : (
            <button onClick={copy}>
              <BsTerminalFill
                style={{ transform: 'scale(1.2) translateY(0.1em)' }}
              />
            </button>
          )}
        </div>
      </header>

      <main>
        <article className="markdown-body">
          {readme && <Markdown children={readme} remarkPlugins={[remarkGfm]} />}
        </article>

        <aside>
          <TemplateImages
            images={template.images}
            style={{ maxWidth: '100%' }}
          />

          <h3>Categories</h3>

          <ul>
            {template.categories.map((category) => (
              <li key={'category:' + category}>
                <button>{category}</button>
              </li>
            ))}
          </ul>

          {template.tags && (
            <>
              <h3>Tags</h3>

              <ul>
                {template.tags.map((tag) => (
                  <li key={'tag:' + tag}>
                    <button>{tag}</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

const StyledComponent = styled(Component)`
  min-height: 100vh;

  background-color: #ffffff;

  header {
    padding: var(--layout-padding);

    background-color: #f8f9fe;
    color: #2043b5;
    border-bottom: 1px solid #e7ebf6;

    h1 {
      font-size: 24px;
      font-weight: 500;

      margin-bottom: 16px;

      a {
        font-size: 16px;
        vertical-align: center;
      }
    }

    .get-command {
      display: inline-flex;
      align-items: center;

      border-radius: 15px;

      code {
        font-size: 14px;
        padding: 10px 15px;

        background-color: #212121;
        color: #ffffff;
      }

      button {
        cursor: pointer;

        outline: none;
        border: none;

        background-color: #ffffff;
        color: #212121;

        width: 34px;
        align-self: stretch;

        svg {
          width: 1em;
        }
      }
    }
  }

  main {
    display: flex;
    gap: 2em;

    padding: var(--layout-padding);
    padding-top: 3em;

    article {
      flex: 1;
      min-width: 0;
    }

    aside {
      width: 400px;

      h3 {
        margin-top: 1.2em;
        margin-bottom: 0.6em;

        font-size: 14px;
        font-weight: 500;
      }

      ul {
        list-style: none;
        padding: 0;

        display: flex;
        gap: 5px;

        button {
          outline: none;
          background-color: transparent;
          border: 1px solid #e7ebf6;

          font-size: 12px;
          padding: 7px 10px;
          border-radius: 4px;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    main {
      flex-direction: column-reverse;

      aside {
        width: auto;
      }
    }
  }
`;

export const Template = fixHMR(StyledComponent);
