
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientPage from './pages/ClientPage';
import ClientDashboard from './pages/ClientDashboard';
import SupportPage from './pages/SupportPage';
import FeedbackPage from './pages/FeedbackPage';
import FeedbackTopicPage from './pages/FeedbackTopicPage';
import AdminSupportPage from './pages/AdminSupportPage';
import SettingsPage from './pages/SettingsPage';
import VetLoginPage from './pages/VetLoginPage';
import VetRegisterPage from './pages/VetRegisterPage';
import InboxPage from './pages/InboxPage';

// Import the new vet pages
import VetDashboardPage from './pages/VetDashboardPage';
import VetAppointmentsPage from './pages/VetAppointmentsPage';
import EditAppointmentPage from './pages/EditAppointmentPage';
import CancelAppointmentPage from './pages/CancelAppointmentPage';
import RegisterPetPage from './pages/RegisterPetPage'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/consultas" element={<ClientDashboard />} />
        <Route path="/suporte" element={<SupportPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/feedback/:id" element={<FeedbackTopicPage />} />
        <Route path="/admin/suporte" element={<AdminSupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/vet/login" element={<VetLoginPage />} />
        <Route path="/vet/register" element={<VetRegisterPage />} />
        <Route path="/inbox" element={<InboxPage />} />

        {/* New Vet Routes */}
        <Route path="/vet/dashboard" element={<VetDashboardPage />} />
        <Route path="/vet" element={<VetDashboardPage />} /> {/* Added for consistency */}
        <Route path="/vet/appointments" element={<VetAppointmentsPage />} />
        <Route path="/vet/appointments/edit/:id" element={<EditAppointmentPage />} />
        <Route path="/vet/appointments/cancel/:id" element={<CancelAppointmentPage />} />
        <Route path="/vet/register-pet" element={<RegisterPetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
