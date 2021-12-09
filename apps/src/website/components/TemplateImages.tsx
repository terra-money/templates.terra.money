import { fixHMR } from 'fix-hmr';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { getImageUrl } from 'terra-templates';

export interface TemplateImagesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  images: string[];
}

function Component({ images, style, ...divProps }: TemplateImagesProps) {
  const [index, setIndex] = useState<number>(0);

  const imageUrl = useMemo(() => {
    return getImageUrl(images[index]);
  }, [images, index]);

  const prev = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : images.length - 1,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  return (
    <div
      {...divProps}
      style={{ ...style, backgroundImage: `url(${imageUrl})` }}
    >
      {images.length > 1 && (
        <>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </>
      )}
    </div>
  );
}

const StyledComponent = styled(Component)`
  aspect-ratio: 16/9;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TemplateImages = fixHMR(StyledComponent);
