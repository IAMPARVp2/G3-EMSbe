import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const {
    Id,
    Name,
    StartDate,
    Time,
    Location,
    Cost,
    availableSeats,
    totalSeats,
    Photo,
    eventType,
  } = event;

  const handleClick = () => {
    navigate(`/event/${Id}`, { state: { event } });
  };

  return (
    <div
      className="card shadow-sm border-0 rounded-4 overflow-hidden"
      style={{ width: '20rem', cursor: 'pointer' }}
      onClick={handleClick}
    >
      {/* Image with badges */}
      <div className="position-relative">
        <img src={Photo} className="card-img-top" alt={Name} />
        <span className="badge bg-light text-dark position-absolute top-0 end-0 m-2 border">
          {eventType}
        </span>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title fw-bold">{Name}</h5>

        <p className="text-muted mb-1">
          <i className="bi bi-calendar-event me-2"></i>
          {StartDate} at {Time}
        </p>

        <p className="text-muted mb-1">
          <i className="bi bi-geo-alt me-2"></i>
          {Location}
        </p>

        <p className="text-warning mb-3">
          <i className="bi bi-star-fill me-1"></i> 4.6
          <span className="text-muted"> (189 reviews)</span>
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-success mb-0">
            {typeof Cost === 'number' && Cost > 0 ? `₹${Cost}` : 'Free'}
          </h5>
          <small className="text-muted">
            {availableSeats}/{totalSeats}
          </small>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
