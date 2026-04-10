import React, { useState } from 'react';
import { IndianRupee, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Layout } from '@/components/Layout';
import { mockLabs } from '@/data/mockData';
import { Lab } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Charges: React.FC = () => {
  const [labs, setLabs] = useState(mockLabs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { toast } = useToast();

  const handleEdit = (lab: Lab) => {
    setEditingId(lab.id);
    setEditValue(lab.hourlyRate.toString());
  };

  const handleSave = (labId: string) => {
    const newRate = parseInt(editValue);
    if (isNaN(newRate) || newRate <= 0) {
      toast({
        title: 'Invalid Rate',
        description: 'Please enter a valid hourly rate.',
        variant: 'destructive',
      });
      return;
    }

    setLabs(prev =>
      prev.map(lab =>
        lab.id === labId ? { ...lab, hourlyRate: newRate } : lab
      )
    );
    setEditingId(null);
    
    toast({
      title: 'Rate Updated',
      description: 'Hourly rate has been updated successfully.',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const totalMonthlyRevenue = labs.reduce((sum, lab) => sum + lab.hourlyRate * 160, 0);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Charges Management</h1>
          <p className="text-muted-foreground mt-1">
            Configure hourly rates for labs and classrooms
          </p>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Hourly Rate</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{Math.round(labs.reduce((sum, lab) => sum + lab.hourlyRate, 0) / labs.length)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Highest Rate</p>
                  <p className="text-3xl font-bold text-success">
                    ₹{Math.max(...labs.map(lab => lab.hourlyRate))}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <IndianRupee className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Monthly Revenue</p>
                  <p className="text-3xl font-bold text-warning">
                    ₹{(totalMonthlyRevenue / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <IndianRupee className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lab Pricing</CardTitle>
            <CardDescription>
              Set hourly rates for each lab. Changes will apply to new bookings immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lab / Room</TableHead>
                  <TableHead>BCC Number</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labs.map((lab) => (
                  <TableRow key={lab.id}>
                    <TableCell>
                      <p className="font-medium">{lab.name}</p>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{lab.bccNumber}</TableCell>
                    <TableCell>{lab.department}</TableCell>
                    <TableCell>{lab.capacity} seats</TableCell>
                    <TableCell>
                      <Badge variant={lab.isAC ? 'default' : 'secondary'}>
                        {lab.isAC ? 'AC' : 'Non-AC'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {editingId === lab.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">₹</span>
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 h-8"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <span className="font-semibold text-primary">
                          ₹{lab.hourlyRate}/hr
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === lab.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-success"
                            onClick={() => handleSave(lab.id)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={handleCancel}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleEdit(lab)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IndianRupee className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Pricing Guidelines</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Rates are calculated per hour. Users can book a maximum of 3 consecutive hours. 
                  AC rooms typically have higher rates. Consider capacity and facilities when setting prices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Charges;
