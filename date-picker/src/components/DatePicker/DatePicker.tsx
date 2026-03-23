import { useState, useRef, useEffect } from "react";

export interface DatePickerProps {
  id?: string;
  mode?: "single" | "range";
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  size?: "sm" | "md" | "lg";
  label?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  clearButtonText?: string;
  todayButtonText?: string;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  showLabel?: boolean;
  showClearButton?: boolean;
  showTodayButton?: boolean;
  showWeekNumbers?: boolean;
  highlightToday?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  closeOnSelect?: boolean;
  minDate?: string;
  maxDate?: string;
  defaultDate?: string;
  defaultStartDate?: string;
  defaultEndDate?: string;
  disabledDaysOfWeek?: string;
  firstDayOfWeek?: "sunday" | "monday";
  monthYearFormat?: "MMMM YYYY" | "MMM YYYY" | "MM/YYYY";
  helperText?: string;
  errorText?: string;
  showHelperText?: boolean;
  showErrorText?: boolean;
  name?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_MONDAY_FIRST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DatePicker({
  id,
  mode = "single",
  dateFormat = "MM/DD/YYYY",
  size = "md",
  label = "Select Date",
  placeholder = "Choose a date",
  startPlaceholder = "Start date",
  endPlaceholder = "End date",
  clearButtonText = "Clear date",
  todayButtonText = "Today",
  previousMonthLabel = "Previous month",
  nextMonthLabel = "Next month",
  showLabel = true,
  showClearButton = true,
  showTodayButton = true,
  showWeekNumbers = false,
  highlightToday = true,
  isDisabled = false,
  isRequired = false,
  closeOnSelect = true,
  minDate = "",
  maxDate = "",
  defaultDate = "",
  defaultStartDate = "",
  defaultEndDate = "",
  disabledDaysOfWeek = "",
  firstDayOfWeek = "sunday",
  monthYearFormat = "MMMM YYYY",
  helperText = "",
  errorText = "",
  showHelperText = true,
  showErrorText = false,
  name = "date",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultDate ? parseDate(defaultDate) : null
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(
    defaultStartDate ? parseDate(defaultStartDate) : null
  );
  const [rangeEnd, setRangeEnd] = useState<Date | null>(
    defaultEndDate ? parseDate(defaultEndDate) : null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [focusedDay, setFocusedDay] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const minDateObj = minDate ? parseDate(minDate) : null;
  const maxDateObj = maxDate ? parseDate(maxDate) : null;
  const disabledDays = disabledDaysOfWeek
    ? disabledDaysOfWeek.split(",").map((d) => parseInt(d.trim(), 10))
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && calendarRef.current && focusedDay !== null) {
      const dayButton = calendarRef.current.querySelector(
        `[data-day="${focusedDay}"]`
      ) as HTMLButtonElement;
      if (dayButton) {
        dayButton.focus();
      }
    }
  }, [focusedDay, isOpen]);

