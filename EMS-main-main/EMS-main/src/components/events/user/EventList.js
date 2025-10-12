import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => (
  <div className="container d-flex justify-content-center">
    <div className="row w-100">
      {events.map((event) => (
        <div className="col-md-4 mb-4" key={event.Id}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  </div>
);

export default EventList;
