import CMSSlider from "./CMSSlider";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default declareComponent(CMSSlider, {
  name: "CMSSlider",
  description: "A CMS slider component",
  options: {
    ssr: false,
  },
  props: {
    cmsCollectionComponentSlot: props.Slot({
      name: "CMS Collection Component Slot",
      group: "Content",
      tooltip: "The slot for the CMS collection component",
    }),
    showCMSCollectionComponent: props.Boolean({
      name: "Show CMS Collection Component",
      group: "Visibility",
      tooltip: "Whether to show the CMS collection component for editing",
      defaultValue: false,
    }),
    infinite: props.Boolean({
      name: "Infinite",
      group: "Behavior",
      tooltip: "Whether to loop the slider infinitely",
      defaultValue: true,
    }),
    slidesToShow: props.Number({
      name: "Slides to Show",
      group: "Behavior",
      tooltip: "The number of slides to show",
      defaultValue: 1,
    }),
    slidesToScroll: props.Number({
      name: "Slides to Scroll",
      group: "Behavior",
      tooltip: "The number of slides to scroll",
      defaultValue: 1,
    }),
    dots: props.Boolean({
      name: "Dots",
      group: "Behavior",
      tooltip: "Whether to show the dots",
      defaultValue: true,
    }),
    arrows: props.Boolean({
      name: "Arrows",
      group: "Behavior",
      tooltip: "Whether to show the arrows",
      defaultValue: true,
    }),
    autoplay: props.Boolean({
      name: "Autoplay",
      group: "Behavior",
      tooltip: "Whether to autoplay the slider",
      defaultValue: true,
    }),
    autoplaySpeed: props.Number({
      name: "Autoplay Speed",
      group: "Behavior",
      tooltip: "The speed of the autoplay in milliseconds",
      defaultValue: 3000,
    }),
  },
});
