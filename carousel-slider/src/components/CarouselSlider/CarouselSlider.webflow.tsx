import CarouselSlider from "./CarouselSlider";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./CarouselSlider.css";

export default declareComponent(CarouselSlider, {
  name: "CarouselSlider",
  description: "An advanced carousel component that displays one slide at a time with smooth transitions between slides. Each slide is a card containing an image, title, description, and optional CTA button with link. Features navigation arrows on both sides, dot indicators below for position tracking, and supports auto-play with pause-on-hover. Offers configurable transition effects (slide or fade), aspect ratios, and loop mode. Responsive design displays full-width slides on mobile and optionally shows a peek of adjacent slides on desktop. Supports touch/swipe gestures for mobile interaction and can accommodate 2-12 slides with individual visibility controls.",
  group: "Interactive",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for targeting and accessibility"
    }),
    transitionEffect: props.Variant({
      name: "Transition Effect",
      options: ["slide", "fade"],
      defaultValue: "slide",
      group: "Behavior",
      tooltip: "Animation style for slide transitions"
    }),
    aspectRatio: props.Variant({
      name: "Aspect Ratio",
      options: ["16:9", "4:3", "21:9", "1:1", "3:2"],
      defaultValue: "16:9",
      group: "Style",
      tooltip: "Slide container aspect ratio"
    }),
    showPeek: props.Boolean({
      name: "Show Peek",
      defaultValue: false,
      group: "Style",
      tooltip: "Show peek of adjacent slides on desktop"
    }),
    autoPlay: props.Boolean({
      name: "Auto Play",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Enable automatic slide progression"
    }),
    autoPlayInterval: props.Number({
      name: "Auto Play Interval",
      defaultValue: 5000,
      group: "Behavior",
      tooltip: "Milliseconds between auto-play transitions"
    }),
    pauseOnHover: props.Boolean({
      name: "Pause on Hover",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Pause auto-play when hovering over carousel"
    }),
    enableLoop: props.Boolean({
      name: "Enable Loop",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Loop from last slide back to first"
    }),
    showArrows: props.Boolean({
      name: "Show Arrows",
      defaultValue: true,
      group: "Display",
      tooltip: "Display previous/next navigation arrows"
    }),
    showDots: props.Boolean({
      name: "Show Dots",
      defaultValue: true,
      group: "Display",
      tooltip: "Display dot indicators below slides"
    }),
    slide1Visible: props.Visibility({
      name: "Visible",
      group: "Slide 1",
      tooltip: "Show or hide slide 1"
    }),
    slide1Image: props.Image({
      name: "Image",
      group: "Slide 1",
      tooltip: "Slide 1 background or featured image"
    }),
    slide1Title: props.Text({
      name: "Title",
      defaultValue: "Discover Amazing Features",
      group: "Slide 1",
      tooltip: "Slide 1 main heading text"
    }),
    slide1Description: props.Text({
      name: "Description",
      defaultValue: "Experience the next generation of innovation with our cutting-edge solutions designed for modern businesses.",
      group: "Slide 1",
      tooltip: "Slide 1 descriptive text content"
    }),
    slide1CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Learn More",
      group: "Slide 1",
      tooltip: "Slide 1 call-to-action button text"
    }),
    slide1CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 1",
      tooltip: "Slide 1 call-to-action button link"
    }),
    slide1ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 1",
      tooltip: "Display the CTA button on slide 1"
    }),
    slide2Visible: props.Visibility({
      name: "Visible",
      group: "Slide 2",
      tooltip: "Show or hide slide 2"
    }),
    slide2Image: props.Image({
      name: "Image",
      group: "Slide 2",
      tooltip: "Slide 2 background or featured image"
    }),
    slide2Title: props.Text({
      name: "Title",
      defaultValue: "Built for Performance",
      group: "Slide 2",
      tooltip: "Slide 2 main heading text"
    }),
    slide2Description: props.Text({
      name: "Description",
      defaultValue: "Lightning-fast performance meets intuitive design. Get more done with tools that work as hard as you do.",
      group: "Slide 2",
      tooltip: "Slide 2 descriptive text content"
    }),
    slide2CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Get Started",
      group: "Slide 2",
      tooltip: "Slide 2 call-to-action button text"
    }),
    slide2CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 2",
      tooltip: "Slide 2 call-to-action button link"
    }),
    slide2ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 2",
      tooltip: "Display the CTA button on slide 2"
    }),
    slide3Visible: props.Visibility({
      name: "Visible",
      group: "Slide 3",
      tooltip: "Show or hide slide 3"
    }),
    slide3Image: props.Image({
      name: "Image",
      group: "Slide 3",
      tooltip: "Slide 3 background or featured image"
    }),
    slide3Title: props.Text({
      name: "Title",
      defaultValue: "Trusted by Thousands",
      group: "Slide 3",
      tooltip: "Slide 3 main heading text"
    }),
    slide3Description: props.Text({
      name: "Description",
      defaultValue: "Join thousands of satisfied customers who have transformed their workflow with our proven solutions.",
      group: "Slide 3",
      tooltip: "Slide 3 descriptive text content"
    }),
    slide3CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "View Testimonials",
      group: "Slide 3",
      tooltip: "Slide 3 call-to-action button text"
    }),
    slide3CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 3",
      tooltip: "Slide 3 call-to-action button link"
    }),
    slide3ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 3",
      tooltip: "Display the CTA button on slide 3"
    }),
    slide4Visible: props.Visibility({
      name: "Visible",
      group: "Slide 4",
      tooltip: "Show or hide slide 4"
    }),
    slide4Image: props.Image({
      name: "Image",
      group: "Slide 4",
      tooltip: "Slide 4 background or featured image"
    }),
    slide4Title: props.Text({
      name: "Title",
      defaultValue: "Seamless Integration",
      group: "Slide 4",
      tooltip: "Slide 4 main heading text"
    }),
    slide4Description: props.Text({
      name: "Description",
      defaultValue: "Connect with your favorite tools and platforms. Our integrations make it easy to work the way you want.",
      group: "Slide 4",
      tooltip: "Slide 4 descriptive text content"
    }),
    slide4CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Explore Integrations",
      group: "Slide 4",
      tooltip: "Slide 4 call-to-action button text"
    }),
    slide4CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 4",
      tooltip: "Slide 4 call-to-action button link"
    }),
    slide4ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 4",
      tooltip: "Display the CTA button on slide 4"
    }),
    slide5Visible: props.Visibility({
      name: "Visible",
      group: "Slide 5",
      tooltip: "Show or hide slide 5"
    }),
    slide5Image: props.Image({
      name: "Image",
      group: "Slide 5",
      tooltip: "Slide 5 background or featured image"
    }),
    slide5Title: props.Text({
      name: "Title",
      defaultValue: "Enterprise Ready",
      group: "Slide 5",
      tooltip: "Slide 5 main heading text"
    }),
    slide5Description: props.Text({
      name: "Description",
      defaultValue: "Scale with confidence. Enterprise-grade security and support for organizations of any size.",
      group: "Slide 5",
      tooltip: "Slide 5 descriptive text content"
    }),
    slide5CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Contact Sales",
      group: "Slide 5",
      tooltip: "Slide 5 call-to-action button text"
    }),
    slide5CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 5",
      tooltip: "Slide 5 call-to-action button link"
    }),
    slide5ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 5",
      tooltip: "Display the CTA button on slide 5"
    }),
    slide6Visible: props.Visibility({
      name: "Visible",
      group: "Slide 6",
      tooltip: "Show or hide slide 6"
    }),
    slide6Image: props.Image({
      name: "Image",
      group: "Slide 6",
      tooltip: "Slide 6 background or featured image"
    }),
    slide6Title: props.Text({
      name: "Title",
      defaultValue: "24/7 Support",
      group: "Slide 6",
      tooltip: "Slide 6 main heading text"
    }),
    slide6Description: props.Text({
      name: "Description",
      defaultValue: "Our dedicated support team is always here to help. Get assistance whenever you need it, day or night.",
      group: "Slide 6",
      tooltip: "Slide 6 descriptive text content"
    }),
    slide6CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Get Support",
      group: "Slide 6",
      tooltip: "Slide 6 call-to-action button text"
    }),
    slide6CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 6",
      tooltip: "Slide 6 call-to-action button link"
    }),
    slide6ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 6",
      tooltip: "Display the CTA button on slide 6"
    }),
    slide7Visible: props.Visibility({
      name: "Visible",
      group: "Slide 7",
      tooltip: "Show or hide slide 7"
    }),
    slide7Image: props.Image({
      name: "Image",
      group: "Slide 7",
      tooltip: "Slide 7 background or featured image"
    }),
    slide7Title: props.Text({
      name: "Title",
      defaultValue: "Advanced Analytics",
      group: "Slide 7",
      tooltip: "Slide 7 main heading text"
    }),
    slide7Description: props.Text({
      name: "Description",
      defaultValue: "Make data-driven decisions with powerful analytics and insights that help you understand what matters most.",
      group: "Slide 7",
      tooltip: "Slide 7 descriptive text content"
    }),
    slide7CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "View Analytics",
      group: "Slide 7",
      tooltip: "Slide 7 call-to-action button text"
    }),
    slide7CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 7",
      tooltip: "Slide 7 call-to-action button link"
    }),
    slide7ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 7",
      tooltip: "Display the CTA button on slide 7"
    }),
    slide8Visible: props.Visibility({
      name: "Visible",
      group: "Slide 8",
      tooltip: "Show or hide slide 8"
    }),
    slide8Image: props.Image({
      name: "Image",
      group: "Slide 8",
      tooltip: "Slide 8 background or featured image"
    }),
    slide8Title: props.Text({
      name: "Title",
      defaultValue: "Mobile First",
      group: "Slide 8",
      tooltip: "Slide 8 main heading text"
    }),
    slide8Description: props.Text({
      name: "Description",
      defaultValue: "Work from anywhere with our mobile-optimized platform. Full functionality on any device, anytime.",
      group: "Slide 8",
      tooltip: "Slide 8 descriptive text content"
    }),
    slide8CtaText: props.Text({
      name: "CTA Text",
      defaultValue: "Download App",
      group: "Slide 8",
      tooltip: "Slide 8 call-to-action button text"
    }),
    slide8CtaLink: props.Link({
      name: "CTA Link",
      group: "Slide 8",
      tooltip: "Slide 8 call-to-action button link"
    }),
    slide8ShowCta: props.Boolean({
      name: "Show CTA",
      defaultValue: true,
      group: "Slide 8",
      tooltip: "Display the CTA button on slide 8"
    }),
    slide9Visible: props.Visibility({
      name: "Visible",
      group: "Slide 9",
      tooltip: "Show or hide slide 9"
    }),
    slide9Image: props.Image({
      name: "Image",
      group: "Slide 9",
      tooltip: "Slide 9 background or featured image"
    }),
    slide9Title: props.Text({
      name: "Title",
      defaultValue: "Customizable Workflows",
      group: "Slide 9",
      tooltip: "Slide