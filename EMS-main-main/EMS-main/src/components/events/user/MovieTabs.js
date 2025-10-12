// MovieTabs.js
import React, { useState } from 'react';

const MovieTabs = () => {
  const [activeTab, setActiveTab] = useState('synopsis');

  const tabs = [
    { id: 'synopsis', label: 'Synopsis' },
    { id: 'location', label: 'Location' },
    { id: 'posters', label: 'Posters' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="mt-4 container">
      {/* Section Title */}
      {/* <h4 className="fw-bold mb-3 text-dark">About the Event</h4> */}

      {/* horizontal nav bar */}
      <div className="d-flex mb-4 flex-wrap align-items-center justify-content-center gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn fw-semibold me-2 mb-2 ${
              activeTab === tab.id ? 'text-white' : 'text-dark'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? '#e74c3c' : '#f8f9fa',
              border: '2px solid #ddd',
              borderRadius: '30px',
              padding: '7px 21px',
              transition: '0.3s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="p-4 border rounded bg-light">
        {activeTab === 'synopsis' && (
          <div>
            <p className="mb-3">This is the story of Chandra....</p>

            {/* Cast Div */}
            <div className="p-3 border rounded bg-white mb-3">
              <strong>Cast:</strong>
              <div className="d-flex gap-3 mt-2">
                {['Actor1', 'Actor2', 'Actor3'].map((actor, i) => (
                  <div
                    key={i}
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '70px', height: '70px' }}
                  >
                    {actor}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating + Button */}
            <p className="mb-2">
              <strong>Rating:</strong> UA
            </p>
            <button
              className="btn px-4 py-2 fw-semibold"
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '25px',
              }}
            >
              Book Now
            </button>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="p-3 border rounded bg-white">
            <h6 className="fw-bold mb-2">Theatre Location</h6>
            <p className="mb-3">🎬 Multiplex Cinema, MG Road, Bengaluru</p>
            <a
              href="https://maps.google.com?q=Multiplex+Cinema+MG+Road+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="btn px-4 fw-semibold"
              style={{
                backgroundColor: '#34495e',
                color: 'white',
                borderRadius: '25px',
              }}
            >
              Open Maps
            </a>
          </div>
        )}

        {activeTab === 'posters' && (
          <div className="row">
            <div className="col-md-4 mb-3">
              <img
                src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/madharasi-et00434543-1739948960.jpg"
                className="img-fluid rounded shadow-sm"
                alt="Poster 1"
              />
            </div>
            <div className="col-md-4 mb-3">
              <img
                src="https://via.placeholder.com/400x600"
                className="img-fluid rounded shadow-sm"
                alt="Poster 2"
              />
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="mb-3">
              <p>⭐ 4/5 - Amazing movie!</p>
              <p>⭐ 3/5 - Good but could be better.</p>
            </div>

            <textarea
              className="form-control mb-2 p-3"
              rows="3"
              placeholder="Write your review..."
            ></textarea>
            <button
              className="btn fw-semibold"
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                borderRadius: '25px',
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTabs;
