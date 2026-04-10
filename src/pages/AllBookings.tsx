import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Check, X, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { mockBookings } from '@/data/mockData';
import { Booking } from '@/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const AllBookings: React.FC = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.labName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bccNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
    toast({
      title: 'Booking Updated',
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success/10 text-success border-success/30">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Bookings</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all lab reservations
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by lab, user, or BCC number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lab / Room</TableHead>
                  <TableHead>Booked By</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>BCC Number</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Charges</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.labName}</p>
                        <p className="text-sm text-muted-foreground">{booking.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.userName}</TableCell>
                    <TableCell>
                      <div>
                        <p>{format(new Date(booking.date), 'MMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{booking.bccNumber}</TableCell>
                    <TableCell>{booking.duration}h</TableCell>
                    <TableCell className="font-medium">₹{booking.charges.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {booking.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'confirmed')}>
                              <Check className="h-4 w-4 mr-2" />
                              Confirm
                            </DropdownMenuItem>
                          )}
                          {booking.status !== 'cancelled' && (
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-lg">No bookings found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AllBookings;
