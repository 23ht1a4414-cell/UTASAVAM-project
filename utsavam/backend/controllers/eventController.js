import Event from '../models/Event.js'

// @desc    Get all events (with optional filters, search, pagination)
// @route   GET /api/events
// @access  Public
// Query params: search, category, village, from, to, page, limit
export const getEvents = async (req, res, next) => {
  try {
    const { search, category, village, from, to, page = 1, limit = 12 } = req.query

    const query = { isActive: true }

    if (search) {
      query.$text = { $search: search }
    }
    if (category) {
      query.category = category
    }
    if (village) {
      query.village = new RegExp(village, 'i')
    }
    if (from || to) {
      query.date = {}
      if (from) query.date.$gte = new Date(from)
      if (to) query.date.$lte = new Date(to)
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1)
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100)

    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ date: 1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Event.countDocuments(query),
    ])

    res.json({
      events,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalResults: total,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      res.status(404)
      throw new Error('Event not found')
    }
    res.json(event)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json(event)
  } catch (error) {
    next(error)
  }
}

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      res.status(404)
      throw new Error('Event not found')
    }

    Object.assign(event, req.body)
    const updated = await event.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      res.status(404)
      throw new Error('Event not found')
    }
    await event.deleteOne()
    res.json({ message: 'Event removed' })
  } catch (error) {
    next(error)
  }
}
