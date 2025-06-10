import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/use-auth';
import { useToast } from '../hooks/use-toast';
import { mockTherapists } from '../lib/mockData';
import { formatDate } from '../lib/utils';
import { 
  Users, 
  Search, 
  Star, 
  Shield, 
  MessageCircle, 
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'wouter';

export default function Therapists() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTherapist, setSelectedTherapist] = useState<typeof mockTherapists[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Find Therapists
            </h1>
            <p className="text-slate-600 mb-6">
              Please sign in to browse and book sessions with verified mental health professionals.
            </p>
            <Link href="/">
              <Button className="w-full">
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            therapist.expertise.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || 
                           therapist.languages.some(lang => lang.toLowerCase().includes(selectedLanguage.toLowerCase()));
    
    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSession) {
      toast({
        title: "Incomplete Booking",
        description: "Please select date, time, and session type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Session with ${selectedTherapist?.name} on ${selectedDate} at ${selectedTime}`,
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSession('');
  };

  const timeSlots = [
    '9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'
  ];

  const sessionTypes = [
    { value: 'initial', label: 'Initial Consultation (60 min)', price: 120 },
    { value: 'followup', label: 'Follow-up Session (50 min)', price: 100 },
    { value: 'couples', label: 'Couples Session (75 min)', price: 150 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Find Your Perfect Therapist
          </h1>
          <p className="text-lg text-slate-600">
            Connect with verified mental health professionals
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name or expertise..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specialty
                </label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="anxiety">Anxiety Disorders</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="ptsd">PTSD</SelectItem>
                    <SelectItem value="relationship">Relationships</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Language
                </label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Language</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Therapist Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="card-hover border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={therapist.imageUrl}
                      alt={therapist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-1">
                        {therapist.expertise}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(therapist.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">
                          {therapist.rating} ({therapist.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {therapist.expertise.includes('Anxiety') && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            Anxiety
                          </Badge>
                        )}
                        {therapist.expertise.includes('Depression') && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            Depression
                          </Badge>
                        )}
                        {therapist.expertise.includes('CBT') && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                            CBT
                          </Badge>
                        )}
                        {therapist.expertise.includes('Relationships') && (
                          <Badge variant="secondary" className="bg-pink-100 text-pink-800 text-xs">
                            Relationships
                          </Badge>
                        )}
                        {therapist.expertise.includes('Family') && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                            Family Therapy
                          </Badge>
                        )}
                        {therapist.expertise.includes('PTSD') && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                            PTSD
                          </Badge>
                        )}
                        {therapist.expertise.includes('Trauma') && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                            Trauma
                          </Badge>
                        )}
                        {therapist.expertise.includes('EMDR') && (
                          <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs">
                            EMDR
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-700">Languages</p>
                      <p className="text-sm text-slate-600">
                        {therapist.languages.join(', ')}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Verified • Hash: {therapist.verifiedHash.slice(0, 8)}...
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="flex-1"
                          onClick={() => setSelectedTherapist(therapist)}
                        >
                          Book Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5" />
                            <span>Book Session with {therapist.name}</span>
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Select Date
                            </label>
                            <Input
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Available Times
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  variant={selectedTime === time ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(time)}
                                  className="text-xs"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Session Type
                            </label>
                            <Select value={selectedSession} onValueChange={setSelectedSession}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select session type" />
                              </SelectTrigger>
                              <SelectContent>
                                {sessionTypes.map((session) => (
                                  <SelectItem key={session.value} value={session.value}>
                                    {session.label} - ${session.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <Button variant="outline" className="flex-1">
                              Cancel
                            </Button>
                            <Button onClick={handleBooking} className="flex-1">
                              Confirm Booking
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No therapists found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria to find more therapists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
