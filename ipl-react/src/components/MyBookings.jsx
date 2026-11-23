import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error.message);
    } else {
      setBookings(data);
    }

    setLoading(false);
  }

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Booking Date</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.match_title}</td>
                <td>{booking.quantity}</td>
                <td>₹{booking.total_price}</td>
                <td>
                  {new Date(booking.booking_date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;