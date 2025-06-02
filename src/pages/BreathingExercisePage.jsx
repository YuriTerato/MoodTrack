import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

    const BreathingExercisePage = () => {
      const [instruction, setInstruction] = useState('Prepare-se...');
      const [isRunning, setIsRunning] = useState(false);
      const [cycle, setCycle] = useState(0); // 0: inhale, 1: hold, 2: exhale
      const [timer, setTimer] = useState(4);
      const [animationKey, setAnimationKey] = useState(0); // To reset animation

      const inhaleTime = 4;
      const holdTime = 7;
      const exhaleTime = 8;

      useEffect(() => {
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            setTimer(prev => {
              if (prev > 1) {
                return prev - 1;
              } else {
                // Transition to next phase
                setCycle(currentCycle => {
                  const nextCycle = (currentCycle + 1) % 3;
                  if (nextCycle === 0) { // Inhale
                    setInstruction('Inspire...');
                    setAnimationKey(k => k + 1); // Trigger re-animation
                    return inhaleTime;
                  } else if (nextCycle === 1) { // Hold
                    setInstruction('Segure...');
                    return holdTime;
                  } else { // Exhale
                    setInstruction('Expire...');
                    return exhaleTime;
                  }
                });
                // This return is for the timer value of the new phase
                if (cycle === 2) return inhaleTime; // Just finished exhale, next is inhale
                if (cycle === 0) return holdTime;   // Just finished inhale, next is hold
                if (cycle === 1) return exhaleTime; // Just finished hold, next is exhale
                return 4; // Default, should not be reached
              }
            });
          }, 1000);
        } else {
          setInstruction('Pressione Iniciar');
          setTimer(inhaleTime);
          setCycle(0);
        }
        return () => clearInterval(interval);
      }, [isRunning, cycle]);
      
      const toggleExercise = () => {
        if (isRunning) {
          setIsRunning(false);
        } else {
          setIsRunning(true);
          setInstruction('Inspire...');
          setTimer(inhaleTime);
          setCycle(0);
          setAnimationKey(k => k + 1);
        }
      };

      const resetExercise = () => {
        setIsRunning(false);
        setInstruction('Prepare-se...');
        setTimer(inhaleTime);
        setCycle(0);
        setAnimationKey(k => k + 1);
      };
      
      const getCircleSize = () => {
        if (!isRunning) return 100;
        if (cycle === 0) return 200; // Inhale - expand
        if (cycle === 1) return 200; // Hold - stay expanded
        if (cycle === 2) return 100; // Exhale - shrink
        return 100;
      };

      const getCircleColor = () => {
        if (cycle === 0) return 'bg-blue-400'; // Inhale
        if (cycle === 1) return 'bg-yellow-400'; // Hold
        if (cycle === 2) return 'bg-green-400'; // Exhale
        return 'bg-gray-300';
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-8 py-8"
        >
          <Card className="w-full max-w-md shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <CardHeader className="text-center">
              <Wind className="w-12 h-12 mx-auto text-purple-500 dark:text-purple-400 mb-2" />
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                Exercício de Respiração 4-7-8
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Siga as instruções para acalmar sua mente.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="w-64 h-64 flex items-center justify-center">
                <motion.div
                  key={animationKey}
                  className={`rounded-full ${getCircleColor()} flex items-center justify-center text-white font-bold text-4xl shadow-lg`}
                  animate={{ 
                    width: getCircleSize(), 
                    height: getCircleSize(),
                  }}
                  transition={{ duration: cycle === 0 ? inhaleTime : (cycle === 2 ? exhaleTime : 0.5), ease: "easeInOut" }}
                >
                  {isRunning && timer}
                </motion.div>
              </div>
              <p className="text-2xl font-semibold text-purple-700 dark:text-purple-300 min-h-[32px]">{instruction}</p>
              <div className="flex space-x-4">
                <Button onClick={toggleExercise} className="w-28 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                  {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                  {isRunning ? 'Pausar' : 'Iniciar'}
                </Button>
                <Button onClick={resetExercise} variant="outline" className="w-28 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                  <RotateCcw className="mr-2" />
                  Resetar
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                <p>Inspire pelo nariz por {inhaleTime} segundos.</p>
                <p>Segure a respiração por {holdTime} segundos.</p>
                <p>Expire pela boca por {exhaleTime} segundos.</p>
                <p>Repita conforme necessário.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default BreathingExercisePage;