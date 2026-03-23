import { useState, useEffect, useMemo } from "react";

export interface JobBoardProps {
  id?: string;
  boardToken?: string;
  heading?: React.ReactNode;
  subheading?: string;
  layout?: "2-column" | "3-column" | "4-column";
  cardStyle?: "elevated" | "outlined" | "minimal";
  showFilters?: boolean;
  filterDepartmentLabel?: string;
  filterLocationLabel?: string;
  filterAllDepartmentsText?: string;
  filterAllLocationsText?: string;
  jobsPerPage?: number;
  paginationType?: "load-more" | "pagination" | "show-all";
  loadMoreButtonText?: string;
  previousButtonText?: string;
  nextButtonText?: string;
  applyButtonText?: string;
  departmentLabelText?: string;
  locationLabelText?: string;
  showDepartmentOnCard?: boolean;
  showLocationOnCard?: boolean;
  openInNewTab?: boolean;
  loadingText?: string;
  showLoadingSpinner?: boolean;
  errorHeading?: string;
  errorMessage?: string;
  retryButtonText?: string;
  showRetryButton?: boolean;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  resultsCountText?: string;
  showResultsCount?: boolean;
  cacheTimeout?: number;
}

interface GreenhouseJob {
  id: number;
  title: string;
  absolute_url: string;
  location?: {
    name: string;
  };
  departments?: Array<{
    id: number;
    name: string;
  }>;
  offices?: Array<{
    id: number;
    name: string;
    location?: string;
  }>;
  content?: string;
  updated_at: string;
  requisition_id?: string;
  metadata?: Array<{
    id: number;
    name: string;
    value: string;
  }>;
}

interface GreenhouseResponse {
  jobs: GreenhouseJob[];
}

const layoutColumns = {
  "2-column": "2",
  "3-column": "3",
  "4-column": "4",
};

