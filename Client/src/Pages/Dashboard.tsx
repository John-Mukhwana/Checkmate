import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/use-auth';
import { useToast } from '../hooks/use-toast';
import { MoodChart } from '../components/MoodChart';
import { mockJournals, mockBookings } from '../lib/mockData';
import { formatDate, getMoodEmoji } from '../lib/utils';
import { 
  BarChart3, 
  BookOpen, 
  Smile, 
  GraduationCap, 
  Calendar, 
  Shield, 
  Clock, 
  Heart,
  Mail,
  Wallet,
  CheckCircle,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'wouter';

export default function Dashboard() {
  const { user, isAuthenticated, linkAccount } = useAuth();
  const { toast } = useToast();
  const [journeyStreak, setJourneyStreak] = useState(47);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Progress Dashboard
            </h1>
            <p className="text-slate-600 mb-6">
              Please sign in to view your mental health progress and insights.
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

  const handleLinkAccount = async (authType: "google" | "wallet") => {
    try {
      await linkAccount(authType);
      toast({
        title: "Account Linked",
        description: `Successfully linked your ${authType === 'google' ? 'Gmail' : 'wallet'} account`,
      });
    } catch (error) {
      toast({
        title: "Link Failed",
        description: "Failed to link account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      icon: BookOpen,
      value: mockJournals.length,
      label: "Journal Entries",
      change: "+3 this week",
      color: "bg-blue-50 border-blue-100",
      iconColor: "bg-blue-500 text-white"
    },
    {
      icon: Smile,
      value: "7.2",
      label: "Avg Mood Score",
      change: "+0.8 from last month",
      color: "bg-green-50 border-green-100",
      iconColor: "bg-secondary text-white"
    },
    {
      icon: GraduationCap,
      value: "12",
      label: "Lessons Completed",
      change: "2 courses finished",
      color: "bg-purple-50 border-purple-100",
      iconColor: "bg-purple-500 text-white"
    },
    {
      icon: Calendar,
      value: mockBookings.length,
      label: "Therapy Sessions",
      change: `Next: ${formatDate(mockBookings[0]?.time || new Date())}`,
      color: "bg-orange-50 border-orange-100",
      iconColor: "bg-accent text-white"
    }
  ];

  const weeklyActivity = {
    journals: [3, 2, 0, 1, 2, 1, 0],
    aiChats: [1, 2, 1, 0, 3, 1, 2],
    learning: [1, 0, 2, 1, 0, 1, 0]
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Your Progress Dashboard
            </h1>
            <p className="text-lg text-slate-600">
              Track your mental health journey
            </p>
          </div>
          <div className="gradient-bg text-white px-6 py-3 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold">Day {journeyStreak}</div>
              <div className="text-sm opacity-90">Journey Streak</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className={`${stat.color} border`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconColor}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{stat.label}</h3>
                  <p className="text-sm text-slate-600">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle>Mood Trend (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodChart />
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Journal Entries</span>
                    <div className="flex space-x-1">
                      {weeklyActivity.journals.map((count, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            count > 0 
                              ? 'bg-primary text-white' 
                              : 'bg-slate-200'
                          }`}
                        >
                          {count > 0 && (
                            <span className="text-xs font-bold">{count}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">AI Chat Sessions</span>
                    <div className="flex space-x-1">
                      {weeklyActivity.aiChats.map((count, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            count > 0 
                              ? 'bg-secondary text-white' 
                              : 'bg-slate-200'
                          }`}
                        >
                          {count > 0 && (
                            <span className="text-xs font-bold">{count}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Learning Sessions</span>
                    <div className="flex space-x-1">
                      {weeklyActivity.learning.map((count, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            count > 0 
                              ? 'bg-accent text-white' 
                              : 'bg-slate-200'
                          }`}
                        >
                          {count > 0 && (
                            <span className="text-xs font-bold">{count}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">Account & Authentication</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Authentication */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Connected Accounts
                  </h3>
                  <div className="space-y-4">
                    {/* Gmail Account */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 w-10 h-10 rounded-xl flex items-center justify-center">
                          <Mail className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {user?.email || 'Not connected'}
                          </p>
                          <p className="text-sm text-slate-600">Gmail Account</p>
                        </div>
                      </div>
                      {user?.email ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Connected
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleLinkAccount('google')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>

                    {/* Wallet Connection */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 w-10 h-10 rounded-xl flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {user?.wallet 
                              ? `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}`
                              : 'Not connected'
                            }
                          </p>
                          <p className="text-sm text-slate-600">MetaMask Wallet</p>
                        </div>
                      </div>
                      {user?.wallet ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Connected
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleLinkAccount('wallet')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy & Security */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Privacy & Security
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">Data Encryption</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-sm text-slate-600">
                        All journal entries are encrypted end-to-end
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">Blockchain Backup</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-sm text-slate-600">
                        Journal hashes stored on Polygon network
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">HIPAA Compliant</span>
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600">
                        Healthcare data protection standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Journal Entries */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Recent Journal Entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockJournals.slice(0, 3).map((journal) => (
                  <div key={journal._id ?? journal.createdAt.toString()} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl">{getMoodEmoji(journal.moodScore)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {formatDate(journal.createdAt!)}
                      </p>
                      <p className="text-xs text-slate-600">
                        Mood: {journal.moodScore}/10 • {journal.type}
                      </p>
                    </div>
                  </div>
                ))}
                <Link href="app/journal">
                  <Button variant="ghost" className="w-full text-primary">
                    View All Entries →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockBookings.slice(0, 3).map((booking) => (
                  <div key={booking._id ?? booking.createdAt.toString()} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {booking.sessionType}
                      </p>
                      <p className="text-xs text-slate-600">
                        {formatDate(booking.time)}
                      </p>
                    </div>
                  </div>
                ))}
                <Link href="app/therapists">
                  <Button variant="ghost" className="w-full text-primary">
                    Book New Session →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
