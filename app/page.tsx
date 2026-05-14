'use client';
import React, { useState } from 'react';

export default function SanovaPlatform() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dataroom'); // dataroom, kyc, payment
  const [status, setStatus] = useState('AWAITING_PAYMENT'); 
  const [txHash, setTxHash] = useState('');
  
  // Estado KYC
  const [formData, setFormData] = useState({
    fullName: '', cuit: '', email: '', investorType: 'retail', walletAddress: '', declaration: false
  });
  const [kycSubmitted, setKycSubmitted] = useState(false);

  const ticketPrice = 50;
  const tokens = 10;

  // Proyectos del catálogo original
  const proyectos = [
    {
      id: 'SNV-ANL-001',
      title: 'Hotel & Hub Comercial Añelo',
      location: 'Vaca Muerta, Neuquén',
      roi: '12.5%',
      fiscal: 'Ley 19.640 (Exento)',
      type: 'Desarrollo Escala',
      bg: 'from-emerald-500/20 to-transparent'
    },
    {
      id: 'SNV-TLH-002',
      title: 'Residencias Premium Tolhuin',
      location: 'Tierra del Fuego',
      roi: '11.0%',
      fiscal: 'Ley 19.640 (100% Beneficio)',
      type: 'Ecoturismo RWA',
      bg: 'from-blue-500/20 to-transparent'
    },
    {
      id: 'SNV-MDZ-003',
      title: 'Finca Tokenizada Mendoza',
      location: 'Valle de Uco, Mendoza',
      roi: '14.2%',
      fiscal: 'Optimización Estructurada',
      type: 'Agro-Real Estate',
      bg: 'from-purple-500/20 to-transparent'
    }
  ];

  const simularPagoDetectado = () => { setStatus('DETECTED'); setTxHash('0x3ba76c8db7417e13295963b516823c914bf4087b3a1d2938fd8a99479e0018ac'); };
  const simularPagoExitoso = () => setStatus('SUCCESS');
  const reiniciarSimulador = () => { setStatus('AWAITING_PAYMENT'); setTxHash(''); };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 space-y-12 flex flex-col items-center">
      
      {/* HEADER DE LA COMPAÑÍA */}
      <div className="w-full max-w-5xl text-center space-y-3 pt-6">
        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Sanova Global SAS</span>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase">Real World Asset <span className="font-bold text-emerald-500 block md:inline">Marketplace</span></h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto font-mono">Infraestructura Blockchain para la tokenización de activos inmobiliarios y corporativos de alta eficiencia.</p>
      </div>

      {/* --- SECCIÓN 1: CATÁLOGO DE TOKENS (Tu Landing original) --- */}
      <div className="w-full max-w-5xl space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">📂 Activos Disponibles para Suscripción</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div key={p.id} className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between p-6 hover:border-emerald-500/20 transition-all group shadow-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-gray-500">{p.id}</span>
                  <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/10 font-bold uppercase">{p.type}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">📍 {p.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-white/[0.01] p-2.5 rounded-xl border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase font-black">Rendimiento</p>
                    <p className="text-sm font-mono font-bold text-emerald-400">{p.roi} anual</p>
                  </div>
                  <div className="bg-white/[0.01] p-2.5 rounded-xl border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase font-black">Fiscalidad</p>
                    <p className="text-[9px] font-mono font-bold truncate text-white" title={p.fiscal}>{p.fiscal}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedProject(p.title); setActiveTab('dataroom'); }}
                className="w-full mt-6 bg-white/5 hover:bg-emerald-500 hover:text-black text-[11px] font-bold uppercase tracking-wider py-3 rounded-xl border border-white/5 hover:border-transparent transition-all"
              >
                Analizar Liquidación →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN 2: TERMINAL DE PROCESAMIENTO MODULAR (Lo nuevo que construimos) --- */}
      {selectedProject && (
        <div className="w-full max-w-[540px] space-y-6 pt-6 border-t border-dashed border-white/10 animate-fade-in">
          
          <div className="text-center">
            <p className="text-[10px] font-mono text-gray-500 uppercase">Terminal de Operaciones para:</p>
            <h3 className="text-lg font-bold text-emerald-400">{selectedProject}</h3>
          </div>

          {/* NAVEGACIÓN DE LA TERMINAL */}
          <div className="bg-[#0F0F0F] p-1.5 border border-white/5 rounded-2xl flex gap-1">
            <button onClick={() => setActiveTab('dataroom')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'dataroom' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500'}`}>🔍 Data Room</button>
            <button onClick={() => setActiveTab('kyc')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'kyc' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500'}`}>📋 1. KYC</button>
            <button onClick={() => setActiveTab('payment')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'payment' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500'}`}>⚡ 2. Pago</button>
          </div>

          {/* CUERPO DE LA TERMINAL */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {activeTab === 'dataroom' && (
              <div className="p-8 space-y-6">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block">Dossier de Inversión</span>
                <p className="text-xs text-gray-400 leading-relaxed">Estás auditando el flujo financiero del fideicomiso. El activo se distribuye de forma directa mediante Smart Contracts en la red elegida.</p>
                <div className="space-y-2 text-xs font-mono bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between"><span className="text-gray-500">Distribución:</span><span className="text-emerald-400 font-bold">Mensual (USDT)</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Jurisdicción:</span><span className="text-white">Tierra del Fuego (Ley 19.640)</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Estructura Legal:</span><span className="text-white font-bold">Sanova Global SAS</span></div>
                </div>
                <button onClick={() => setActiveTab('kyc')} className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all">Siguiente: Validar KYC →</button>
              </div>
            )}

            {activeTab === 'kyc' && (
              <div className="p-8 space-y-4">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block">Compliance Protocol</span>
                {!kycSubmitted ? (
                  <div className="space-y-4">
                    <input type="text" placeholder="Nombre Completo / Razón Social" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white" />
                    <input type="text" placeholder="CUIT (30-XXXXXXXX-0)" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white" />
                    <input type="text" placeholder="Wallet Destino (0x...)" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-emerald-400" />
                    <button onClick={() => setKycSubmitted(true)} className="w-full bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all">Enviar para Auditoría Legal</button>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <p className="text-xs text-emerald-400 font-bold">✓ Datos Auditados con éxito</p>
                    <button onClick={() => setActiveTab('payment')} className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest py-3 rounded-xl">Ir a la Terminal de Pago</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="p-8 space-y-6">
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex justify-between items-center">
                  <div><p className="text-[8px] text-gray-500 uppercase font-bold">Total Liquidación</p><p className="text-xl font-mono font-bold">${tokens * ticketPrice} USDT</p></div>
                  <div className="text-right"><p className="text-[8px] text-gray-500 uppercase font-bold">Red</p><p className="text-xs font-mono text-emerald-500 font-bold">Polygon</p></div>
                </div>
                {status === 'AWAITING_PAYMENT' && <div className="p-5 border border-amber-500/20 bg-amber-500/[0.02] rounded-xl text-center text-xs text-amber-400 font-mono animate-pulse">Esperando depósito on-chain...</div>}
                {status === 'DETECTED' && <div className="p-5 border border-blue-500/20 bg-blue-500/[0.02] rounded-xl text-center text-xs text-blue-400 font-mono">¡Pago Detectado! Procesando emisión fiduciaria...</div>}
                {status === 'SUCCESS' && <div className="p-5 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-xl text-center text-xs text-emerald-400 font-mono">✓ Inversión Consolidada. Tokens asignados.</div>}
              </div>
            )}
          </div>

          {/* PANEL DE CONTROL DE ADMINISTRADOR */}
          {activeTab === 'payment' && (
            <div className="bg-[#141414] border border-dashed border-white/10 rounded-2xl p-4 space-y-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">⚙️ Panel de Simulación Webhook</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={simularPagoDetectado} className="py-2 bg-blue-600/20 text-blue-400 text-[10px] font-bold rounded-lg border border-blue-500/20">1. Detectar</button>
                <button onClick={simularPagoExitoso} disabled={status !== 'DETECTED'} className="py-2 bg-emerald-600/20 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20 disabled:opacity-20">2. Confirmar</button>
                <button onClick={reiniciarSimulador} className="py-2 bg-white/5 text-gray-400 text-[10px] font-bold rounded-lg">Reiniciar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}