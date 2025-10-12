import axios from 'axios';
class EventService {
  getEvents() {
    return axios.get('http://localhost:3001/api/events');
  }
  getEventById(eventId) {
    return axios.get(`http://localhost:3001/api/events/${eventId}`);
  }
  getEventsByCategory(eventType) {
    return axios.get(`http://localhost:3001/api/events?eventType=${eventType}`);
  }
  getEventsByPrice(price) {
    return axios.get(`http://localhost:3001/api/events?Price=${price}`);
  }
  getEventsByDate(date) {
    return axios.get(`http://localhost:3001/api/events?Date=${date}`);
  }
  deleteEvent(eventId) {
    return axios.delete(`http://localhost:3001/api/events/${eventId}`);
  }
  updateEvent(eventId, eventData) {
    return axios.put(`http://localhost:3001/api/events/${eventId}`, eventData);
  }
}
export default new EventService();
