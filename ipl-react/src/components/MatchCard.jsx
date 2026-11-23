import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function MatchCard(props) {
  const [tickets, setTickets] = useState(0);
  const [saving, setSaving] = useState(false);
  const [seats, setSeats] = useState(props.availableSeats);
  useEffect(() => {
  setSeats(props.availableSeats);
}, [props.availableSeats]);

  async function addTicket() {
    if (seats <= 0) {
      alert("Sorry, no seats available!");
      return;
    }

    setSaving(true);

    // Update available seats in database
    const { error: seatError } = await supabase
      .from("matches")
      .update({ available_seats: seats - 1 })
      .eq("id", props.matchId);

    if (seatError) {
      console.error("Seat update error:", seatError.message);
      alert("Could not update seats: " + seatError.message);
      setSaving(false);
      return;
    }

    // Insert booking into database
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: props.matchId,
          user_name: "Guest",
          match_title: `${props.team1} vs ${props.team2}`,
          quantity: 1,
          total_price: props.general,
        },
      ]);

    if (bookingError) {
      // Restore seat if booking fails
      await supabase
        .from("matches")
        .update({ available_seats: seats })
        .eq("id", props.matchId);

      console.error("Booking error:", bookingError.message);
      alert("Booking failed: " + bookingError.message);
    } else {
      setSeats((prev) => prev - 1);
      setTickets((prev) => prev + 1);
      props.onBooking();

      alert("Ticket booked successfully!");
    }

    setSaving(false);
  }

  function resetTickets() {
    props.onReset(tickets);
    setTickets(0);
  }

  return (
    <div className="match-card">
      <h2>{props.team1} vs {props.team2}</h2>

      <p>
        <strong>Date:</strong> {props.date}
      </p>

      <p>
        <strong>Venue:</strong> {props.venue}
      </p>

      <p>
        <strong>General:</strong> ₹{props.general}
      </p>

      <p>
        <strong>Premium:</strong> ₹{props.premium}
      </p>

      <p>
        <strong>VIP:</strong> ₹{props.vip}
      </p>

      <p>
        <strong>Available Seats:</strong> {seats}
      </p>

      <p>Tickets Selected: {tickets}</p>

      <button onClick={addTicket} disabled={saving || seats <= 0}>
        {saving ? "Booking..." : seats <= 0 ? "Sold Out" : "Add Ticket"}
      </button>

      <button onClick={resetTickets}>
        Reset
      </button>
    </div>
  );
}

export default MatchCard;