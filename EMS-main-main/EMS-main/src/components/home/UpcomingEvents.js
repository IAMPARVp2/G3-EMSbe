import React from 'react';

const upcomingEvents = [
  {
    title: 'AI & Robotics Expo',
    date: 'Dec 5, 2025',
    time: '10:00 AM',
    location: 'Expo Center, LA',
    image: 'https://via.placeholder.com/300x180?text=AI+Expo',
  },
  {
    title: 'Music Fiesta 2025',
    date: 'Dec 20, 2025',
    time: '6:00 PM',
    location: 'Beach Arena, Miami',
    image: 'https://via.placeholder.com/300x180?text=Music+Fiesta',
  },
];

const UpcomingEventsSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="h4 fw-semibold mb-4">Upcoming Events</h2>
        <div className="row">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={event.image}
                  alt={event.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
