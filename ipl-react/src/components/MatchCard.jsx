import { useState } from "react";

function MatchCard(props) {
  const [tickets, setTickets] = useState(0);

  function addTicket() {
    setTickets((prev) => prev + 1);
    props.onBooking();
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

      <p>Tickets Selected: {tickets}</p>

      <button onClick={addTicket}>
        Add Ticket
      </button>

      <button onClick={resetTickets}>
        Reset
      </button>

    </div>
  );
}

export default MatchCard;