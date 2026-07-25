export const CATEGORIES = [
  { name: 'Wedding', color: 'var(--rani)' },
  { name: 'Sangeet', color: 'var(--marigold)' },
  { name: 'Mehendi', color: 'var(--emerald)' },
  { name: 'Haldi', color: 'var(--gold)' },
  { name: 'Reception', color: 'var(--rani)' },
  { name: 'Jatara (Village Fair)', color: 'var(--marigold)' },
  { name: 'Sankranti', color: 'var(--gold)' },
  { name: 'Diwali Mela', color: 'var(--marigold)' },
  { name: 'Navratri Garba', color: 'var(--rani)' },
  { name: 'Pooja', color: 'var(--gold)' },
  { name: 'Corporate', color: 'var(--emerald)' },
  { name: 'Birthday', color: 'var(--marigold)' },
  { name: 'Cultural Fest', color: 'var(--rani)' },
  { name: 'Other', color: 'var(--ivory-dim)' },
];

export const CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Jaipur', 'Hyderabad',
  'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Chandigarh', 'Guntur',
];

export const VENUES_BY_CITY = {
  'Mumbai': [
    'Sunrise Banquets, Bandra',
    'The Grand Pavilion, Juhu',
    'Seaside Lawns, Worli',
    'Ambience Convention Centre, Andheri',
  ],
  'Delhi NCR': [
    'Rajmahal Banquet Hall, Rohini',
    'The Mughal Gardens, Chanakyapuri',
    'Crystal Ballroom, Gurugram',
    'Yamuna Vatika Lawns, Noida',
  ],
  'Bengaluru': [
    'Palm Meadows Resort, Whitefield',
    'The Orchid Hall, Indiranagar',
    'Garden City Convention Centre, Koramangala',
    'Silver Oak Banquets, Jayanagar',
  ],
  'Jaipur': [
    'Rajwada Palace Grounds, Amer Road',
    'Pink City Banquets, C-Scheme',
    'Haveli Gulmohar, Malviya Nagar',
    'Royal Fort Lawns, Jagatpura',
  ],
  'Hyderabad': [
    'Nizam Convention Centre, Banjara Hills',
    'Golconda Gardens, Gachibowli',
    'Pearl Palace Banquets, Jubilee Hills',
    'Charminar Lawns, Abids',
  ],
  'Pune': [
    'Deccan Greens, Koregaon Park',
    'The Symphony Hall, Baner',
    'Sahyadri Lawns, Kothrud',
    'Riviera Banquets, Viman Nagar',
  ],
  'Chennai': [
    'Marina Vista Hall, Besant Nagar',
    'Temple City Convention Centre, Mylapore',
    'Coromandel Gardens, Adyar',
    'Aura Banquets, T Nagar',
  ],
  'Kolkata': [
    'Victoria Greens, Alipore',
    'Howrah Heritage Hall, Howrah',
    'Salt Lake Banquets, Salt Lake City',
    'Rabindra Sarovar Lawns, Ballygunge',
  ],
  'Ahmedabad': [
    'Sabarmati Riverside Lawns, Riverfront',
    'Navratna Banquets, Satellite',
    'Heritage Haveli Grounds, CG Road',
    'Kankaria Convention Centre, Maninagar',
  ],
  'Chandigarh': [
    'Rose Garden Lawns, Sector 16',
    'Le Chateau Banquets, Sector 35',
    'Sukhna Vista Hall, Sector 1',
    'Capitol Convention Centre, Sector 17',
  ],
  'Guntur': [
    'Sri Ramalayam Kalyana Mandapam, Lakshmipuram',
    'Amaravati Convention Hall, Brodipet',
    'Krishna Delta Function Hall, Arundelpet',
    'Nagarjuna Gardens, Guntur–Vijayawada Road',
  ],
};

export function categoryColor(name) {
  return CATEGORIES.find((c) => c.name === name)?.color || 'var(--ivory-dim)';
}

export function formatINR(amount) {
  if (amount === undefined || amount === null || amount === '' || Number(amount) === 0) return 'Free';
  const n = Number(amount);
  if (Number.isNaN(n)) return amount;
  return `₹${n.toLocaleString('en-IN')}`;
}