export default function JobBoard({
  id,
  boardToken = "",
  heading = "Open Positions",
  subheading = "Join our team and help us build the future",
  layout = "3-column",
  cardStyle = "elevated",
  showFilters = true,
  filterDepartmentLabel = "Department",
  filterLocationLabel = "Location",
  filterAllDepartmentsText = "All Departments",
  filterAllLocationsText = "All Locations",
  jobsPerPage = 12,
  paginationType = "load-more",
  loadMoreButtonText = "Load More Jobs",
  previousButtonText = "Previous",
  nextButtonText = "Next",
  applyButtonText = "Apply Now",
  departmentLabelText = "Department:",
  locationLabelText = "Location:",
  showDepartmentOnCard = true,
  showLocationOnCard = true,
  openInNewTab = true,
  loadingText = "Loading open positions...",
  showLoadingSpinner = true,
  errorHeading = "Unable to Load Jobs",
  errorMessage = "We're having trouble loading our open positions. Please try again later or contact us directly.",
  retryButtonText = "Try Again",
  showRetryButton = true,
  emptyStateHeading = "No Positions Available",
  emptyStateMessage = "There are no open positions matching your criteria at this time. Check back soon or adjust your filters.",
  resultsCountText = "{count} positions found",
  showResultsCount = true,
  cacheTimeout = 5,
}: JobBoardProps) {
  const [jobs, setJobs] = useState<GreenhouseJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async () => {
    if (!boardToken) {
      setError("Board token is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs?content=true`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data: GreenhouseResponse = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [boardToken]);

  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    jobs.forEach((job) => {
      (job.departments || []).forEach((dept) => {
        deptSet.add(dept.name);
      });
    });
    return Array.from(deptSet).sort();
  }, [jobs]);

  const locations = useMemo(() => {
    const locSet = new Set<string>();
    jobs.forEach((job) => {
      if (job.location?.name) {
        locSet.add(job.location.name);
      }
      (job.offices || []).forEach((office) => {
        if (office.name) {
          locSet.add(office.name);
        }
      });
    });
    return Array.from(locSet).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedDepartment) {
        const jobDepts = (job.departments || []).map((d) => d.name);
        if (!jobDepts.includes(selectedDepartment)) {
          return false;
        }
      }

      if (selectedLocation) {
        const jobLocs: string[] = [];
        if (job.location?.name) {
          jobLocs.push(job.location.name);
        }
        (job.offices || []).forEach((office) => {
          if (office.name) {
            jobLocs.push(office.name);
          }
        });
        if (!jobLocs.includes(selectedLocation)) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, selectedDepartment, selectedLocation]);

  const paginatedJobs = useMemo(() => {
    if (paginationType === "show-all") {
      return filteredJobs;
    }
    if (paginationType === "load-more") {
      return filteredJobs.slice(0, currentPage * jobsPerPage);
    }
    const start = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(start, start + jobsPerPage);
  }, [filteredJobs, currentPage, jobsPerPage, paginationType]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const hasMore = paginatedJobs.length < filteredJobs.length;

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleRetry = () => {
    fetchJobs();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const getJobDepartment = (job: GreenhouseJob): string => {
    return (job.departments || [])[0]?.name ?? "";
  };

  const getJobLocation = (job: GreenhouseJob): string => {
    if (job.location?.name) {
      return job.location.name;
    }
    return (job.offices || [])[0]?.name ?? "";
  };

  const columns = layoutColumns[layout];

  if (loading) {
    return (
      <div id={id} className="wf-jobboard">
        <div className="wf-jobboard-loading">
          {showLoadingSpinner && (
            <div className="wf-jobboard-spinner" aria-hidden="true"></div>
          )}
          <p className="wf-jobboard-loading-text">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id={id} className="wf-jobboard">
        <div className="wf-jobboard-error">
          <h2 className="wf-jobboard-error-heading">{errorHeading}</h2>
          <p className="wf-jobboard-error-message">{errorMessage}</p>
          {showRetryButton && (
            <button
              className="wf-jobboard-retry-button"
              onClick={handleRetry}
              type="button"
            >
              {retryButtonText}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div id={id} className="wf-jobboard">
        <div className="wf-jobboard-empty">
          <h2 className="wf-jobboard-empty-heading">{emptyStateHeading}</h2>
          <p className="wf-jobboard-empty-message">{emptyStateMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="wf-jobboard"
      style={{ "--wf-jobboard-columns": columns } as React.CSSProperties}
    >
      <header className="wf-jobboard-header">
        <h1 className="wf-jobboard-heading">{heading}</h1>
        {subheading && (
          <p className="wf-jobboard-subheading">{subheading}</p>
        )}
      </header>

      {showFilters && (departments.length > 0 || locations.length > 0) && (
        <div className="wf-jobboard-filters">
          {departments.length > 0 && (
            <div className="wf-jobboard-filter">
              <label htmlFor="department-filter" className="wf-jobboard-filter-label">
                {filterDepartmentLabel}
              </label>
              <select
                id="department-filter"
                className="wf-jobboard-filter-select"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                <option value="">{filterAllDepartmentsText}</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {locations.length > 0 && (
            <div className="wf-jobboard-filter">
              <label htmlFor="location-filter" className="wf-jobboard-filter-label">
                {filterLocationLabel}
              </label>
              <select
                id="location-filter"
                className="wf-jobboard-filter-select"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">{filterAllLocationsText}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {showResultsCount && (
        <div className="wf-jobboard-results-count">
          {resultsCountText.replace("{count}", filteredJobs.length.toString())}
        </div>
      )}

      {filteredJobs.length === 0 ? (
        <div className="wf-jobboard-empty">
          <h2 className="wf-jobboard-empty-heading">{emptyStateHeading}</h2>
          <p className="wf-jobboard-empty-message">{emptyStateMessage}</p>
        </div>
      ) : (
        <>
          <div className={`wf-jobboard-grid wf-jobboard-grid-${cardStyle}`}>
            {paginatedJobs.map((job) => (
              <article key={job.id} className={`wf-jobboard-card wf-jobboard-card-${cardStyle}`}>
                <h3 className="wf-jobboard-card-title">{job.title}</h3>

                <div className="wf-jobboard-card-meta">
                  {showDepartmentOnCard && getJobDepartment(job) && (
                    <div className="wf-jobboard-card-meta-item">
                      <span className="wf-jobboard-card-meta-label">
                        {departmentLabelText}
                      </span>
                      <span className="wf-jobboard-card-meta-value">
                        {getJobDepartment(job)}
                      </span>
                    </div>
                  )}

                  {showLocationOnCard && getJobLocation(job) && (
                    <div className="wf-jobboard-card-meta-item">
                      <span className="wf-jobboard-card-meta-label">
                        {locationLabelText}
                      </span>
                      <span className="wf-jobboard-card-meta-value">
                        {getJobLocation(job)}
                      </span>
                    </div>
                  )}
                </div>

                <a
                  href={job.absolute_url}
                  className="wf-jobboard-card-button"
                  target={openInNewTab ? "_blank" : undefined}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {applyButtonText}
                </a>
              </article>
            ))}
          </div>

          {paginationType === "load-more" && hasMore && (
            <div className="wf-jobboard-pagination">
              <button
                className="wf-jobboard-load-more"
                onClick={handleLoadMore}
                type="button"
              >
                {loadMoreButtonText}
              </button>
            </div>
          )}

          {paginationType === "pagination" && totalPages > 1 && (
            <div className="wf-jobboard-pagination">
              <button
                className="wf-jobboard-pagination-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                type="button"
              >
                {previousButtonText}
              </button>
              <span className="wf-jobboard-pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="wf-jobboard-pagination-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                type="button"
              >
                {nextButtonText}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}