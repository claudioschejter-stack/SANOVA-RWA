'use client';
import React, { useState } from 'react';

export default function TokenSettlement() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('kyc');
  const [status, setStatus] = useState('AWAITING_PAYMENT'); 
  const [txHash, setTxHash] = useState('');
  
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

  const proyectos = [
    {
      id: 'SNV-ANL-001',
      title: 'Hotel & Hub Comercial Añelo',
      location: 'Vaca Muerta, Neuquén',
      roi: '12.5%',
      fiscal: 'Ley 19.640 (Exento)',
      type: 'Desarrollo Escala',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
      desc: 'Complejo hotelero de 200 habitaciones y centro comercial estratégico sobre el corredor energético.'
    },
    {
      id: 'SNV-TLH-002',
      title: 'Residencias Premium Tolhuin',
      location: 'Tierra del Fuego',
      roi: '11.0%',
      fiscal: 'Ley 19.640 (100% Beneficio)',
      type: 'Ecoturismo RWA',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
      desc: 'Módulos habitacionales premium de alta eficiencia térmica integrados al entorno natural.'
    },
    {
      id: 'SNV-MDZ-003',
      title: 'Finca Tokenizada Mendoza',
      location: 'Valle de Uco, Mendoza',
      roi: '14.2%',
      fiscal: 'Optimización Estructurada',
      type: 'Agro-Real Estate',
      image: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=600&q=80',
      desc: 'Fraccionamiento de viñedos exclusivos con bodega boutique y alta demanda de exportación.'
    }
  ];

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.declaration && formData.walletAddress) {
      setKycSubmitted(true);
    }
  };

  const simularPagoDetectado = () => {
    setStatus('DETECTED');
    setTxHash('0x3ba76c8db7417e13295963b516823c914bf4087b3a1d2938fd8a99479e0018ac');
  };
  
  const simularPagoExitoso = () => {
    setStatus('SUCCESS');
  };
  
  const reiniciarSimulador = () => {
    setStatus('AWAITING_PAYMENT');
    setTxHash('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 space-y-16 flex flex-col items-center">
      
      {/* BRAND HEADER */}
      <div className="w-full max-w-6xl text-center space-y-3 pt-6">
        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Sanova Global SAS</span>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight uppercase">Real World Asset <span className="font-bold text-emerald-500 block md:inline">Marketplace</span></h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto font-mono">Tokenización corporativa e inmobiliaria bajo el amparo de la Ley 19.640.</p>
      </div>

      {/* CATÁLOGO CON FOTOS */}
      <div className="w-full max-w-6xl space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">📂 Portafolio de Activos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proyectos.map((p) => (
            <div 
              key={p.id} 
              className={`bg-[#0F0F0F] border rounded-3xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedProject === p.title ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-white/5 hover:border-white/10'
              }`}
              onClick={() => setSelectedProject(p.title)}
            >
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover opacity-60 transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <span className="text-[9px] font-mono text-gray-400">{p.id}</span>
                </div>
                <div className="absolute top-4 right-4 bg-emerald-500/90 text-black text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {p.type}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent"></div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight text-white">{p.title}</h4>
                  <p className="text-xs text-emerald-400 font-mono">📍 {p.location}</p>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1 font-sans">{p.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <p className="text-[8px] text-gray-500 uppercase font-bold mb-0.5">Rendimiento</p>
                    <p className="text-base font-mono font-bold text-emerald-400">{p.roi}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl overflow-hidden">
                    <p className="text-[8px] text-gray-500 uppercase font-bold mb-0.5">Estructura</p>
                    <p className="text-[10px] font-mono font-bold text-white uppercase truncate" title={p.fiscal}>{p.fiscal}</p>
                  </div>
                </div>

                <button 
                  className={`w-full mt-6 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl border transition-all ${
                    selectedProject === p.title 
                    ? 'bg-emerald-500 text-black border-transparent shadow-lg' 
                    : 'bg-white/5 text-white border-white/5 hover:bg-white/10'
                  }`}
                >
                  {selectedProject === p.title ? 'Terminal Seleccionada ✓' : 'Seleccionar Activo'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TERMINAL DE PAGO Y CUMPLIMIENTO */}
      {selectedProject && (
        <div className="w-full max-w-[480px] space-y-6 pt-8 border-t border-dashed border-white/10">
          
          <div className="text-center">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Ejecución de Contrato para</span>
            <h3 className="text-lg font-bold text-emerald-400 font-mono mt-1">{selectedProject}</h3>
          </div>

          <div className="w-full bg-[#0F0F0F] p-1.5 border border-white/5 rounded-2xl flex gap-1">
            <button 
              type="button"
              onClick={() => setActiveTab('kyc')}
              className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                activeTab === 'kyc' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              1. Registro & KYC
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('payment')}
              className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                activeTab === 'payment' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              2. Terminal de Pago
            </button>
          </div>

          <div className="w-full bg-[#0F0F0F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            
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
                    <button type="button" onClick={() => setKycSubmitted(false)} className="text-[10px] text-gray-500 hover:text-gray-400 underline block mx-auto pt-4">
                      Editar Formulario
                    </button>
                  </div>
                )}
              </div>
            )}

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
                    <div className="p-6 border border-blue-500/20 bg-blue-500/[0.02] rounded-2xl text-center