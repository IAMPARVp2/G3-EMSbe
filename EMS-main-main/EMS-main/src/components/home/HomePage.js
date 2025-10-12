import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from './Categories';
import EventCard from './EventCard';
import UpcomingEventsSection from './UpcomingEvents';
import Footer from './Footer';
import BaseHome from './Home';
import TestimonialSection from './TestimonialSection';

function Home() {
  return (
    <div className="App">
      <BaseHome />
       {/* <Categories /> */}
      <EventCard /> 
      <TestimonialSection />
      {/* <FeaturedEventsSection/> */}
      <UpcomingEventsSection />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
