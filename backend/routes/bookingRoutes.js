const express = require('express');
const router = express.Router();
const {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail
} = require('../controllers/bookingController');

// POST /bookings
router.post('/', createBooking);

// PATCH /bookings/:id/status
router.patch('/:id/status', updateBookingStatus);

// GET /bookings?email=
router.get('/', getBookingsByEmail);

module.exports = router;