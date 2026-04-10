import React from 'react';
import { TrendingUp, Building2, Clock, IndianRupee, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/StatCard';
import { Layout } from '@/components/Layout';
import { mockAnalytics, mockLabs } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const COLORS = ['#002B5B', '#0052CC', '#4A90D9', '#7EB3F1', '#B5D4F7', '#E6F0FB'];

const Analytics: React.FC = () => {
  const revenueData = mockAnalytics.weeklyData.map(d => ({
    ...d,
    revenue: d.revenue / 1000,
  }));

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into lab usage and revenue
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={mockAnalytics.totalBookings}
            icon={Calendar}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${mockAnalytics.totalRevenue.toLocaleString()}`}
            icon={IndianRupee}
            trend={{ value: 18, isPositive: true }}
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
            title="Active Labs"
            value={mockLabs.length}
            icon={Users}
            description="All departments"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Booking Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockAnalytics.weeklyData}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(213, 100%, 18%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(213, 100%, 18%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
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
                    <Area 
                      type="monotone"
                      dataKey="bookings" 
                      stroke="hsl(213, 100%, 18%)"
                      strokeWidth={2}
                      fill="url(#colorBookings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Revenue Overview (in ₹K)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
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
                      formatter={(value: number) => [`₹${(value * 1000).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="hsl(142, 76%, 36%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lab Usage Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lab Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockAnalytics.labUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="bookings"
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
            </CardContent>
          </Card>

          {/* Lab Usage List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Lab Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.labUsage.map((lab, index) => (
                  <div key={lab.labName} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium text-sm">{lab.labName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{lab.bookings} bookings</span>
                        <span className="font-semibold">{lab.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={lab.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Booked Lab Highlight */}
        <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Most Popular Lab This Week</p>
                <h3 className="text-2xl font-bold text-primary mt-1">{mockAnalytics.mostBookedLab}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  45 bookings • 85% occupancy rate • ₹18,000 revenue
                </p>
              </div>
              <div className="p-4 rounded-full bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
