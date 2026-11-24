
import { useState, useEffect } from "react";

function MatchCard(props) {
  const [seats, setSeats] = useState(props.availableSeats);
  const [category, setCategory] = useState("General");

  useEffect(() => {
    setSeats(props.availableSeats);
  }, [props.availableSeats]);

  return (
    <div className="match-card">
      <h2>
        {props.team1} vs {props.team2}
      </h2>

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

      <p>
        <strong>Select Ticket Category:</strong>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">
            General - ₹{props.general}
          </option>

          <option value="Premium">
            Premium - ₹{props.premium}
          </option>

          <option value="VIP">
            VIP - ₹{props.vip}
          </option>
        </select>
      </p>

      <button
        onClick={() => props.onBook(category)}
        disabled={seats <= 0}
      >
        {seats <= 0 ? "Sold Out" : "Book Ticket"}
      </button>
    </div>
  );
}

export default MatchCard;
