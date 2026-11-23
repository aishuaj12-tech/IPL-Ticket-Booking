function Navbar({ bookingCount = 0, onNavigate }) {
  return (
    <nav className="navbar">
      <h2>IPL TICKETS</h2>

      <ul>
        <li onClick={() => onNavigate("home")}>Home</li>
        <li onClick={() => onNavigate("matches")}>Matches</li>
        <li onClick={() => onNavigate("matches")}>Book Ticket</li>
        <li onClick={() => onNavigate("bookings")}>My Bookings</li>
      </ul>

      <div className="booking-count">
        Bookings: {bookingCount}
      </div>
    </nav>
  );
}

export default Navbar;