import "./RecentBookings.css";
import type { Booking } from "../../services/bookingService";

interface Props {
  bookings: Booking[];
}

export default function RecentBookings({
  bookings,
}: Props) {
  return (
    <div className="recent-bookings">
      <div className="table-header">
        <h2>Recent Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            color: "#777",
          }}
        >
          No recent bookings.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  {booking.customer.firstName}{" "}
                  {booking.customer.lastName}
                </td>

                <td>{booking.service.title}</td>

                <td>{booking.bookingDate}</td>

                <td>
                  <span
                    className={`status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}