import { Lab, Booking, Analytics, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@tatamotors.com',
    role: 'user',
    department: 'Engineering',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@tatamotors.com',
    role: 'admin',
    department: 'Administration',
    phone: '+91 98765 43211',
  },
];

export const mockLabs: Lab[] = [
  {
    id: 'lab-1',
    name: 'Automotive Design Lab',
    capacity: 40,
    bccNumber: 'BCC-ENG-001',
    department: 'Engineering',
    isAC: true,
    facilities: ['Projector', 'Whiteboard', 'CAD Workstations', 'High-Speed Internet'],
    hourlyRate: 500,
  },
  {
    id: 'lab-2',
    name: 'Electric Vehicle Lab',
    capacity: 30,
    bccNumber: 'BCC-RND-002',
    department: 'R&D',
    isAC: true,
    facilities: ['EV Charging Stations', 'Testing Equipment', 'Projector'],
    hourlyRate: 750,
  },
  {
    id: 'lab-3',
    name: 'Computer Training Room A',
    capacity: 50,
    bccNumber: 'BCC-IT-003',
    department: 'IT',
    isAC: true,
    facilities: ['50 Computers', 'Projector', 'Audio System', 'Video Conferencing'],
    hourlyRate: 400,
  },
  {
    id: 'lab-4',
    name: 'Manufacturing Workshop',
    capacity: 25,
    bccNumber: 'BCC-MFG-004',
    department: 'Manufacturing',
    isAC: false,
    facilities: ['CNC Machines', 'Welding Equipment', 'Safety Gear'],
    hourlyRate: 600,
  },
  {
    id: 'lab-5',
    name: 'Quality Control Lab',
    capacity: 20,
    bccNumber: 'BCC-QC-005',
    department: 'Quality',
    isAC: true,
    facilities: ['Testing Equipment', 'Microscopes', 'Measurement Tools'],
    hourlyRate: 550,
  },
  {
    id: 'lab-6',
    name: 'Training Hall B',
    capacity: 100,
    bccNumber: 'BCC-HR-006',
    department: 'HR',
    isAC: true,
    facilities: ['Stage', 'Projector', 'Audio System', 'Microphones'],
    hourlyRate: 800,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    labId: 'lab-1',
    labName: 'Automotive Design Lab',
    userId: '1',
    userName: 'Rajesh Kumar',
    department: 'Engineering',
    bccNumber: 'BCC-ENG-001',
    date: '2026-01-28',
    startTime: '09:00',
    endTime: '11:00',
    duration: 2,
    status: 'confirmed',
    charges: 1000,
    createdAt: '2026-01-25T10:00:00Z',
  },
  {
    id: 'booking-2',
    labId: 'lab-2',
    labName: 'Electric Vehicle Lab',
    userId: '1',
    userName: 'Rajesh Kumar',
    department: 'Engineering',
    bccNumber: 'BCC-RND-002',
    date: '2026-01-28',
    startTime: '14:00',
    endTime: '16:00',
    duration: 2,
    status: 'confirmed',
    charges: 1500,
    createdAt: '2026-01-25T11:00:00Z',
  },
  {
    id: 'booking-3',
    labId: 'lab-3',
    labName: 'Computer Training Room A',
    userId: '2',
    userName: 'Priya Sharma',
    department: 'IT',
    bccNumber: 'BCC-IT-003',
    date: '2026-01-29',
    startTime: '10:00',
    endTime: '13:00',
    duration: 3,
    status: 'pending',
    charges: 1200,
    createdAt: '2026-01-26T09:00:00Z',
  },
];

export const mockAnalytics: Analytics = {
  totalBookings: 156,
  totalRevenue: 125000,
  occupancyRate: 72,
  mostBookedLab: 'Computer Training Room A',
  weeklyData: [
    { day: 'Mon', bookings: 24, revenue: 18500 },
    { day: 'Tue', bookings: 28, revenue: 21200 },
    { day: 'Wed', bookings: 32, revenue: 25600 },
    { day: 'Thu', bookings: 26, revenue: 19800 },
    { day: 'Fri', bookings: 30, revenue: 23400 },
    { day: 'Sat', bookings: 12, revenue: 10500 },
    { day: 'Sun', bookings: 4, revenue: 6000 },
  ],
  labUsage: [
    { labName: 'Computer Training Room A', percentage: 85, bookings: 45 },
    { labName: 'Automotive Design Lab', percentage: 78, bookings: 38 },
    { labName: 'Electric Vehicle Lab', percentage: 72, bookings: 32 },
    { labName: 'Training Hall B', percentage: 65, bookings: 28 },
    { labName: 'Quality Control Lab', percentage: 58, bookings: 22 },
    { labName: 'Manufacturing Workshop', percentage: 45, bookings: 18 },
  ],
};

export const generateTimeSlots = (date: string, labId: string): { startTime: string; endTime: string; isBooked: boolean }[] => {
  const slots = [];
  const bookedSlots = mockBookings
    .filter(b => b.labId === labId && b.date === date)
    .map(b => ({ start: b.startTime, end: b.endTime }));

  for (let hour = 6; hour < 17; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:${hour === 6 ? '30' : '00'}`;
    const endHour = hour === 6 ? 7 : hour + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:${hour === 6 ? '30' : '00'}`;
    
    const isBooked = bookedSlots.some(slot => {
      const slotStart = parseInt(slot.start.split(':')[0]);
      const slotEnd = parseInt(slot.end.split(':')[0]);
      return hour >= slotStart && hour < slotEnd;
    });

    slots.push({
      startTime: hour === 6 ? '06:30' : `${hour.toString().padStart(2, '0')}:00`,
      endTime: hour === 6 ? '07:30' : `${(hour + 1).toString().padStart(2, '0')}:00`,
      isBooked,
    });
  }

  return slots;
};
