import { useEffect, useRef } from "react";

/**
 * Wrapper component that renders a single CMS collection item as a slide
 */
const SlideItem = (props: { item: HTMLDivElement; index: number }) => {
  const { item, index } = props;
  const itemRef = useRef<HTMLDivElement>(null);

  // Append the cloned slide element to the container
  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.appendChild(item.cloneNode(true) as HTMLDivElement);
    }
  }, [item]);

  return <div ref={itemRef} data-index={index}></div>;
};

export default SlideItem;
