import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { LabCard } from '@/components/LabCard';
import { BookingModal } from '@/components/BookingModal';
import { mockLabs } from '@/data/mockData';
import { Lab } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Labs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [acFilter, setAcFilter] = useState('all');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { toast } = useToast();

  const departments = [...new Set(mockLabs.map(lab => lab.department))];

  const filteredLabs = mockLabs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.bccNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || lab.department === departmentFilter;
    const matchesAC = acFilter === 'all' || 
      (acFilter === 'ac' && lab.isAC) || 
      (acFilter === 'non-ac' && !lab.isAC);
    
    return matchesSearch && matchesDepartment && matchesAC;
  });

  const handleSelectLab = (lab: Lab) => {
    setSelectedLab(lab);
    setIsBookingModalOpen(true);
  };

  const handleBook = (booking: { labId: string; date: string; slots: string[]; purpose: string }) => {
    toast({
      title: 'Booking Confirmed! 🎉',
      description: `Your booking for ${selectedLab?.name} has been confirmed.`,
    });
    console.log('Booking:', booking);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Labs & Classrooms</h1>
          <p className="text-muted-foreground mt-1">
            Browse and book available labs and training rooms
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or BCC number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-background">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={acFilter} onValueChange={setAcFilter}>
            <SelectTrigger className="w-full md:w-[140px] bg-background">
              <SelectValue placeholder="AC Type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ac">AC Only</SelectItem>
              <SelectItem value="non-ac">Non-AC Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredLabs.length} of {mockLabs.length} labs
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} onSelect={handleSelectLab} />
          ))}
        </div>

        {/* Empty State */}
        {filteredLabs.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-lg">No labs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('all');
                setAcFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

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

export default Labs;
