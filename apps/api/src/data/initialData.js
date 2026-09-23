export const INITIAL_ROUTES = [
  {
    id: 'RT001',
    slug: 'jalandhar-to-delhi',
    origin: 'Jalandhar',
    destination: 'Delhi',
    title: 'Jalandhar to Delhi Cab Service',
    serviceType: 'One-Way & Round Trip Cab',
    heroText: 'Premium, comfortable and on-time chauffeur-driven cab service from Jalandhar to Delhi NCR.',
    shortDescription: 'Reliable one-way and round-trip taxi service from Jalandhar to New Delhi with door-to-door pickup.',
    description: 'WhiteCabz provides seamless highway travel between Jalandhar and Delhi. Whether for business, airport departure, medical visits, or family trips, our premium sedans and spacious SUVs ensure a smooth and safe drive on NH44.',
    features: ['Door-to-door pickup & drop', 'Experienced highway chauffeurs', 'Clean AC cars with fast-tag', 'Zero return fare on one-way'],
    faqs: [
      {
        question: 'Can I book a one-way cab from Jalandhar to Delhi without paying return toll/fare?',
        answer: 'Yes! WhiteCabz offers transparent one-way cab fares where you only pay for the one-way journey without any mandatory return vehicle charges.'
      },
      {
        question: 'Are night pickups available for Delhi trips?',
        answer: 'Yes, WhiteCabz operates 24x7. We provide verified and alert drivers for late night and early morning travel.'
      },
      {
        question: 'Can we stop for refreshments along NH44?',
        answer: 'Absolutely. Our chauffeurs happily accommodate stops at reputed highway food courts and dhabas (e.g., Murthal, Karnal).'
      }
    ]
  },
  {
    id: 'RT002',
    slug: 'delhi-to-jalandhar',
    origin: 'Delhi',
    destination: 'Jalandhar',
    title: 'Delhi to Jalandhar Cab Service',
    serviceType: 'One-Way & Round Trip Cab',
    heroText: 'Direct luxury cab service from Delhi & Delhi Airport (IGI) to Jalandhar, Punjab.',
    shortDescription: 'Pre-book your comfortable ride from anywhere in Delhi NCR straight to your doorstep in Jalandhar.',
    description: 'Heading back to Punjab? WhiteCabz offers punctual pickups across Delhi, Gurugram, Noida, and IGI Airport Terminal 1, 2, & 3 directly to Jalandhar in sanitized, climate-controlled vehicles.',
    features: ['Airport terminal pickup', 'Luggage assistance', '24x7 customer support', 'Multiple vehicle options'],
    faqs: [
      {
        question: 'How does airport pickup work at IGI Airport Delhi?',
        answer: 'Your assigned chauffeur tracks your flight status and will be stationed at the designated parking bay with a name placard upon landing.'
      }
    ]
  },
  {
    id: 'RT003',
    slug: 'jalandhar-to-chandigarh',
    origin: 'Jalandhar',
    destination: 'Chandigarh',
    title: 'Jalandhar to Chandigarh Cab Service',
    serviceType: 'One-Way & Daily Commute Cab',
    heroText: 'Fast, smooth and professional cab rides between Jalandhar and Chandigarh/Tricity.',
    shortDescription: 'Ideal for official visits, PGI medical appointments, airport transfers, and university travel.',
    description: 'Connect quickly between Jalandhar and Chandigarh/Mohali/Panchkula. Enjoy stress-free executive sedan and SUV travel with courteous drivers.',
    features: ['Punctual schedule', 'Corporate billing available', 'Comfortable legroom', 'Clean sanitized fleet'],
    faqs: [
      {
        question: 'Can I book a cab for a round-trip medical visit to PGI Chandigarh?',
        answer: 'Yes, we provide round-trip and wait-and-return packages tailored for hospital visits, court appointments, and business meetings.'
      }
    ]
  },
  {
    id: 'RT004',
    slug: 'chandigarh-to-jalandhar',
    origin: 'Chandigarh',
    destination: 'Jalandhar',
    title: 'Chandigarh to Jalandhar Taxi Service',
    serviceType: 'One-Way & Return Taxi',
    heroText: 'Premium taxi from Chandigarh, Mohali, & Panchkula to Jalandhar.',
    shortDescription: 'Reliable doorstep taxi service for business executives, families, and airport arrivals.',
    description: 'Travel from Chandigarh Tricity back to Jalandhar with trusted chauffeurs and well-maintained vehicles.',
    features: ['Doorstep pickup', 'Immediate confirmation', 'No surge pricing', 'GPS tracking'],
    faqs: []
  },
  {
    id: 'RT005',
    slug: 'jalandhar-to-amritsar',
    origin: 'Jalandhar',
    destination: 'Amritsar',
    title: 'Jalandhar to Amritsar Taxi Service',
    serviceType: 'Intercity & Pilgrimage Taxi',
    heroText: 'Convenient taxi from Jalandhar to Amritsar, Golden Temple & Attari-Wagah Border.',
    shortDescription: 'Experience hassle-free travel for Golden Temple darshan, shopping, and Amritsar sightseeing.',
    description: 'Visit Amritsar for Sri Harmandir Sahib darshan, culinary tours, or business. WhiteCabz offers customized one-day and multi-day packages.',
    features: ['Darshan packages', 'Flexible waiting time', 'Courteous local chauffeurs', 'Spacious family vehicles'],
    faqs: [
      {
        question: 'Do you offer waiting cabs for Wagah Border ceremony?',
        answer: 'Yes! Our driver will drop you at the designated parking area and wait until the ceremony concludes to safely drive you back.'
      }
    ]
  },
  {
    id: 'RT006',
    slug: 'amritsar-to-jalandhar',
    origin: 'Amritsar',
    destination: 'Jalandhar',
    title: 'Amritsar to Jalandhar Taxi Service',
    serviceType: 'Intercity Taxi',
    heroText: 'Reliable and comfortable ride from Amritsar city or airport to Jalandhar.',
    shortDescription: 'Door-to-door cab service connecting Amritsar with Jalandhar.',
    description: 'Book your ride from Amritsar to Jalandhar with instant coordination and guaranteed clean cars.',
    features: ['Smooth highway drive', 'Transparent pricing', 'Safe night travel'],
    faqs: []
  },
  {
    id: 'RT007',
    slug: 'jalandhar-to-amritsar-airport',
    origin: 'Jalandhar',
    destination: 'Amritsar Airport (ATQ)',
    title: 'Jalandhar to Amritsar Airport (ATQ) Cab',
    serviceType: 'Airport Transfer',
    heroText: 'Guaranteed on-time airport drop and pickup for Sri Guru Ram Dass Jee International Airport.',
    shortDescription: 'Punctual airport transfers with ample luggage capacity for international and domestic flights.',
    description: 'Never worry about missing a flight. WhiteCabz offers timely airport transfers from Jalandhar directly to Amritsar International Airport (ATQ).',
    features: ['Flight-time aligned pickup', 'Luggage assistance', 'Clean AC vehicles', '24x7 availability'],
    faqs: [
      {
        question: 'How early should I book for an international flight pickup?',
        answer: 'We recommend booking at least 12-24 hours in advance, though our 24x7 team can also fulfill urgent airport bookings.'
      }
    ]
  },
  {
    id: 'RT008',
    slug: 'jalandhar-to-delhi-airport',
    origin: 'Jalandhar',
    destination: 'Delhi Airport (IGI)',
    title: 'Jalandhar to Delhi Airport (IGI) Taxi',
    serviceType: 'Airport Transfer',
    heroText: 'Direct highway cab from Jalandhar to Delhi Indira Gandhi International Airport (T1, T2, T3).',
    shortDescription: 'Stress-free international flight transfers with comfortable night drives and luggage space.',
    description: 'Direct, nonstop travel from your home in Jalandhar right to your airline terminal gate at IGI Airport, New Delhi.',
    features: ['Terminal-specific drop', 'High-capacity luggage carriers available', 'Well-rested highway drivers', '24x7 emergency backup'],
    faqs: []
  },
  {
    id: 'RT009',
    slug: 'jalandhar-to-chandigarh-airport',
    origin: 'Jalandhar',
    destination: 'Chandigarh Airport (IXC)',
    title: 'Jalandhar to Chandigarh Airport Cab',
    serviceType: 'Airport Transfer',
    heroText: 'Quick and dependable cab service to Shaheed Bhagat Singh International Airport, Mohali.',
    shortDescription: 'Seamless connection from Jalandhar to Chandigarh Airport.',
    description: 'Travel comfortably with WhiteCabz for your scheduled departures from IXC Airport Mohali/Chandigarh.',
    features: ['Prompt pickup', 'Luggage support', 'Professional chauffeurs'],
    faqs: []
  },
  {
    id: 'RT010',
    slug: 'jalandhar-to-vrindavan',
    origin: 'Jalandhar',
    destination: 'Vrindavan / Mathura',
    title: 'Jalandhar to Vrindavan Cab Service',
    serviceType: 'Pilgrimage Taxi',
    heroText: 'Sacred journey made peaceful: Chauffeur-driven pilgrimage cab to Vrindavan & Mathura.',
    shortDescription: 'Spacious family cabs and multi-day tour packages for Banke Bihari & Prem Mandir darshan.',
    description: 'Undertake your holy pilgrimage to Vrindavan, Mathura, and Barsana with trusted, respectful drivers and comfortable multi-day vehicles.',
    features: ['Multi-day tour options', 'Family-friendly vehicles', 'Flexible temple visit schedule'],
    faqs: []
  },
  {
    id: 'RT011',
    slug: 'vrindavan-to-jalandhar',
    origin: 'Vrindavan',
    destination: 'Jalandhar',
    title: 'Vrindavan to Jalandhar Cab Service',
    serviceType: 'Pilgrimage Return Cab',
    heroText: 'Comfortable return cab from Vrindavan/Mathura directly to Jalandhar.',
    shortDescription: 'Relax on your return pilgrimage journey with smooth highway driving.',
    description: 'Safe, restful road travel back to Punjab from Braj Bhoomi.',
    features: ['Experienced highway driver', 'AC sanitized car'],
    faqs: []
  },
  {
    id: 'RT012',
    slug: 'jalandhar-to-ludhiana',
    origin: 'Jalandhar',
    destination: 'Ludhiana',
    title: 'Jalandhar to Ludhiana Taxi Service',
    serviceType: 'Intercity & Business Cab',
    heroText: 'Fast and reliable cab service between Jalandhar and Ludhiana.',
    shortDescription: 'Short-distance executive cabs for business meetings, industrial visits, and shopping.',
    description: 'Hop between Punjab’s primary commercial hubs with quick dispatch and clean AC cars.',
    features: ['Instant booking', 'Short-notice availability', 'AC Sedan and SUV'],
    faqs: []
  },
  {
    id: 'RT013',
    slug: 'jalandhar-to-pathankot',
    origin: 'Jalandhar',
    destination: 'Pathankot',
    title: 'Jalandhar to Pathankot Cab Service',
    serviceType: 'Outstation Cab',
    heroText: 'Comfortable road travel connecting Jalandhar to Pathankot & Jammu Gateway.',
    shortDescription: 'Door-to-door cab for defense personnel, railway connections, and outstation trips.',
    description: 'Travel comfortably to Pathankot with experienced drivers who know the northern routes well.',
    features: ['Safe highway driving', 'Door-to-door pickup'],
    faqs: []
  },
  {
    id: 'RT014',
    slug: 'jalandhar-to-jammu',
    origin: 'Jalandhar',
    destination: 'Jammu / Katra',
    title: 'Jalandhar to Jammu & Katra Cab Service',
    serviceType: 'Outstation & Vaishno Devi Taxi',
    heroText: 'Direct taxi to Jammu & Mata Vaishno Devi Shrine at Katra.',
    shortDescription: 'Smooth family outstation rides with experienced mountain and highway chauffeurs.',
    description: 'Embark on your journey to Jammu Tawi, Jammu Airport, or Katra basecamp for Mata Vaishno Devi Darshan with reliable WhiteCabz fleet.',
    features: ['Mountain-experienced drivers', 'Roof-carrier SUVs available', '24x7 booking'],
    faqs: []
  },
  {
    id: 'RT015',
    slug: 'jalandhar-to-manali',
    origin: 'Jalandhar',
    destination: 'Manali',
    title: 'Jalandhar to Manali Hill Station Cab',
    serviceType: 'Hill Station Cab',
    heroText: 'Scenic, safe and memorable holiday ride from Jalandhar to Kullu-Manali & Solang Valley.',
    shortDescription: 'Customized tourist tour packages and multi-day hill station vehicle bookings.',
    description: 'Travel safely through the Himachal hills. Our drivers are seasoned in hill terrain, ensuring a safe, smooth, and breathtaking trip to Manali.',
    features: ['Hill-terrain certified drivers', 'Complete sightseeing packages', 'Spacious boot space for winter gear'],
    faqs: []
  },
  {
    id: 'RT016',
    slug: 'jalandhar-to-dharamshala',
    origin: 'Jalandhar',
    destination: 'Dharamshala / McLeodganj',
    title: 'Jalandhar to Dharamshala Cab Service',
    serviceType: 'Hill Station Cab',
    heroText: 'Peaceful mountain travel from Jalandhar to Dharamshala, McLeodganj & Kangra Valley.',
    shortDescription: 'Escape to the Himalayas with reliable outstation cabs and flexible sightseeing.',
    description: 'Explore the Dalai Lama Temple, Bhagsu Waterfall, and tea gardens with dedicated WhiteCabz outstation services.',
    features: ['Expert mountain navigation', 'Sightseeing waiting options'],
    faqs: []
  },
  {
    id: 'RT017',
    slug: 'jalandhar-to-golden-temple',
    origin: 'Jalandhar',
    destination: 'Golden Temple Amritsar',
    title: 'Jalandhar to Golden Temple Darshan Taxi',
    serviceType: 'Pilgrimage Taxi',
    heroText: 'Dedicated darshan taxi service to Sri Harmandir Sahib, Amritsar.',
    shortDescription: 'Same-day and early morning Amrit Vela darshan packages with comfortable return.',
    description: 'Visit the Golden Temple at peace with our dedicated darshan cab packages, including parking coordination and return travel.',
    features: ['Amrit Vela special timing', 'Elderly-friendly assistance', 'Clean AC cars'],
    faqs: []
  },
  {
    id: 'RT018',
    slug: 'jalandhar-to-haridwar',
    origin: 'Jalandhar',
    destination: 'Haridwar / Rishikesh',
    title: 'Jalandhar to Haridwar Cab Service',
    serviceType: 'Pilgrimage & Spiritual Cab',
    heroText: 'Direct spiritual journey from Jalandhar to Haridwar Ganga Aarti & Rishikesh.',
    shortDescription: 'Spacious family cabs and multi-day packages for Har Ki Pauri and spiritual retreats.',
    description: 'Travel along the western UP / Uttarakhand highway corridor to Haridwar in pristine comfort.',
    features: ['Multi-day tour booking', 'Courteous drivers', 'Flexible stops'],
    faqs: []
  },
  {
    id: 'RT019',
    slug: 'jalandhar-to-dehradun',
    origin: 'Jalandhar',
    destination: 'Dehradun / Mussoorie',
    title: 'Jalandhar to Dehradun Cab Service',
    serviceType: 'Outstation & Hill Station Cab',
    heroText: 'Comfortable journey from Jalandhar to Dehradun, Jolly Grant Airport & Mussoorie.',
    shortDescription: 'Direct taxi for boarding school visits, tourism, and Uttarakhand travel.',
    description: 'Enjoy a scenic, stress-free road trip from Jalandhar straight into the Doon valley.',
    features: ['Experienced chauffeurs', 'Clean interiors', 'Fast-tag enabled'],
    faqs: []
  },
  {
    id: 'RT020',
    slug: 'jalandhar-to-agra',
    origin: 'Jalandhar',
    destination: 'Agra',
    title: 'Jalandhar to Agra Taj Mahal Cab',
    serviceType: 'Tourist Cab Package',
    heroText: 'Direct taxi from Jalandhar to Agra for Taj Mahal, Agra Fort and Fatehpur Sikri.',
    shortDescription: 'Explore the City of Taj with dedicated multi-day cab booking.',
    description: 'Experience express travel via Eastern Peripheral and Yamuna Expressways with experienced long-distance chauffeurs.',
    features: ['Long-distance touring comfort', 'Tourist-friendly drivers'],
    faqs: []
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'SRV001',
    slug: 'all-india-taxi-service',
    name: 'All India Taxi Service',
    category: 'Outstation',
    tagline: 'Quick rides within cities and across India at affordable rates',
    shortDescription: 'Pan-India cab network connecting North India to destinations across the country with verified drivers.',
    description: 'WhiteCabz provides extensive intercity and interstate taxi services across North India and beyond. With our robust fleet of sedans, SUVs, and luxury cars, you get reliable point-to-point transportation whenever and wherever you need.',
    benefits: ['Pan-India network', 'Zero hidden charges', '24x7 customer support', 'All state-permit compliant cars']
  },
  {
    id: 'SRV002',
    slug: 'outstation-trips',
    name: 'Outstation Trips',
    category: 'Outstation',
    tagline: 'Comfortable intercity journeys with experienced drivers',
    shortDescription: 'Premium outstation cabs for one-way, round-trip, and multi-day family vacations.',
    description: 'Take the fatigue out of long-distance driving. Our experienced chauffeurs handle the highways while you and your family relax in spacious, climate-controlled comfort.',
    benefits: ['Experienced highway chauffeurs', 'Flexible itinerary', 'Clean vehicles with GPS & FASTag']
  },
  {
    id: 'SRV003',
    slug: 'tour-packages',
    name: 'Tour Packages',
    category: 'Tours',
    tagline: 'Curated journeys covering India\'s popular destinations',
    shortDescription: 'Customized tourist and holiday itineraries covering hill stations, historical landmarks, and scenic getaways.',
    description: 'Whether you are planning a hill retreat to Himachal, an expedition to Kashmir, or a cultural Golden Triangle tour, WhiteCabz tailors complete vehicle packages with dedicated chauffeurs.',
    benefits: ['Customized travel plans', 'Sightseeing guidance', 'No rush, travel at your own pace']
  },
  {
    id: 'SRV004',
    slug: 'airport-pickup',
    name: 'Airport Pickup & Drop',
    category: 'Airport',
    tagline: 'Punctual airport transfers designed around your flight schedule',
    shortDescription: 'Seamless transfers to Amritsar (ATQ), Delhi (IGI), and Chandigarh (IXC) airports.',
    description: 'Punctuality is our prime promise. WhiteCabz monitors flight arrivals and departures in real-time to guarantee you are never left waiting at the terminal.',
    benefits: ['Flight-time aligned pickup', 'Luggage support', 'Meet & greet service', '24x7 early-morning / late-night service']
  },
  {
    id: 'SRV005',
    slug: 'one-way-taxi',
    name: 'One Way Taxi',
    category: 'Outstation',
    tagline: 'Affordable one-way rides without unnecessary return charges',
    shortDescription: 'Pay only for the distance you travel on major intercity routes with zero return vehicle fare.',
    description: 'Don\'t pay double for a single journey. Our one-way taxi options between Jalandhar, Delhi, Chandigarh, Amritsar, and Ludhiana save you money without compromising comfort.',
    benefits: ['Pay for one-way only', 'Doorstep pickup and drop', 'Guaranteed vehicle confirmation']
  },
  {
    id: 'SRV006',
    slug: 'corporate-travel',
    name: 'Corporate Travel',
    category: 'Corporate',
    tagline: 'Professional transportation solutions for businesses and employees',
    shortDescription: 'Executive chauffeur services, monthly fleet contracts, airport transfers, and client transport.',
    description: 'WhiteCabz is the preferred mobility partner for corporate entities, delegates, and business travelers across Punjab and NCR. We offer consolidated GST billing, immaculate sedans, and discreet professional drivers.',
    benefits: ['GST invoices & monthly billing', 'Punctual executive cars', 'Dedicated fleet coordinator', 'Client guest VIP transport']
  },
  {
    id: 'SRV007',
    slug: 'wedding-transportation',
    name: 'Wedding Transportation',
    category: 'Wedding',
    tagline: 'Complete wedding transportation solutions for couples, families and guests',
    shortDescription: 'Luxury bridal cars, groom Baraat vehicles, VIP guest convoys, and guest shuttles.',
    description: 'Make your wedding entrance unforgettable. From decorated luxury sedans and premium SUVs to large guest convoys and airport pickups for visiting relatives, WhiteCabz coordinates complete wedding mobility.',
    benefits: ['Luxury bride & groom cars', 'Car flower decoration coordination', 'Guest convoy management', 'Multi-car bookings']
  },
  {
    id: 'SRV008',
    slug: 'hourly-rentals',
    name: 'Hourly Rentals & Local Jalandhar',
    category: 'Local',
    tagline: 'Flexible cab booking for hourly city travel and sightseeing',
    shortDescription: 'Book a cab with driver by the hour (4hr/40km, 8hr/80km, 12hr/120km) in Jalandhar.',
    description: 'Run multiple errands, attend family functions, or explore Jalandhar city attractions with a private car and dedicated chauffeur at your beck and call.',
    benefits: ['Multiple stops in one booking', 'No parking hassle', 'Professional driver awaits you']
  }
];

