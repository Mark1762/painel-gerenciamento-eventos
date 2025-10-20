import React, { useState } from 'react';
import './CouponManager.css'; 

export default function CouponManager({ onBack }) {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'PROMO10', discountType: 'percentage', value: 10, quantity: 50, expiryDate: '2025-12-31' }
  ]);

  const [couponFormData, setCouponFormData] = useState({
    code: '',
    discountType: 'percentage', 
    value: '',
    quantity: '',
    expiryDate: ''
  });

  const [editingCouponId, setEditingCouponId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!couponFormData.code || !couponFormData.value) {
      alert('Código e Valor do Desconto são obrigatórios!');
      return;
    }

    if (editingCouponId) {
      setCoupons(coupons.map(c => c.id === editingCouponId ? { ...couponFormData, id: editingCouponId } : c));
    } else {
      setCoupons([...coupons, { ...couponFormData, id: Date.now() }]);
    }
    handleCancelEdit(); 
  };

  const handleEditClick = (coupon) => {
    setEditingCouponId(coupon.id);
    setCouponFormData(coupon);
  };

  const handleDeleteCoupon = (couponId) => {
    if (!window.confirm('Tem certeza que deseja excluir este cupom?')) return;
    setCoupons(coupons.filter(c => c.id !== couponId));
  };
  
  const handleCancelEdit = () => {
    setEditingCouponId(null);
    setCouponFormData({ code: '', discountType: 'percentage', value: '', quantity: '', expiryDate: '' });
  };

  return (
    <div className="coupon-manager-container">
      <header className="manager-header">
        <h1>Gerenciar Cupons</h1>
        <button onClick={onBack} className="back-button">
          <i className="fas fa-arrow-left"></i> Voltar
        </button>
      </header>

      <div className="form-section card">
        <h2>{editingCouponId ? 'Editar Cupom' : 'Adicionar Novo Cupom'}</h2>
        <form onSubmit={handleFormSubmit} className="manager-form coupon-form">
          <input type="text" name="code" value={couponFormData.code} onChange={handleInputChange} placeholder="Código do Cupom (ex: PROMO10)" />
          <select name="discountType" value={couponFormData.discountType} onChange={handleInputChange}>
            <option value="percentage">Porcentagem (%)</option>
            <option value="fixed">Valor Fixo (R$)</option>
          </select>
          <input type="number" name="value" value={couponFormData.value} onChange={handleInputChange} placeholder="Valor do Desconto" />
          <input type="number" name="quantity" value={couponFormData.quantity} onChange={handleInputChange} placeholder="Quantidade (opcional)" />
          <input type="date" name="expiryDate" value={couponFormData.expiryDate} onChange={handleInputChange} />
          <div className="form-buttons">
            <button type="submit" className="save-button">{editingCouponId ? 'Atualizar' : 'Salvar'}</button>
            {editingCouponId && <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="list-section card">
        <h2>Cupons Cadastrados</h2>
        <div className="item-list">
          {coupons.map(coupon => (
            <div key={coupon.id} className="item-card">
              <div className="item-details">
                <strong>{coupon.code}</strong>
                <p>
                  Desconto: {coupon.discountType === 'percentage' ? `${coupon.value}%` : `R$ ${coupon.value}`}
                </p>
                <p>
                  {coupon.quantity && `Quantidade: ${coupon.quantity} | `}
                  {coupon.expiryDate && `Validade: ${new Date(coupon.expiryDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}`}
                </p>
              </div>
              <div className="item-actions">
                <button className="action-button edit-button" onClick={() => handleEditClick(coupon)}><i className="fas fa-pencil-alt"></i></button>
                <button className="action-button delete-button" onClick={() => handleDeleteCoupon(coupon.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}