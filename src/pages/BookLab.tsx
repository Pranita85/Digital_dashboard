import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/Layout';
import { LabCard } from '@/components/LabCard';
import { BookingModal } from '@/components/BookingModal';
import { mockLabs } from '@/data/mockData';
import { Lab } from '@/types';
import { useToast } from '@/hooks/use-toast';

const BookLab: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredLabs = mockLabs.filter(lab => 
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLab = (lab: Lab) => {
    setSelectedLab(lab);
    setIsBookingModalOpen(true);
  };

  const handleBook = (booking: { labId: string; date: string; slots: string[]; purpose: string }) => {
    toast({
      title: 'Booking Confirmed! 🎉',
      description: `Your booking for ${selectedLab?.name} has been confirmed.`,
    });
    navigate('/my-bookings');
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Book a Lab</h1>
            <p className="text-muted-foreground mt-1">
              Select a lab to view availability and make a reservation
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search labs by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Labs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} onSelect={handleSelectLab} />
          ))}
        </div>

        {/* Booking Modal */}
        <BookingModal
          lab={selectedLab}
          open={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedLab(null);
          }}
          onBook={handleBook}
        />
      </div>
    </Layout>
  );
};

export default BookLab;
