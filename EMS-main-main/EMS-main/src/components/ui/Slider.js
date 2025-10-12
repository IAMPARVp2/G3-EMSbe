import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const HomeCarousel = () => {
  return (
    <Carousel fade interval={3000} pause={false} touch={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg"
          alt="First slide"
          style={{ width: '900px', height: '500px', objectFit: 'cover', margin: 'auto' }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.squarespace-cdn.com/content/v1/5a7f41ad8fd4d236a4ad76d0/1522357380593-F6JCLQFFMTBIUVR2VF6I/MalTrip.jpg"
          alt="Second slide"
          style={{ width: '900px', height: '500px', objectFit: 'cover', margin: 'auto' }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdnb.artstation.com/p/assets/images/images/037/636/465/large/andres-mencia-e6d693ce-a635-425f-811b-9354846b0e31-rw-1920.jpg?1620903148"
          alt="Third slide"
          style={{ width: '900px', height: '500px', objectFit: 'cover', margin: 'auto' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
