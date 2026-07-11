import "./RecentBookings.css";

const bookings = [
  {
    id: 1,
    customer: "John Silva",
    service: "House Cleaning",
    date: "12 Jul 2026",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Nimal Fernando",
    service: "Plumbing",
    date: "13 Jul 2026",
    status: "Accepted",
  },
  {
    id: 3,
    customer: "Kamal Perera",
    service: "Electrical Repair",
    date: "14 Jul 2026",
    status: "Completed",
  },
];

export default function RecentBookings() {
  return (
    <div className="recent-bookings">

      <div className="table-header">
        <h2>Recent Bookings</h2>
      </div>

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
              <td>{booking.customer}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
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

    </div>
  );
}