import { useState, useMemo } from "react";

export interface CmsFilterSearchProps {
  id?: string;
  viewMode?: "grid" | "list";
  gridColumns?: "2" | "3" | "4";
  heading?: React.ReactNode;
  searchPlaceholder?: string;
  categoryFilterLabel?: string;
  allCategoriesText?: string;
  itemCountText?: string;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  clearFiltersText?: string;
  showViewToggle?: boolean;
  showItemCount?: boolean;
  showCategoryFilters?: boolean;
  enableAnimations?: boolean;
  item1Visible?: boolean;
  item1Image?: { src: string; alt?: string };
  item1Title?: string;
  item1Description?: string;
  item1Category?: string;
  item1Link?: { href?: string; target?: string };
  item2Visible?: boolean;
  item2Image?: { src: string; alt?: string };
  item2Title?: string;
  item2Description?: string;
  item2Category?: string;
  item2Link?: { href?: string; target?: string };
  item3Visible?: boolean;
  item3Image?: { src: string; alt?: string };
  item3Title?: string;
  item3Description?: string;
  item3Category?: string;
  item3Link?: { href?: string; target?: string };
  item4Visible?: boolean;
  item4Image?: { src: string; alt?: string };
  item4Title?: string;
  item4Description?: string;
  item4Category?: string;
  item4Link?: { href?: string; target?: string };
  item5Visible?: boolean;
  item5Image?: { src: string; alt?: string };
  item5Title?: string;
  item5Description?: string;
  item5Category?: string;
  item5Link?: { href?: string; target?: string };
  item6Visible?: boolean;
  item6Image?: { src: string; alt?: string };
  item6Title?: string;
  item6Description?: string;
  item6Category?: string;
  item6Link?: { href?: string; target?: string };
}

interface CollectionItem {
  image?: { src: string; alt?: string };
  title: string;
  description: string;
  category: string;
  link?: { href?: string; target?: string };
}

