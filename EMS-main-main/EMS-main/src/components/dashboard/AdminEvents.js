import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../Icons';
import { logoutUser } from '../../services/authService';

const initialEvents = [
  {
    id: 1,
    name: 'Tech Summit',
    date: '2025-09-20',
    time: '10:00',
    location: 'Conference Hall A',
    status: 'Published',
    category: 'Conference',
    registrations: 120,
    revenue: 5000,
    image: '',
  },
  {
    id: 2,
    name: 'Summer Music Festival',
    date: '2025-08-15',
    time: '18:00',
    location: 'Open Grounds',
    status: 'Published',
    category: 'Festival',
    registrations: 450,
    revenue: 15000,
    image: '',
  },
  {
    id: 3,
    name: 'Startup Meetup',
    date: '2025-09-22',
    time: '17:00',
    location: 'Meeting Room 2',
    status: 'Draft',
    category: 'Meetup',
    registrations: 25,
    revenue: 0,
    image: '',
  },
];

export function AdminEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const fileInputRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Sign out error', err);
    }
    // Clear stored role and user
    try {
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    // Navigate to home page
    navigate('/');
  };

  useEffect(() => {
    document.body.style.paddingRight = '';
  }, []);

  function filteredEvents() {
    return events.filter((ev) => {
      const term = search.trim().toLowerCase();
      if (term) {
        const inName = ev.name.toLowerCase().includes(term);
        const inLoc = ev.location.toLowerCase().includes(term);
        if (!inName && !inLoc) return false;
      }
      if (statusFilter && ev.status !== statusFilter) return false;
      if (categoryFilter && ev.category !== categoryFilter) return false;
      return true;
    });
  }

  function handleCreate(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newEvent = {
      id: Date.now(),
      name: data.get('name'),
      date: data.get('date'),
      time: data.get('time'),
      location: data.get('location'),
      status: data.get('status'),
      category: data.get('category'),
      registrations: Number(data.get('registrations') || 0),
      revenue: Number(data.get('revenue') || 0),
      image: '',
    };
    const file = data.get('image');
    if (file && file.size) {
      const reader = new FileReader();
      reader.onload = () => {
        newEvent.image = reader.result;
        setEvents((prev) => [newEvent, ...prev]);
        setShowCreate(false);
      };
      reader.readAsDataURL(file);
    } else {
      setEvents((prev) => [newEvent, ...prev]);
      setShowCreate(false);
    }
  }

  function openEdit(ev) {
    setEditingEvent(ev);
    setShowEdit(true);
  }

  function handleEdit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const updated = {
      ...editingEvent,
      name: data.get('name'),
      date: data.get('date'),
      time: data.get('time'),
      location: data.get('location'),
      status: data.get('status'),
      category: data.get('category'),
      registrations: Number(data.get('registrations') || 0),
      revenue: Number(data.get('revenue') || 0),
    };
    const file = data.get('image');
    if (file && file.size) {
      const reader = new FileReader();
      reader.onload = () => {
        updated.image = reader.result;
        setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
        setShowEdit(false);
        setEditingEvent(null);
      };
      reader.readAsDataURL(file);
    } else {
      setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
      setShowEdit(false);
      setEditingEvent(null);
    }
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  function handleView(ev) {
    setViewEvent(ev);
  }

  // function closeModals() {
  //   setShowCreate(false);
  //   setShowEdit(false);
  //   setViewEvent(null);
  //   setEditingEvent(null);
  // }

  const categories = Array.from(new Set(events.map((e) => e.category))).filter(Boolean);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3 mb-1">Events Management</h1>
          <p className="text-muted mb-0">Manage your events, track registrations, and monitor performance.</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            + Create New Event
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/admin/settings')}
            title="Profile Settings"
          >
            <UserIcon />
          </button>
          <button 
            className="btn btn-outline-danger"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="dashboard-card mb-4">
        <div className="p-3">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <input
                className="form-control"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light" p-2>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Registrations</th>
              <th scope="col">Revenue</th>
              <th scope="col" style={{ width: 150 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents().map((ev) => (
              <tr key={ev.id}>
                <td>
                  <div className="d-flex align-items-center">
                    {ev.image ? (
                      <img
                        src={ev.image}
                        alt=""
                        style={{
                          width: 56,
                          height: 40,
                          objectFit: 'cover',
                          marginRight: 12,
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 56,
                          height: 40,
                          background: '#e9ecef',
                          marginRight: 12,
                          borderRadius: 6,
                        }}
                      ></div>
                    )}
                    <div>
                      <div className="fw-semibold">{ev.name}</div>
                      <div className="text-muted small">{ev.category}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {new Date(ev.date).toLocaleDateString()} • {ev.time}
                </td>
                <td>{ev.location}</td>
                <td>
                  <span
                    className={`badge ${
                      ev.status === 'Published'
                        ? 'bg-success'
                        : ev.status === 'Draft'
                        ? 'bg-secondary'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
                <td>{ev.registrations}</td>
                <td>${ev.revenue.toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleView(ev)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(ev)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(ev.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEvents().length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <form className="modal-content" onSubmit={handleCreate}>
                <div className="modal-header">
                  <h5 className="modal-title">Create Event</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreate(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Event Name</label>
                      <input name="name" className="form-control" required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Date</label>
                      <input name="date" type="date" className="form-control" required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Time</label>
                      <input name="time" type="time" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input name="location" className="form-control" required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Status</label>
                      <select name="status" className="form-select" defaultValue="Draft">
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Category</label>
                      <input name="category" className="form-control" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Registrations</label>
                      <input
                        name="registrations"
                        type="number"
                        className="form-control"
                        defaultValue={0}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Revenue ($)</label>
                      <input
                        name="revenue"
                        type="number"
                        className="form-control"
                        defaultValue={0}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Event Image</label>
                      <input
                        name="image"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreate(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {showEdit && editingEvent && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <form className="modal-content" onSubmit={handleEdit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Event</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowEdit(false);
                      setEditingEvent(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Event Name</label>
                      <input
                        name="name"
                        className="form-control"
                        defaultValue={editingEvent.name}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Date</label>
                      <input
                        name="date"
                        type="date"
                        className="form-control"
                        defaultValue={editingEvent.date}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Time</label>
                      <input
                        name="time"
                        type="time"
                        className="form-control"
                        defaultValue={editingEvent.time}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input
                        name="location"
                        className="form-control"
                        defaultValue={editingEvent.location}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        className="form-select"
                        defaultValue={editingEvent.status}
                      >
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Category</label>
                      <input
                        name="category"
                        className="form-control"
                        defaultValue={editingEvent.category}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Registrations</label>
                      <input
                        name="registrations"
                        type="number"
                        className="form-control"
                        defaultValue={editingEvent.registrations}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Revenue ($)</label>
                      <input
                        name="revenue"
                        type="number"
                        className="form-control"
                        defaultValue={editingEvent.revenue}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Event Image (leave empty to keep current)
                      </label>
                      <input name="image" type="file" accept="image/*" className="form-control" />
                      {editingEvent.image && (
                        <img
                          src={editingEvent.image}
                          alt=""
                          className="mt-2"
                          style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowEdit(false);
                      setEditingEvent(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {viewEvent && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{viewEvent.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setViewEvent(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  {viewEvent.image && (
                    <img
                      src={viewEvent.image}
                      alt=""
                      className="mb-3"
                      style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 6 }}
                    />
                  )}
                  <p>
                    <strong>Date & Time: </strong>
                    {new Date(viewEvent.date).toLocaleDateString()} • {viewEvent.time}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {viewEvent.location}
                  </p>
                  <p>
                    <strong>Category: </strong>
                    {viewEvent.category}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {viewEvent.status}
                  </p>
                  <p>
                    <strong>Registrations: </strong>
                    {viewEvent.registrations}
                  </p>
                  <p>
                    <strong>Revenue: </strong>${viewEvent.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setViewEvent(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
