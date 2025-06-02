import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import HomePage from '@/pages/HomePage';
    import SuggestionsPage from '@/pages/SuggestionsPage';
    import HistoryPage from '@/pages/HistoryPage';
    import CrisisSupportPage from '@/pages/CrisisSupportPage';
    import BreathingExercisePage from '@/pages/BreathingExercisePage';
    import Layout from '@/components/Layout';

    function App() {
      return (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/suggestions/:mood" element={<SuggestionsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/crisis-support" element={<CrisisSupportPage />} />
              <Route path="/breathing-exercise" element={<BreathingExercisePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      );
    }

    export default App;