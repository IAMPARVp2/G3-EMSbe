// EventDetails.js
import React from 'react';
import MovieTabs from './MovieTabs';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  if (!event) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-vh-content" style={{ backgroundColor: '#ffff' }}>


      <div
        className="position-relative text-light"
        style={{
          backgroundImage: `url(${event.Photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >



        <div className="py-4" style={{ background: 'rgba(0,0,0,0.55)', borderRadius: '0.5rem' }}>
          <div className="row align-items-start">
           

           
            <div className="col-lg-4 mb-3">
              <div
                className="rounded w-100"
                style={{
                  backgroundImage: `url(${event.Photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '320px',
                }}
              ></div>
            </div>

            {/* Middle Column (Details) */}
            <div className="col-lg-5 mb-3 text-light">
              <div className="p-3 rounded" style={{ background: 'rgba(0,0,0,0.45)' }}>
                <h2 className="h4 mb-3">{event.Name}</h2>

                <div className="mb-3">
                  <span className="badge bg-light text-dark rounded-pill">
                    {event.StartDate} • {event.Time}
                  </span>
                </div>

                <p className="mb-4">
                  <strong>Category:</strong> {event.eventType}
                </p>
                <p className="mb-4">
                  <strong>Location:</strong> {event.Location}
                </p>
                <p className="mb-4">
                  <strong>Price:</strong> {event.Cost > 0 ? `₹${event.Cost}` : 'Free'}
                </p>
                <p className="mb-4">
                  <strong>Available Seats:</strong> {event.availableSeats}/{event.totalSeats}
                </p>
                <button className="btn btn-danger rounded-pill px-4 py-2 fw-semibold">
                  Book Tickets
                </button>
              </div>
            </div>

            {/* Empty col to let banner background show */}
            <div className="col-lg-3 d-none d-lg-block"></div>
          </div>
        </div>

        {/* Share Button */}
        <button
          className="btn btn-dark position-absolute d-flex align-items-center"
          style={{ top: '15px', right: '20px', borderRadius: '8px' }}
        >
          <i className="bi bi-share"></i> Share
        </button>
      </div>
      <MovieTabs />
    </div>
  );
};

export default EventDetails;
