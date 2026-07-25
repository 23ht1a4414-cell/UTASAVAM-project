// Run with: node utils/seed.js
// Populates the database with a sample admin user and a few events.
import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import Event from '../models/Event.js'

dotenv.config()

const run = async () => {
  await connectDB()

  await Promise.all([User.deleteMany({}), Event.deleteMany({})])

  const admin = await User.create({
    name: 'Utsavam Admin',
    email: 'admin@utsavam.com',
    password: 'admin123',
    role: 'admin',
  })

  const sampleEvents = [
    {
      title: 'Sankranti Village Utsavam',
      description: 'Traditional harvest festival with kolam competitions, bull races and folk music.',
      category: 'Harvest Celebration',
      village: 'Guntur Village',
      district: 'Guntur',
      date: new Date('2026-01-14'),
      time: '06:00 AM',
      price: 0,
      capacity: 500,
      organizer: 'Village Panchayat',
      contactPhone: '9876543210',
      createdBy: admin._id,
    },
    {
      title: 'Sri Venkateswara Temple Utsavam',
      description: 'Annual temple celebration with processions, cultural programs and prasadam distribution.',
      category: 'Temple Utsavam',
      village: 'Mangalagiri',
      district: 'Guntur',
      date: new Date('2026-03-20'),
      time: '05:30 PM',
      price: 100,
      capacity: 300,
      organizer: 'Temple Committee',
      contactPhone: '9123456780',
      createdBy: admin._id,
    },
    {
      title: 'Telugu Village Cultural Fair',
      description: 'Handicrafts, folk dance, local cuisine stalls and games for the whole family.',
      category: 'Village Fair',
      village: 'Vijayawada Rural',
      district: 'Krishna',
      date: new Date('2026-02-10'),
      time: '10:00 AM',
      price: 50,
      capacity: 800,
      organizer: 'District Cultural Board',
      contactPhone: '9988776655',
      createdBy: admin._id,
    },
  ]

  await Event.insertMany(sampleEvents)

  console.log('Seed complete.')
  console.log('Admin login -> email: admin@utsavam.com, password: admin123')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
