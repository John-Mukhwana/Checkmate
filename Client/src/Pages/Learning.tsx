import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { useAuth } from '../hooks/use-auth';
import { useToast } from '../hooks/use-toast';
import { mockLessons, mockUserProgress, mockCertificates } from '../lib/mockData';
import { 
  GraduationCap, 
  Shield, 
  Leaf, 
  Moon, 
  Lightbulb, 
  Clock, 
  Users, 
  CheckCircle,
  PlayCircle,
  Trophy,
  Award
} from 'lucide-react';
import { Link } from 'wouter';

const categories = [
  {
    icon: Shield,
    title: "Anxiety Management",
    description: "Learn proven techniques to manage anxiety and panic attacks",
    lessons: 8,
    duration: "2h 30min",
    progress: 75,
    color: "bg-blue-50 border-blue-100",
    iconColor: "bg-blue-500 text-white",
    progressColor: "bg-blue-500"
  },
  {
    icon: Leaf,
    title: "Stress Relief",
    description: "Discover mindfulness and relaxation techniques",
    lessons: 6,
    duration: "1h 45min",
    progress: 0,
    color: "bg-green-50 border-green-100",
    iconColor: "bg-secondary text-white",
    progressColor: "bg-secondary",
    badge: "New"
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Improve sleep quality and establish healthy sleep habits",
    lessons: 5,
    duration: "1h 20min",
    progress: 100,
    color: "bg-purple-50 border-purple-100",
    iconColor: "bg-purple-500 text-white",
    progressColor: "bg-purple-500"
  }
];

export default function Learning() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Learning Hub
            </h1>
            <p className="text-slate-600 mb-6">
              Please sign in to access evidence-based mental health resources.
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

  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "Choose one of the options to continue",
        variant: "destructive",
      });
      return;
    }

    const correct = selectedAnswer === 'interconnected';
    setShowQuizResult(true);
    
    toast({
      title: correct ? "Correct!" : "Not quite right",
      description: correct 
        ? "Thoughts, feelings, and behaviors are indeed interconnected in CBT"
        : "The correct answer is that thoughts, feelings, and behaviors are interconnected",
      variant: correct ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Mental Health Learning Hub
          </h1>
          <p className="text-lg text-slate-600">
            Evidence-based resources to support your mental health journey
          </p>
        </motion.div>

        {/* Learning Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className={`${category.color} hover:shadow-lg transition-shadow duration-300`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${category.iconColor}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {category.title}
                    </h3>
                    {category.badge && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {category.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-slate-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">
                        {category.lessons} Lessons • {category.duration}
                      </span>
                      <span className="text-slate-500">
                        {category.progress}% Complete
                      </span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      category.progress === 100 
                        ? `${category.iconColor} hover:opacity-90` 
                        : category.progress > 0 
                        ? `${category.iconColor} hover:opacity-90`
                        : `${category.iconColor} hover:opacity-90`
                    }`}
                  >
                    {category.progress === 100 ? 'Review Course' : 
                     category.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-slate-50 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Understanding Cognitive Behavioral Therapy
                  </h2>
                  
                  <p className="text-lg text-slate-600 mb-6">
                    Learn the fundamentals of CBT and how to identify and challenge 
                    negative thought patterns that contribute to anxiety and depression.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">Progress</span>
                      <span className="text-slate-500">3 of 5 sections</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="flex space-x-4">
                    <Link href="/course/3">
                      <Button className="btn-accent">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Lesson
                      </Button>
                    </Link>
                    <Link href="/quiz/3">
                      <Button variant="outline">
                        <Trophy className="mr-2 h-4 w-4" />
                        Take Quiz
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Mock Quiz Interface */}
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Knowledge Check</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-slate-700 mb-4 font-medium">
                        What is the main principle of CBT?
                      </p>
                      
                      <RadioGroup 
                        value={selectedAnswer} 
                        onValueChange={setSelectedAnswer}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="interconnected" id="interconnected" />
                          <Label htmlFor="interconnected" className="text-slate-600 cursor-pointer">
                            Thoughts, feelings, and behaviors are interconnected
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="past" id="past" />
                          <Label htmlFor="past" className="text-slate-600 cursor-pointer">
                            Past experiences determine present behavior
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medication" id="medication" />
                          <Label htmlFor="medication" className="text-slate-600 cursor-pointer">
                            Medication is always necessary
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {showQuizResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg ${
                          selectedAnswer === 'interconnected' 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`h-4 w-4 ${
                            selectedAnswer === 'interconnected' ? 'text-green-600' : 'text-red-600'
                          }`} />
                          <span className={`text-sm font-medium ${
                            selectedAnswer === 'interconnected' ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {selectedAnswer === 'interconnected' ? 'Correct!' : 'Not quite right'}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${
                          selectedAnswer === 'interconnected' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {selectedAnswer === 'interconnected' 
                            ? 'CBT focuses on how thoughts, feelings, and behaviors influence each other.'
                            : 'The correct answer is that thoughts, feelings, and behaviors are interconnected.'
                          }
                        </p>
                      </motion.div>
                    )}
                    
                    <Button 
                      onClick={handleQuizSubmit} 
                      className="w-full"
                      disabled={showQuizResult}
                    >
                      {showQuizResult ? 'Answer Submitted' : 'Submit Answer'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Lessons */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Lessons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockLessons.map((lesson, index) => {
              const progress = mockUserProgress.find(p => p.lessonId === lesson.id);
              const certificate = mockCertificates.find(c => c.lessonId === lesson.id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {lesson.title}
                        </h3>
                        {progress?.completed && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4">
                        {lesson.category}
                      </p>
                      
                      {progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Progress</span>
                            <span>{progress.progress}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{lesson.completionCount} completed</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link href={`/course/${lesson.id}`} className="flex-1">
                          <Button 
                            variant={progress?.completed ? "outline" : "default"} 
                            size="sm" 
                            className="w-full"
                          >
                            <PlayCircle className="mr-2 h-3 w-3" />
                            {progress?.progress > 0 ? 'Continue' : 'Start Course'}
                          </Button>
                        </Link>
                        
                        {progress && progress.progress > 50 && (
                          <Link href={`/quiz/${lesson.id}`}>
                            <Button variant="outline" size="sm">
                              <Trophy className="mr-2 h-3 w-3" />
                              Quiz
                            </Button>
                          </Link>
                        )}
                        
                        {certificate && (
                          <Link href={`/certificate/${lesson.id}`}>
                            <Button variant="outline" size="sm">
                              <Award className="mr-2 h-3 w-3" />
                              Certificate
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
