const { getDb, saveDb } = require('../db');
const { v4: uuidv4 } = require('uuid');

const createBooking = (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    if (!expertId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDb();

    const existingBooking = db.bookings.find(b =>
      b.expertId === expertId && b.date === date && b.timeSlot === timeSlot
    );

    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is already booked!' });
    }

    const booking = {
      _id: uuidv4(),
      expertId, name, email, phone, date, timeSlot,
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.bookings.push(booking);
    saveDb(db);

    const io = req.app.get('io');
    io.emit('slotBooked', { expertId, date, timeSlot });

    res.status(201).json({ message: 'Booking created successfully!', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const db = getDb();
    const index = db.bookings.findIndex(b => b._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Booking not found' });

    db.bookings[index].status = status;
    saveDb(db);

    res.json({ message: 'Status updated!', booking: db.bookings[index] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingsByEmail = (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const db = getDb();
    const bookings = db.bookings.filter(b => b.email === email);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, updateBookingStatus, getBookingsByEmail };