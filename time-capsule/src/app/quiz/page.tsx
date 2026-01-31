'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { items, categories } from '@/data/seed';

// Quiz question type
interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    memeIds: string[];
  }[];
}

// Quiz data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "It's Friday night and you're hanging out with friends. What's your vibe?",
    options: [
      { text: "Making everyone laugh with a crazy story", memeIds: ['item-7', 'item-3'] },
      { text: "Just vibing and taking selfies", memeIds: ['item-1', 'item-17'] },
      { text: "Trying to start a new challenge", memeIds: ['item-8', 'item-13'] },
      { text: "Being the loudest one in the room", memeIds: ['item-9', 'item-15'] },
    ],
  },
  {
    id: 2,
    question: "Pick a place to spend your day:",
    options: [
      { text: "The mall - gotta look good", memeIds: ['item-1', 'item-13'] },
      { text: "Park - hunting for something", memeIds: ['item-8', 'item-9'] },
      { text: "Home - watching Netflix", memeIds: ['item-2', 'item-17'] },
      { text: "Anywhere my friends are!", memeIds: ['item-7', 'item-3'] },
    ],
  },
  {
    id: 3,
    question: "What do people say about you?",
    options: [
      { text: "I'm iconic ✨", memeIds: ['item-1', 'item-17'] },
      { text: "I'm a legend 💀", memeIds: ['item-3', 'item-15'] },
      { text: "I'm a bit extra 🎭", memeIds: ['item-7', 'item-9'] },
      { text: "I'm always on a mission 🎯", memeIds: ['item-8', 'item-13'] },
    ],
  },
  {
    id: 4,
    question: "Pick a 2016 accessory:",
    options: [
      { text: "White Vans (obviously)", memeIds: ['item-1'] },
      { text: "Pokéball phone case", memeIds: ['item-8'] },
      { text: "Fidget spinner", memeIds: ['item-15'] },
      { text: "Just my phone for TikToks", memeIds: ['item-13'] },
    ],
  },
  {
    id: 5,
    question: "How do you handle drama?",
    options: [
      { text: "Meme it into oblivion", memeIds: ['item-3', 'item-7'] },
      { text: "Document everything", memeIds: ['item-1', 'item-2'] },
      { text: "Ignoring it like a pro", memeIds: ['item-8', 'item-13'] },
      { text: "Making it everyone's problem", memeIds: ['item-9', 'item-15'] },
    ],
  },
];

// Result type
interface QuizResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const memeResults: Record<string, QuizResult> = {
  'item-1': {
    id: 'damn-daniel',
    title: 'Damn Daniel!',
    description: "You're the person who always has the perfect white Vans to pair with every outfit. Your friends know you for your consistent style and the ability to make anything look iconic. You're lowkey iconic and everyone knows it!",
    icon: '👟',
    color: 'bg-retro-teal',
  },
  'item-3': {
    id: 'harambe',
    title: 'Harambe',
    description: "You're a meme legend! Your sense of humor is absolutely unhinged in the best way possible. You could start a movement just by existing, and honestly? People would pay to see you do it. Legend status!",
    icon: '🦍',
    color: 'bg-retro-purple',
  },
  'item-7': {
    id: 'cash-me-outside',
    title: 'Cash Me Outside',
    description: "You're bold, you're confident, and you're not afraid to speak your mind. Your energy is unmatched and you bring the drama (in a fun way). The internet loves you for being unapologetically yourself!",
    icon: '💅',
    color: 'bg-retro-pink',
  },
  'item-8': {
    id: 'pokemon-go',
    title: 'Pokémon GO',
    description: "You're always on a mission! Whether it's catching 'em all or achieving your goals, you don't stop until you're done. You're adventurous, social, and you bring people together. Team rocket who?",
    icon: '⚡',
    color: 'bg-retro-yellow',
  },
  'item-13': {
    id: 'airpods',
    title: 'AirPods',
    description: "You're ahead of the trends and you know it. You set the standard for what's cool and everyone else is just catching up. Your aesthetic is immaculate and your vibes are unmatched!",
    icon: '🎧',
    color: 'bg-retro-teal',
  },
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);

  const handleAnswer = (memeIds: string[]) => {
    const newScores = { ...scores };
    memeIds.forEach((id) => {
      newScores[id] = (newScores[id] || 0) + 1;
    });
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    const winnerId = Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]?.[0];
    const memeResult = memeResults[winnerId || 'item-1'];
    setResult(memeResult);
    setShowResult(true);
    setHasTakenQuiz(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({});
    setShowResult(false);
    setResult(null);
  };

  const shareResult = () => {
    if (result) {
      const text = `I got "${result.title}" in the "Which 2016 Meme Are You?" quiz! 🐣 Test your 2016 vibes at TimeCapsule!`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="shadow-xl">
                  <CardHeader className="text-center">
                    <Badge variant="secondary" className="w-fit mx-auto mb-4 bg-retro-purple/20 text-retro-purple">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-retro-dark">
                      {quizQuestions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full text-left justify-start h-auto py-4 px-6 text-lg hover:bg-retro-teal/10 hover:border-retro-teal transition-all text-retro-dark"
                          onClick={() => handleAnswer(option.memeIds)}
                        >
                          {option.text}
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Progress bar */}
                <div className="mt-6 h-2 bg-retro-cream rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-retro-teal rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Card className="shadow-xl overflow-hidden">
                  <div className={`h-32 ${result?.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r ${result?.color.replace('bg-', 'from-')}/30 to-transparent" />
                    <span className="text-6xl">{result?.icon}</span>
                  </div>
                  <CardContent className="p-8">
                    <Badge variant="secondary" className="mb-4 bg-retro-teal/20 text-retro-teal">
                      Your 2016 Meme Persona
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                      {result?.title}
                    </h2>
                    <p className="text-lg text-retro-gray mb-6">
                      {result?.description}
                    </p>

                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={shareResult}
                        className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90 text-white border-0"
                      >
                        Share Result 🐦
                      </Button>
                      <Button variant="outline" onClick={resetQuiz} className="border-retro-purple text-retro-purple hover:bg-retro-purple/10">
                        Take Quiz Again 🔄
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Explore more */}
                <div className="mt-8 p-6 bg-retro-purple/10 rounded-xl border border-retro-purple/20">
                  <h3 className="text-xl font-bold text-retro-dark mb-4">
                    Explore More 2016 Trends
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {items
                      .filter((item) => item.yearId === '2016')
                      .slice(0, 4)
                      .map((item) => (
                        <a
                          key={item.id}
                          href={`/trend/${item.slug}`}
                          className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                        >
                          <span className="text-sm font-medium text-black">
                            {item.title}
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
