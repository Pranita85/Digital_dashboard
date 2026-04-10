import React from 'react';
import { Users, Snowflake, Sun, MapPin, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lab } from '@/types';

interface LabCardProps {
  lab: Lab;
  onSelect: (lab: Lab) => void;
}

export const LabCard: React.FC<LabCardProps> = ({ lab, onSelect }) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 border-border/50">
      {/* Header Image/Banner */}
      <div className="relative h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMDJiNWIiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        {/* Lab Type Badge */}
        <Badge 
          className={`absolute top-3 right-3 ${lab.isAC ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`}
        >
          {lab.isAC ? (
            <>
              <Snowflake className="h-3 w-3 mr-1" />
              AC
            </>
          ) : (
            <>
              <Sun className="h-3 w-3 mr-1" />
              Non-AC
            </>
          )}
        </Badge>

        {/* Department Badge */}
        <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
          <MapPin className="h-3 w-3 mr-1" />
          {lab.department}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {lab.name}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              {lab.bccNumber}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{lab.capacity} seats</span>
            </div>
            <div className="flex items-center gap-1 text-primary font-semibold">
              <IndianRupee className="h-4 w-4" />
              <span>{lab.hourlyRate}/hr</span>
            </div>
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap gap-1.5">
            {lab.facilities.slice(0, 3).map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs font-normal">
                {facility}
              </Badge>
            ))}
            {lab.facilities.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{lab.facilities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onSelect(lab)} 
          className="w-full btn-gradient"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LabCard;
