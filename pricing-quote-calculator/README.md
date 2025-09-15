# Pricing Quote Calculator

This code component example is a flexible pricing calculator widget for calculating a monthly premium estimate.

![](./screenshots/demo-screenshot.png)

## Features

- User input fields exposed as props to allow setting defaults from Webflow or URL query params
  - Prefill values based on personalization
  - Perform A/B testing on text such as the title or CTA button with dynamic-bound values at runtime
- Client-side calculations for monthly premium estimation
- [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) as a Tailwind plugin
- Vite project setup


## Getting started

- Install dependencies: `npm i`
- Run the project locally: `npm run dev`
  - Visit `http://localhost:5173/`
  - Ensure that the component loads as expected
  - Any local code changes saved should reflect accordingly
- Run `npx webflow library share` to create a code library for this example in your designated Webflow workspace