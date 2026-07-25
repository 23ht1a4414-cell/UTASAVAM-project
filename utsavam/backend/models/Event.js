import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Wedding',
        'Sangeet',
        'Mehendi',
        'Haldi',
        'Reception',
        'Jatara (Village Fair)',
        'Sankranti',
        'Diwali Mela',
        'Navratri Garba',
        'Pooja',
        'Corporate',
        'Birthday',
        'Cultural Fest',
        'Other',
      ],
      default: 'Other',
    },
    village: {
      type: String,
      required: [true, 'Village/location name is required'],
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      default: 'Andhra Pradesh',
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    endDate: {
      type: Date,
    },
    time: {
      type: String, // e.g. "06:00 PM"
    },
    imageUrl: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0, // 0 = free entry
      min: 0,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: 1,
    },
    bookedSlots: {
      type: Number,
      default: 0,
      min: 0,
    },
    organizer: {
      type: String,
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

// Virtual: remaining slots
eventSchema.virtual('availableSlots').get(function () {
  return Math.max(this.capacity - this.bookedSlots, 0)
})

eventSchema.set('toJSON', { virtuals: true })
eventSchema.set('toObject', { virtuals: true })

eventSchema.index({ date: 1 })
eventSchema.index({ village: 'text', title: 'text', description: 'text' })

const Event = mongoose.model('Event', eventSchema)

export default Event
