import React from "react";
import { useNavigate } from "react-router-dom";



const dashboardStats = {
  totalEvents: 4,
  ongoingEvents: 1,
  pendingTasks: 2,
  completedTasks: 1,
};

const mockEvents = [
  { id: 1, name: "Tech Summit", date: "2025-09-20", time: "10:00 AM", status: "published" },
  { id: 2, name: "Startup Meetup", date: "2025-09-22", time: "5:00 PM", status: "draft" },
  { id: 3, name: "Art Expo", date: "2025-10-01", time: "11:00 AM", status: "published" },
];

const mockTasks = [
  { id: 1, title: "Book venue", status: "pending" },
  { id: 2, title: "Send invites", status: "in-progress" },
  { id: 3, title: "Confirm vendors", status: "completed" },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  const recentActivities = [
    { id: "1", message: "Summer Music Festival registration opened", time: "2 hours ago" },
    { id: "2", message: "Venue booking task completed by Sarah", time: "4 hours ago" },
    { id: "3", message: "Payment received: $5,000 for Tech Summit", time: "6 hours ago" },
    { id: "4", message: "Art Exhibition published successfully", time: "1 day ago" },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening with your events.</p>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/admin/tasks")}
          >
            + Add Task
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/admin/events")}
          >
            + Create Event
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/admin/settings")}
          >
            <i className="bi bi-person"></i>
          </button>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate("/admin/settings")}
          >
            <i className="bi bi-gear"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              localStorage.removeItem('role');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>



      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Total Events</h6>
              <h3>{dashboardStats.totalEvents}</h3>
              <small className="text-muted">+2 from last month</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Ongoing Events</h6>
              <h3>{dashboardStats.ongoingEvents}</h3>
              <small className="text-muted">Currently active</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Pending Tasks</h6>
              <h3>{dashboardStats.pendingTasks}</h3>
              <small className="text-muted">
                {dashboardStats.completedTasks} completed this week
              </small>
            </div>
          </div>
        </div>
      </div>




      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">Recent Activity</div>
            <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {recentActivities.map((activity) => (
                <div key={activity.id} className="mb-3">
                  <p className="mb-1">{activity.message}</p>
                  <small className="text-muted">{activity.time}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Upcoming Events</span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => navigate("/admin/events")}
              >
                View All
              </button>
            </div>
            <div className="card-body">
              {mockEvents
                .filter((event) => new Date(event.date) > new Date())
                .slice(0, 3)
                .map((event) => (
                  <div
                    key={event.id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div>
                      <p className="mb-0 fw-bold">{event.name}</p>
                      <small className="text-muted">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </small>
                    </div>
                    <span
                      className={`badge ${
                        event.status === "published"
                          ? "bg-primary"
                          : event.status === "draft"
                          ? "bg-secondary"
                          : "bg-light text-dark"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>




      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Task Summary</span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => navigate("/admin/tasks")}
              >
                Manage Tasks
              </button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Pending</span>
                <span className="badge bg-danger">
                  {mockTasks.filter((t) => t.status === "pending").length}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>In Progress</span>
                <span className="badge bg-secondary">
                  {mockTasks.filter((t) => t.status === "in-progress").length}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Completed</span>
                <span className="badge bg-success">
                  {mockTasks.filter((t) => t.status === "completed").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
