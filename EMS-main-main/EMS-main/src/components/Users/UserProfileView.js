import React from 'react';
import { Calendar, CheckCircle2, Wallet } from 'lucide-react';

const UserProfileView = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        upcomingEvents: 0,
        eventsAttended: 2,
        totalSpent: 480,
    };

    const hasUpcomingEvents = user.upcomingEvents > 0;

    return (
        <div className="container py-5">
            {/* Profile Card */}
            <div className="row justify-content-center mb-4">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-body d-flex align-items-center">
                            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-4" style={{ width: '80px', height: '80px' }}>
                                <span className="text-white h2 mb-0">{user.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div className="flex-grow-1">
                                <h2 className="h4 mb-1">{user.name}</h2>
                                <p className="mb-1 text-muted">{user.email}</p>
                                <span className="badge bg-success">Active User</span>
                            </div>
                            <div>
                                <button className="btn btn-outline-primary">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="row justify-content-center mb-4 g-3">
                <div className="col-md-3">
                    <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                            <div className="mb-2 text-primary" style={{ fontSize: '2rem' }}><Calendar size={32} /></div>
                            <h5 className="card-title mb-0">{user.upcomingEvents}</h5>
                            <small className="text-muted">Upcoming Events</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                            <div className="mb-2 text-success" style={{ fontSize: '2rem' }}><CheckCircle2 size={32} /></div>
                            <h5 className="card-title mb-0">{user.eventsAttended}</h5>
                            <small className="text-muted">Events Attended</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                            <div className="mb-2 text-warning" style={{ fontSize: '2rem' }}><Wallet size={32} /></div>
                            <h5 className="card-title mb-0">₹{user.totalSpent}</h5>
                            <small className="text-muted">Total Spent</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Tabs Section */}
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-bottom-0 pb-0">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="true" href="#">Upcoming Events ({user.upcomingEvents})</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Past Events ({user.eventsAttended})</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {!hasUpcomingEvents && (
                                <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
                                    <div className="mb-3" style={{ fontSize: '3rem', color: '#ccc' }}><Calendar size={48} /></div>
                                    <h4 className="text-muted">No upcoming events</h4>
                                    <p className="text-muted" style={{ maxWidth: '400px' }}>
                                        Ready to discover something amazing? Browse our events and book your next experience.
                                    </p>
                                    <button className="btn btn-primary mt-2">Explore Events</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileView;