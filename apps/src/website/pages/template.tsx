import { fixHMR } from 'fix-hmr';
import 'github-markdown-css/github-markdown-light.css';
import React, { useMemo } from 'react';
import { BsGithub, MdCheck, MdOutlineFilterNone } from 'react-icons/all';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useCopyClipboard from 'react-use-clipboard';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { TemplateSymbols } from 'website/components/TemplateSymbols';
import { TemplateTags } from 'website/components/TemplateTags';
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
            <BsGithub />
          </a>
        </h1>

        <div className="get-command">
          <code>npx terra-templates get {template.id}</code>
          {isCopied ? (
            <button>
              <MdCheck /> COPY
            </button>
          ) : (
            <button onClick={copy}>
              <MdOutlineFilterNone /> COPY
            </button>
          )}
        </div>
      </header>

      <main>
        <article className="markdown-body">
          {readme && <Markdown children={readme} remarkPlugins={[remarkGfm]} />}
        </article>

        <aside>
          <div className="symbols">
            <TemplateSymbols symbols={template.symbols} />
          </div>

          <div className="tags">
            <h3>Categories</h3>

            <TemplateTags tags={template.categories} />

            {template.tags && (
              <>
                <h3>Tags</h3>

                <TemplateTags tags={template.tags} />
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

const StyledComponent = styled(Component)`
  header {
    margin-top: 36px;

    color: var(--color-text);

    h1 {
      font-size: 36px;
      font-weight: 500;

      a {
        font-size: 0.55em;
        vertical-align: center;
        margin-left: 0.2em;
      }

      margin-bottom: 18px;
    }

    .get-command {
      display: inline-flex;
      align-items: center;

      border: 1px solid var(--color-line);
      border-radius: 8px;

      padding: 8px 12px;

      gap: 16px;

      code {
        font-size: 12px;
        line-height: 18px;
        color: var(--color-text);
      }

      button {
        cursor: pointer;

        outline: none;
        background-color: transparent;
        border: 1px solid var(--color-text);
        border-radius: 10px;

        color: var(--color-text);

        font-size: 10px;
        font-weight: 500;

        height: 20px;
        padding: 0 10px;

        word-break: keep-all;
        white-space: nowrap;

        svg {
          width: 1em;
          transform: translateY(0.1em);
        }
      }
    }

    margin-bottom: 24px;
  }

  main {
    display: flex;
    gap: 20px;

    article {
      width: 100%;
      min-width: 0;

      padding: 40px;

      font-size: 14px;

      border: 1px solid var(--color-card-border);
      border-radius: 8px;
    }

    aside {
      width: 100%;
      max-width: 310px;

      color: var(--color-text);

      .symbols {
        height: 175px;
        border-radius: 8px;

        background-color: var(--color-card-border);

        display: grid;
        place-content: center;
      }

      h3 {
        margin-top: 20px;
        margin-bottom: 10px;

        font-size: 16px;
        font-weight: 500;
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

  @media (max-width: 600px) {
    header {
      margin-top: 28px;
      padding: 0 20px;

      h1 {
        font-size: 24px;
      }

      .get-command {
        display: flex;
        justify-content: space-between;
      }
    }

    main {
      article {
        border-radius: 0;
        border-left: 0;
        border-right: 0;

        padding: 20px;
      }

      aside {
        max-width: unset;

        .symbols {
          border-radius: 0;
        }

        .tags {
          padding: 0 20px;
        }
      }
    }
  }
`;

export const Template = fixHMR(StyledComponent);
