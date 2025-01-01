import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const closeCalendar = () => setShowCalendar(false);

  return (
    <div>
      <button
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarTodayIcon />
        {selectedDate ? formatDate(selectedDate) : "Select Date"}
      </button>

      {showCalendar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeCalendar}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg relative z-10"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <DayPicker
              mode="single"
              numberOfMonths={1}
              showOutsideDays
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }
              }}
              styles={{
                caption: { color: "black" },
                day: { color: "black" },
                months: { backgroundColor: "white" }, // Calendar popup bg color
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
