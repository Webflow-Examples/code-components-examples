import { useState, useMemo, useEffect } from "react";

export interface DataTableProps {
  id?: string;
  heading?: React.ReactNode;
  dataJson?: string;
  density?: "compact" | "comfortable";
  showStripedRows?: boolean;
  showHoverHighlight?: boolean;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showRowCount?: boolean;
  rowCountText?: string;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  enableSorting?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: "ascending" | "descending";
  column1Key?: string;
  column1Label?: string;
  column1Visible?: boolean;
  column2Key?: string;
  column2Label?: string;
  column2Visible?: boolean;
  column3Key?: string;
  column3Label?: string;
  column3Visible?: boolean;
  column4Key?: string;
  column4Label?: string;
  column4Visible?: boolean;
  column5Key?: string;
  column5Label?: string;
  column5Visible?: boolean;
  column6Key?: string;
  column6Label?: string;
  column6Visible?: boolean;
  column7Key?: string;
  column7Label?: string;
  column7Visible?: boolean;
  column8Key?: string;
  column8Label?: string;
  column8Visible?: boolean;
  column9Key?: string;
  column9Label?: string;
  column9Visible?: boolean;
  column10Key?: string;
  column10Label?: string;
  column10Visible?: boolean;
}

interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
}

type SortDirection = "ascending" | "descending" | null;

export default function DataTable({
  id,
  heading = "Data Table",
  dataJson = '[{"name":"Alice Johnson","email":"alice@example.com","role":"Designer","status":"Active"},{"name":"Bob Smith","email":"bob@example.com","role":"Developer","status":"Active"},{"name":"Carol White","email":"carol@example.com","role":"Manager","status":"Inactive"}]',
  density = "comfortable",
  showStripedRows = true,
  showHoverHighlight = true,
  searchPlaceholder = "Search across all columns...",
  showSearch = true,
  showRowCount = true,
  rowCountText = "Showing {filtered} of {total} rows",
  emptyStateHeading = "No results found",
  emptyStateMessage = "Try adjusting your search to find what you're looking for.",
  enableSorting = true,
  defaultSortColumn = "",
  defaultSortDirection = "ascending",
  column1Key = "name",
  column1Label = "Name",
  column1Visible = true,
  column2Key = "email",
  column2Label = "Email",
  column2Visible = true,
  column3Key = "role",
  column3Label = "Role",
  column3Visible = true,
  column4Key = "status",
  column4Label = "Status",
  column4Visible = true,
  column5Key = "",
  column5Label = "Column 5",
  column5Visible = true,
  column6Key = "",
  column6Label = "Column 6",
  column6Visible = true,
  column7Key = "",
  column7Label = "Column 7",
  column7Visible = true,
  column8Key = "",
  column8Label = "Column 8",
  column8Visible = true,
  column9Key = "",
  column9Label = "Column 9",
  column9Visible = true,
  column10Key = "",
  column10Label = "Column 10",
  column10Visible = true,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(
    defaultSortColumn || null
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    defaultSortColumn ? defaultSortDirection : null
  );

  const columns: ColumnConfig[] = useMemo(
    () =>
      [
        { key: column1Key, label: column1Label, visible: column1Visible },
        { key: column2Key, label: column2Label, visible: column2Visible },
        { key: column3Key, label: column3Label, visible: column3Visible },
        { key: column4Key, label: column4Label, visible: column4Visible },
        { key: column5Key, label: column5Label, visible: column5Visible },
        { key: column6Key, label: column6Label, visible: column6Visible },
        { key: column7Key, label: column7Label, visible: column7Visible },
        { key: column8Key, label: column8Label, visible: column8Visible },
        { key: column9Key, label: column9Label, visible: column9Visible },
        { key: column10Key, label: column10Label, visible: column10Visible },
      ].filter((col) => col.key && col.visible),
    [
      column1Key,
      column1Label,
      column1Visible,
      column2Key,
      column2Label,
      column2Visible,
      column3Key,
      column3Label,
      column3Visible,
      column4Key,
      column4Label,
      column4Visible,
      column5Key,
      column5Label,
      column5Visible,
      column6Key,
      column6Label,
      column6Visible,
      column7Key,
      column7Label,
      column7Visible,
      column8Key,
      column8Label,
      column8Visible,
      column9Key,
      column9Label,
      column9Visible,
      column10Key,
      column10Label,
      column10Visible,
    ]
  );

  const data: Record<string, any>[] = useMemo(() => {
    try {
      const parsed = JSON.parse(dataJson);
      return Array.isArray(parsed) ? parsed.slice(0, 100) : [];
    } catch {
      return [];
    }
  }, [dataJson]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        return value != null && String(value).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, columns]);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      const comparison = aStr.localeCompare(bStr, undefined, { numeric: true });
      return sortDirection === "ascending" ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (columnKey: string) => {
    if (!enableSorting) return;

    if (sortColumn === columnKey) {
      if (sortDirection === "ascending") {
        setSortDirection("descending");
      } else if (sortDirection === "descending") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("ascending");
    }
  };

  const rowCountDisplay = rowCountText
    .replace("{filtered}", String(sortedData.length))
    .replace("{total}", String(data.length));

  return (
    <div
      id={id}
      className="wf-datatable"
      data-density={density}
      data-striped={showStripedRows}
      data-hover={showHoverHighlight}
    >
      <div className="wf-datatable-header">
        <h2 className="wf-datatable-heading">{heading}</h2>
        {showSearch && (
          <div className="wf-datatable-search-wrapper">
            <input
              type="search"
              className="wf-datatable-search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search table"
            />
          </div>
        )}
        {showRowCount && (
          <div className="wf-datatable-row-count">{rowCountDisplay}</div>
        )}
      </div>

      {sortedData.length === 0 ? (
        <div className="wf-datatable-empty-state">
          <h3 className="wf-datatable-empty-heading">{emptyStateHeading}</h3>
          <p className="wf-datatable-empty-message">{emptyStateMessage}</p>
        </div>
      ) : (
        <>
          <div className="wf-datatable-desktop">
            <table className="wf-datatable-table">
              <thead className="wf-datatable-thead">
                <tr className="wf-datatable-header-row">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="wf-datatable-th"
                      onClick={() => handleSort(col.key)}
                      role={enableSorting ? "button" : undefined}
                      aria-sort={
                        sortColumn === col.key
                          ? sortDirection === "ascending"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      tabIndex={enableSorting ? 0 : undefined}
                      onKeyDown={
                        enableSorting
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSort(col.key);
                              }
                            }
                          : undefined
                      }
                    >
                      <span className="wf-datatable-th-content">
                        {col.label}
                        {enableSorting && sortColumn === col.key && (
                          <span className="wf-datatable-sort-indicator">
                            {sortDirection === "ascending" ? "↑" : "↓"}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="wf-datatable-tbody">
                {sortedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="wf-datatable-row">
                    {columns.map((col) => (
                      <td key={col.key} className="wf-datatable-td">
                        {row[col.key] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="wf-datatable-mobile">
            {sortedData.map((row, rowIndex) => (
              <div key={rowIndex} className="wf-datatable-card">
                {columns.map((col) => (
                  <div key={col.key} className="wf-datatable-card-row">
                    <span className="wf-datatable-card-label">{col.label}</span>
                    <span className="wf-datatable-card-value">
                      {row[col.key] ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}