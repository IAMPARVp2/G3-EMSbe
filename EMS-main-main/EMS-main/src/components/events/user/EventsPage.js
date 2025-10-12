import React, { useState, useEffect } from 'react';
import MOCK_EVENTS from './MOCKDATA';
import FilterBar from './FilterBar';
import EventList from './EventList';
import Footer from '../../home/Footer';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    setAllEvents(MOCK_EVENTS);
    setEvents(MOCK_EVENTS);
  }, []);

  useEffect(() => {
    let result = [...allEvents];

    // 🔎 Search filter
    if (searchTerm) {
      result = result.filter(
        (eve) =>
          eve.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eve.Location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🏷️ Category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter((eve) => eve.eventType === categoryFilter);
    }

    // 💰 Price filter
    switch (priceFilter) {
      case 'Free':
        result = result.filter((eve) => eve.Cost === 0);
        break;
      case 'Under ₹50':
        result = result.filter((eve) => eve.Cost > 0 && eve.Cost <= 50);
        break;
      case '₹51 - ₹100':
        result = result.filter((eve) => eve.Cost > 50 && eve.Cost <= 100);
        break;
      case 'Over ₹100':
        result = result.filter((eve) => eve.Cost > 100);
        break;
      default:
        break;
    }

    // 📅 Date filter (exact yyyy-mm-dd match)
    if (dateFilter) {
      result = result.filter((eve) => eve.StartDate === dateFilter);
    }

    setEvents(result);
  }, [searchTerm, categoryFilter, priceFilter, dateFilter, allEvents]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All Categories');
    setPriceFilter('All Prices');
    setDateFilter('');
    setEvents(allEvents);
  };

  return (
    <div className="container">
      <div>
        <h1>Discover Events</h1>
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          clearFilters={clearFilters}
        />
      </div>
      <br />
      <br />
      <div className="events-column">
        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <p className="text-center text-muted">No events found for selected filters.</p>
        )}
      </div>
      <div>{/* <Footer /> */}</div>
    </div>
  );
};

export default EventsPage;
