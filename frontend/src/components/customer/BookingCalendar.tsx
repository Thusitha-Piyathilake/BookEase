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
      <h2 style={{ color: "#A31D1D", marginBottom: "20px", textAlign: "center" }}>
        📅 Booking Calendar
      </h2>
      <Calendar
        onClickDay={onDateClick}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const formatted = date.toLocaleDateString("en-CA");
          if (bookedDates.includes(formatted)) return "booked-date";
          return "";
        }}
      />
    </div>
  );
}