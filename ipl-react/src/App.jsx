import { useState, useEffect } from "react";
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
      .select("*");

    if (error) {
      console.error("Error fetching matches:", error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
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
                  general={match.price}
                  premium={match.price}
                  vip={match.price}
                  availableSeats={match.available_seats}
                  onBooking={() =>
                    setBookingCount((prev) => prev + 1)
                  }
                  onReset={(tickets) =>
                    setBookingCount((prev) =>
                      Math.max(0, prev - tickets)
                    )
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;