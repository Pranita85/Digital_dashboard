import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';

interface TimeSlot {
  time: string;
  isBooked: boolean;
  bookedBy?: string;
}

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedSlots: string[];
  onSlotToggle: (slot: string) => void;
  bookedSlots?: { time: string; bookedBy?: string }[];
}

const TIME_SLOTS = [
  '06:30', '07:30', '08:30', '09:30', '10:30', '11:30',
  '12:30', '13:30', '14:30', '15:30', '16:30'
];

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  selectedDate,
  onDateChange,
  selectedSlots,
  onSlotToggle,
  bookedSlots = [],
}) => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToPreviousWeek = () => setWeekStart(addDays(weekStart, -7));
  const goToNextWeek = () => setWeekStart(addDays(weekStart, 7));
  const goToCurrentWeek = () => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const isSlotBooked = (time: string) => {
    return bookedSlots.some(slot => slot.time === time);
  };

  const isSlotSelected = (time: string) => {
    return selectedSlots.includes(time);
  };

  const formatTimeRange = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    return `${startTime} - ${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToCurrentWeek}>
            Today
          </Button>
        </div>
        <h3 className="text-lg font-semibold">
          {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </h3>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-8 gap-2 mb-4">
        <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4" />
        </div>
        {weekDays.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onDateChange(day)}
            className={cn(
              'flex flex-col items-center p-2 rounded-lg transition-all',
              isSameDay(day, selectedDate) && 'bg-primary text-primary-foreground',
              isToday(day) && !isSameDay(day, selectedDate) && 'bg-accent/20 ring-2 ring-accent',
              !isSameDay(day, selectedDate) && 'hover:bg-muted'
            )}
          >
            <span className="text-xs font-medium uppercase">{format(day, 'EEE')}</span>
            <span className={cn(
              'text-lg font-bold',
              isToday(day) && !isSameDay(day, selectedDate) && 'text-accent'
            )}>
              {format(day, 'd')}
            </span>
          </button>
        ))}
      </div>

      {/* Time Slots Grid */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
        {TIME_SLOTS.map((time) => {
          const booked = isSlotBooked(time);
          const selected = isSlotSelected(time);
          
          return (
            <div key={time} className="grid grid-cols-8 gap-2">
              <div className="flex items-center justify-center text-sm text-muted-foreground font-mono">
                {time}
              </div>
              {weekDays.map((day) => {
                const dayKey = format(day, 'yyyy-MM-dd');
                const slotKey = `${dayKey}-${time}`;
                const isSelected = isSameDay(day, selectedDate) && selected;
                const isBookedSlot = isSameDay(day, selectedDate) && booked;

                return (
                  <button
                    key={slotKey}
                    disabled={isBookedSlot || !isSameDay(day, selectedDate)}
                    onClick={() => isSameDay(day, selectedDate) && onSlotToggle(time)}
                    className={cn(
                      'h-10 rounded-md border-2 transition-all text-xs font-medium',
                      !isSameDay(day, selectedDate) && 'bg-muted/30 border-transparent cursor-not-allowed',
                      isSameDay(day, selectedDate) && !isBookedSlot && !isSelected && 'time-slot-available',
                      isBookedSlot && 'time-slot-booked',
                      isSelected && 'time-slot-selected'
                    )}
                  >
                    {isSameDay(day, selectedDate) && (
                      isBookedSlot ? 'Booked' : isSelected ? '✓' : 'Available'
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20 border-2 border-success/30" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary border-2 border-primary" />
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/10 border-2 border-destructive/30" />
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyCalendar;
