import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Phone, MessageSquare, ShieldAlert, LifeBuoy, Users, MapPin } from 'lucide-react';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from '@/components/ui/alert-dialog';
    import { useToast } from '@/components/ui/use-toast';

    const crisisContacts = [
      { name: 'CVV (Centro de Valorização da Vida)', phone: '188', description: 'Apoio emocional e prevenção do suicídio, disponível 24h.', icon: Phone },
      { name: 'CAPS (Centro de Atenção Psicossocial)', description: 'Procure o CAPS mais próximo para atendimento psicossocial.', icon: LifeBuoy },
    ];

    const socialPsychologists = [
      { name: 'Dra. Ana Silva - Psicologia Acessível', type: 'Online e Presencial', specialty: 'Especialista em ansiedade e estresse.', contactInfo: 'Contato: (XX) XXXXX-XXXX', locationHint: 'Atende na região central e online.' },
      { name: 'Clínica Social Bem Estar', type: 'Presencial', specialty: 'Equipe multidisciplinar com foco em saúde mental comunitária.', contactInfo: 'Agendamentos: (XX) YYYYY-YYYY', locationHint: 'Diversas unidades na cidade - Verifique a mais próxima.' },
      { name: 'PsiAcolher - Terapia para Todos', type: 'Online', specialty: 'Plataforma online com psicólogos com valores sociais.', contactInfo: 'Website: www.psiacolher-ficticio.com.br', locationHint: 'Atendimento online para todo o Brasil.' },
    ];

    const CrisisSupportPage = () => {
      const [showCrisisAlert, setShowCrisisAlert] = useState(false);
      const { toast } = useToast();

      useEffect(() => {
        const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const recentHighAnxiety = entries.filter(entry => 
          new Date(entry.timestamp) >= twoDaysAgo && (entry.mood === 'high' || entry.mood === 'crisis')
        );

        if (recentHighAnxiety.length >= 3) {
          setShowCrisisAlert(true);
          toast({
            title: "Alerta de Bem-Estar",
            description: "Percebemos registros frequentes de ansiedade alta. Considere buscar apoio profissional.",
            variant: "destructive",
            duration: 10000,
          });
        }
      }, [toast]);


      const handleCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
      };

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 py-8 px-4 md:px-0"
        >
          <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 text-white">
            <CardHeader className="text-center">
              <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <CardTitle className="text-4xl font-bold">Apoio em Momentos Difíceis</CardTitle>
              <CardDescription className="text-gray-200 text-lg">
                Você não está sozinha(o). Se precisar de ajuda, aqui estão alguns recursos.
              </CardDescription>
            </CardHeader>
          </Card>

          {showCrisisAlert && (
             <AlertDialog defaultOpen={true} onOpenChange={setShowCrisisAlert}>
              <AlertDialogContent className="bg-white dark:bg-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-600 dark:text-red-400">Atenção Importante</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                    Notamos que você registrou níveis altos de ansiedade ou crise algumas vezes nos últimos dias. 
                    É muito importante cuidar de você. Considere conversar com um profissional de saúde mental.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Entendi</AlertDialogCancel>
                  <AlertDialogAction onClick={() => { /* pode navegar para contatos ou algo assim */ }} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white">Ver Contatos de Apoio</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Contatos de Emergência e Apoio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {crisisContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 flex items-center space-x-4"
                >
                  <contact.icon className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">{contact.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
                  </div>
                  {contact.phone && (
                    <Button onClick={() => handleCall(contact.phone)} className="bg-green-500 hover:bg-green-600 text-white">
                      <Phone size={18} className="mr-2" /> Ligar
                    </Button>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700 dark:text-blue-300 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-500 dark:text-blue-400" />
                Considere Apoio Profissional
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Se a ansiedade persistir, lembre-se que há opções de apoio profissional com valores sociais. Estes são contatos fictícios para ilustração:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {socialPsychologists.map((psy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="p-4 border rounded-lg shadow-sm bg-blue-50 dark:bg-gray-700"
                >
                  <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">{psy.name}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Tipo:</span> {psy.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{psy.specialty}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{psy.contactInfo}</p>
                  <div className="flex items-center mt-2 text-sm text-blue-600 dark:text-blue-400">
                    <MapPin size={16} className="mr-1.5" />
                    <span>{psy.locationHint}</span>
                  </div>
                </motion.div>
              ))}
               <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">
                <MapPin size={18} className="mr-2" /> Encontrar Profissionais Perto de Você (Simulado)
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Chat de Apoio Rápido (Simulado)</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Este é um chatbot simulado para oferecer algumas palavras de conforto. Para apoio real, por favor, use os contatos acima.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg h-64 flex flex-col bg-gray-50 dark:bg-gray-700">
                <div className="flex-grow space-y-2 overflow-y-auto">
                  <div className="flex justify-start">
                    <p className="bg-purple-500 text-white p-3 rounded-lg max-w-xs">Olá! Estou aqui para ouvir. Como você está se sentindo?</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 p-3 rounded-lg max-w-xs">Estou me sentindo muito ansiosa(o)...</p>
                  </div>
                   <div className="flex justify-start">
                    <p className="bg-purple-500 text-white p-3 rounded-lg max-w-xs">Entendo que é um momento difícil. Lembre-se de respirar fundo. Você já tentou alguma técnica de relaxamento hoje?</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <input type="text" placeholder="Digite sua mensagem..." className="flex-grow p-2 border rounded-l-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" disabled />
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg" disabled>Enviar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default CrisisSupportPage;