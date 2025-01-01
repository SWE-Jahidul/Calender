import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./App.css";

function App() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);

  const formatRange = (range?: DateRange) => {
    if (range?.from && range?.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return "Select Date Range";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) return;
    if (selectedRange.from && selectedRange.to && selectedRange.from !== selectedRange.to) {
      setRange(selectedRange);
      setCalendarVisible(false); 
    } else {
      setRange(selectedRange);
    }
  };

  const handleButtonClick = () => {
    setCalendarVisible((prev) => {
      return !prev || !(range?.from && range?.to && range?.from !== range?.to);
    });
  };

  return (
    <div className="relative">
      <button
        className="flex items-center border rounded px-4 py-2 shadow-md space-x-2"
        onClick={handleButtonClick}
      >
        <span className="icon">📅</span>
        <span>{formatRange(range)}</span>
      </button>

      {isCalendarVisible && (
        <div className="absolute mt-2 flex space-x-4 p-4 border bg-white shadow-lg rounded border-gray-200">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleDateSelect}
            captionLayout="label"
            numberOfMonths={2}
            required
            showOutsideDays
            timeZone="UTC"
          />
        </div>
      )}
    </div>
  );
}

export default App;
