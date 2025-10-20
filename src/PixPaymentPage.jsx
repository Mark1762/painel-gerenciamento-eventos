import React, { useState, useEffect, useMemo } from 'react';
import './PixPaymentPage.css';

export default function PixPaymentPage({ cart, lots, onBack, onPaymentSuccess }) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending | paid
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setPaymentStatus('paid'), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (paymentStatus === 'paid') {
      const redirectTimer = setTimeout(() => onPaymentSuccess(), 3000);
      return () => clearTimeout(redirectTimer);
    }
  }, [paymentStatus, onPaymentSuccess]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const lot = lots.find(l => l.id === item.lotId);
      return total + (lot.price * item.quantity);
    }, 0);
  }, [cart, lots]);

  const pixCode = `00020126580014br.gov.bcb.pix0136a6a1258d-ca3c-4b6a-9118-4503527968b2520400005303986540${cartTotal.toFixed(2).replace('.', '')}5802BR5913NOME_VENDEDOR6008BRASILIA62070503***6304E3B2`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Falha.');
    });
  };

  return (
    <div className="pix-payment-container">
      <div className="pix-card">
        <button onClick={onBack} className="back-button-pix" title="Voltar">‹</button>
        <h1>Finalize seu Pagamento</h1>
        <p>Pague <strong>R$ {cartTotal.toFixed(2)}</strong> para confirmar sua compra.</p>

        {paymentStatus === 'pending' && (
          <div className="pix-details">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`} alt="QR Code PIX" />
            <p>1. Abra o app do seu banco e escaneie o código.</p>
            <p>2. Ou use o PIX Copia e Cola:</p>
            <div className="copy-paste-area">
              <input type="text" readOnly value={pixCode} />
              <button onClick={handleCopy}>{copySuccess || 'Copiar'}</button>
            </div>
            <div className="status-pending">
              <div className="spinner"></div>
              Aguardando pagamento...
            </div>
          </div>
        )}

        {paymentStatus === 'paid' && (
          <div className="status-paid">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1.5 14.5l-4-4 1.41-1.41L10.5 13.67l6.09-6.09L18 9l-7.5 7.5z" fill="#28a745"></path> </g></svg>
            <h2>Pagamento Aprovado!</h2>
            <p>Seus ingressos foram enviados para o seu e-mail.</p>
          </div>
        )}
      </div>
    </div>
  );
}