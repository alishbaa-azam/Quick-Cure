// pharmacyData.js
export const pharmacies = [
  {
    id: 1,
    name: 'Sehat Pharmacy',
    address: 'G-9 Markaz, Islamabad, Pakistan',
    distance: '0.5 km',
    rating: 4.8,
    totalReviews: 1247,
    deliveryTime: '15-20 mins',
    open: true,
    phone: '+92 300 1234567',
    email: 'info@sehatpharmacy.com',
    city: 'Islamabad',
    openingHours: {
      monday: '8:00 AM - 11:00 PM',
      tuesday: '8:00 AM - 11:00 PM',
      wednesday: '8:00 AM - 11:00 PM',
      thursday: '8:00 AM - 11:00 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '9:00 AM - 10:00 PM',
      sunday: '9:00 AM - 9:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Medicine Reminder',
      'Prescription Upload',
      'Home Delivery',
      'Chronic Disease Management'
    ],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600'
  },
  {
    id: 2,
    name: 'Medicam Pharmacy',
    address: 'Defence Phase 5, Karachi, Pakistan',
    distance: '1.2 km',
    rating: 4.5,
    totalReviews: 892,
    deliveryTime: '20-25 mins',
    open: true,
    phone: '+92 300 2345678',
    email: 'contact@medicampharmacy.com',
    city: 'Karachi',
    openingHours: {
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: '9:00 AM - 11:00 PM',
      saturday: '10:00 AM - 10:00 PM',
      sunday: '10:00 AM - 8:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Vaccination Services',
      'Health Checkups',
      'Medical Equipment Rental'
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600'
  },
  {
    id: 3,
    name: 'Pharma Plus',
    address: 'Gulberg Main Boulevard, Lahore, Pakistan',
    distance: '0.8 km',
    rating: 4.7,
    totalReviews: 1543,
    deliveryTime: '10-15 mins',
    open: true,
    phone: '+92 300 3456789',
    email: 'support@pharmaplus.pk',
    city: 'Lahore',
    openingHours: {
      monday: '8:00 AM - 12:00 AM',
      tuesday: '8:00 AM - 12:00 AM',
      wednesday: '8:00 AM - 12:00 AM',
      thursday: '8:00 AM - 12:00 AM',
      friday: '8:00 AM - 12:00 AM',
      saturday: '9:00 AM - 11:00 PM',
      sunday: '9:00 AM - 10:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Medicine Home Delivery',
      'Chronic Care',
      'Senior Citizen Discount'
    ],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=1600'
  },
  {
    id: 4,
    name: 'Shifa Pharmacy',
    address: 'University Road, Peshawar, Pakistan',
    distance: '2.0 km',
    rating: 4.9,
    totalReviews: 678,
    deliveryTime: '25-30 mins',
    open: false,
    phone: '+92 300 4567890',
    email: 'pharmacy@shifa.com',
    city: 'Peshawar',
    openingHours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    services: [
      'Emergency Service',
      'Home Delivery',
      'Doctor Consultation',
      'Prescription Management',
      'Medical Counseling'
    ],
    image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1600'
  },
  {
    id: 5,
    name: 'Lifecare Pharmacy',
    address: 'Saddar, Rawalpindi, Pakistan',
    distance: '1.5 km',
    rating: 4.6,
    totalReviews: 945,
    deliveryTime: '15-20 mins',
    open: true,
    phone: '+92 300 5678901',
    email: 'care@lifecarepharmacy.pk',
    city: 'Rawalpindi',
    openingHours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '9:00 AM - 10:00 PM',
      sunday: '9:00 AM - 8:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Medicine Home Delivery',
      'Senior Citizen Care',
      'Childcare Products'
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600'
  },
  {
    id: 6,
    name: 'HealthCare Pharmacy',
    address: 'Bahadurabad, Karachi, Pakistan',
    distance: '0.3 km',
    rating: 4.4,
    totalReviews: 723,
    deliveryTime: '5-10 mins',
    open: true,
    phone: '+92 300 6789012',
    email: 'health@healthcarepharmacy.com',
    city: 'Karachi',
    openingHours: {
      monday: '8:00 AM - 11:00 PM',
      tuesday: '8:00 AM - 11:00 PM',
      wednesday: '8:00 AM - 11:00 PM',
      thursday: '8:00 AM - 11:00 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '9:00 AM - 11:00 PM',
      sunday: '9:00 AM - 10:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Health Supplements',
      'Fitness Products',
      'Wellness Counseling'
    ],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600'
  },
  {
    id: 7,
    name: 'Al-Madina Pharmacy',
    address: 'Jinnah Road, Faisalabad, Pakistan',
    distance: '1.8 km',
    rating: 4.3,
    totalReviews: 512,
    deliveryTime: '20-25 mins',
    open: true,
    phone: '+92 300 7890123',
    email: 'info@almadinapharmacy.com',
    city: 'Faisalabad',
    openingHours: {
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: '9:00 AM - 10:00 PM',
      saturday: '10:00 AM - 10:00 PM',
      sunday: '10:00 AM - 8:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Traditional Medicine',
      'Herbal Products',
      'Ayurvedic Consultation'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=1600'
  },
  {
    id: 8,
    name: 'Rehman Pharmacy',
    address: 'Cantt Area, Multan, Pakistan',
    distance: '2.5 km',
    rating: 4.7,
    totalReviews: 834,
    deliveryTime: '30-35 mins',
    open: true,
    phone: '+92 300 8901234',
    email: 'pharmacy@rehman.com',
    city: 'Multan',
    openingHours: {
      monday: '8:00 AM - 9:00 PM',
      tuesday: '8:00 AM - 9:00 PM',
      wednesday: '8:00 AM - 9:00 PM',
      thursday: '8:00 AM - 9:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '9:00 AM - 6:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Medical Equipment',
      'Disability Products',
      'Elderly Care'
    ],
    image: 'https://images.unsplash.com/photo-1599045118108-b2b8d9a7f4c3?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1600'
  },
  {
    id: 9,
    name: 'Shaukat Khanum Pharmacy',
    address: 'Johar Town, Lahore, Pakistan',
    distance: '3.0 km',
    rating: 4.9,
    totalReviews: 1567,
    deliveryTime: '35-40 mins',
    open: true,
    phone: '+92 300 9012345',
    email: 'pharmacy@shaukatkhanum.org.pk',
    city: 'Lahore',
    openingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '9:00 AM - 4:00 PM'
    },
    services: [
      'Cancer Care Medicines',
      'Free Delivery',
      'Specialist Consultation',
      'Chronic Disease Management',
      'Palliative Care',
      'Supportive Care'
    ],
    image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600'
  },
  {
    id: 10,
    name: 'Mehmood Pharmacy',
    address: 'Johar Town, Lahore, Pakistan',
    distance: '3.0 km',
    rating: 4.9,
    totalReviews: 634,
    deliveryTime: '35-40 mins',
    open: true,
    phone: '+92 300 0123456',
    email: 'contact@mehmoodpharmacy.com',
    city: 'Lahore',
    openingHours: {
      monday: '8:00 AM - 11:00 PM',
      tuesday: '8:00 AM - 11:00 PM',
      wednesday: '8:00 AM - 11:00 PM',
      thursday: '8:00 AM - 11:00 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '9:00 AM - 11:00 PM',
      sunday: '9:00 AM - 10:00 PM'
    },
    services: [
      '24/7 Emergency Service',
      'Free Delivery',
      'Doctor Consultation',
      'Medicine Home Delivery',
      'Discounts for Regular Customers',
      'Bulk Order Facility'
    ],
    image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?auto=format&fit=crop&w=500',
    bannerImage: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=1600'
  }
];