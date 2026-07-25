import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Name, email and password are required')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User with this email already exists')
    }

    const user = await User.create({ name, email, password, phone })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Register a new admin (requires secret key)
// @route   POST /api/auth/register-admin
// @access  Public (protected by secret key)
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone, secretKey } = req.body

    const expectedKey = process.env.ADMIN_SECRET_KEY || '1234'
    if (!secretKey || secretKey !== expectedKey) {
      res.status(403)
      throw new Error('Invalid admin secret key')
    }

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Name, email and password are required')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User with this email already exists')
    }

    const user = await User.create({ name, email, password, phone, role: 'admin' })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Email and password are required')
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.matchPassword(password))) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get logged-in user's profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
}