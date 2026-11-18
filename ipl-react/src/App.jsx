
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "25 November 2026",
      venue: "Bengaluru",
      price: 1500
    },

    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "26 November 2026",
      venue: "Mumbai",
      price: 1200
    },

    {
      id: 3,
      team1: "SRH",
      team2: "RR",
      date: "27 November 2026",
      venue: "Hyderabad",
      price: 1000
    }
  ];

  return (
    <div>
      <Navbar />

      <Hero />

      <h1>Upcoming Matches</h1>

      <div>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
            price={match.price}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
