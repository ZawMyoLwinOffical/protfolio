



// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto'); // For basic password hashing (not for production)

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || 'portfolio.db';

// --- Middleware ---
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Enable CORS for development (adjust for production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for simplicity in development
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static files from the 'public' directory (where your frontend will be)
// You'll place your index.html and other frontend assets in a 'public' folder
app.use(express.static(path.join(__dirname, 'public'), { index: 'profile.html' }));

// --- Database Initialization ---
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_read INTEGER DEFAULT 0
        )`, (createErr) => {
            if (createErr) {
                console.error('Error creating messages table:', createErr.message);
            } else {
                console.log('Messages table ensured.');
            }
        });
    }
});

// --- Email Transporter Setup (for sending notifications) ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- Helper for basic password hashing (NOT PRODUCTION SAFE) ---
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// --- Basic Admin Authentication Middleware (NOT PRODUCTION SAFE) ---
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }

    const decoded = Buffer.from(credentials, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPasswordHash = hashPassword(process.env.ADMIN_PASSWORD);

    if (username === expectedUsername && hashPassword(password) === expectedPasswordHash) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}


// --- API Endpoints ---

// 1. Contact Form Submission
app.post('/api/contact', async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Sanitize inputs (basic example, consider a library like 'sanitize-html' for production)
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedPhone = phone ? phone.replace(/</g, "&lt;").replace(/>/g, "&gt;") : null;
    const sanitizedEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const stmt = db.prepare('INSERT INTO messages (name, phone, email, message) VALUES (?, ?, ?, ?)');
    stmt.run(sanitizedName, sanitizedPhone, sanitizedEmail, sanitizedMessage, function (err) {
        if (err) {
            console.error('Error inserting message:', err.message);
            return res.status(500).json({ message: 'Failed to send message.' });
        }

        console.log(`A new message has been added with ID ${this.lastID}`);

        // --- Send Email Notification (Optional) ---
        if (process.env.SEND_EMAIL_NOTIFICATIONS === 'true') {
            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: process.env.ADMIN_EMAIL,   // Admin's email address
                subject: 'New Contact Message from Portfolio',
                html: `
                    <p>You have received a new message from your portfolio website:</p>
                    <ul>
                        <li><strong>Name:</strong> ${sanitizedName}</li>
                        <li><strong>Email:</strong> ${sanitizedEmail}</li>
                        <li><strong>Phone:</strong> ${sanitizedPhone || 'N/A'}</li>
                        <li><strong>Message:</strong><br>${sanitizedMessage.replace(/\n/g, '<br>')}</li>
                    </ul>
                    <p>Please check your admin panel for full details.</p>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(201).json({ message: 'Message sent successfully!' });
    });
    stmt.finalize();
});

// 2. Admin Login (Basic Auth)
app.post('/admin/login', (req, res) => {
    // Authentication logic is handled by the authenticateAdmin middleware
    // If we reach here, it means authentication was successful
    res.json({ message: 'Login successful!', success: true });
});

// 3. Get All Messages (Admin protected)
app.get('/admin/messages', authenticateAdmin, (req, res) => {
    const { page = 1, limit = 10, is_read } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let query = 'SELECT * FROM messages';
    let countQuery = 'SELECT COUNT(*) as total FROM messages';
    const params = [];
    const countParams = [];

    if (is_read !== undefined) {
        query += ' WHERE is_read = ?';
        countQuery += ' WHERE is_read = ?';
        params.push(is_read === '1' ? 1 : 0);
        countParams.push(is_read === '1' ? 1 : 0);
    }

    query += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    db.get(countQuery, countParams, (err, countRow) => {
        if (err) {
            console.error('Error fetching message count:', err.message);
            return res.status(500).json({ message: 'Failed to fetch messages.' });
        }
        const total = countRow.total;

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error fetching messages:', err.message);
                return res.status(500).json({ message: 'Failed to fetch messages.' });
            }
            res.json({
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                messages: rows
            });
        });
    });
});

// 4. Mark Message as Read (Admin protected)
app.put('/admin/messages/:id/read', authenticateAdmin, (req, res) => {
    const { id } = req.params;
    db.run('UPDATE messages SET is_read = 1 WHERE id = ?', id, function (err) {
        if (err) {
            console.error('Error marking message as read:', err.message);
            return res.status(500).json({ message: 'Failed to mark message as read.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Message not found.' });
        }
        res.json({ message: 'Message marked as read.' });
    });
});

// 5. Delete Message (Admin protected)
app.delete('/admin/messages/:id', authenticateAdmin, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM messages WHERE id = ?', id, function (err) {
        if (err) {
            console.error('Error deleting message:', err.message);
            return res.status(500).json({ message: 'Failed to delete message.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Message not found.' });
        }
        res.json({ message: 'Message deleted successfully.' });
    });
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Close database connection on process exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
