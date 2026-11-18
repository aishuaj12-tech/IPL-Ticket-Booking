
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {
  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "MI",
      date: "10 April 2026, 7:30 PM",
      venue: "Bengaluru",
      general: 1000,
      premium: 2500,
      vip: 5000
    },
    {
      id: 2,
      team1: "CSK",
      team2: "KKR",
      date: "12 April 2026, 7:30 PM",
      venue: "Chennai",
      general: 1200,
      premium: 3000,
      vip: 5500
    },
    {
      id: 3,
      team1: "MI",
      team2: "CSK",
      date: "15 April 2026, 7:30 PM",
      venue: "Mumbai",
      general: 1500,
      premium: 3500,
      vip: 6000
    },
    {
      id: 4,
      team1: "KKR",
      team2: "RCB",
      date: "18 April 2026, 7:30 PM",
      venue: "Kolkata",
      general: 1000,
      premium: 2800,
      vip: 5000
    }
  ];

  return (
    <div>
      <Navbar />

      <Hero />

      <h1>Upcoming Matches</h1>

      <div className="matches-container">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
            general={match.general}
            premium={match.premium}
            vip={match.vip}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
