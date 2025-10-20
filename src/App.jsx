
import React, { useState } from 'react';
import './Login.css';

import Dashboard from './Dashboard';
import ClientForm from './ClientForm';
import EventManager from './EventManager';
import CouponManager from './CouponManager';
import SectorManager from './SectorManager';
import LotManager from './LotManager';
import EventPage from './EventPage';
import PixPaymentPage from './PixPaymentPage';

function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError('');
    const USERNAME = 'teste@paggue.io';
    const PASSWORD = 'teste123';
    if (email === USERNAME && password === PASSWORD) {
      onLoginSuccess(email);
    } else {
      setLoginError('Senha ou usuário incorretos, tente novamente!');
    }
  };

  const togglePasswordVisibility = () => { setShowPassword(!showPassword); };

  return (
    <>
      <div className="login-backdrop"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-header"><h2>Acesse sua Conta</h2></div>
        {loginError && (<div className="error-message">{loginError}</div>)}
        <div className="input-group"><i className="fas fa-user icon"></i><input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="input-group password-group"><i className="fas fa-lock icon"></i><input type={showPassword ? 'text' : 'password'} placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="button" onClick={togglePasswordVisibility} className="toggle-password"><i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i></button></div>
        <button type="submit" className="login-button">Entrar</button>
        <div className="forgot-password"><a href="/reset-password">Esqueceu sua senha?</a></div>
      </form>
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewingEventId, setViewingEventId] = useState(null);

  const [events, setEvents] = useState([{ id: 1, name: 'Show de Rock Clássico', date: '2025-12-25', location: 'Estádio Municipal' }]);
  const [sectors, setSectors] = useState([{ id: 1, name: 'Pista', capacity: '5000' }, { id: 2, name: 'Camarote VIP', capacity: '500' }]);
  const [lots, setLots] = useState([{ id: 1, eventId: 1, sectorId: 1, name: 'Lote 1', price: '100.00', quantity: '1000' }]);
  const [cart, setCart] = useState([]);

  const handleLogin = (email) => { setUser(email); setCurrentView('dashboard'); };
  const handleLogout = () => { setUser(null); };
  
  const navigateTo = (view, id = null) => {
    setCurrentView(view);
    if (view === 'public_event_view') {
      setViewingEventId(id);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userEmail={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'add_client':
        return <ClientForm onBack={() => navigateTo('dashboard')} />;
      case 'events':
        return <EventManager onBack={() => navigateTo('dashboard')} events={events} setEvents={setEvents} onNavigate={navigateTo} />;
      case 'coupons':
        return <CouponManager onBack={() => navigateTo('dashboard')} />;
      case 'sectors':
        return <SectorManager onBack={() => navigateTo('dashboard')} sectors={sectors} setSectors={setSectors} />;
      case 'lots':
        return <LotManager onBack={() => navigateTo('dashboard')} events={events} sectors={sectors} lots={lots} setLots={setLots} />;
      case 'public_event_view':
        const event = events.find(e => e.id === viewingEventId);
        return <EventPage event={event} sectors={sectors} lots={lots} cart={cart} setCart={setCart} onBackToAdmin={() => navigateTo('events')} onNavigate={navigateTo} />;
      case 'pix_payment':
        return <PixPaymentPage cart={cart} lots={lots} onBack={() => navigateTo('public_event_view', viewingEventId)} onPaymentSuccess={() => { setCart([]); alert('Pagamento aprovado! Redirecionando...'); navigateTo('dashboard'); }}/>;
      default:
        return <Dashboard userEmail={user} onLogout={handleLogout} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={`app-container ${user ? 'dashboard-view' : 'login-view'}`}>
      {user ? renderContent() : <LoginScreen onLoginSuccess={handleLogin} />}
    </div>
  );
}