// Placeholder data standing in for real API responses. Field names
// deliberately mirror the FoodListing / NGO schemas from the technical
// docs (foodType, quantity, status, etc.) so wiring up the real
// /api/food and /api/ngos/nearby endpoints later is a drop-in swap.

export const dummyUser = {
  name: 'Rohan Mehta',
  role: 'Donor',
  location: 'Connaught Place, New Delhi',
};

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
  },
];

export const dummyNGOs = [
  { id: 'n1', orgName: 'Roti Bank Delhi', category: 'Food Relief', distanceKm: 1.8, rating: 4.8 },
  { id: 'n2', orgName: 'Annapurna Sewa Trust', category: 'Community Kitchen', distanceKm: 3.2, rating: 4.6 },
  { id: 'n3', orgName: 'Hunger Free India', category: 'Child Nutrition', distanceKm: 5.1, rating: 4.9 },
];
