import { useState, useEffect, useRef } from "react";

export interface CarouselSliderProps {
  id?: string;
  transitionEffect?: "slide" | "fade";
  aspectRatio?: "16:9" | "4:3" | "21:9" | "1:1" | "3:2";
  showPeek?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  enableLoop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  slide1Visible?: boolean;
  slide1Image?: { src: string; alt?: string };
  slide1Title?: string;
  slide1Description?: string;
  slide1CtaText?: string;
  slide1CtaLink?: { href?: string; target?: string };
  slide1ShowCta?: boolean;
  slide2Visible?: boolean;
  slide2Image?: { src: string; alt?: string };
  slide2Title?: string;
  slide2Description?: string;
  slide2CtaText?: string;
  slide2CtaLink?: { href?: string; target?: string };
  slide2ShowCta?: boolean;
  slide3Visible?: boolean;
  slide3Image?: { src: string; alt?: string };
  slide3Title?: string;
  slide3Description?: string;
  slide3CtaText?: string;
  slide3CtaLink?: { href?: string; target?: string };
  slide3ShowCta?: boolean;
  slide4Visible?: boolean;
  slide4Image?: { src: string; alt?: string };
  slide4Title?: string;
  slide4Description?: string;
  slide4CtaText?: string;
  slide4CtaLink?: { href?: string; target?: string };
  slide4ShowCta?: boolean;
  slide5Visible?: boolean;
  slide5Image?: { src: string; alt?: string };
  slide5Title?: string;
  slide5Description?: string;
  slide5CtaText?: string;
  slide5CtaLink?: { href?: string; target?: string };
  slide5ShowCta?: boolean;
  slide6Visible?: boolean;
  slide6Image?: { src: string; alt?: string };
  slide6Title?: string;
  slide6Description?: string;
  slide6CtaText?: string;
  slide6CtaLink?: { href?: string; target?: string };
  slide6ShowCta?: boolean;
  slide7Visible?: boolean;
  slide7Image?: { src: string; alt?: string };
  slide7Title?: string;
  slide7Description?: string;
  slide7CtaText?: string;
  slide7CtaLink?: { href?: string; target?: string };
  slide7ShowCta?: boolean;
  slide8Visible?: boolean;
  slide8Image?: { src: string; alt?: string };
  slide8Title?: string;
  slide8Description?: string;
  slide8CtaText?: string;
  slide8CtaLink?: { href?: string; target?: string };
  slide8ShowCta?: boolean;
  slide9Visible?: boolean;
  slide9Image?: { src: string; alt?: string };
  slide9Title?: string;
  slide9Description?: string;
  slide9CtaText?: string;
  slide9CtaLink?: { href?: string; target?: string };
  slide9ShowCta?: boolean;
  slide10Visible?: boolean;
  slide10Image?: { src: string; alt?: string };
  slide10Title?: string;
  slide10Description?: string;
  slide10CtaText?: string;
  slide10CtaLink?: { href?: string; target?: string };
  slide10ShowCta?: boolean;
  slide11Visible?: boolean;
  slide11Image?: { src: string; alt?: string };
  slide11Title?: string;
  slide11Description?: string;
  slide11CtaText?: string;
  slide11CtaLink?: { href?: string; target?: string };
  slide11ShowCta?: boolean;
  slide12Visible?: boolean;
  slide12Image?: { src: string; alt?: string };
  slide12Title?: string;
  slide12Description?: string;
  slide12CtaText?: string;
  slide12CtaLink?: { href?: string; target?: string };
  slide12ShowCta?: boolean;
}

interface Slide {
  visible: boolean;
  image?: { src: string; alt?: string };
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: { href?: string; target?: string };
  showCta: boolean;
}

