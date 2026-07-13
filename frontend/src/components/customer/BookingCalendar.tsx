import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingCalendar.css";

interface BookingCalendarProps {
  bookedDates: string[];
  onDateClick: (date: Date) => void;
}

export default function BookingCalendar({
  bookedDates,
  onDateClick,
}: BookingCalendarProps) {
  return (
    <div className="booking-calendar-card">
      <h2>📅 Booking Calendar</h2>

      <Calendar
        onClickDay={onDateClick}
        tileClassName={({ date, view }) => {
          if (view !== "month") return ""; // only highlight in month view

          // Use local date string to avoid timezone issues
          const formatted = date.toLocaleDateString("en-CA");

          if (bookedDates.includes(formatted)) {
            return "booked-date";
          }

          return "";
        }}
      />
    </div>
  );
}