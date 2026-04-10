export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phone?: string;
}

export interface Lab {
  id: string;
  name: string;
  capacity: number;
  bccNumber: string;
  department: string;
  isAC: boolean;
  facilities: string[];
  hourlyRate: number;
  image?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  labId: string;
  labName: string;
  userId: string;
  userName: string;
  department: string;
  bccNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  charges: number;
  createdAt: string;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  slots: TimeSlot[];
}

export interface WeekSchedule {
  weekStart: string;
  weekEnd: string;
  days: DaySchedule[];
}

export interface Analytics {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  mostBookedLab: string;
  weeklyData: {
    day: string;
    bookings: number;
    revenue: number;
  }[];
  labUsage: {
    labName: string;
    percentage: number;
    bookings: number;
  }[];
}
