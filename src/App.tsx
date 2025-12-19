import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Contacts from './scenes/contacts';
import Invoices from './scenes/invoices';
import Form from './scenes/form';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import BarChart from './scenes/bar';
import PieChart from './scenes/pie';
import LineChart from './scenes/line';
import GeographyChart from './scenes/geography';
import Layout from './scenes/global/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/team" element={<Layout><Team /></Layout>} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
          <Route path="/form" element={<Layout><Form /></Layout>} />
          <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/bar" element={<Layout><BarChart /></Layout>} />
          <Route path="/pie" element={<Layout><PieChart /></Layout>} />
          <Route path="/line" element={<Layout><LineChart /></Layout>} />
          <Route path="/geography" element={<Layout><GeographyChart /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;