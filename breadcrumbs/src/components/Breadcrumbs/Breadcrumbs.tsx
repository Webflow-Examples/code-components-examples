import { useState } from "react";

interface LinkProp {
  href?: string;
  target?: string;
}

export interface BreadcrumbsProps {
  id?: string;
  separator?: "slash" | "chevron" | "arrow";
  homeLink?: LinkProp;
  level1Label?: string;
  level1Link?: LinkProp;
  level1Visible?: boolean;
  level2Label?: string;
  level2Link?: LinkProp;
  level2Visible?: boolean;
  level3Label?: string;
  level3Link?: LinkProp;
  level3Visible?: boolean;
  level4Label?: string;
  level4Link?: LinkProp;
  level4Visible?: boolean;
  level5Label?: string;
  level5Link?: LinkProp;
  level5Visible?: boolean;
  currentPageLabel?: string;
}

export default function Breadcrumbs({
  id,
  separator = "chevron",
  homeLink,
  level1Label = "Products",
  level1Link,
  level1Visible = true,
  level2Label = "Electronics",
  level2Link,
  level2Visible = true,
  level3Label = "Laptops",
  level3Link,
  level3Visible = true,
  level4Label = "Gaming",
  level4Link,
  level4Visible = true,
  level5Label = "High Performance",
  level5Link,
  level5Visible = true,
  currentPageLabel = "Gaming Laptop X1",
}: BreadcrumbsProps) {
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  const separatorMap = {
    slash: "/",
    chevron: "›",
    arrow: "→",
  };

  const separatorChar = separatorMap[separator];

  const levels = [
    { label: level1Label, link: level1Link, visible: level1Visible },
    { label: level2Label, link: level2Link, visible: level2Visible },
    { label: level3Label, link: level3Link, visible: level3Visible },
    { label: level4Label, link: level4Link, visible: level4Visible },
    { label: level5Label, link: level5Link, visible: level5Visible },
  ].filter((level) => level.visible);

  const renderSeparator = () => (
    <span className="wf-breadcrumbs-separator" aria-hidden="true">
      {separatorChar}
    </span>
  );

  const renderDesktopBreadcrumbs = () => (
    <ol className="wf-breadcrumbs-list wf-breadcrumbs-desktop">
      <li className="wf-breadcrumbs-item">
        <a href={homeLink?.href || "/"} target={homeLink?.target} className="wf-breadcrumbs-link wf-breadcrumbs-home">
          <svg
            className="wf-breadcrumbs-home-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 6L8 1.5L14 6V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="wf-breadcrumbs-sr-only">Home</span>
        </a>
      </li>
      {levels.map((level, index) => (
        <li key={index} className="wf-breadcrumbs-item">
          {renderSeparator()}
          <a href={level.link?.href || "#"} target={level.link?.target} className="wf-breadcrumbs-link">
            {level.label}
          </a>
        </li>
      ))}
      <li className="wf-breadcrumbs-item">
        {renderSeparator()}
        <span className="wf-breadcrumbs-current" aria-current="page">
          {currentPageLabel}
        </span>
      </li>
    </ol>
  );

  const renderMobileBreadcrumbs = () => {
    if (levels.length <= 2) {
      return (
        <ol className="wf-breadcrumbs-list wf-breadcrumbs-mobile">
          <li className="wf-breadcrumbs-item">
            <a
              href={homeLink?.href || "/"}
              target={homeLink?.target}
              className="wf-breadcrumbs-link wf-breadcrumbs-home"
            >
              <svg
                className="wf-breadcrumbs-home-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 6L8 1.5L14 6V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V6Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="wf-breadcrumbs-sr-only">Home</span>
            </a>
          </li>
          {levels.map((level, index) => (
            <li key={index} className="wf-breadcrumbs-item">
              {renderSeparator()}
              <a href={level.link?.href || "#"} target={level.link?.target} className="wf-breadcrumbs-link">
                {level.label}
              </a>
            </li>
          ))}
          <li className="wf-breadcrumbs-item">
            {renderSeparator()}
            <span className="wf-breadcrumbs-current" aria-current="page">
              {currentPageLabel}
            </span>
          </li>
        </ol>
      );
    }

    const firstLevel = levels[0];
    const lastTwoLevels = levels.slice(-2);
    const middleLevels = levels.slice(1, -2);

    return (
      <ol className="wf-breadcrumbs-list wf-breadcrumbs-mobile">
        <li className="wf-breadcrumbs-item">
          <a href={homeLink?.href || "/"} target={homeLink?.target} className="wf-breadcrumbs-link wf-breadcrumbs-home">
            <svg
              className="wf-breadcrumbs-home-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 6L8 1.5L14 6V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="wf-breadcrumbs-sr-only">Home</span>
          </a>
        </li>
        <li className="wf-breadcrumbs-item">
          {renderSeparator()}
          <a href={firstLevel.link?.href || "#"} target={firstLevel.link?.target} className="wf-breadcrumbs-link">
            {firstLevel.label}
          </a>
        </li>
        <li className="wf-breadcrumbs-item wf-breadcrumbs-ellipsis-container">
          {renderSeparator()}
          <button
            className="wf-breadcrumbs-ellipsis-button"
            onClick={() => setEllipsisOpen(!ellipsisOpen)}
            aria-expanded={ellipsisOpen}
            aria-label="Show hidden breadcrumbs"
          >
            ...
          </button>
          {ellipsisOpen && (
            <div className="wf-breadcrumbs-ellipsis-menu">
              <ul className="wf-breadcrumbs-ellipsis-list">
                {middleLevels.map((level, index) => (
                  <li key={index} className="wf-breadcrumbs-ellipsis-item">
                    <a href={level.link?.href || "#"} target={level.link?.target} className="wf-breadcrumbs-link">
                      {level.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        {lastTwoLevels.map((level, index) => (
          <li key={index} className="wf-breadcrumbs-item">
            {renderSeparator()}
            <a href={level.link?.href || "#"} target={level.link?.target} className="wf-breadcrumbs-link">
              {level.label}
            </a>
          </li>
        ))}
        <li className="wf-breadcrumbs-item">
          {renderSeparator()}
          <span className="wf-breadcrumbs-current" aria-current="page">
            {currentPageLabel}
          </span>
        </li>
      </ol>
    );
  };

  return (
    <nav id={id} className="wf-breadcrumbs" aria-label="Breadcrumb">
      {renderDesktopBreadcrumbs()}
      {renderMobileBreadcrumbs()}
    </nav>
  );
}
