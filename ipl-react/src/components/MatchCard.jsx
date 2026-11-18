
import { useState } from "react";

function MatchCard(props) {

  const [tickets, setTickets] = useState(0);

  return (
    <div className="match-card">

      <h2>{props.team1} vs {props.team2}</h2>

      <p>Date: {props.date}</p>

      <p>Venue: {props.venue}</p>

      <p>Ticket Price: ₹{props.price}</p>

      <p>Tickets Selected: {tickets}</p>

      <button onClick={() => setTickets(tickets + 1)}>
        Add Ticket
      </button>

      <button onClick={() => setTickets(0)}>
        Reset
      </button>

    </div>
  );
}

export default MatchCard;
