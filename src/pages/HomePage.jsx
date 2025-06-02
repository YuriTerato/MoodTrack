import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';

    const moodEmojis = [
      { emoji: '😌', label: 'Tranquila(o)', value: 'calm', color: 'gradient-calm', textColor: 'text-green-700' },
      { emoji: '🙂', label: 'Leve ansiedade', value: 'light', color: 'gradient-light', textColor: 'text-yellow-600' },
      { emoji: '😟', label: 'Ansiedade moderada', value: 'moderate', color: 'gradient-moderate', textColor: 'text-orange-600' },
      { emoji: '😰', label: 'Ansiedade alta', value: 'high', color: 'gradient-high', textColor: 'text-red-600' },
      { emoji: '😵', label: 'Crise', value: 'crisis', color: 'gradient-crisis', textColor: 'text-red-800' },
    ];

    const HomePage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const [selectedMood, setSelectedMood] = useState(null);
      const [triggerText, setTriggerText] = useState('');
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        setIsDialogOpen(true);
      };

      const saveMoodEntry = () => {
        if (!selectedMood) return;

        const newEntry = {
          id: Date.now(),
          mood: selectedMood.value,
          emoji: selectedMood.emoji,
          label: selectedMood.label,
          trigger: triggerText,
          timestamp: new Date().toISOString(),
        };

        const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        entries.push(newEntry);
        localStorage.setItem('moodEntries', JSON.stringify(entries));
        
        toast({
          title: "Humor Registrado!",
          description: `Seu estado de ${selectedMood.label} foi salvo.`,
          className: "bg-green-500 text-white",
        });

        setTriggerText('');
        setIsDialogOpen(false);
        navigate(`/suggestions/${selectedMood.value}`);
      };
      
      const skipTrigger = () => {
        if (!selectedMood) return;
        saveMoodEntry(); // Save with empty trigger
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
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                Como você está se sentindo agora?
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Escolha um emoji que represente seu estado atual.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
              {moodEmojis.map((mood) => (
                <motion.div
                  key={mood.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className={`w-full h-auto py-4 px-2 flex flex-col items-center justify-center space-y-2 rounded-xl border-2 hover:shadow-xl transition-all duration-200 ${mood.color} text-white dark:text-gray-800`}
                    onClick={() => handleMoodSelect(mood)}
                  >
                    <span className="text-5xl sm:text-6xl">{mood.emoji}</span>
                    <span className={`font-semibold text-sm sm:text-base ${mood.textColor} dark:text-gray-200`}>{mood.label}</span>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-purple-600 dark:text-purple-400">Registrar Gatilho (Opcional)</DialogTitle>
                <DialogDescription>
                  O que você acha que causou essa ansiedade? Isso pode ajudar a identificar padrões.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trigger" className="text-right text-gray-700 dark:text-gray-300">
                    Gatilho
                  </Label>
                  <Textarea
                    id="trigger"
                    value={triggerText}
                    onChange={(e) => setTriggerText(e.target.value)}
                    className="col-span-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Ex: Reunião importante, discussão, pensamentos..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { skipTrigger(); }} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Pular</Button>
                <Button onClick={saveMoodEntry} className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">Salvar e Ver Sugestões</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      );
    };

    export default HomePage;