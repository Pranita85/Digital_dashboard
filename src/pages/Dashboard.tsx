import React from 'react';
import { Calendar, Building2, ClipboardList, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { mockBookings, mockLabs, mockAnalytics } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#002B5B', '#0052CC', '#4A90D9', '#7EB3F1', '#B5D4F7', '#E6F0FB'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const upcomingBookings = mockBookings
    .filter(b => b.status === 'confirmed')
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdmin 
                ? 'Here\'s an overview of your lab booking system' 
                : 'Book a lab or view your upcoming reservations'}
            </p>
          </div>
          <Button onClick={() => navigate('/book')} className="btn-gradient">
            <Calendar className="h-4 w-4 mr-2" />
            Book a Lab
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={isAdmin ? mockAnalytics.totalBookings : '12'}
            icon={ClipboardList}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title={isAdmin ? 'Total Revenue' : 'Hours Booked'}
            value={isAdmin ? `₹${mockAnalytics.totalRevenue.toLocaleString()}` : '24'}
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${mockAnalytics.occupancyRate}%`}
            icon={Building2}
            trend={{ value: 5, isPositive: true }}
            variant="warning"
          />
          <StatCard
            title="Available Labs"
            value={mockLabs.length}
            icon={Users}
            description="Across all departments"
          />
        </div>

        {/* Charts Section - Admin Only */}
        {isAdmin && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Bookings Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAnalytics.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="day" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="bookings" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Lab Usage Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lab Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockAnalytics.labUsage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="bookings"
                        nameKey="labName"
                        label={({ labName, percentage }) => `${percentage}%`}
                        labelLine={false}
                      >
                        {mockAnalytics.labUsage.map((entry, index) => (
                          <Cell key={entry.labName} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {mockAnalytics.labUsage.slice(0, 4).map((lab, index) => (
                    <div key={lab.labName} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="truncate text-muted-foreground">{lab.labName}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Upcoming Bookings & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/my-bookings')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.labName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(booking.date), 'MMM d, yyyy')}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}

                {upcomingBookings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No upcoming bookings</p>
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/book')}
                      className="mt-2"
                    >
                      Book a lab now
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => navigate('/book')}
              >
                <Calendar className="h-4 w-4 mr-3" />
                Book a New Lab
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => navigate('/labs')}
              >
                <Building2 className="h-4 w-4 mr-3" />
                View All Labs
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => navigate('/my-bookings')}
              >
                <ClipboardList className="h-4 w-4 mr-3" />
                My Bookings
              </Button>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12"
                  onClick={() => navigate('/analytics')}
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  View Analytics
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
