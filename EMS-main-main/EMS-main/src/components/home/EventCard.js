import React from 'react';
import { Calendar, MapPin, Star, Tag } from 'lucide-react';

const events = [
	{
		title: 'Global Food Festival',
		date: 'Oct 10, 2025',
		time: '5:00 PM',
		location: 'Central Park, NY',
		rating: 4,
		price: 25, // numeric, no dollar
		image: 'https://as2.ftcdn.net/v2/jpg/06/59/50/03/1000_F_659500350_EvbjCVcia60llCUVDj6bw9sF2TuJI2Da.jpg',
	},
	{
		title: 'Tech Innovation Summit 2025',
		date: 'Nov 15, 2025',
		time: '9:00 AM',
		location: 'Silicon Valley, CA',
		rating: 5,
		price: 99,
		image: 'https://as2.ftcdn.net/v2/jpg/06/59/50/03/1000_F_659500350_EvbjCVcia60llCUVDj6bw9sF2TuJI2Da.jpg',
	},
	{
		title: 'Art & Design Expo',
		date: 'Dec 02, 2025',
		time: '11:00 AM',
		location: 'Downtown Gallery',
		rating: 4,
		price: 'Free',
		image: 'https://as2.ftcdn.net/v2/jpg/06/59/50/03/1000_F_659500350_EvbjCVcia60llCUVDj6bw9sF2TuJI2Da.jpg',
	},
];

const EventCard = () => {
	return (
		<section className="py-5 bg-white">
			<div className="container">
				<h2 className="h4 fw-semibold mb-4">Featured Events</h2>
				<div className="row gy-4">
					{events.map((event, index) => (
						<div key={index} className="col-md-6 col-lg-4">
							<div
								className="card shadow-sm h-100 border-0"
								style={{
									overflow: 'hidden',
									transition: 'transform 200ms ease',
									cursor: 'pointer',
								}}
							>
								<div style={{ position: 'relative' }}>
									<img
										src={event.image}
										alt={event.title}
										className="card-img-top"
										style={{
											height: '200px',
											objectFit: 'cover',
											width: '100%',
										}}
									/>
									<div style={{ position: 'absolute', left: 12, top: 12 }}>
										<span className="badge bg-primary">{event.date}</span>
									</div>
									<div style={{ position: 'absolute', right: 12, top: 12 }}>
										<span className="badge bg-light text-dark">
											{typeof event.price === 'number'
												? `₹${event.price}`
												: event.price}
										</span>
									</div>
								</div>

								<div className="card-body d-flex flex-column">
									<h5 className="card-title">{event.title}</h5>

									<p className="card-text text-muted mb-2 small d-flex align-items-center">
										<Calendar size={14} className="me-1" />{' '}
										<span className="me-3">{event.date}</span>
										<MapPin size={14} className="me-1" />{' '}
										<span>{event.location}</span>
									</p>

									<div className="d-flex align-items-center justify-content-between mt-auto">
										<div className="d-flex align-items-center">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													size={14}
													className={`me-1 ${
														i < event.rating
															? 'text-warning'
															: 'text-muted'
													}`}
												/>
											))}
											<small className="text-muted ms-2">
												{event.rating}.0
											</small>
										</div>

										<div>
											<button className="btn btn-sm btn-outline-primary me-2">
												Details
											</button>
											<button className="btn btn-sm btn-primary">
												{typeof event.price === 'number'
													? `Book — ₹${event.price}`
													: 'Book'}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EventCard;
