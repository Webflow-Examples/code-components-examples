import React, { useRef } from "react";
import SlickSlider from "react-slick";
import { useCMSCollectionItems } from "./useCMSCollectionItems";
import SlideItem from "./SlideItem";
import { useShadowGlobalStyles } from "../../hooks/useShadowGlobalStyles";

export interface CMSSliderProps {
  cmsCollectionComponentSlot: React.ReactNode;
  showCMSCollectionComponent: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  dots?: boolean;
  arrows?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const CMSSlider = (props: CMSSliderProps) => {
  const {
    cmsCollectionComponentSlot,
    showCMSCollectionComponent,
    infinite = true,
    slidesToShow = 1,
    slidesToScroll = 1,
    dots = true,
    arrows = true,
    autoplay = true,
    autoplaySpeed = 3000,
  } = props;

  // Reference to parent div for shadow DOM style injection
  const parentRef = useRef<HTMLDivElement>(null);

  // Extract CMS collection items from Webflow slot
  const { cmsCollectionComponentSlotRef, slideElements } =
    useCMSCollectionItems("cmsCollectionComponentSlot");

  // Inject global styles into shadow DOM
  useShadowGlobalStyles(parentRef);

  return (
    <div ref={parentRef}>
      {/* Hidden container for CMS collection slot */}
      <div
        ref={cmsCollectionComponentSlotRef}
        style={{ display: showCMSCollectionComponent ? "block" : "none" }}
      >
        {cmsCollectionComponentSlot}
      </div>

      {/* Render slider once CMS items are extracted */}
      {slideElements && slideElements.length > 0 && (
        <SlickSlider
          infinite={infinite}
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToScroll}
          dots={dots}
          arrows={arrows}
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          swipeToSlide={true}
        >
          {slideElements.map((slide, index) => (
            <SlideItem key={index} slide={slide} index={index} />
          ))}
        </SlickSlider>
      )}
    </div>
  );
};

export default CMSSlider;
