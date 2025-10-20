
import React, { useState } from 'react';
import './ClientForm.css'; 

export default function ClientForm({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    cpfCnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do cliente para salvar:', formData);
    alert('Cliente salvo com sucesso ✔️');
    onBack(); 
  };

  return (
    <div className="client-form-container">
      <header className="client-form-header">
        <h1>Cadastro de Cliente</h1>
        <button onClick={onBack} className="back-button">
          <i className="fas fa-arrow-left"></i> Voltar
        </button>
      </header>
      <form onSubmit={handleSubmit} className="client-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome Completo" required />
        <input name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} placeholder="CPF ou CNPJ" required />
        <input name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} placeholder="Razão Social" />
        <input name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} placeholder="Nome Fantasia" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit" className="save-button">Salvar Cliente</button>
      </form>
    </div>
  );
}