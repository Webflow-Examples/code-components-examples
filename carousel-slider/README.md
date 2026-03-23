# CarouselSlider

An advanced carousel component that displays one slide at a time with smooth transitions between slides.

## Getting Started

Install dependencies:
```bash
npm install
```

Share the component to your Webflow workspace:
```bash
npx webflow library share
```

For local development:
```bash
npm run dev
```

## Designer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| ID | Id | — | HTML ID attribute for targeting and accessibility |
| Transition Effect | Variant | slide | Animation style for slide transitions (slide or fade) |
| Aspect Ratio | Variant | 16:9 | Slide container aspect ratio (16:9, 4:3, 21:9, 1:1, or 3:2) |
| Show Peek | Boolean | false | Show peek of adjacent slides on desktop |
| Auto Play | Boolean | true | Enable automatic slide progression |
| Auto Play Interval | Number | 5000 | Milliseconds between auto-play transitions |
| Pause On Hover | Boolean | true | Pause auto-play when hovering over carousel |
| Enable Loop | Boolean | true | Loop from last slide back to first |
| Show Arrows | Boolean | true | Display previous/next navigation arrows |
| Show Dots | Boolean | true | Display dot indicators below slides |
| Slide 1 Visible | Visibility | — | Show or hide slide 1 |
| Slide 1 Image | Image | — | Slide 1 background or featured image |
| Slide 1 Title | Text | Discover Amazing Features | Slide 1 main heading text |
| Slide 1 Description | Text | Experience the next generation... | Slide 1 descriptive text content |
| Slide 1 CTA Text | Text | Learn More | Slide 1 call-to-action button text |
| Slide 1 CTA Link | Link | — | Slide 1 call-to-action button link |
| Slide 1 Show CTA | Boolean | true | Display the CTA button on slide 1 |
| Slide 2 Visible | Visibility | — | Show or hide slide 2 |
| Slide 2 Image | Image | — | Slide 2 background or featured image |
| Slide 2 Title | Text | Built for Performance | Slide 2 main heading text |
| Slide 2 Description | Text | Lightning-fast performance... | Slide 2 descriptive text content |
| Slide 2 CTA Text | Text | Get Started | Slide 2 call-to-action button text |
| Slide 2 CTA Link | Link | — | Slide 2 call-to-action button link |
| Slide 2 Show CTA | Boolean | true | Display the CTA button on slide 2 |
| Slide 3 Visible | Visibility | — | Show or hide slide 3 |
| Slide 3 Image | Image | — | Slide 3 background or featured image |
| Slide 3 Title | Text | Trusted by Thousands | Slide 3 main heading text |
| Slide 3 Description | Text | Join thousands of satisfied... | Slide 3 descriptive text content |
| Slide 3 CTA Text | Text | View Testimonials | Slide 3 call-to-action button text |
| Slide 3 CTA Link | Link | — | Slide 3 call-to-action button link |
| Slide 3 Show CTA | Boolean | true | Display the CTA button on slide 3 |
| Slide 4 Visible | Visibility | — | Show or hide slide 4 |
| Slide 4 Image | Image | — | Slide 4 background or featured image |
| Slide 4 Title | Text | Seamless Integration | Slide 4 main heading text |
| Slide 4 Description | Text | Connect with your favorite... | Slide 4 descriptive text content |
| Slide 4 CTA Text | Text | Explore Integrations | Slide 4 call-to-action button text |
| Slide 4 CTA Link | Link | — | Slide 4 call-to-action button link |
| Slide 4 Show CTA | Boolean | true | Display the CTA button on slide 4 |
| Slide 5 Visible | Visibility | — | Show or hide slide 5 |
| Slide 5 Image | Image | — | Slide 5 background or featured image |
| Slide 5 Title | Text | Enterprise Ready | Slide 5 main heading text |
| Slide 5 Description | Text | Scale with confidence... | Slide 5 descriptive text content |
| Slide 5 CTA Text | Text | Contact Sales | Slide 5 call-to-action button text |
| Slide 5 CTA Link | Link | — | Slide 5 call-to-action button link |
| Slide 5 Show CTA | Boolean | true | Display the CTA button on slide 5 |
| Slide 6 Visible | Visibility | — | Show or hide slide 6 |
| Slide 6 Image | Image | — | Slide 6 background or featured image |
| Slide 6 Title | Text | 24/7 Support | Slide 6 main heading text |
| Slide 6 Description | Text | Our dedicated support team... | Slide 6 descriptive text content |
| Slide 6 CTA Text | Text | Get Support | Slide 6 call-to-action button text |
| Slide 6 CTA Link | Link | — | Slide 6 call-to-action button link |
| Slide 6 Show CTA | Boolean | true | Display the CTA button on slide 6 |
| Slide 7 Visible | Visibility | — | Show or hide slide 7 |
| Slide 7 Image | Image | — | Slide 7 background or featured image |
| Slide 7 Title | Text | Advanced Analytics | Slide 7 main heading text |
| Slide 7 Description | Text | Make data-driven decisions... | Slide 7 descriptive text content |
| Slide 7 CTA Text | Text | View Analytics | Slide 7 call-to-action button text |
| Slide 7 CTA Link | Link | — | Slide 7 call-to-action button link |
| Slide 7 Show CTA | Boolean | true | Display the CTA button on slide 7 |
| Slide 8 Visible | Visibility | — | Show or hide slide 8 |
| Slide 8 Image | Image | — | Slide 8 background or featured image |
| Slide 8 Title | Text | Mobile First | Slide 8 main heading text |
| Slide 8 Description | Text | Work from anywhere... | Slide 8 descriptive text content |
| Slide 8 CTA Text | Text | Download App | Slide 8 call-to-action button text |
| Slide 8 CTA Link | Link | — | Slide 8 call-to-action button link |
| Slide 8 Show CTA | Boolean | true | Display the CTA button on slide 8 |
| Slide 9 Visible | Visibility | — | Show or hide slide 9 |
| Slide 9 Image | Image | — | Slide 9 background or featured image |
| Slide 9 Title | Text | Customizable Workflows | Slide 9 main heading text |
| Slide 9 Description | Text | Adapt the platform... | Slide 9 descriptive text content |
| Slide 9 CTA Text | Text | Customize Now | Slide 9 call-to-action button text |
| Slide 9 CTA Link | Link | — | Slide 9 call-to-action button link |
| Slide 9 Show CTA | Boolean | true | Display the CTA button on slide 9 |
| Slide 10 Visible | Visibility | — | Show or hide slide 10 |
| Slide 10 Image | Image | — | Slide 10 background or featured image |
| Slide 10 Title | Text | Secure by Design | Slide 10 main heading text |
| Slide 10 Description | Text | Your data is protected... | Slide 10 descriptive text content |
| Slide 10 CTA Text | Text | Security Details | Slide 10 call-to-action button text |
| Slide 10 CTA Link | Link | — | Slide 10 call-to-action button link |
| Slide 10 Show CTA | Boolean | true | Display the CTA button on slide 10 |
| Slide 11 Visible | Visibility | — | Show or hide slide 11 |
| Slide 11 Image | Image | — | Slide 11 background or featured image |
| Slide 11 Title | Text | Collaborative Tools | Slide 11 main heading text |
| Slide 11 Description | Text | Bring your team together... | Slide 11 descriptive text content |
| Slide 11 CTA Text | Text | Start Collaborating | Slide 11 call-to-action button text |
| Slide 11 CTA Link | Link | — | Slide 11 call-to-action button link |
| Slide 11 Show CTA | Boolean | true | Display the CTA button on slide 11 |
| Slide 12 Visible | Visibility | — | Show or hide slide 12 |
| Slide 12 Image | Image | — | Slide 12 background or featured image |
| Slide 12 Title | Text | Start Your Journey | Slide 12 main heading text |
| Slide 12 Description | Text | Ready to transform... | Slide 12 descriptive text content |
| Slide 12 CTA Text | Text | Sign Up Free | Slide 12 call-to-action button text |
| Slide 12 CTA Link | Link | — | Slide 12 call-to-action button link |
| Slide 12 Show CTA | Boolean | true | Display the CTA button on slide 12 |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Slide card background and arrow button background | #ffffff |
| --background-secondary | Image placeholder background and arrow button hover states | #f5f5f5 |
| --text-primary | Slide titles and arrow icon color | #1a1a1a |
| --text-secondary | Slide descriptions and inactive dot hover color | #737373 |
| --border-color | Card borders, arrow button borders, and inactive dot color | #e5e5e5 |
| --accent-color | Active dot indicator and CTA button background | #1a1a1a |
| --accent-text-color | CTA button text color | #ffffff |
| --border-radius | Card and button corner rounding | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Slide Navigation

Access the carousel programmatically to create custom navigation controls:

```javascript
const carousel = document.querySelector('[id="my-carousel"]');
const nextButton = document.querySelector('#custom-next');

nextButton.addEventListener('click', () => {
  // Trigger next slide programmatically
  carousel.querySelector('.wf-carouselslider-arrow--next').click();
});
```

### Dynamic Slide Content

Update slide content dynamically based on external data:

```javascript
const updateSlide = (slideNumber, data) => {
  const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
  slide.querySelector('.wf-carouselslider-title').textContent = data.title;
  slide.querySelector('.wf-carouselslider-description').textContent = data.description;
  slide.querySelector('.wf-carouselslider-image').src = data.imageUrl;
};
```

## Dependencies

No external dependencies.