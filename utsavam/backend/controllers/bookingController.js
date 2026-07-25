import Event from '../models/Event.js'
import Booking from '../models/Booking.js'

// @desc    Create a booking for an event
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    const { eventId, guestName, guestEmail, guestPhone, numberOfGuests = 1, notes } = req.body

    if (!eventId || !guestName || !guestEmail || !guestPhone) {
      res.status(400)
      throw new Error('eventId, guestName, guestEmail and guestPhone are required')
    }

    const event = await Event.findById(eventId)
    if (!event || !event.isActive) {
      res.status(404)
      throw new Error('Event not found')
    }

    // Atomically reserve slots so two people can't overbook the same seats.
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $expr: { $lte: [{ $add: ['$bookedSlots', numberOfGuests] }, '$capacity'] },
      },
      { $inc: { bookedSlots: numberOfGuests } },
      { new: true }
    )

    if (!updatedEvent) {
      res.status(400)
      throw new Error('Not enough available slots for this event')
    }

    const totalAmount = event.price * numberOfGuests

    const booking = await Booking.create({
      event: eventId,
      user: req.user._id,
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests,
      totalAmount,
      notes,
    })

    res.status(201).json(booking)
  } catch (error) {
    next(error)
  }
}

// @desc    Get bookings for the logged-in user
// @route   GET /api/bookings/me
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date village imageUrl price')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

// @desc    Get single booking by ID (owner or admin only)
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event')

    if (!booking) {
      res.status(404)
      throw new Error('Booking not found')
    }

    const isOwner = booking.user.toString() === req.user._id.toString()
    if (!isOwner && req.user.role !== 'admin') {
      res.status(403)
      throw new Error('Not authorized to view this booking')
    }

    res.json(booking)
  } catch (error) {
    next(error)
  }
}

// @desc    Cancel a booking (owner or admin) and release slots
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      res.status(404)
      throw new Error('Booking not found')
    }

    const isOwner = booking.user.toString() === req.user._id.toString()
    if (!isOwner && req.user.role !== 'admin') {
      res.status(403)
      throw new Error('Not authorized to cancel this booking')
    }

    if (booking.status === 'cancelled') {
      res.status(400)
      throw new Error('Booking is already cancelled')
    }

    booking.status = 'cancelled'
    await booking.save()

    // Release the reserved slots back to the event
    await Event.findByIdAndUpdate(booking.event, {
      $inc: { bookedSlots: -booking.numberOfGuests },
    })

    res.json(booking)
  } catch (error) {
    next(error)
  }
}

// @desc    Get all bookings (optionally filter by event)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res, next) => {
  try {
    const { eventId, status } = req.query
    const query = {}
    if (eventId) query.event = eventId
    if (status) query.status = status

    const bookings = await Booking.find(query)
      .populate('event', 'title date village')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (error) {
    next(error)
  }
}
