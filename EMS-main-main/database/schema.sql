-- Drop and recreate database
DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

-- 1) User Table
CREATE TABLE user (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(150) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    Role ENUM('CUSTOMER','EVENT_MANAGER','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    Status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2) Customer Profile Table
CREATE TABLE customer (
    UserID INT NOT NULL,
    Address VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    ZipCode VARCHAR(20),
    Country VARCHAR(100),
    DOB DATE,
    Anniversary DATE,
    Gender ENUM('MALE','FEMALE','OTHER'),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES user(UserID) ON DELETE CASCADE
);

-- 3) Event Manager / Organizer Profile Table
CREATE TABLE event_organizer (
    UserID INT NOT NULL,
    OrganizationName VARCHAR(150),
    ContactPerson VARCHAR(150),
    ContactPersonPhone VARCHAR(20),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES user(UserID) ON DELETE CASCADE
);

-- 4) Event Table
CREATE TABLE event (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    StartDate DATETIME,
    EndDate DATETIME,
    Location VARCHAR(255),
    Category VARCHAR(100),
    eventType VARCHAR(50), -- e.g., Seminar, Concert
    eventStatus ENUM('PENDING','APPROVED','REJECTED','CANCELLED') DEFAULT 'PENDING',
    OrganizerID INT NOT NULL,
    eventMode ENUM('ONLINE','OFFLINE') NOT NULL,
    requiresSeat TINYINT(1) NOT NULL DEFAULT 0,
    ticketPrice DECIMAL(10,2) NULL, -- used if requiresSeat = 0
    ApprovedBy INT NULL,
    ApprovedAt DATETIME NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (OrganizerID) REFERENCES user(UserID),
    FOREIGN KEY (ApprovedBy) REFERENCES user(UserID)
);

-- 5) Seat Category Table
CREATE TABLE seat_category (
    SeatCategoryID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    CategoryName VARCHAR(50) NOT NULL, -- e.g., VIP, Regular
    Price DECIMAL(10,2) NOT NULL,
    TotalSeats INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES event(EventID)
);

-- 6) Individual Seats Table (optional)
CREATE TABLE seat (
    SeatID INT AUTO_INCREMENT PRIMARY KEY,
    SeatCategoryID INT NOT NULL,
    SeatNumber VARCHAR(10), -- e.g., A1, A2, B1
    FOREIGN KEY (SeatCategoryID) REFERENCES seat_category(SeatCategoryID)
);

-- 7) Ticket Table
CREATE TABLE ticket (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    BookingDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Quantity INT NOT NULL,
    Status ENUM('CONFIRMED','CANCELLED') DEFAULT 'CONFIRMED',
    finalPrice DECIMAL(10,2) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES event(EventID),
    FOREIGN KEY (UserID) REFERENCES user(UserID)
);

-- 8) Ticket-Seat Junction Table
CREATE TABLE ticket_seat (
    TicketSeatID INT AUTO_INCREMENT PRIMARY KEY,
    TicketID INT NOT NULL,
    SeatID INT NOT NULL,
    FOREIGN KEY (TicketID) REFERENCES ticket(TicketID),
    FOREIGN KEY (SeatID) REFERENCES seat(SeatID)
);

-- 9) Feedback Table
CREATE TABLE feedback (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES event(EventID),
    FOREIGN KEY (UserID) REFERENCES user(UserID)
);

-- 10) Event Images Table
CREATE TABLE event_images (
    ImageID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    ImagePath VARCHAR(255) NOT NULL,
    ImageType ENUM('BANNER','PHOTO') NOT NULL,
    UploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES event(EventID) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_user_email ON user(Email);
CREATE INDEX idx_event_status ON event(eventStatus);
CREATE INDEX idx_ticket_event ON ticket(EventID);
CREATE INDEX idx_ticket_user ON ticket(UserID);