  function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10)
      );
    }
    return null;
  }

  function formatDate(date: Date | null): string {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "MM/DD/YYYY":
      default:
        return `${month}/${day}/${year}`;
    }
  }

  function getDisplayValue(): string {
    if (mode === "range") {
      const start = rangeStart ? formatDate(rangeStart) : "";
      const end = rangeEnd ? formatDate(rangeEnd) : "";
      if (start && end) return `${start} - ${end}`;
      if (start) return start;
      return "";
    }
    return selectedDate ? formatDate(selectedDate) : "";
  }

  function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(month: number, year: number): number {
    const day = new Date(year, month, 1).getDay();
    return firstDayOfWeek === "monday" ? (day === 0 ? 6 : day - 1) : day;
  }

  function getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  function isDateDisabled(date: Date): boolean {
    if (minDateObj && date < minDateObj) return true;
    if (maxDateObj && date > maxDateObj) return true;
    if (disabledDays.includes(date.getDay())) return true;
    return false;
  }

  function isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isInRange(date: Date): boolean {
    if (mode !== "range" || !rangeStart || !rangeEnd) return false;
    return date >= rangeStart && date <= rangeEnd;
  }

  function handleDayClick(day: number) {
    const clickedDate = new Date(currentYear, currentMonth, day);
    if (isDateDisabled(clickedDate)) return;

    if (mode === "range") {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(clickedDate);
        setRangeEnd(null);
      } else {
        if (clickedDate < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clickedDate);
        } else {
          setRangeEnd(clickedDate);
        }
        if (closeOnSelect) {
          setIsOpen(false);
        }
      }
    } else {
      setSelectedDate(clickedDate);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    }
  }

  function handleTodayClick() {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    if (mode === "range") {
      setRangeStart(today);
      setRangeEnd(null);
    } else {
      setSelectedDate(today);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    }
  }

  function handleClear() {
    if (mode === "range") {
      setRangeStart(null);
      setRangeEnd(null);
    } else {
      setSelectedDate(null);
    }
  }

  function handlePreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, day: number) {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    let newDay = day;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newDay = day > 1 ? day - 1 : day;
        break;
      case "ArrowRight":
        e.preventDefault();
        newDay = day < daysInMonth ? day + 1 : day;
        break;
      case "ArrowUp":
        e.preventDefault();
        newDay = day > 7 ? day - 7 : day;
        break;
      case "ArrowDown":
        e.preventDefault();
        newDay = day + 7 <= daysInMonth ? day + 7 : day;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleDayClick(day);
        return;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.focus();
        return;
      default:
        return;
    }

    setFocusedDay(newDay);
  }

  function getMonthYearDisplay(): string {
    const monthName =
      monthYearFormat === "MMM YYYY"
        ? MONTH_NAMES_SHORT[currentMonth]
        : MONTH_NAMES[currentMonth];
    const yearStr = currentYear.toString();

    switch (monthYearFormat) {
      case "MM/YYYY":
        return `${(currentMonth + 1).toString().padStart(2, "0")}/${yearStr}`;
      case "MMM YYYY":
        return `${monthName} ${yearStr}`;
      case "MMMM YYYY":
      default:
        return `${monthName} ${yearStr}`;
    }
  }

  function renderCalendar() {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date();
    const days: JSX.Element[] = [];
    const weeks: JSX.Element[][] = [];
    let currentWeek: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(
        <div key={`empty-${i}`} className="wf-datepicker-day wf-datepicker-day-empty" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = highlightToday && isSameDay(date, today);
      const isSelected =
        mode === "range"
          ? isSameDay(date, rangeStart) || isSameDay(date, rangeEnd)
          : isSameDay(date, selectedDate);
      const inRange = mode === "range" && isInRange(date);
      const disabled = isDateDisabled(date);

      const dayClasses = [
        "wf-datepicker-day",
        isToday && "wf-datepicker-day-today",
        isSelected && "wf-datepicker-day-selected",
        inRange && "wf-datepicker-day-in-range",
        disabled && "wf-datepicker-day-disabled",
      ]
        .filter(Boolean)
        .join(" ");

      currentWeek.push(
        <button
          key={day}
          type="button"
          className={dayClasses}
          onClick={() => handleDayClick(day)}
          onKeyDown={(e) => handleKeyDown(e, day)}
          disabled={disabled}
          data-day={day}
          aria-label={`${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}`}
          aria-selected={isSelected}
        >
          {day}
        </button>
      );

      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        while (currentWeek.length < 7) {
          currentWeek.push(
            <div
              key={`empty-end-${currentWeek.length}`}
              className="wf-datepicker-day wf-datepicker-day-empty"
            />
          );
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    return weeks.map((week, weekIndex) => {
      const firstDayOfWeek = new Date(currentYear, currentMonth, weekIndex * 7 - firstDay + 1);
      const weekNumber = getWeekNumber(firstDayOfWeek);
      
      return (
        <div key={weekIndex} className="wf-datepicker-week">
          {showWeekNumbers && (
            <div className="wf-datepicker-week-number">{weekNumber}</div>
          )}
          {week}
        </div>
      );
    });
  }

  const dayNames = firstDayOfWeek === "monday" ? DAY_NAMES_MONDAY_FIRST : DAY_NAMES;
  const sizeClass = `wf-datepicker-size-${size}`;
  const displayValue = getDisplayValue();
  const showClear = showClearButton && displayValue && !isDisabled;

  return (
    <div
      id={id}
      className={`wf-datepicker ${sizeClass}`}
      ref={containerRef}
      style={
        {
          "--wf-datepicker-size": size,
        } as React.CSSProperties
      }
    >
      {showLabel && (
        <label htmlFor={`${id}-input`} className="wf-datepicker-label">
          {label}
          {isRequired && <span className="wf-datepicker-required">*</span>}
        </label>
      )}

      <div className="wf-datepicker-input-wrapper">
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="text"
          name={name}
          className="wf-datepicker-input"
          placeholder={
            mode === "range"
              ? `${startPlaceholder} - ${endPlaceholder}`
              : placeholder
          }
          value={displayValue}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          onFocus={() => !isDisabled && setIsOpen(true)}
          readOnly
          disabled={isDisabled}
          required={isRequired}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />

        <div className="wf-datepicker-input-icons">
          {showClear && (
            <button
              type="button"
              className="wf-datepicker-clear-button"
              onClick={handleClear}
              aria-label={clearButtonText}
              tabIndex={-1}
            >
              <svg
                className="wf-datepicker-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            type="button"
            className="wf-datepicker-calendar-button"
            onClick={() => !isDisabled && setIsOpen(!isOpen)}
            aria-label="Open calendar"
            disabled={isDisabled}
            tabIndex={-1}
          >
            <svg
              className="wf-datepicker-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {showHelperText && helperText && (
        <div className="wf-datepicker-helper-text">{helperText}</div>
      )}

      {showErrorText && errorText && (
        <div className="wf-datepicker-error-text">{errorText}</div>
      )}

      {isOpen && (
        <div
          className="wf-datepicker-dropdown"
          ref={calendarRef}
          role="dialog"
          aria-label="Choose date"
        >
          <div className="wf-datepicker-header">
            <button
              type="button"
              className="wf-datepicker-nav-button"
              onClick={handlePreviousMonth}
              aria-label={previousMonthLabel}
            >
              <svg
                className="wf-datepicker-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="wf-datepicker-month-year">{getMonthYearDisplay()}</div>

            <button
              type="button"
              className="wf-datepicker-nav-button"
              onClick={handleNextMonth}
              aria-label={nextMonthLabel}
            >
              <svg
                className="wf-datepicker-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="wf-datepicker-calendar">
            <div className="wf-datepicker-weekdays">
              {showWeekNumbers && <div className="wf-datepicker-week-number-header">Wk</div>}
              {dayNames.map((day) => (
                <div key={day} className="wf-datepicker-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="wf-datepicker-days">{renderCalendar()}</div>
          </div>

          {showTodayButton && (
            <div className="wf-datepicker-footer">
              <button
                type="button"
                className="wf-datepicker-today-button"
                onClick={handleTodayClick}
              >
                {todayButtonText}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}