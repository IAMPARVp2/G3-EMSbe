import './EventForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../home/Footer';
const currentOrganizerID = 1;
export default function EventForm({ existingEvent }) {
  const [formData, setFormData] = useState({
    Name: existingEvent?.Name || '',
    Description: existingEvent?.Description || '',
    StartDate: existingEvent?.StartDate || '',
    EndDate: existingEvent?.EndDate || '',
    Location: existingEvent?.Location || '',
    Category: existingEvent?.Category || '',
    EventType: existingEvent?.EventType || 'Conference',
    EventStatus: existingEvent?.EventStatus || 'Scheduled',
    OrganizerID: existingEvent?.OrganizerID || '',
    TotalSeats: existingEvent?.TotalSeats || 0,
    AvailableSeats: existingEvent?.AvailableSeats || 0,
  });

  const [banner, setBanner] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    setPreviewBanner(URL.createObjectURL(file));
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPreviewPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  const handleNext = () => {
    // You can add validation for Step 1 here if needed
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!banner) {
      alert('Banner image is required');
      return;
    }
    if (photos.length < 3) {
      alert('At least 3 additional photos are required');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append('banner', banner);
    photos.forEach((photo) => data.append('photos', photo));

    try {
      if (existingEvent) {
        await axios.put(`/api/events/${existingEvent.EventID}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Event updated successfully');
      } else {
        await axios.post('/api/events', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Event created successfully');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving event');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center mb-4">
        <a href="#" className="text-decoration-none text-dark me-2"></a>
        <h4>Create New Event</h4>
      </div>
      <p className="text-muted">Fill in the details below to create a new event</p>

      {/* Step Indicator */}
      <div className="step-indicator mb-4">
        <div className="step-item">
          <span className={`step-number ${currentStep === 1 ? 'active' : ''}`}>1</span>
          <strong className={currentStep === 1 ? 'text-primary' : 'text-muted'}>
            Event Details
          </strong>
        </div>
        <div className="step-divider"></div>
        <div className="step-item">
          <span className={`step-number ${currentStep === 2 ? 'active' : ''}`}>2</span>
          <strong className={currentStep === 2 ? 'text-primary' : 'text-muted'}>
            Media & Review
          </strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {currentStep === 1 && (
          <div className="card shadow-sm p-4">
            <div className="card-body">
              <h5 className="card-title">Event Information</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="eventName" className="form-label">
                    Name of Event <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventName"
                    name="Name"
                    placeholder="Enter event name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="startDate" className="form-label">
                    Event Start Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate" className="form-label">
                    Event End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="EndDate"
                    value={formData.EndDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="eventLocation" className="form-label">
                    Event Location <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventLocation"
                    name="Location"
                    placeholder="Enter event location"
                    value={formData.Location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="eventDetails" className="form-label">
                    Event Details <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="eventDetails"
                    name="Description"
                    rows="3"
                    placeholder="Describe your event in detail..."
                    value={formData.Description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-4">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="Category"
                    placeholder="e.g., Technology"
                    value={formData.Category}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="eventType" className="form-label">
                    Event Type
                  </label>
                  <select
                    className="form-select"
                    id="eventType"
                    name="EventType"
                    value={formData.EventType}
                    onChange={handleChange}
                  >
                    <option>Conference</option>
                    <option>Concert</option>
                    <option>Sports</option>
                    <option>Workshop</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="eventStatus" className="form-label">
                    Event Status
                  </label>
                  <select
                    className="form-select"
                    id="eventStatus"
                    name="EventStatus"
                    value={formData.EventStatus}
                    onChange={handleChange}
                  >
                    <option>Scheduled</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="totalSeats" className="form-label">
                    Total Seats
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalSeats"
                    name="TotalSeats"
                    value={formData.TotalSeats}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="availableSeats" className="form-label">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="availableSeats"
                    name="AvailableSeats"
                    value={formData.AvailableSeats}
                    onChange={handleChange}
                  />
                </div>

                {/*   
                <div className="col-md-4">

            <label htmlFor="organizerID" className="form-label">
                          
              Organizer ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="organizerID"
              name="OrganizerID"
              value={formData.OrganizerID}
              readOnly
            />
          </div>
*/}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm p-4 h-100">
                <h5 className="card-title">Event Media</h5>
                <div className="mb-4">
                  <label className="form-label">Banner Image *</label>
                  <div
                    className="upload-box"
                    onClick={() => document.getElementById('banner-upload').click()}
                  >
                    <input
                      type="file"
                      id="banner-upload"
                      accept="image/*"
                      className="d-none"
                      onChange={handleBannerChange}
                    />
                    {previewBanner ? (
                      <img
                        src={previewBanner}
                        alt="Banner Preview"
                        className="img-fluid upload-preview"
                      />
                    ) : (
                      <>
                        <i className="bi bi-upload upload-icon"></i>
                        <p className="upload-text">Click to upload banner</p>
                        <small className="text-muted">PNG, JPG up to 5MB</small>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="form-label">Additional Photos (min 3) *</label>
                  <div
                    className="upload-box"
                    onClick={() => document.getElementById('photos-upload').click()}
                  >
                    <input
                      type="file"
                      id="photos-upload"
                      accept="image/*"
                      multiple
                      className="d-none"
                      onChange={handlePhotosChange}
                    />
                    {previewPhotos.length > 0 ? (
                      <div className="row g-2 upload-preview-grid">
                        {previewPhotos.map((src, idx) => (
                          <div key={idx} className="col-4">
                            <img src={src} alt={`Photo ${idx + 1}`} className="img-fluid rounded" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <i className="bi bi-upload upload-icon"></i>
                        <p className="upload-text">Upload multiple photos</p>
                        <small className="text-muted">PNG, JPG up to 5MB each (max 10)</small>
                      </>
                    )}
                  </div>
                  <small className="text-muted mt-2 d-block">
                    {photos.length} / 10 photos uploaded
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm p-4 h-100">
                <h5 className="card-title">Event Summary</h5>
                <dl className="row g-2">
                  <dt className="col-sm-4">Event Name</dt>
                  <dd className="col-sm-8 text-break">{formData.Name || 'N/A'}</dd>
                  <dt className="col-sm-4">Start Date</dt>
                  <dd className="col-sm-8">{formData.StartDate || 'N/A'}</dd>
                  <dt className="col-sm-4">End Date</dt>
                  <dd className="col-sm-8">{formData.EndDate || 'N/A'}</dd>
                  <dt className="col-sm-4">Location</dt>
                  <dd className="col-sm-8">{formData.Location || 'N/A'}</dd>
                  <dt className="col-sm-4">Type</dt>
                  <dd className="col-sm-8">{formData.EventType || 'N/A'}</dd>
                  <dt className="col-sm-4">Status</dt>
                  <dd className="col-sm-8">{formData.EventStatus || 'N/A'}</dd>
                  <dt className="col-sm-4">Capacity</dt>
                  <dd className="col-sm-8">
                    {formData.TotalSeats ? `${formData.TotalSeats} total seats` : 'N/A'}
                  </dd>
                  <dt className="col-sm-4">Description</dt>
                  <dd className="col-sm-8 text-break">{formData.Description || 'N/A'}</dd>
                </dl>
              </div>
            </div>
          </div>
        )}
        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          {currentStep === 1 ? (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          ) : (
            <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
              Back
            </button>
          )}
          <div>
            <button type="button" className="btn btn-link text-danger text-decoration-none me-2">
              Cancel
            </button>
            {currentStep === 1 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                {existingEvent ? 'Update Event' : 'Create Event'}
              </button>
            )}
          </div>
        </div>
      </form>
      <div>{/* <Footer /> */}</div>
    </div>
  );
}

// import './EventForm.css';
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function EventForm({ existingEvent }) {
//   const [formData, setFormData] = useState({
//     Name: existingEvent?.Name || '',
//     Description: existingEvent?.Description || '',
//     StartDate: existingEvent?.StartDate || '',
//     EndDate: existingEvent?.EndDate || '',
//     Location: existingEvent?.Location || '',
//     Category: existingEvent?.Category || '',
//     EventType: existingEvent?.EventType || 'Conference',
//     EventStatus: existingEvent?.EventStatus || 'Scheduled',
//     OrganizerID: existingEvent?.OrganizerID || '',
//     TotalSeats: existingEvent?.TotalSeats || 0,
//     AvailableSeats: existingEvent?.AvailableSeats || 0,
//   });

//   const [banner, setBanner] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [previewBanner, setPreviewBanner] = useState(null);
//   const [previewPhotos, setPreviewPhotos] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBannerChange = (e) => {
//     const file = e.target.files[0];
//     setBanner(file);
//     setPreviewBanner(URL.createObjectURL(file));
//   };

//   const handlePhotosChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPhotos(files);
//     setPreviewPhotos(files.map((file) => URL.createObjectURL(file)));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!banner) {
//       alert('Banner image is required');
//       return;
//     }
//     if (photos.length < 3) {
//       alert('At least 3 additional photos are required');
//       return;
//     }

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });
//     data.append('banner', banner);
//     photos.forEach((photo) => data.append('photos', photo));

//     try {
//       if (existingEvent) {
//         await axios.put(`/api/events/${existingEvent.EventID}`, data, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Event updated successfully');
//       } else {
//         await axios.post('/api/events', data, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Event created successfully');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error saving event');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <h2>{existingEvent ? 'Edit Event' : 'Create Event'}</h2>

//       <input
//         name="Name"
//         placeholder="Event Name"
//         value={formData.Name}
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="Description"
//         placeholder="Description"
//         value={formData.Description}
//         onChange={handleChange}
//       />
//       <input
//         type="date"
//         name="StartDate"
//         value={formData.StartDate}
//         onChange={handleChange}
//         required
//       />
//       <input type="date" name="EndDate" value={formData.EndDate} onChange={handleChange} />
//       <input
//         name="Location"
//         placeholder="Location"
//         value={formData.Location}
//         onChange={handleChange}
//       />
//       <input
//         name="Category"
//         placeholder="Category"
//         value={formData.Category}
//         onChange={handleChange}
//       />
//       <select name="EventType" value={formData.EventType} onChange={handleChange}>
//         <option>Conference</option>
//         <option>Concert</option>
//         <option>Sports</option>
//         <option>Workshop</option>
//       </select>
//       <select name="EventStatus" value={formData.EventStatus} onChange={handleChange}>
//         <option>Scheduled</option>
//         <option>Active</option>
//         <option>Completed</option>
//         <option>Cancelled</option>
//       </select>
//       <input
//         type="number"
//         name="TotalSeats"
//         placeholder="Total Seats"
//         value={formData.TotalSeats}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="AvailableSeats"
//         placeholder="Available Seats"
//         value={formData.AvailableSeats}
//         onChange={handleChange}
//       />
//       <input
//         name="OrganizerID"
//         placeholder="Organizer ID"
//         value={formData.OrganizerID}
//         onChange={handleChange}
//         required
//       />

//       <label>Banner Image:</label>
//       <input type="file" accept="image/*" onChange={handleBannerChange} />
//       {previewBanner && <img src={previewBanner} alt="Banner Preview" width="200" />}

//       <label>Additional Photos (min 3):</label>
//       <input type="file" accept="image/*" multiple onChange={handlePhotosChange} />
//       <div style={{ display: 'flex', gap: '10px' }}>
//         {previewPhotos.map((src, idx) => (
//           <img key={idx} src={src} alt={`Photo ${idx + 1}`} width="100" />
//         ))}
//       </div>

//       <button type="submit">{existingEvent ? 'Update Event' : 'Create Event'}</button>
//     </form>
//   );
// }
