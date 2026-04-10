// import React, { useState } from 'react';
// import { Bell, Mail, Clock, Building2, Save, Shield } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Separator } from '@/components/ui/separator';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Layout } from '@/components/Layout';
// import { useToast } from '@/hooks/use-toast';

// const Settings: React.FC = () => {
//   const { toast } = useToast();
//   const [settings, setSettings] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     bookingReminders: true,
//     adminAlerts: true,
//     maxBookingHours: '3',
//     operatingStart: '06:30',
//     operatingEnd: '17:00',
//     autoConfirm: false,
//     requireApproval: true,
//     adminEmail: 'admin@tatamotors.com',
//     adminPhone: '+91 98765 43200',
//   });

//   const handleSave = () => {
//     toast({
//       title: 'Settings Saved',
//       description: 'Your preferences have been updated successfully.',
//     });
//   };

//   return (
//     <Layout>
//       <div className="space-y-6 animate-fade-in max-w-4xl">
//         {/* Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Settings</h1>
//           <p className="text-muted-foreground mt-1">
//             Configure system preferences and notifications
//           </p>
//         </div>

//         {/* Notifications */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="h-5 w-5" />
//               Notification Settings
//             </CardTitle>
//             <CardDescription>
//               Configure how you receive booking notifications
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>Email Notifications</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Receive booking confirmations and updates via email
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.emailNotifications}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, emailNotifications: v }))}
//               />
//             </div>
//             <Separator />
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>SMS Notifications</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Get booking alerts on your phone
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.smsNotifications}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, smsNotifications: v }))}
//               />
//             </div>
//             <Separator />
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>Booking Reminders</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Receive reminders before your scheduled bookings
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.bookingReminders}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, bookingReminders: v }))}
//               />
//             </div>
//             <Separator />
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>Admin Alerts</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Notify admins when new bookings are made
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.adminAlerts}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, adminAlerts: v }))}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Booking Rules */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Clock className="h-5 w-5" />
//               Booking Rules
//             </CardTitle>
//             <CardDescription>
//               Set operating hours and booking constraints
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label>Operating Start Time</Label>
//                 <Input
//                   type="time"
//                   value={settings.operatingStart}
//                   onChange={(e) => setSettings(prev => ({ ...prev, operatingStart: e.target.value }))}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Operating End Time</Label>
//                 <Input
//                   type="time"
//                   value={settings.operatingEnd}
//                   onChange={(e) => setSettings(prev => ({ ...prev, operatingEnd: e.target.value }))}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Maximum Booking Duration</Label>
//               <Select 
//                 value={settings.maxBookingHours}
//                 onValueChange={(v) => setSettings(prev => ({ ...prev, maxBookingHours: v }))}
//               >
//                 <SelectTrigger className="w-full md:w-[200px] bg-background">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="1">1 Hour</SelectItem>
//                   <SelectItem value="2">2 Hours</SelectItem>
//                   <SelectItem value="3">3 Hours</SelectItem>
//                   <SelectItem value="4">4 Hours</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Separator />

//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>Auto-confirm Bookings</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Automatically confirm bookings without admin approval
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.autoConfirm}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, autoConfirm: v }))}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <Label>Require Department Approval</Label>
//                 <p className="text-sm text-muted-foreground">
//                   Bookings need department head approval
//                 </p>
//               </div>
//               <Switch
//                 checked={settings.requireApproval}
//                 onCheckedChange={(v) => setSettings(prev => ({ ...prev, requireApproval: v }))}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Admin Contact */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Shield className="h-5 w-5" />
//               Admin Contact
//             </CardTitle>
//             <CardDescription>
//               Primary contact for booking notifications
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label>Admin Email</Label>
//                 <Input
//                   type="email"
//                   value={settings.adminEmail}
//                   onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Admin Phone</Label>
//                 <Input
//                   type="tel"
//                   value={settings.adminPhone}
//                   onChange={(e) => setSettings(prev => ({ ...prev, adminPhone: e.target.value }))}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Save Button */}
//         <div className="flex justify-end">
//           <Button onClick={handleSave} className="btn-gradient">
//             <Save className="h-4 w-4 mr-2" />
//             Save Settings
//           </Button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Settings;


