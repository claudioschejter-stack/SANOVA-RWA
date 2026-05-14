'use client';
import React, { useState } from 'react';

// ICONOS SVG
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [showLegal, setShowLegal] = useState<string | null>(null);
  const [activeGateway, setActiveGateway] = useState<string | null>(null);
  const [paymentCurrency, setPaymentCurrency] = useState<'USD' | 'ARS' | 'USDT'>('USD');
  const [tokenAmount, setTokenAmount] = useState<number>(1);

  // Tasa de cambio simulada (Dólar Financiero/CCL)
  const usdToArsRate = 1250;

  const assets = [
    {
      id: "SNV-ANL-VACA-001",
      name: "ENERGY HUB AÑELO I",
      location: "NEUQUÉN, ARGENTINA",
      mapUrl: "https://maps.google.com/?q=Añelo+Neuquen+Argentina",
      yield: "11.64%",
      price: 50.00,
      funded: 72,
      category: "INDUSTRIAL INFRASTRUCTURE",
      img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
      ltv: "60%",
      docs: [
        { name: "Fideicomiso Ley 19.640", url: "https://sanovaglobal.com/legal/trust-anl-001.pdf" },
        { name: "Título de Propiedad Digital", url: "https://sanovaglobal.com/legal/title-anl-001.pdf" }
      ]
    },
    {
      id: "SNV-MDZ-URB-002",
      name: "MENDOZA RESIDENTIAL",
      location: "MENDOZA, ARGENTINA",
      mapUrl: "https://maps.google.com/?q=Mendoza+Argentina",
      yield: "14.20%",
      price: 100.00,
      funded: 45,
      category: "URBAN DEVELOPMENT",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      ltv: "50%",
      docs: [
        { name: "Escritura Traslativa de Dominio", url: "https://sanovaglobal.com/legal/deed-mdz-002.pdf" },
        { name: "Reglamento de Copropiedad", url: "https://sanovaglobal.com/legal/rules-mdz-002.pdf" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E5E5] font-sans antialiased">
      
      {/* HEADER CORPORATIVO */}
      <nav className="border-b border-white/10 bg-[#050505] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-12 h-24 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium tracking-[0.5em] text-white uppercase leading-none">SANOVA GLOBAL</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[1px] w-8 bg-emerald-500"></div>
              <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.4em]">Digital Assets Management</span>
            </div>
          </div>
          <div className="flex gap-8">
            {['Marketplace', 'Lending', 'Compliance'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === tab.toLowerCase() ? 'text-emerald-500' : 'text-gray-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-12 py-20">
        
        <header className="mb-16">
          <h2 className="text-5xl font-light tracking-tighter text-emerald-500 uppercase">
            {activeTab === 'compliance' ? 'Institutional Compliance' : 'Asset Portfolio'}
          </h2>
          <div className="h-[1px] w-full bg-white/5 mt-8"></div>
        </header>

        {activeTab === 'marketplace' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {assets.map((asset) => {
              const isGatewayOpen = activeGateway === asset.id;
              const totalUsd = asset.price * tokenAmount;
              const totalArs = totalUsd * usdToArsRate;

              return (
                <div key={asset.id} className="flex flex-col bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 relative">
                  
                  {/* IMAGEN */}
                  <div className="h-[240px] relative overflow-hidden bg-black text-white">
                    <img src={asset.img} alt={asset.name} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[8px] font-bold text-gray-400 uppercase tracking-widest rounded-sm">
                        {asset.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENIDO DE LA TARJETA */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex flex-col mb-6 min-h-[150px] border-b border-white/5">
                      <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-2 leading-tight">{asset.name}</h3>
                      
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{asset.location}</p>
                        <a href={asset.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
                          <MapPinIcon /> Mapa
                        </a>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="bg-emerald-600 w-fit px-4 py-1.5 rounded-md border border-emerald-400/20 shadow-md">
                          <span className="text-white text-xs font-mono font-black tracking-widest uppercase">{asset.id}</span>
                        </div>
                        
                        <button 
                          onClick={() => { setShowLegal(showLegal === asset.id ? null : asset.id); setActiveGateway(null); }}
                          className={`flex items-center gap-2 text-[9px] font-bold uppercase transition-colors ${showLegal === asset.id ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'}`}
                        >
                          <FileTextIcon /> {showLegal === asset.id ? 'Cerrar Doc' : 'Legal'}
                        </button>
                      </div>
                    </div>

                    {/* SECCIÓN DOCUMENTAL */}
                    {showLegal === asset.id && (
                      <div className="bg-black/95 p-4 rounded-xl mb-6 border border-emerald-500/30">
                         <div className="space-y-2">
                            {asset.docs.map((doc, index) => (
                              <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[10px] text-gray-300 bg-white/[0.02] border border-white/5 p-3 rounded hover:bg-emerald-500/10 transition-all group">
                                 <span>{doc.name}</span>
                                 <DownloadIcon />
                              </a>
                            ))}
                         </div>
                      </div>
                    )}

                    {/* PASARELA DE PAGO MULTIMONEDA INTERNA */}
                    {isGatewayOpen && (
                      <div className="bg-black/95 p-5 rounded-xl mb-6 border border-emerald-500/30 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Orden de Compra</span>
                          <button onClick={() => setActiveGateway(null)} className="text-[9px] text-gray-500 hover:text-white uppercase">Cancelar</button>
                        </div>
                        
                        {/* Selector de Moneda */}
                        <div className="grid grid-cols-3 gap-2 bg-white/[0.02] p-1 rounded-lg border border-white/5">
                          {(['USD', 'ARS', 'USDT'] as const).map((curr) => (
                            <button
                              key={curr}
                              onClick={() => setPaymentCurrency(curr)}
                              className={`py-1.5 text-[9px] font-bold rounded uppercase transition-all ${paymentCurrency === curr ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                              {curr}
                            </button>
                          ))}
                        </div>

                        {/* Selector de Cantidad */}
                        <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/5">
                          <span className="text-[10px] text-gray-400 uppercase">Tokens</span>
                          <input 
                            type="number" 
                            value={tokenAmount} 
                            onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 bg-black text-right text-white font-mono font-bold text-xs outline-none border border-white/10 rounded px-2 py-0.5"
                          />
                        </div>

                        {/* Total a Liquidar */}
                        <div className="bg-white/[0.01] p-3 rounded-lg border border-white/5 flex justify-between items-center">
                          <span className="text-[10px] text-gray-400 uppercase">Total Liquidador:</span>
                          <span className="text-sm font-mono font-bold text-white">
                            {paymentCurrency === 'USD' && `$${totalUsd.toLocaleString()}`}
                            {paymentCurrency === 'USDT' && `${totalUsd.toLocaleString()} USDT`}
                            {paymentCurrency === 'ARS' && `$${totalArs.toLocaleString()} ARS`}
                          </span>
                        </div>

                        <button className="w-full bg-emerald-600 text-white py-3 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all">
                          Confirmar Transferencia
                        </button>
                      </div>
                    )}

                    {/* DATOS FINANCIEROS */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/[0.01] py-4 px-2 rounded-xl border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold italic">Expected Yield</p>
                        <p className="text-xl font-light text-emerald-500 tracking-tighter">{asset.yield}</p>
                      </div>
                      <div className="bg-white/[0.01] py-4 px-2 rounded-xl border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold italic">Token Price</p>
                        <p className="text-xl font-light text-white tracking-tighter">${asset.price.toFixed(0)} USD</p>
                      </div>
                    </div>

                    {/* BOTÓN DE ACCIÓN (Abre o ejecuta el Gateway) */}
                    {!isGatewayOpen ? (
                      <button 
                        onClick={() => { setActiveGateway(asset.id); setShowLegal(null); }}
                        className="mt-auto w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        Invest Now <ArrowIcon />
                      </button>
                    ) : (
                      <div className="h-[48px] mt-auto"></div> // Mantiene el espacio idéntico para que no se mueva la tarjeta
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'compliance' && (
           <div className="max-w-4xl mx-auto space-y-12">
              <section className="bg-[#0F0F0F] p-10 rounded-2xl border border-white/5">
                 <h4 className="text-emerald-500 font-bold uppercase tracking-[0.3em] mb-6">Régimen Fiduciario - Ley 19.640</h4>
                 <p className="text-sm text-gray-400 leading-relaxed">
                    SANOVA GLOBAL opera bajo estructuras de fideicomisos de administración y garantía corporativa. Las exenciones de la Ley 19.640 blindan el rendimiento neto. Toda la documentación expuesta en el marketplace cuenta con firma digital y está registrada ante los organismos competentes, asegurando un colateral real verificable en blockchain con auditoría cruzada.
                 </p>
              </section>
           </div>
        )}

      </main>

      <footer className="border-t border-white/5 py-16 bg-[#030303] text-center">
         <p className="text-[9px] text-gray-600 uppercase tracking-[0.6em]">COPYRIGHT SANOVA GLOBAL 2026</p>
      </footer>
    </div>
  );
}