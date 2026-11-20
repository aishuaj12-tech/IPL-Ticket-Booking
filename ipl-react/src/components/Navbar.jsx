function Navbar({ bookingCount = 0 }) {
  return (
    <nav className="navbar">
      <h2>IPL TICKETS</h2>

      <ul>
        <li>Home</li>
        <li>Matches</li>
        <li>Book Ticket</li>
        <li>My Bookings</li>
      </ul>

      <div className="booking-count">
        Bookings: {bookingCount}
      </div>
    </nav>
  );
}

export default Navbar;