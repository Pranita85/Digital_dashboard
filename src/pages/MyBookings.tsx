import React, { useState } from 'react';
import { Calendar, Clock, Building2, MoreVertical, X, Check, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Layout } from '@/components/Layout';
import { mockBookings } from '@/data/mockData';
import { Booking } from '@/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'cancelled');

  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    
    setBookings(prev => 
      prev.map(b => 
        b.id === selectedBooking.id ? { ...b, status: 'cancelled' as const } : b
      )
    );
    
    toast({
      title: 'Booking Cancelled',
      description: 'Your booking has been cancelled successfully.',
    });
    
    setCancelDialogOpen(false);
    setSelectedBooking(null);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success/10 text-success border-success/30">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
    <Card className="overflow-hidden hover:shadow-elevated transition-all">
      <CardContent className="p-0">
        <div className="flex">
          {/* Left accent */}
          <div className={`w-1.5 ${
            booking.status === 'confirmed' ? 'bg-success' :
            booking.status === 'pending' ? 'bg-warning' : 'bg-destructive'
          }`} />
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{booking.labName}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-sm text-muted-foreground font-mono">{booking.bccNumber}</p>
              </div>
              
              {booking.status !== 'cancelled' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setCancelDialogOpen(true);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(booking.date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{booking.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <IndianRupee className="h-4 w-4" />
                <span>{booking.charges.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your lab reservations
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancelled ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-lg">No upcoming bookings</h3>
                <p className="text-muted-foreground mt-1">
                  You don't have any scheduled lab reservations
                </p>
                <Button className="mt-4 btn-gradient" onClick={() => window.location.href = '/book'}>
                  Book a Lab
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <X className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-lg">No cancelled bookings</h3>
                <p className="text-muted-foreground mt-1">
                  You haven't cancelled any reservations
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Cancel Dialog */}
        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your booking for{' '}
                <strong>{selectedBooking?.labName}</strong> on{' '}
                <strong>{selectedBooking?.date}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelBooking}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancel Booking
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default MyBookings;
