const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',
    password: '!QAZ2wsx',
    database: 'ems_db'
});

db.connect(error => {
    if (error) throw error;
    console.log('db connected');
});

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/events';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

/* ==================== AUTH (ADMIN) ==================== */
// const jwt = require('jsonwebtoken'); // optional if you want token-based auth

// Regis
app.post('/api/auth/register', (req, res) => {
     console.log('Register body:', req.body);

  const { FullName, Email, Password, Role } = req.body;

  // Validate required fields
  if (!FullName || !Email || !Password || !Role) {
    return res.status(400).json({ error: 'FullName, Email, Password, and Role are required' });
  }

  // Validate role against schema ENUM
  const validRoles = ['CUSTOMER', 'EVENT_MANAGER', 'ADMIN'];
  if (!validRoles.includes(Role)) {
    return res.status(400).json({ error: 'Invalid role. Must be CUSTOMER, EVENT_MANAGER, or ADMIN' });
  }

  const hashedPassword = bcrypt.hashSync(Password, 10);

  // Insert into user table
  db.query(
    'INSERT INTO user (FullName, Email, PasswordHash, Role) VALUES (?, ?, ?, ?)',
    [FullName, Email, hashedPassword, Role],
    (err, result) => {
      if (err) {
        console.error('DB error during user insert:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: 'Database error', details: err.sqlMessage });
      }

      const newUserId = result.insertId;

      // Auto-create profile based on role
      if (Role === 'CUSTOMER') {
        db.query('INSERT INTO customer (UserID) VALUES (?)', [newUserId], (err2) => {
          if (err2) {
            console.error('DB error during customer insert:', err2);
            return res.status(500).json({ error: 'Database error', details: err2.sqlMessage });
          }
          res.json({
            UserID: newUserId,
            FullName,
            Email,
            Role,
            message: 'Customer registered successfully'
          });
        });
      } else if (Role === 'EVENT_MANAGER') {
        db.query('INSERT INTO event_organizer (UserID) VALUES (?)', [newUserId], (err3) => {
          if (err3) {
            console.error('DB error during event_organizer insert:', err3);
            return res.status(500).json({ error: 'Database error', details: err3.sqlMessage });
          }
          res.json({
            UserID: newUserId,
            FullName,
            Email,
            Role,
            message: 'Event Manager registered successfully'
          });
        });
      } else {
        // Admin — no extra profile table
        res.json({
          UserID: newUserId,
          FullName,
          Email,
          Role,
          message: 'Admin registered successfully'
        });
      }
    }
  );
});

// LOGIN
app.post('/api/auth/login', (req, res) => {
  console.log('Login body:', req.body);

  const { Email, Password, Role } = req.body;

  if (!Email || !Password || !Role) {
    return res.status(400).json({ error: 'Email, Password, and Role are required' });
  }

  const validRoles = ['CUSTOMER', 'EVENT_MANAGER', 'ADMIN'];
  if (!validRoles.includes(Role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  db.query('SELECT * FROM user WHERE Email = ?', [Email], (err, result) => {
    if (err) {
      console.error('DB error during login:', err);
      return res.status(500).json({ error: 'Database error', details: err.sqlMessage });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const account = result[0];

    if (account.Role !== Role) {
      return res.status(403).json({ error: `Account is not registered as ${Role}` });
    }

    const isMatch = bcrypt.compareSync(Password, account.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Fetch user profile based on role
    if (Role === 'CUSTOMER') {
      db.query('SELECT * FROM customer WHERE UserID = ?', [account.UserID], (err2, profileResult) => {
        if (err2) {
          console.error('DB error during customer profile fetch:', err2);
          return res.status(500).json({ error: 'Database error', details: err2.sqlMessage });
        }
        res.json({
          UserID: account.UserID,
          FullName: account.FullName,
          Email: account.Email,
          Role: account.Role,
          profile: profileResult[0] || null,
          message: 'Login successful'
        });
      });
    } else if (Role === 'EVENT_MANAGER') {
      db.query('SELECT * FROM event_organizer WHERE UserID = ?', [account.UserID], (err2, profileResult) => {
        if (err2) {
          console.error('DB error during event_organizer profile fetch:', err2);
          return res.status(500).json({ error: 'Database error', details: err2.sqlMessage });
        }
        res.json({
          UserID: account.UserID,
          FullName: account.FullName,
          Email: account.Email,
          Role: account.Role,
          profile: profileResult[0] || null,
          message: 'Login successful'
        });
      });
    } else {
      // Admin: no extra profile table
      res.json({
        UserID: account.UserID,
        FullName: account.FullName,
        Email: account.Email,
        Role: account.Role,
        profile: null,
        message: 'Login successful'
      });
    }
  });
});


// LOGOUT
app.get('/api/auth/logout', (req, res) => {
    // If using JWT, client just deletes token; if using sessions, destroy session here
    res.json({ message: 'Logged out successfully' });
});



app.put('/admin/:adminId', (req, res) => {
    const { Password, Role } = req.body;

    let updateFields = [];
    let values = [];

    if (Password) {
        const hashedPassword = bcrypt.hashSync(Password, 10);
        updateFields.push("PasswordHash = ?");
        values.push(hashedPassword);
    }

    if (Role) {
        updateFields.push("Role = ?");
        values.push(Role);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    values.push(req.params.adminId);

    db.query(
        `UPDATE admin SET ${updateFields.join(", ")} WHERE AdminID = ?`,
        values,
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.json({ message: 'Admin updated successfully' });
        }
    );
});

/* ==================== EVENTS ==================== */
app.post('/api/events', upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'photos', maxCount: 3 }
]), (req, res) => {
    const {
        Name, Description, StartDate, EndDate, Location,
        Category, EventType, EventStatus, OrganizerID,
        EventMode, RequiresSeat, TicketPrice
    } = req.body;

    if (!Name || !OrganizerID || !EventMode) {
        return res.status(400).json({ error: 'Name, OrganizerID, and EventMode are required' });
    }

    const sql = `
        INSERT INTO event 
        (Name, Description, StartDate, EndDate, Location, Category, eventType, eventStatus, OrganizerID, eventMode, requiresSeat, ticketPrice)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        Name, Description, StartDate, EndDate, Location, Category,
        EventType, EventStatus || 'ACTIVE', OrganizerID, EventMode, RequiresSeat || 0, TicketPrice || null
    ], (err, result) => {
        if (err) return res.status(500).send(err);

        const eventID = result.insertId;
        const imageInserts = [];

        if (req.files.banner) {
            req.files.banner.forEach(file => {
                imageInserts.push([eventID, file.path, 'BANNER']);
            });
        }
        if (req.files.photos) {
            req.files.photos.forEach(file => {
                imageInserts.push([eventID, file.path, 'PHOTO']);
            });
        }

        if (imageInserts.length > 0) {
            db.query(
                'INSERT INTO event_images (EventID, ImagePath, ImageType) VALUES ?',
                [imageInserts],
                (imgErr) => {
                    if (imgErr) return res.status(500).send(imgErr);
                    res.json({ message: 'Event created successfully', eventID });
                }
            );
        } else {
            res.json({ message: 'Event created successfully', eventID });
        }
    });
});



app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;

    const eventQuery = 'SELECT * FROM event WHERE EventID = ?';
    const imagesQuery = 'SELECT ImagePath, ImageType FROM event_images WHERE EventID = ?';

    db.query(eventQuery, [eventId], (err, eventResults) => {
        if (err) return res.status(500).send(err);
        if (eventResults.length === 0) return res.status(404).json({ error: 'Event not found' });

        db.query(imagesQuery, [eventId], (imgErr, imageResults) => {
            if (imgErr) return res.status(500).send(imgErr);

            const event = eventResults[0];
            event.images = imageResults;
            res.json(event);
        });
    });
});


app.put('/api/events/:id', upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'photos', maxCount: 3 }
]), (req, res) => {
    const eventId = req.params.id;
    const {
        Name, Description, StartDate, EndDate, Location,
        Category, EventType, EventStatus, EventMode, RequiresSeat, TicketPrice
    } = req.body;

    let updateFields = [];
    let values = [];

    if (Name) { updateFields.push("Name=?"); values.push(Name); }
    if (Description) { updateFields.push("Description=?"); values.push(Description); }
    if (StartDate) { updateFields.push("StartDate=?"); values.push(StartDate); }
    if (EndDate) { updateFields.push("EndDate=?"); values.push(EndDate); }
    if (Location) { updateFields.push("Location=?"); values.push(Location); }
    if (Category) { updateFields.push("Category=?"); values.push(Category); }
    if (EventType) { updateFields.push("eventType=?"); values.push(EventType); }
    if (EventStatus) { updateFields.push("eventStatus=?"); values.push(EventStatus); }
    if (EventMode) { updateFields.push("eventMode=?"); values.push(EventMode); }
    if (RequiresSeat !== undefined) { updateFields.push("requiresSeat=?"); values.push(RequiresSeat); }
    if (TicketPrice !== undefined) { updateFields.push("ticketPrice=?"); values.push(TicketPrice); }

    if (updateFields.length === 0 && !req.files.banner && !req.files.photos) {
        return res.status(400).json({ error: 'No fields or images to update' });
    }

    const updateEvent = () => {
        if (updateFields.length > 0) {
            values.push(eventId);
            db.query(`UPDATE event SET ${updateFields.join(", ")} WHERE EventID=?`, values, (err, result) => {
                if (err) return res.status(500).send(err);
                if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });
                insertImages();
            });
        } else {
            insertImages();
        }
    };

    const insertImages = () => {
        const imageInserts = [];

        if (req.files.banner) {
            req.files.banner.forEach(file => {
                imageInserts.push([eventId, file.path, 'BANNER']);
            });
        }
        if (req.files.photos) {
            req.files.photos.forEach(file => {
                imageInserts.push([eventId, file.path, 'PHOTO']);
            });
        }

        if (imageInserts.length > 0) {
            db.query(
                'INSERT INTO event_images (EventID, ImagePath, ImageType) VALUES ?',
                [imageInserts],
                (imgErr) => {
                    if (imgErr) return res.status(500).send(imgErr);
                    res.json({ message: 'Event updated successfully with new images' });
                }
            );
        } else {
            res.json({ message: 'Event updated successfully' });
        }
    };

    updateEvent();
});



app.get('/api/events', (req, res) => {
    db.query('SELECT * FROM event ORDER BY StartDate ASC', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log('Server is running at port 3001');
});