export default function CmsFilterSearch({
  id,
  viewMode = "grid",
  gridColumns = "3",
  heading = "Browse Our Collection",
  searchPlaceholder = "Search by title or description...",
  categoryFilterLabel = "Filter by category:",
  allCategoriesText = "All",
  itemCountText = "Showing {count} items",
  emptyStateHeading = "No items found",
  emptyStateMessage = "Try adjusting your search or filters to find what you're looking for.",
  clearFiltersText = "Clear all filters",
  showViewToggle = true,
  showItemCount = true,
  showCategoryFilters = true,
  enableAnimations = true,
  item1Visible = true,
  item1Image,
  item1Title = "Product Design Workshop",
  item1Description = "Learn the fundamentals of product design with hands-on exercises and real-world examples.",
  item1Category = "Design",
  item1Link,
  item2Visible = true,
  item2Image,
  item2Title = "Advanced JavaScript Patterns",
  item2Description = "Master advanced JavaScript concepts including closures, prototypes, and async programming.",
  item2Category = "Development",
  item2Link,
  item3Visible = true,
  item3Image,
  item3Title = "Content Marketing Strategy",
  item3Description = "Build a comprehensive content marketing strategy that drives engagement and conversions.",
  item3Category = "Marketing",
  item3Link,
  item4Visible = true,
  item4Image,
  item4Title = "Data Analytics Fundamentals",
  item4Description = "Understand how to collect, analyze, and visualize data to make informed business decisions.",
  item4Category = "Analytics",
  item4Link,
  item5Visible = true,
  item5Image,
  item5Title = "Brand Identity Design",
  item5Description = "Create cohesive brand identities that resonate with your target audience and stand out.",
  item5Category = "Design",
  item5Link,
  item6Visible = true,
  item6Image,
  item6Title = "React Performance Optimization",
  item6Description = "Learn techniques to optimize React applications for maximum performance and user experience.",
  item6Category = "Development",
  item6Link,
}: CmsFilterSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState<"grid" | "list">(viewMode);

  const allItems: CollectionItem[] = useMemo(() => {
    const items: CollectionItem[] = [];
    if (item1Visible) {
      items.push({
        image: item1Image,
        title: item1Title,
        description: item1Description,
        category: item1Category,
        link: item1Link,
      });
    }
    if (item2Visible) {
      items.push({
        image: item2Image,
        title: item2Title,
        description: item2Description,
        category: item2Category,
        link: item2Link,
      });
    }
    if (item3Visible) {
      items.push({
        image: item3Image,
        title: item3Title,
        description: item3Description,
        category: item3Category,
        link: item3Link,
      });
    }
    if (item4Visible) {
      items.push({
        image: item4Image,
        title: item4Title,
        description: item4Description,
        category: item4Category,
        link: item4Link,
      });
    }
    if (item5Visible) {
      items.push({
        image: item5Image,
        title: item5Title,
        description: item5Description,
        category: item5Category,
        link: item5Link,
      });
    }
    if (item6Visible) {
      items.push({
        image: item6Image,
        title: item6Title,
        description: item6Description,
        category: item6Category,
        link: item6Link,
      });
    }
    return items;
  }, [
    item1Visible, item1Image, item1Title, item1Description, item1Category, item1Link,
    item2Visible, item2Image, item2Title, item2Description, item2Category, item2Link,
    item3Visible, item3Image, item3Title, item3Description, item3Category, item3Link,
    item4Visible, item4Image, item4Title, item4Description, item4Category, item4Link,
    item5Visible, item5Image, item5Title, item5Description, item5Category, item5Link,
    item6Visible, item6Image, item6Title, item6Description, item6Category, item6Link,
  ]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allItems.forEach((item) => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [allItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allItems, searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== null;

  const itemCountDisplay = itemCountText.replace("{count}", filteredItems.length.toString());

  return (
    <div
      id={id}
      className="wf-cmsfiltersearch"
      style={
        {
          "--wf-cmsfiltersearch-grid-columns": gridColumns,
        } as React.CSSProperties
      }
    >
      <header className="wf-cmsfiltersearch-header">
        <h1 className="wf-cmsfiltersearch-heading">{heading}</h1>
      </header>

      <div className="wf-cmsfiltersearch-controls">
        <div className="wf-cmsfiltersearch-search-wrapper">
          <input
            type="search"
            className="wf-cmsfiltersearch-search-input"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search items"
          />
        </div>

        {showCategoryFilters && categories.length > 0 && (
          <div className="wf-cmsfiltersearch-category-filters">
            <span className="wf-cmsfiltersearch-category-label">{categoryFilterLabel}</span>
            <div className="wf-cmsfiltersearch-category-buttons">
              <button
                className={`wf-cmsfiltersearch-category-button ${
                  selectedCategory === null ? "wf-cmsfiltersearch-category-button-active" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                {allCategoriesText}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`wf-cmsfiltersearch-category-button ${
                    selectedCategory === category ? "wf-cmsfiltersearch-category-button-active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="wf-cmsfiltersearch-toolbar">
          {showItemCount && (
            <div className="wf-cmsfiltersearch-item-count">{itemCountDisplay}</div>
          )}
          {hasActiveFilters && (
            <button
              className="wf-cmsfiltersearch-clear-button"
              onClick={handleClearFilters}
            >
              {clearFiltersText}
            </button>
          )}
          {showViewToggle && (
            <div className="wf-cmsfiltersearch-view-toggle">
              <button
                className={`wf-cmsfiltersearch-view-button ${
                  currentViewMode === "grid" ? "wf-cmsfiltersearch-view-button-active" : ""
                }`}
                onClick={() => setCurrentViewMode("grid")}
                aria-label="Grid view"
              >
                <svg
                  className="wf-cmsfiltersearch-view-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="7" height="7" rx="1" fill="currentColor" />
                  <rect x="11" y="2" width="7" height="7" rx="1" fill="currentColor" />
                  <rect x="2" y="11" width="7" height="7" rx="1" fill="currentColor" />
                  <rect x="11" y="11" width="7" height="7" rx="1" fill="currentColor" />
                </svg>
              </button>
              <button
                className={`wf-cmsfiltersearch-view-button ${
                  currentViewMode === "list" ? "wf-cmsfiltersearch-view-button-active" : ""
                }`}
                onClick={() => setCurrentViewMode("list")}
                aria-label="List view"
              >
                <svg
                  className="wf-cmsfiltersearch-view-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="3" width="16" height="3" rx="1" fill="currentColor" />
                  <rect x="2" y="8.5" width="16" height="3" rx="1" fill="currentColor" />
                  <rect x="2" y="14" width="16" height="3" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="wf-cmsfiltersearch-empty-state">
          <h2 className="wf-cmsfiltersearch-empty-heading">{emptyStateHeading}</h2>
          <p className="wf-cmsfiltersearch-empty-message">{emptyStateMessage}</p>
        </div>
      ) : (
        <div
          className={`wf-cmsfiltersearch-items wf-cmsfiltersearch-items-${currentViewMode} ${
            enableAnimations ? "wf-cmsfiltersearch-items-animated" : ""
          }`}
        >
          {filteredItems.map((item, index) => {
            const CardWrapper = item.link?.href ? "a" : "div";
            const cardProps = item.link?.href
              ? { href: item.link.href, target: item.link.target, className: "wf-cmsfiltersearch-card" }
              : { className: "wf-cmsfiltersearch-card" };

            return (
              <CardWrapper key={index} {...cardProps}>
                {item.image && (
                  <div className="wf-cmsfiltersearch-card-image-wrapper">
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      className="wf-cmsfiltersearch-card-image"
                    />
                  </div>
                )}
                <div className="wf-cmsfiltersearch-card-content">
                  <div className="wf-cmsfiltersearch-card-header">
                    <h3 className="wf-cmsfiltersearch-card-title">{item.title}</h3>
                    {item.category && (
                      <span className="wf-cmsfiltersearch-card-category">{item.category}</span>
                    )}
                  </div>
                  <p className="wf-cmsfiltersearch-card-description">{item.description}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}