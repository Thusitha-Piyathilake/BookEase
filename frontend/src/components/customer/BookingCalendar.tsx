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
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        marginBottom: "30px",
        width: "100%",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2
        style={{
          color: "#A31D1D",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        📅 Booking Calendar
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
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
    </div>
  );
}