import React from 'react';

const events = [
  {
    title: 'Global Food Festival',
    date: 'Oct 10, 2025',
    time: '5:00 PM',
    location: 'Central Park, NY',
    rating: 4,
    price: '$25',
    image: 'https://via.placeholder.com/300x180?text=Food+Festival',
  },
  {
    title: 'Tech Innovation Summit 2025',
    date: 'Nov 15, 2025',
    time: '9:00 AM',
    location: 'Silicon Valley, CA',
    rating: 5,
    price: '$99',
    image: 'https://via.placeholder.com/300x180?text=Tech+Summit',
  },
];

const FeaturedEventsSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="h4 fw-semibold mb-4">Featured Events</h2>
        <div className="row">
          {events.map((event, index) => (
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
                  <p className="card-text mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Rating:</strong>{' '}
                    {'★'.repeat(event.rating) + '☆'.repeat(5 - event.rating)}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> {event.price}
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

export default FeaturedEventsSection;
