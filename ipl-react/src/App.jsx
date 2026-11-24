
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import MyBookings from "./components/MyBookings";
import { supabase } from "./supabase";

function App() {
  const [bookingCount, setBookingCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const bookingFormRef = useRef(null);

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        (payload) => {
          console.log("Realtime update received:", payload);
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching matches:", error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
  }

  function openBookingForm(match, category) {
    setSelectedMatch({
      ...match,
      selectedCategory: category,
    });

    setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  return (
    <div>
      <Navbar
        bookingCount={bookingCount}
        onNavigate={setActivePage}
      />

      {activePage === "bookings" ? (
        <MyBookings />
      ) : (
        <>
          <Hero />

          <h1>Upcoming Matches</h1>

          {loading ? (
            <p>Loading matches...</p>
          ) : (
            <div className="matches-container">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  matchId={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={match.match_date}
                  venue={match.venue}
                  general={match.general_price}
                  premium={match.premium_price}
                  vip={match.vip_price}
                  availableSeats={match.available_seats}
                  onBook={(category) =>
                    openBookingForm(match, category)
                  }
                />
              ))}
            </div>
          )}

          {selectedMatch && (
            <div
              ref={bookingFormRef}
              className="booking-form"
              style={{
                maxWidth: "500px",
                margin: "50px auto",
                padding: "25px",
                borderRadius: "12px",
                background: "#ffffff",
                color: "#172554",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
              }}
            >
              <h2>Book Your Tickets</h2>

              <p>
                <strong>Match:</strong>{" "}
                {selectedMatch.team1} vs {selectedMatch.team2}
              </p>

              <p>
                <strong>Venue:</strong> {selectedMatch.venue}
              </p>

              <p>
                <strong>Ticket Category:</strong>{" "}
                {selectedMatch.selectedCategory}
              </p>

              <BookingForm
                match={selectedMatch}
                onBooking={() =>
                  setBookingCount((prev) => prev + 1)
                }
                onClose={() => setSelectedMatch(null)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BookingForm({ match, onBooking, onClose }) {
  const [fullName, setFullName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [saving, setSaving] = useState(false);

  const price =
    match.selectedCategory === "General"
      ? match.general_price
      : match.selectedCategory === "Premium"
      ? match.premium_price
      : match.vip_price;

  async function confirmBooking(e) {
    e.preventDefault();

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > match.available_seats
    ) {
      alert("Please enter a valid number of tickets.");
      return;
    }

    setSaving(true);

    const totalPrice = price * quantity;

    const { error: seatError } = await supabase
      .from("matches")
      .update({
        available_seats: match.available_seats - quantity,
      })
      .eq("id", match.id);

    if (seatError) {
      alert("Could not update seats: " + seatError.message);
      setSaving(false);
      return;
    }

    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: match.id,
          user_name: fullName.trim(),
          match_title: `${match.team1} vs ${match.team2}`,
          quantity: quantity,
          total_price: totalPrice,
        },
      ]);

    if (bookingError) {
      await supabase
        .from("matches")
        .update({
          available_seats: match.available_seats,
        })
        .eq("id", match.id);

      alert("Booking failed: " + bookingError.message);
    } else {
      onBooking();

      alert(
        `Booking successful!\nName: ${fullName}\nTickets: ${quantity}\nTotal: ₹${totalPrice}`
      );

      onClose();
    }

    setSaving(false);
  }

  return (
    <form onSubmit={confirmBooking}>
      <label>
        <strong>Full Name</strong>
      </label>

      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        required
        style={{
          width: "100%",
          padding: "12px",
          margin: "8px 0 18px",
          boxSizing: "border-box",
        }}
      />

      <label>
        <strong>Number of Tickets</strong>
      </label>

      <input
        type="number"
        min="1"
        max={match.available_seats}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        style={{
          width: "100%",
          padding: "12px",
          margin: "8px 0 18px",
          boxSizing: "border-box",
        }}
      />

      <p>
        <strong>Price per ticket:</strong> ₹{price}
      </p>

      <p>
        <strong>Total Amount:</strong> ₹{price * quantity}
      </p>

      <button type="submit" disabled={saving}>
        {saving ? "Booking..." : "Confirm Booking"}
      </button>

      <button
        type="button"
        onClick={onClose}
        disabled={saving}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </form>
  );
}

export default App;
