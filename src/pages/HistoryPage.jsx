import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { Trash2, CalendarDays } from 'lucide-react';

    const moodColors = {
      calm: 'bg-green-500',
      light: 'bg-yellow-400',
      moderate: 'bg-orange-500',
      high: 'bg-red-500',
      crisis: 'bg-red-700',
    };

    const moodEmojis = {
      calm: '😌',
      light: '🙂',
      moderate: '😟',
      high: '😰',
      crisis: '😵',
    };
    
    const HistoryPage = () => {
      const [entries, setEntries] = useState([]);
      const [filter, setFilter] = useState('all'); // 'all', 'week', 'month'
      const { toast } = useToast();

      useEffect(() => {
        loadEntries();
      }, []);

      const loadEntries = () => {
        const storedEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        setEntries(storedEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      };

      const deleteEntry = (id) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
        setEntries(updatedEntries);
        toast({
          title: "Registro Excluído",
          description: "O registro de humor foi removido.",
          variant: "destructive"
        });
      };

      const clearAllEntries = () => {
        localStorage.removeItem('moodEntries');
        setEntries([]);
        toast({
          title: "Histórico Limpo",
          description: "Todos os registros de humor foram removidos.",
          variant: "destructive"
        });
      };
      
      const filterEntries = (entriesToFilter) => {
        const now = new Date();
        if (filter === 'week') {
          const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
          return entriesToFilter.filter(entry => new Date(entry.timestamp) >= oneWeekAgo);
        }
        if (filter === 'month') {
          const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return entriesToFilter.filter(entry => new Date(entry.timestamp) >= oneMonthAgo);
        }
        return entriesToFilter;
      };

      const filteredEntries = filterEntries(entries);

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 py-8"
        >
          <Card className="w-full max-w-3xl mx-auto shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                  Histórico de Humor
                </CardTitle>
                <CalendarDays className="w-8 h-8 text-purple-500" />
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Veja seus registros de humor ao longo do tempo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-2 mb-6">
                <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')} className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-600 dark:hover:bg-purple-700">Todos</Button>
                <Button variant={filter === 'week' ? 'default' : 'outline'} onClick={() => setFilter('week')} className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-600 dark:hover:bg-purple-700">Última Semana</Button>
                <Button variant={filter === 'month' ? 'default' : 'outline'} onClick={() => setFilter('month')} className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-600 dark:hover:bg-purple-700">Último Mês</Button>
              </div>

              {filteredEntries.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Nenhum registro encontrado para este período.</p>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 flex items-start space-x-4"
                    >
                      <div className={`w-3 h-full rounded-l-lg ${moodColors[entry.mood]}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-2xl ${moodColors[entry.mood] ? '' : 'text-gray-400'}`}>{moodEmojis[entry.mood] || '?'}</span>
                          <p className="font-semibold text-lg text-purple-700 dark:text-purple-300">{entry.label}</p>
                          <Button variant="ghost" size="sm" onClick={() => deleteEntry(entry.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(entry.timestamp).toLocaleString('pt-BR')}
                        </p>
                        {entry.trigger && (
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 italic">
                            Gatilho: {entry.trigger}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {entries.length > 0 && (
                 <div className="mt-8 flex justify-end">
                    <Button variant="destructive" onClick={clearAllEntries}>
                        Limpar Histórico Completo
                    </Button>
                 </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default HistoryPage;