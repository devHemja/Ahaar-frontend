// Placeholder data standing in for real API responses. Field names
// deliberately mirror the FoodListing / NGO schemas from the technical
// docs (foodType, quantity, status, etc.) so wiring up the real
// /api/food and /api/ngos/nearby endpoints later is a drop-in swap.

export const validNGORegistrationNumbers = [
  'NGO-DL-2021-00142',
  'NGO-MH-2019-00387',
  'NGO-KA-2020-00561',
  'NGO-UP-2018-00234',
  'NGO-TN-2022-00098',
];


export const dummyStats = {
  mealsRescued: 320,
  totalDonations: 14,
  ngosReached: 6,
};

export const dummyListings = [
  {
    id: 'l1',
    foodType: 'cooked',
    quantity: '25 plates',
    description: 'Dal makhani, jeera rice, salad. Prepared fresh this morning for a cancelled event.',
    status: 'pending',
    postedAgo: '30m ago',
    timeLeft: '3h 59m left',
    claimedBy: null,
    pickupAddress: null,
    dropAddress: null,
    deliveredAgo: null,
  },
  {
    id: 'l2',
    foodType: 'packaged',
    quantity: '40 packets',
    description: 'Sealed biscuit packets and juice boxes from office pantry clearance.',
    status: 'matched',
    postedAgo: '2h ago',
    timeLeft: '47h 59m left',
    claimedBy: 'Roti Bank Delhi',
    pickupAddress: null,
    dropAddress: null,
    deliveredAgo: null,
  },
  {
    id: 'l3',
    foodType: 'cooked',
    quantity: '60 plates',
    description: 'Paneer butter masala, naan, rice. Catering surplus from a wedding function.',
    status: 'in_transit',
    postedAgo: '5h ago',
    timeLeft: '1h 12m left',
    claimedBy: 'Annapurna Sewa Trust',
    pickupAddress: 'B-42, Hauz Khas Enclave, New Delhi',
    dropAddress: 'Annapurna Sewa Trust, Lajpat Nagar, New Delhi',
    deliveredAgo: null,
  },
  {
    id: 'l4',
    foodType: 'raw',
    quantity: '15 kg vegetables',
    description: 'Fresh, unsold vegetables from the weekend farmers market stall.',
    status: 'delivered',
    postedAgo: '1d ago',
    timeLeft: 'Completed',
    claimedBy: 'Hunger Free India',
    pickupAddress: 'Sector 18 Market, Noida',
    dropAddress: 'Hunger Free India, Sector 62, Noida',
    deliveredAgo: '20h ago',
  },
];
export const dummyNGOs = [
  { id: 'n1', orgName: 'Roti Bank Delhi', category: 'Food Relief', distanceKm: 1.8, rating: 4.8 },
  { id: 'n2', orgName: 'Annapurna Sewa Trust', category: 'Community Kitchen', distanceKm: 3.2, rating: 4.6 },
  { id: 'n3', orgName: 'Hunger Free India', category: 'Child Nutrition', distanceKm: 5.1, rating: 4.9 },
  { id: 'n4', orgName: 'Seva Bhoj Foundation', category: 'Food Relief', distanceKm: 2.4, rating: 4.7 },
  { id: 'n5', orgName: 'Akshaya Patra Delhi', category: 'Child Nutrition', distanceKm: 6.0, rating: 4.9 },
  { id: 'n6', orgName: 'Goonj Community Kitchen', category: 'Community Kitchen', distanceKm: 4.3, rating: 4.5 },
  { id: 'n7', orgName: 'Feeding India Chapter', category: 'Food Relief', distanceKm: 3.8, rating: 4.6 },
  { id: 'n8', orgName: 'Smile Foundation NGO', category: 'Child Nutrition', distanceKm: 7.2, rating: 4.4 },
  { id: 'n9', orgName: 'Agrawal Old Age Home', category: 'Old Age Home', distanceKm: 4.9, rating: 4.7 },
  { id: 'n10', orgName: 'Disha Disaster Relief', category: 'Disaster Relief', distanceKm: 8.4, rating: 4.3 },
];

export const dummyNotifications = [
  {
    id: 'note1',
    type: 'request_accepted',
    message: 'Roti Bank Delhi claimed your packaged food listing (40 packets).',
    timeAgo: '12m ago',
    isRead: false,
  },
  {
    id: 'note2',
    type: 'delivered',
    message: 'Hunger Free India confirmed delivery of your 15 kg vegetables donation.',
    timeAgo: '1h ago',
    isRead: false,
  },
  {
    id: 'note3',
    type: 'food_alert',
    message: "Your listing 'Dal makhani, jeera rice, salad' is now visible to 6 nearby NGOs.",
    timeAgo: '3h ago',
    isRead: true,
  },
  {
    id: 'note4',
    type: 'request_accepted',
    message: 'Annapurna Sewa Trust is en route to pick up your 60 plates donation.',
    timeAgo: '5h ago',
    isRead: true,
  },
  {
    id: 'note5',
    type: 'delivered',
    message: 'Delivery completed! Thank you for reducing food waste today.',
    timeAgo: '1d ago',
    isRead: true,
  },
];

export const dummyUser = {
  name: 'Rohan Mehta',
  email: 'rohan.mehta@example.com',
  role: 'Donor',
  location: 'Connaught Place, New Delhi',
  joinedDate: 'March 2025',
};