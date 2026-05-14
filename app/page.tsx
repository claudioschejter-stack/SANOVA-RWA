'use client';
import React, { useState } from 'react';

export default function TokenSettlement() {
  const [activeTab, setActiveTab] = useState('kyc'); // Tabs: kyc, payment
  const [status, setStatus] = useState('AWAITING_PAYMENT'); 
  const [txHash, setTxHash] = useState('');
  
  // Estado del Formulario KYC
  const [formData, setFormData] = useState({
    fullName: '',
    cuit: '',
    email: '',
    investorType: 'retail',
    walletAddress: '',
    declaration: false
  });
  const [kycSubmitted, setKycSubmitted] = useState(false);

  const ticketPrice = 50;
  const tokens = 10;

  // Manejo de cambios en el formulario
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.declaration && formData.walletAddress) {
      setKycSubmitted(true);
    }
  };

  // Funciones del simulador de Webhook
  const simularPagoDetectado = () => {
    setStatus('DETECTED');
    setTxHash('0x3ba76c8db7417e13295963b516823c914bf4087b3a1d2938fd8a99479e0018ac');
  };
  const simularPagoExitoso = () => setStatus('SUCCESS');
  const reiniciarSimulador = () => { setStatus('AWAITING_PAYMENT'); setTxHash(''); };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-6 gap-6">
      
      {/* NAVEGACIÓN INSTITUCIONAL */}
      <div className="w-full max-w-[480px] bg-[#0F0F0F] p-1.5 border border-white/5 rounded-2xl flex gap-1">
        <button 
          onClick={() => setActiveTab('kyc')}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
            activeTab === 'kyc' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          1. Registro & KYC
        </button>
        <button 
          onClick={() => setActiveTab('payment')}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
            activeTab === 'payment' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          2. Terminal de Pago
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full max-w-[480px] bg-[#0F0F0F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* TAB 1: FORMULARIO KYC / ADMISIÓN */}
        {activeTab === 'kyc' && (
          <div>
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Compliance Protocol</span>
              <h2 className="text-2xl font-light text-white tracking-tight uppercase mt-2">Admisión <span className="font-bold text-emerald-500">Whitelist</span></h2>
              <p className="text-[11px] text-gray-500 mt-1 font-sans">Registro obligatorio para operar bajo el marco fiduciario de la Ley 19.640.</p>
            </div>

            {!kycSubmitted ? (
              <form onSubmit={handleKycSubmit} className="p-8 space-y-5">
                <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1.5">Nombre Completo / Razón Social</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="Ej: Juan Pérez o Inversiones S.A." className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1.5">CUIT / CUIL</label>
                    <input required name="cuit" value={formData.cuit} onChange={handleInputChange} type="text" placeholder="30-XXXXXXXX-0" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1.5">Perfil de Inversor</label>
                    <select name="investorType" value={formData.investorType} onChange={handleInputChange} className="w-full bg-[#141414] border border-white/10 rounded-xl px-3 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all">
                      <option value="retail">Minorista / Privado</option>
                      <option value="qualified">Calificado / Advisor</option>
                      <option value="institutional">Fondo Institucional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1.5">Email de Contacto</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="inversor@link.com" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all" />
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1.5">Dirección de Wallet Destino (Polygon/Base)</label>
                  <input required name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} type="text" placeholder="0x..." className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500/50 transition-all" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input required name="declaration" checked={formData.declaration} onChange={handleInputChange} type="checkbox" className="mt-0.5 accent-emerald-500" />
                  <span className="text-[10px] text-gray-500 leading-relaxed">
                    Declaro bajo juramento que los fondos provienen de actividades lícitas y acepto los términos fiduciarios de Sanova Global SAS.
                  </span>
                </label>

                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all mt-4">
                  Enviar para Auditoría Legal
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h3 className="text-white text-base font-bold uppercase tracking-wider">Solicitud Recibida</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed max-w-[320px] mx-auto">
                  Los datos de la wallet <span className="text-emerald-400 font-mono">{formData.walletAddress.slice(0,6)}...{formData.walletAddress.slice(-4)}</span> están siendo auditados por el oficial de cumplimiento. Recibirás la aprobación en tu mail <span className="text-gray-300 font-mono">{formData.email}</span>.
                </p>
                <button onClick={() => setKycSubmitted(false)} className="text-[10px] text-gray-500 hover:text-gray-400 underline block mx-auto pt-4">
                  Editar Formulario
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TERMINAL DE PAGO (El módulo que ya tenías) */}
        {activeTab === 'payment' && (
          <div>
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Settlement Phase</span>
                <span className="text-[10px] font-mono text-gray-500">ID: SNV-ANL-001</span>
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight uppercase">Terminal de <span className="font-bold text-emerald-500">Pago</span></h2>
            </div>

            <div className="p-8 space-y-8">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Monto a Enviar</p>
                  <p className="text-2xl font-mono font-bold text-white">${tokens * ticketPrice} <span className="text-xs text-gray-500">USDT</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Red sugerida</p>
                  <p className="text-sm font-mono text-emerald-500 font-bold">Polygon (PoS)</p>
                </div>
              </div>

              {status === 'AWAITING_PAYMENT' && (
                <div className="p-6 border border-amber-500/20 bg-amber-500/[0.02] rounded-2xl text-center space-y-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping mx-auto"></div>
                  <p className="text-xs text-amber-400 font-mono uppercase tracking-wider">Esperando depósito on-chain...</p>
                </div>
              )}

              {status === 'DETECTED' && (
                <div className="p-6 border border-blue-500/20 bg-blue-500/[0.02] rounded-2xl text-center space-y-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mx-auto"></div>
                  <p className="text-xs text-blue-400 font-mono uppercase tracking-wider">¡Pago Detectado en Bloque!</p>
                  <p className="text-[9px] font-mono text-gray-500 truncate">Hash: {txHash}</p>
                </div>
              )}

              {status === 'SUCCESS' && (
                <div className="p-6 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-2xl text-center space-y-3">
                  <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-xs font-bold">✓</div>
                  <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Inversión Consolidada</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-6 bg-black border-t border-white/5 text-center">
          <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">Sanova Global Ledger Node v1.0</span>
        </div>
      </div>

      {/* PANEL DE CONTROL DE ADMINISTRADOR */}
      {activeTab === 'payment' && (
        <div className="w-full max-w-[480px] bg-[#141414] border border-dashed border-white/10 rounded-2xl p-6 space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">⚙️ Panel de Simulación (Sanova Admin)</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={simularPagoDetectado} className="py-2.5 px-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[10px] font-bold rounded-xl border border-blue-500/20 transition-all">1. Detectar</button>
            <button onClick={simularPagoExitoso} disabled={status !== 'DETECTED'} className={`py-2.5 px-2 text-[10px] font-bold rounded-xl border transition-all ${status === 'DETECTED' ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-600 border-transparent cursor-not-allowed'}`}>2. Confirmar</button>
            <button onClick={reiniciarSimulador} className="py-2.5 px-2 bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-bold rounded-xl border border-white/5 transition-all">Reiniciar</button>
          </div>
        </div>
      )}

    </div>
  );
}