# CMS Slider

This code component example is a carousel slider that integrates seamlessly with Webflow CMS collections, allowing you to display dynamic CMS content in an interactive slider format. [See a live example here.](https://cms-slider-4d63c4.webflow.io/)

![](./screenshot/preview-1.png)

## Features

- **CMS Collection Integration** - Automatically extracts and displays items from Webflow CMS Collection lists via slot-based architecture
- **React Slick Carousel** - Powered by React Slick with full carousel functionality
- **Configurable Behavior** - Control slides to show, scroll speed, infinite looping, autoplay, navigation arrows, and dots
- **Slot-Based Content** - Accepts any Webflow CMS collection list as a component slot for maximum flexibility
- **Vite Project Setup** - Fast development experience with Hot Module Replacement (HMR)

## Getting Started

- Install dependencies: `npm i`
- Run `npx webflow library share` to create a code library for this example in your designated Webflow workspace

## Component Properties

| Prop Name                    | Type      | Default | Description                                                  |
| ---------------------------- | --------- | ------- | ------------------------------------------------------------ |
| `cmsCollectionComponentSlot` | `Slot`    | -       | The slot where you place your Webflow CMS Collection List    |
| `showCMSCollectionComponent` | `Boolean` | `false` | Toggle visibility of the CMS collection for editing purposes |
| `infinite`                   | `Boolean` | `true`  | Enable infinite looping of slides                            |
| `slidesToShow`               | `Number`  | `1`     | Number of slides visible at once                             |
| `slidesToScroll`             | `Number`  | `1`     | Number of slides to scroll on navigation                     |
| `dots`                       | `Boolean` | `true`  | Show navigation dots below the slider                        |
| `arrows`                     | `Boolean` | `true`  | Show previous/next navigation arrows                         |
| `autoplay`                   | `Boolean` | `true`  | Enable automatic slide transitions                           |
| `autoplaySpeed`              | `Number`  | `3000`  | Delay between auto transitions (in milliseconds)             |

## Technical Implementation

This component showcases several advanced patterns for Webflow Code Components:

- **Custom Hook (`useCMSCollectionItems`)** - Extracts CMS list items from Webflow slots using Shadow DOM slot APIs
- **Shadow DOM Style Injection** - Uses `useShadowGlobalStyles` hook to inject Webflow styles into the shadow root
- **Element Cloning** - Clones CMS elements to render them within the slider while preserving their Webflow styling
- **React Slick Integration** - Demonstrates how to integrate third-party React libraries with Webflow Code Components
