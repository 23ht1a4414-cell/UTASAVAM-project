import client from './client';

// ============================================================
// Maps between the frontend's flat event shape (title, location,
// date, category, price) and the backend Event model's shape
// (village/district/state, capacity/bookedSlots, isActive, etc).
// ============================================================

function toFrontend(event) {
  if (!event) return event;
  return {
    _id: event._id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.village, // backend has no single "location" field
    category: event.category,
    price: event.price,
  };
}

function toBackend(event) {
  return {
    title: event.title,
    description: event.description,
    date: event.date,
    village: event.location, // frontend "location" -> backend "village"
    category: event.category,
    price: event.price || 0,
    capacity: event.capacity || 100,
  };
}

export const getEvents = async () => {
  const { data } = await client.get('/events');
  // Backend returns { events, page, totalPages, totalResults }, not a bare array.
  return data.events.map(toFrontend);
};

export const getEvent = async (id) => {
  const { data } = await client.get(`/events/${id}`);
  return toFrontend(data);
};

export const createEvent = async (event) => {
  // protect + admin route on the backend — needs a logged-in admin JWT
  // stored under 'utsavam_token' (see client.js). No login page exists
  // yet, so this will 401 until an auth flow is added.
  const { data } = await client.post('/events', toBackend(event));
  return toFrontend(data);
};

export const deleteEvent = async (id) => {
  // Also protect + admin — same auth requirement as createEvent.
  await client.delete(`/events/${id}`);
  return { success: true };
};
