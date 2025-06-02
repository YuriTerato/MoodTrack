import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Zap, Wind, Headphones, StretchVertical, MessageCircle } from 'lucide-react';

    const suggestionsData = {
      calm: [
        { title: 'Mantenha a Calma', description: 'Aproveite este momento de tranquilidade. Considere uma breve meditação ou um diário de gratidão.', icon: Zap, link: null, external: false },
        { title: 'Planeje seu Dia', description: 'Use essa clareza para organizar suas próximas tarefas ou atividades relaxantes.', icon: StretchVertical, link: null, external: false },
      ],
      light: [
        { title: 'Respiração Consciente', description: 'Pratique uma respiração lenta e profunda por alguns minutos. Inspire pelo nariz, segure e expire pela boca.', icon: Wind, link: '/breathing-exercise', external: false },
        { title: 'Música Relaxante', description: 'Ouça uma playlist de músicas calmas para aliviar a mente.', icon: Headphones, link: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO', external: true },
        { title: 'Pequena Pausa', description: 'Levante-se, alongue-se ou faça uma caminhada curta para mudar o foco.', icon: StretchVertical, link: null, external: false },
      ],
      moderate: [
        { title: 'Exercício de Respiração 4-7-8', description: 'Inspire por 4s, segure por 7s, expire por 8s. Repita algumas vezes.', icon: Wind, link: '/breathing-exercise', external: false },
        { title: 'Distração Positiva', description: 'Engaje-se em uma atividade que você goste e que possa te distrair por um momento.', icon: Zap, link: null, external: false },
        { title: 'Converse com Alguém', description: 'Compartilhe o que está sentindo com um amigo ou familiar de confiança.', icon: MessageCircle, link: null, external: false },
      ],
      high: [
        { title: 'Técnica de Aterramento (Grounding)', description: 'Nomeie 5 coisas que você vê, 4 que pode tocar, 3 que ouve, 2 que cheira e 1 que pode provar.', icon: Zap, link: null, external: false },
        { title: 'Respiração Diafragmática', description: 'Concentre-se em expandir o abdômen ao inspirar e contrair ao expirar. Veja o tutorial.', icon: Wind, link: '/breathing-exercise', external: false },
        { title: 'Busque um Ambiente Seguro', description: 'Vá para um lugar calmo e seguro onde você possa se sentir mais confortável.', icon: StretchVertical, link: null, external: false },
        { title: 'Considere Apoio', description: 'Se a ansiedade persistir, lembre-se que há opções de apoio profissional.', icon: MessageCircle, link: '/crisis-support', external: false },
      ],
      crisis: [
        { title: 'Foco na Respiração', description: 'Tente controlar sua respiração. Inspire devagar e profundamente, expire lentamente. Use nosso guia.', icon: Wind, link: '/breathing-exercise', external: false },
        { title: 'Procure Ajuda Imediata', description: 'É importante buscar apoio. Use os contatos de emergência.', icon: MessageCircle, link: '/crisis-support', external: false },
        { title: 'Lembre-se: Vai Passar', description: 'Crises de ansiedade são temporárias. Concentre-se em passar por este momento.', icon: Zap, link: null, external: false },
      ],
    };

    const SuggestionsPage = () => {
      const { mood } = useParams();
      const currentSuggestions = suggestionsData[mood] || suggestionsData.light;

      const moodColors = {
        calm: 'from-green-400 to-blue-400',
        light: 'from-yellow-400 to-green-400',
        moderate: 'from-orange-400 to-yellow-400',
        high: 'from-red-500 to-orange-400',
        crisis: 'from-red-600 to-pink-500',
      };
      const currentGradient = moodColors[mood] || moodColors.light;

      return (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 py-8"
        >
          <Card className={`w-full max-w-2xl mx-auto shadow-xl bg-gradient-to-br ${currentGradient} text-white`}>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Sugestões para Você</CardTitle>
              <CardDescription className="text-gray-100">
                Aqui estão algumas técnicas rápidas para ajudar a gerenciar sua ansiedade ({mood}).
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <suggestion.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      <CardTitle className="text-xl text-purple-700 dark:text-purple-300">{suggestion.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {suggestion.link && (
                      suggestion.external ? (
                        <a href={suggestion.link} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                            Acessar Recurso
                          </Button>
                        </a>
                      ) : (
                        <Link to={suggestion.link}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                            Ver Detalhes
                          </Button>
                        </Link>
                      )
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
           <div className="text-center mt-8">
            <Link to="/">
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-gray-700">
                Voltar para Início
              </Button>
            </Link>
          </div>
        </motion.div>
      );
    };

    export default SuggestionsPage;