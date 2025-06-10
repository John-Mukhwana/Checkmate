import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../hooks/use-auth';
import { useToast } from '../hooks/use-toast';
import { mockJournals } from '../lib/mockData';
import { formatDate, getMoodEmoji, getMoodColor, generateMockHash, generateMockIPFS } from '../lib/utils';
import { 
  BookOpen, 
  Mic, 
  Play, 
  Square, 
  Smile, 
  Meh, 
  Frown,
  FileAudio,
  Hash,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'wouter';

type MoodType = 'happy' | 'neutral' | 'sad';

export default function Journal() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [textEntry, setTextEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Personal Journal
            </h1>
            <p className="text-slate-600 mb-6">
              Please sign in to access your personal journaling space.
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

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textEntry.trim() || !selectedMood) {
      toast({
        title: "Incomplete Entry",
        description: "Please write your thoughts and select a mood",
        variant: "destructive",
      });
      return;
    }

    // Mock sentiment analysis
    const moodScores = { happy: 8.5, neutral: 5.5, sad: 3.2 };
    const moodScore = moodScores[selectedMood];

    toast({
      title: "Journal Entry Saved",
      description: `Mood score: ${moodScore}/10. Entry saved to blockchain.`,
    });

    setTextEntry('');
    setSelectedMood(null);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      // Mock recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Auto-stop after 30 seconds for demo
      setTimeout(() => {
        setIsRecording(false);
        clearInterval(timer);
        toast({
          title: "Recording Complete",
          description: "Voice entry transcribed and saved with mood analysis",
        });
      }, 5000);
    } else {
      setIsRecording(false);
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Your Personal Journal
          </h1>
          <p className="text-lg text-slate-600">
            Track your thoughts and emotions with AI-powered insights
          </p>
        </motion.div>

        <Tabs defaultValue="text" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Text Entry</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center space-x-2">
              <Mic className="h-4 w-4" />
              <span>Voice Entry</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-2 gap-8">
            <TabsContent value="text" className="mt-0">
              <Card className="shadow-lg border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-secondary" />
                    </div>
                    <span>Text Entry</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTextSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        How are you feeling today?
                      </label>
                      <Textarea
                        value={textEntry}
                        onChange={(e) => setTextEntry(e.target.value)}
                        rows={6}
                        className="resize-none"
                        placeholder="Share your thoughts, feelings, and experiences..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Current Mood
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMood('sad')}
                          className={`p-4 border-2 rounded-xl transition-all text-center ${
                            selectedMood === 'sad'
                              ? 'border-red-400 bg-red-50'
                              : 'border-red-200 hover:border-red-400 hover:bg-red-50'
                          }`}
                        >
                          <Frown className="h-6 w-6 text-red-500 mx-auto mb-2" />
                          <span className="text-sm text-red-700 font-medium">Sad</span>
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMood('neutral')}
                          className={`p-4 border-2 rounded-xl transition-all text-center ${
                            selectedMood === 'neutral'
                              ? 'border-yellow-400 bg-yellow-50'
                              : 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50'
                          }`}
                        >
                          <Meh className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                          <span className="text-sm text-yellow-700 font-medium">Neutral</span>
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMood('happy')}
                          className={`p-4 border-2 rounded-xl transition-all text-center ${
                            selectedMood === 'happy'
                              ? 'border-green-400 bg-green-50'
                              : 'border-green-200 hover:border-green-400 hover:bg-green-50'
                          }`}
                        >
                          <Smile className="h-6 w-6 text-green-500 mx-auto mb-2" />
                          <span className="text-sm text-green-700 font-medium">Happy</span>
                        </motion.button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full btn-secondary">
                      Save Entry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="mt-0">
              <Card className="shadow-lg border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="bg-indigo-100 w-10 h-10 rounded-xl flex items-center justify-center">
                      <Mic className="h-5 w-5 text-primary" />
                    </div>
                    <span>Voice Entry</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <motion.div
                      animate={{ 
                        scale: isRecording ? [1, 1.05, 1] : 1,
                        opacity: isRecording ? [1, 0.8, 1] : 1
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: isRecording ? Infinity : 0 
                      }}
                      className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto ${
                        isRecording 
                          ? 'bg-red-500' 
                          : 'bg-gradient-to-br from-primary to-secondary'
                      }`}
                    >
                      <Mic className="h-12 w-12 text-white" />
                    </motion.div>

                    <div>
                      <p className="text-lg font-medium text-slate-900 mb-2">
                        {isRecording ? 'Recording...' : 'Ready to Record'}
                      </p>
                      <p className="text-sm text-slate-600">
                        {isRecording 
                          ? `${formatRecordingTime(recordingTime)}`
                          : 'Tap the microphone to start recording your voice journal'
                        }
                      </p>
                    </div>

                    <Button
                      onClick={toggleRecording}
                      className={`px-8 py-4 ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <Square className="mr-2 h-5 w-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-5 w-5" />
                          Start Recording
                        </>
                      )}
                    </Button>

                    {/* Mock Latest Recording */}
                    <Card className="bg-slate-50 border border-slate-200 text-left">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileAudio className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">Latest Recording</span>
                        </div>
                        <p className="text-sm text-slate-600 italic mb-3">
                          "Today was a good day. I felt more confident at work and had a great conversation 
                          with my colleague about the project. I'm feeling optimistic about the future."
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Duration: 1:23</span>
                          <span>Mood Score: 8.2/10</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Entries - Spans both columns */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Entries</h2>
              <div className="space-y-4">
                {mockJournals.map((journal) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              journal.moodScore >= 7 ? 'bg-green-100' : 
                              journal.moodScore >= 5 ? 'bg-yellow-100' : 'bg-red-100'
                            }`}>
                              <span className="text-sm">
                                {getMoodEmoji(journal.moodScore)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {formatDate(journal.createdAt!)}
                              </p>
                              <p className="text-sm text-slate-600">
                                {journal.type === 'voice' ? 'Voice Entry • ' : ''}
                                Mood: <span className={getMoodColor(journal.moodScore)}>
                                  {journal.moodScore}/10
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right text-xs text-slate-500 space-y-1">
                            <div className="flex items-center space-x-1">
                              <LinkIcon className="h-3 w-3" />
                              <span>IPFS: {journal.ipfsUrl?.slice(7, 13)}...</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Hash className="h-3 w-3" />
                              <span>Hash: {journal.blockchainHash.slice(0, 8)}...</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start justify-between">
                          <p className="text-slate-700 flex-1 mr-4">
                            {journal.content}
                          </p>
                          {journal.type === 'voice' && (
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
