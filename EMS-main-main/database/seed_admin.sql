-- Insert default admin user
INSERT INTO user (FullName, Email, PasswordHash, Role, Status)
VALUES ('Admin', 'abhikp@cmail.com', '$2b$10$wH6Qw1Qw1Qw1Qw1Qw1Qw1uQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'ADMIN', 'ACTIVE');
-- Password is 'password' hashed with bcrypt (example hash, replace with real hash if needed)