export const INITIAL_FLEET = [
  {
    id: 'FL001',
    category: 'Sedan',
    title: 'Comfort Sedan',
    description: 'Ideal for everyday city travel, business trips, and comfortable outstation commutes.',
    capacity: '4 Passengers',
    luggage: '2-3 Bags',
    ac: true,
    driverIncluded: true,
    features: ['Air Conditioned', 'Spacious Legroom', 'Clean Interiors', 'Audio System', 'USB Charging'],
    image: '/images/fleet/sedan.jpg'
  },
  {
    id: 'FL002',
    category: 'SUV',
    title: 'Spacious Family SUV',
    description: 'Extra space and high ground clearance for family vacations, hill stations, and heavy luggage.',
    capacity: '6-7 Passengers',
    luggage: '4-5 Bags',
    ac: true,
    driverIncluded: true,
    features: ['Dual AC Vents', 'Generous Boot Space', 'Hill Terrain Stability', 'Ergonomic Seats', 'Luggage Carrier (on request)'],
    image: '/images/fleet/suv.jpg'
  },
  {
    id: 'FL003',
    category: 'Premium Sedan',
    title: 'Executive Premium Sedan',
    description: 'Designed for corporate executives, VIP airport transfers, and sophisticated travel.',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    ac: true,
    driverIncluded: true,
    features: ['Plush Leather Seats', 'Ultra Quiet Cabin', 'Bottled Water', 'Executive Chauffeur', 'Mobile Charging'],
    image: '/images/fleet/premium-sedan.jpg'
  },
  {
    id: 'FL004',
    category: 'Luxury SUV',
    title: 'Luxury Flagship SUV',
    description: 'Top-tier luxury transportation for VIP guests, special occasions, and high-profile trips.',
    capacity: '6 Passengers',
    luggage: '4 Bags',
    ac: true,
    driverIncluded: true,
    features: ['Panoramic Sunroof', 'Chauffeured White Glove Service', 'Premium Sound', 'Climate Control'],
    image: '/images/fleet/luxury-suv.jpg'
  },
  {
    id: 'FL005',
    category: 'Wedding Cars',
    title: 'Luxury Wedding Car',
    description: 'Stunning luxury vehicles for bride & groom arrivals, Baraat, and wedding photo sessions.',
    capacity: '4 Passengers',
    luggage: '2 Bags',
    ac: true,
    driverIncluded: true,
    features: ['Immaculate White Exterior', 'Flower Decoration Support', 'Uniformed Chauffeur', 'Red Carpet Presentation'],
    image: '/images/fleet/wedding-car.jpg'
  }
];
