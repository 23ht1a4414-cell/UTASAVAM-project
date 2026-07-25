import express from 'express'
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
} from '../controllers/bookingController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createBooking)
router.get('/me', protect, getMyBookings)
router.get('/', protect, admin, getAllBookings)
router.get('/:id', protect, getBookingById)
router.put('/:id/cancel', protect, cancelBooking)

export default router
