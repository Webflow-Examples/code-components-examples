import { useEffect, useRef } from "react";

/**
 * Wrapper component that renders a single CMS collection item as a slide
 */
const SlideItem = (props: { slide: HTMLDivElement; index: number }) => {
  const { slide, index } = props;
  const slideRef = useRef<HTMLDivElement>(null);

  // Append the cloned slide element to the container
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.appendChild(slide.cloneNode(true) as HTMLDivElement);
    }
  }, [slide]);

  return <div ref={slideRef} data-index={index}></div>;
};

export default SlideItem;