export default function CarouselSlider({
  id,
  transitionEffect = "slide",
  aspectRatio = "16:9",
  showPeek = false,
  autoPlay = true,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  enableLoop = true,
  showArrows = true,
  showDots = true,
  slide1Visible = true,
  slide1Image,
  slide1Title = "Discover Amazing Features",
  slide1Description = "Experience the next generation of innovation with our cutting-edge solutions designed for modern businesses.",
  slide1CtaText = "Learn More",
  slide1CtaLink,
  slide1ShowCta = true,
  slide2Visible = true,
  slide2Image,
  slide2Title = "Built for Performance",
  slide2Description = "Lightning-fast performance meets intuitive design. Get more done with tools that work as hard as you do.",
  slide2CtaText = "Get Started",
  slide2CtaLink,
  slide2ShowCta = true,
  slide3Visible = true,
  slide3Image,
  slide3Title = "Trusted by Thousands",
  slide3Description = "Join thousands of satisfied customers who have transformed their workflow with our proven solutions.",
  slide3CtaText = "View Testimonials",
  slide3CtaLink,
  slide3ShowCta = true,
  slide4Visible = false,
  slide4Image,
  slide4Title = "Seamless Integration",
  slide4Description = "Connect with your favorite tools and platforms. Our integrations make it easy to work the way you want.",
  slide4CtaText = "Explore Integrations",
  slide4CtaLink,
  slide4ShowCta = true,
  slide5Visible = false,
  slide5Image,
  slide5Title = "Enterprise Ready",
  slide5Description = "Scale with confidence. Enterprise-grade security and support for organizations of any size.",
  slide5CtaText = "Contact Sales",
  slide5CtaLink,
  slide5ShowCta = true,
  slide6Visible = false,
  slide6Image,
  slide6Title = "24/7 Support",
  slide6Description = "Our dedicated support team is always here to help. Get assistance whenever you need it, day or night.",
  slide6CtaText = "Get Support",
  slide6CtaLink,
  slide6ShowCta = true,
  slide7Visible = false,
  slide7Image,
  slide7Title = "Advanced Analytics",
  slide7Description = "Make data-driven decisions with powerful analytics and insights that help you understand what matters most.",
  slide7CtaText = "View Analytics",
  slide7CtaLink,
  slide7ShowCta = true,
  slide8Visible = false,
  slide8Image,
  slide8Title = "Mobile First",
  slide8Description = "Work from anywhere with our mobile-optimized platform. Full functionality on any device, anytime.",
  slide8CtaText = "Download App",
  slide8CtaLink,
  slide8ShowCta = true,
  slide9Visible = false,
  slide9Image,
  slide9Title = "Customizable Workflows",
  slide9Description = "Adapt the platform to your unique processes. Create custom workflows that match your team's needs perfectly.",
  slide9CtaText = "Customize Now",
  slide9CtaLink,
  slide9ShowCta = true,
  slide10Visible = false,
  slide10Image,
  slide10Title = "Secure by Design",
  slide10Description = "Your data is protected with industry-leading security measures. Compliance-ready and audit-friendly.",
  slide10CtaText = "Security Details",
  slide10CtaLink,
  slide10ShowCta = true,
  slide11Visible = false,
  slide11Image,
  slide11Title = "Collaborative Tools",
  slide11Description = "Bring your team together with real-time collaboration features. Work smarter, not harder, together.",
  slide11CtaText = "Start Collaborating",
  slide11CtaLink,
  slide11ShowCta = true,
  slide12Visible = false,
  slide12Image,
  slide12Title = "Start Your Journey",
  slide12Description = "Ready to transform your business? Join us today and experience the difference for yourself.",
  slide12CtaText = "Sign Up Free",
  slide12CtaLink,
  slide12ShowCta = true,
}: CarouselSliderProps) {
  const allSlides: Slide[] = [
    { visible: slide1Visible, image: slide1Image, title: slide1Title, description: slide1Description, ctaText: slide1CtaText, ctaLink: slide1CtaLink, showCta: slide1ShowCta },
    { visible: slide2Visible, image: slide2Image, title: slide2Title, description: slide2Description, ctaText: slide2CtaText, ctaLink: slide2CtaLink, showCta: slide2ShowCta },
    { visible: slide3Visible, image: slide3Image, title: slide3Title, description: slide3Description, ctaText: slide3CtaText, ctaLink: slide3CtaLink, showCta: slide3ShowCta },
    { visible: slide4Visible, image: slide4Image, title: slide4Title, description: slide4Description, ctaText: slide4CtaText, ctaLink: slide4CtaLink, showCta: slide4ShowCta },
    { visible: slide5Visible, image: slide5Image, title: slide5Title, description: slide5Description, ctaText: slide5CtaText, ctaLink: slide5CtaLink, showCta: slide5ShowCta },
    { visible: slide6Visible, image: slide6Image, title: slide6Title, description: slide6Description, ctaText: slide6CtaText, ctaLink: slide6CtaLink, showCta: slide6ShowCta },
    { visible: slide7Visible, image: slide7Image, title: slide7Title, description: slide7Description, ctaText: slide7CtaText, ctaLink: slide7CtaLink, showCta: slide7ShowCta },
    { visible: slide8Visible, image: slide8Image, title: slide8Title, description: slide8Description, ctaText: slide8CtaText, ctaLink: slide8CtaLink, showCta: slide8ShowCta },
    { visible: slide9Visible, image: slide9Image, title: slide9Title, description: slide9Description, ctaText: slide9CtaText, ctaLink: slide9CtaLink, showCta: slide9ShowCta },
    { visible: slide10Visible, image: slide10Image, title: slide10Title, description: slide10Description, ctaText: slide10CtaText, ctaLink: slide10CtaLink, showCta: slide10ShowCta },
    { visible: slide11Visible, image: slide11Image, title: slide11Title, description: slide11Description, ctaText: slide11CtaText, ctaLink: slide11CtaLink, showCta: slide11ShowCta },
    { visible: slide12Visible, image: slide12Image, title: slide12Title, description: slide12Description, ctaText: slide12CtaText, ctaLink: slide12CtaLink, showCta: slide12ShowCta },
  ];

  const visibleSlides = allSlides.filter(slide => slide.visible);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioMap: Record<string, string> = {
    "16:9": "56.25%",
    "4:3": "75%",
    "21:9": "42.86%",
    "1:1": "100%",
    "3:2": "66.67%",
  };

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(enableLoop ? visibleSlides.length - 1 : 0);
    } else if (index >= visibleSlides.length) {
      setCurrentIndex(enableLoop ? 0 : visibleSlides.length - 1);
    } else {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  useEffect(() => {
    if (!autoPlay || isPaused || visibleSlides.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, currentIndex, autoPlayInterval, visibleSlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  if (visibleSlides.length === 0) {
    return (
      <div id={id} className="wf-carouselslider">
        <div className="wf-carouselslider-empty">No slides to display</div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="wf-carouselslider"
      style={{
        "--wf-carouselslider-aspect-ratio": aspectRatioMap[aspectRatio],
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      <div className={`wf-carouselslider-container ${showPeek ? "wf-carouselslider-container--peek" : ""}`}>
        <div
          className={`wf-carouselslider-track wf-carouselslider-track--${transitionEffect}`}
          style={{
            transform: transitionEffect === "slide" ? `translateX(-${currentIndex * 100}%)` : undefined,
          }}
        >
          {visibleSlides.map((slide, index) => (
            <div
              key={index}
              className={`wf-carouselslider-slide ${
                transitionEffect === "fade"
                  ? index === currentIndex
                    ? "wf-carouselslider-slide--active"
                    : "wf-carouselslider-slide--inactive"
                  : ""
              }`}
            >
              <div className="wf-carouselslider-slide-content">
                {slide.image && (
                  <div className="wf-carouselslider-image-wrapper">
                    <img
                      src={slide.image.src}
                      alt={slide.image.alt || slide.title}
                      className="wf-carouselslider-image"
                    />
                  </div>
                )}
                <div className="wf-carouselslider-text-content">
                  <h2 className="wf-carouselslider-title">{slide.title}</h2>
                  <p className="wf-carouselslider-description">{slide.description}</p>
                  {slide.showCta && (
                    <a
                      href={slide.ctaLink?.href || "#"}
                      target={slide.ctaLink?.target}
                      className="wf-carouselslider-cta"
                    >
                      {slide.ctaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showArrows && visibleSlides.length > 1 && (
          <>
            <button
              className="wf-carouselslider-arrow wf-carouselslider-arrow--prev"
              onClick={goToPrevious}
              aria-label="Previous slide"
              disabled={!enableLoop && currentIndex === 0}
            >
              <svg
                className="wf-carouselslider-arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="wf-carouselslider-arrow wf-carouselslider-arrow--next"
              onClick={goToNext}
              aria-label="Next slide"
              disabled={!enableLoop && currentIndex === visibleSlides.length - 1}
            >
              <svg
                className="wf-carouselslider-arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {showDots && visibleSlides.length > 1 && (
        <div className="wf-carouselslider-dots">
          {visibleSlides.map((_, index) => (
            <button
              key={index}
              className={`wf-carouselslider-dot ${
                index === currentIndex ? "wf-carouselslider-dot--active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}