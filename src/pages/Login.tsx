import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TataLogo } from '@/components/TataLogo';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<UserRole>('user');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password, activeTab);
      
      if (success) {
        toast({
          title: 'Welcome!',
          description: `Logged in as ${activeTab === 'admin' ? 'Administrator' : 'Staff Member'}`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
              <Building2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-4">
              Lab Booking System
            </h1>
            <p className="text-lg text-white/80 text-center max-w-md">
              Streamline your lab and classroom reservations with our efficient booking platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-12 text-center">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">6+</p>
              <p className="text-sm text-white/70">Labs & Rooms</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Online Booking</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm text-white/70">Daily Users</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">99%</p>
              <p className="text-sm text-white/70">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <TataLogo size="lg" />
          </div>

          <div className="text-center lg:text-left">
            <div className="hidden lg:block mb-8">
              <TataLogo size="lg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <Card className="border-0 shadow-elevated">
            <CardHeader className="pb-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UserRole)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Staff Login
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Admin Login
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={activeTab === 'admin' ? 'admin@tatamotors.com' : 'staff@tatamotors.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    `Sign in as ${activeTab === 'admin' ? 'Administrator' : 'Staff'}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Need help? Contact{' '}
            <a href="mailto:support@tatamotors.com" className="text-primary hover:underline">
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
