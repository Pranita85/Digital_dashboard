import React, { useState } from 'react';
import { Calendar, Clock, Users, IndianRupee, Building2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { WeeklyCalendar } from './WeeklyCalendar';
import { Lab } from '@/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  lab: Lab | null;
  open: boolean;
  onClose: () => void;
  onBook: (booking: {
    labId: string;
    date: string;
    slots: string[];
    purpose: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  lab,
  open,
  onClose,
  onBook,
}) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [purpose, setPurpose] = useState('');
  const { toast } = useToast();

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      }
      // Limit to 3 consecutive hours
      if (prev.length >= 3) {
        toast({
          title: 'Maximum slots reached',
          description: 'You can book a maximum of 3 consecutive hours.',
          variant: 'destructive',
        });
        return prev;
      }
      return [...prev, slot].sort();
    });
  };

  const handleBook = () => {
    if (!lab) return;
    
    onBook({
      labId: lab.id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      slots: selectedSlots,
      purpose,
    });

    // Reset state
    setStep(1);
    setSelectedSlots([]);
    setPurpose('');
    onClose();
  };

  const calculateCharges = () => {
    if (!lab) return 0;
    return selectedSlots.length * lab.hourlyRate;
  };

  const mockBookedSlots = [
    { time: '09:30', bookedBy: 'Engineering Team' },
    { time: '10:30', bookedBy: 'Engineering Team' },
    { time: '14:30', bookedBy: 'R&D Team' },
  ];

  if (!lab) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            Book {lab.name}
          </DialogTitle>
          <DialogDescription>
            Select your preferred date and time slots. Maximum booking duration is 3 hours.
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              1
            </div>
            <span className="font-medium">Select Time</span>
          </div>
          <div className="w-16 h-0.5 bg-muted" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </div>
            <span className="font-medium">Confirm</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {/* Lab Info Summary */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{lab.name}</p>
                  <p className="text-sm text-muted-foreground">{lab.bccNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <Users className="h-3 w-3 mr-1" />
                  {lab.capacity} seats
                </Badge>
                <Badge variant="secondary">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {lab.hourlyRate}/hr
                </Badge>
              </div>
            </div>

            {/* Calendar */}
            <WeeklyCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedSlots={selectedSlots}
              onSlotToggle={handleSlotToggle}
              bookedSlots={mockBookedSlots}
            />

            {/* Selected Slots Summary */}
            {selectedSlots.length > 0 && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Selected Time Slots</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedSlots.join(', ')} ({selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Estimated Charges</p>
                    <p className="text-xl font-bold text-primary">
                      ₹{calculateCharges().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="grid gap-4 p-6 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Lab/Room</Label>
                  <p className="font-medium">{lab.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">BCC Number</Label>
                  <p className="font-medium">{lab.bccNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <p className="font-medium">{selectedSlots.join(' - ')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Duration</Label>
                  <p className="font-medium">{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total Charges</Label>
                  <p className="font-bold text-primary text-lg">₹{calculateCharges().toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Booking</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of your booking (e.g., Training session, Workshop, Meeting)"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedSlots.length === 0}
                className="btn-gradient"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={handleBook}
                disabled={!purpose.trim()}
                className="btn-gradient"
              >
                Confirm Booking
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