import React, { useState, useEffect } from 'react';
import { Bell, Clock, Building2, Save, Shield, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

interface Settings {
  operatingStart: string;
  operatingEnd: string;
  maxBookingHours: number;
  maxAdvanceDays: number;
  autoConfirm: boolean;
  requireApproval: boolean;
  adminEmail: string;
  adminPhone: string;
  emailNotifications: boolean;
  bookingReminders: boolean;
}

const defaultSettings: Settings = {
  operatingStart: '08:00',
  operatingEnd: '20:00',
  maxBookingHours: 3,
  maxAdvanceDays: 30,
  autoConfirm: true,
  requireApproval: false,
  adminEmail: 'admin@tatamotors.com',
  adminPhone: '',
  emailNotifications: true,
  bookingReminders: true,
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/settings', { headers });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setSettings({
          operatingStart: data.operatingStart || '08:00',
          operatingEnd: data.operatingEnd || '20:00',
          maxBookingHours: data.maxBookingHours || 3,
          maxAdvanceDays: data.maxAdvanceDays || 30,
          autoConfirm: data.autoConfirm ?? true,
          requireApproval: data.requireApproval ?? false,
          adminEmail: data.adminEmail || '',
          adminPhone: data.adminPhone || '',
          emailNotifications: data.emailNotifications ?? true,
          bookingReminders: data.bookingReminders ?? true,
        });
      } catch {
        toast({ title: 'Error', description: 'Could not load settings.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8081/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      toast({ title: 'Settings Saved', description: 'All settings have been saved successfully.' });
    } catch {
      toast({ title: 'Error', description: 'Could not save settings.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const set = (key: keyof Settings, value: any) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  if (loading) return (
    <Layout>
      <div className="text-center py-12 text-muted-foreground">Loading settings...</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure booking rules and system preferences
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="btn-gradient">
            {saving ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle className="h-4 w-4 mr-2" /> Saved!</>
            ) : (
              <><Save className="h-4 w-4 mr-2" /> Save Settings</>
            )}
          </Button>
        </div>

        {/* Booking Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Booking Rules
            </CardTitle>
            <CardDescription>
              Control when and how labs can be booked
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Operating Start Time</Label>
                <Input
                  type="time"
                  value={settings.operatingStart}
                  onChange={e => set('operatingStart', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Earliest time a booking can start</p>
              </div>
              <div className="space-y-2">
                <Label>Operating End Time</Label>
                <Input
                  type="time"
                  value={settings.operatingEnd}
                  onChange={e => set('operatingEnd', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Latest time a booking can end</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Maximum Booking Duration</Label>
                <Select
                  value={String(settings.maxBookingHours)}
                  onValueChange={v => set('maxBookingHours', parseInt(v))}
                >
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="1">1 Hour</SelectItem>
                    <SelectItem value="2">2 Hours</SelectItem>
                    <SelectItem value="3">3 Hours</SelectItem>
                    <SelectItem value="4">4 Hours</SelectItem>
                    <SelectItem value="6">6 Hours</SelectItem>
                    <SelectItem value="8">Full Day (8 Hours)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Max hours per single booking</p>
              </div>
              <div className="space-y-2">
                <Label>Max Advance Booking (days)</Label>
                <Select
                  value={String(settings.maxAdvanceDays)}
                  onValueChange={v => set('maxAdvanceDays', parseInt(v))}
                >
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="60">2 Months</SelectItem>
                    <SelectItem value="90">3 Months</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How far ahead users can book</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-confirm Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Bookings are confirmed immediately without admin review
                </p>
              </div>
              <Switch
                checked={settings.autoConfirm}
                onCheckedChange={v => {
                  set('autoConfirm', v);
                  if (v) set('requireApproval', false);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Require Admin Approval</Label>
                <p className="text-sm text-muted-foreground">
                  Admin must approve each booking before it's confirmed
                </p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={v => {
                  set('requireApproval', v);
                  if (v) set('autoConfirm', false);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notification Settings
            </CardTitle>
            <CardDescription>
              Control which emails are sent automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send confirmation emails when bookings are made
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={v => set('emailNotifications', v)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Booking Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminder emails before scheduled bookings
                </p>
              </div>
              <Switch
                checked={settings.bookingReminders}
                onCheckedChange={v => set('bookingReminders', v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Admin Contact
            </CardTitle>
            <CardDescription>
              Primary contact details shown to users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Admin Email</Label>
                <Input
                  type="email"
                  value={settings.adminEmail}
                  onChange={e => set('adminEmail', e.target.value)}
                  placeholder="admin@tatamotors.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Admin Phone</Label>
                <Input
                  type="tel"
                  value={settings.adminPhone}
                  onChange={e => set('adminPhone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info box */}
        <Card className="bg-muted/40">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">About these settings</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Operating hours control which time slots appear in the booking calendar.
                  Max booking duration limits how many slots a user can select at once.
                  These settings apply system-wide to all labs and all users.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save button at bottom too */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="btn-gradient">
            {saving ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle className="h-4 w-4 mr-2" /> Saved!</>
            ) : (
              <><Save className="h-4 w-4 mr-2" /> Save Settings</>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;