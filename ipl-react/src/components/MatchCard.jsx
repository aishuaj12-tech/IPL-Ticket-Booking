
import { useState } from "react";

function MatchCard(props) {
  const [tickets, setTickets] = useState(0);

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
