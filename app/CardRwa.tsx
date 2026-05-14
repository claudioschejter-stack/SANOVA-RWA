'use client';
import React, { useState } from 'react';

export default function CardRwa({ p, idx, onNextFoto, onPrevFoto }: any) {
  const [cantidad, setCantidad] = useState(1);
  const [tab, setTab] = useState('compra'); // 'compra', 'legal', 'ubicacion'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full border-t-cyan-500/30">
      
      {/* HEADER DE IMAGEN */}
      <div className="h-64 bg-slate-950 relative">
        <img src={p.fotos[idx]} alt={p.nombre} className="w-full h-full object-cover opacity-50" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest shadow-lg">TIR {p.tir}%</span>
          <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase">LTV 60%</span>
        </div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
          <button onClick={onPrevFoto} className="bg-black/60 hover:bg-black text-white rounded-full w-8 h-8 flex items-center justify-center transition-all">‹</button>
          <button onClick={onNextFoto} className="bg-black/60 hover:bg-black text-white rounded-full w-8 h-8 flex items-center justify-center transition-all">›</button>
        </div>
      </div>

      {/* NAVEGACIÓN INTERNA DE LA TARJETA */}
      <div className="flex border-b border-slate-800">
        <button onClick={() => setTab('compra')} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${tab === 'compra' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5' : 'text-slate-500'}`}>Inversión</button>
        <button onClick={() => setTab('legal')} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${tab === 'legal' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5' : 'text-slate-500'}`}>Auditoría</button>
        <button onClick={() => setTab('ubicacion')} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${tab === 'ubicacion' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5' : 'text-slate-500'}`}>Mapa</button>
      </div>

      <div className="p-8 flex-grow space-y-6">
        
        {/* TÍTULO Y UBICACIÓN */}
        <div>
          <h3 className="font-black text-xl text-white leading-tight uppercase italic">{p.nombre}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.ubi}</p>
          </div>
        </div>

        {/* CONTENIDO DINÁMICO POR TAB */}
        {tab === 'compra' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 uppercase font-black">Precio Unitario</span>
                <span className="text-2xl text-white font-mono font-black">${p.precio} <span className="text-xs text-slate-600">USD</span></span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-slate-500 tracking-tighter">Fondeo de la Serie</span>
                  <span className="text-cyan-400">65% Completo</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full w-[65%]"></div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-24">
                <input 
                  type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono text-center font-black focus:border-cyan-500 outline-none"
                />
              </div>
              <button className="flex-grow bg-white hover:bg-cyan-400 text-black font-black py-4 rounded-xl text-[11px] uppercase transition-all shadow-lg active:scale-95">
                Invertir ${(cantidad * p.precio).toLocaleString()} USD
              </button>
            </div>
          </div>
        )}

        {tab === 'legal' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter italic">Estructura Legal</span>
                <span className="text-[9px] text-white font-black uppercase">Fideicomiso Mendoza</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter italic">Inquilino Actual</span>
                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">Operadora Energía A+</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-[8px] text-slate-600 font-mono mb-1 tracking-tighter">BLOCKCHAIN ASSET HASH</p>
                <p className="text-[8px] text-cyan-500 font-mono break-all leading-none opacity-60">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
              </div>
            </div>
            <button className="w-full border border-slate-700 text-slate-400 py-3 rounded-xl text-[9px] font-black uppercase hover:bg-slate-800 transition-colors tracking-widest">Descargar Smart Contract (Audit)</button>
          </div>
        )}

        {tab === 'ubicacion' && (
          <div className="animate-in fade-in duration-300">
            <div className="w-full h-40 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden">
               {/* Simulación de Mapa */}
               <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-cyan-500 text-2xl animate-bounce">📍</span>
                  <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-tighter font-black">Añelo, Vaca Muerta, NE</p>
                  <p className="text-[8px] font-mono text-slate-600">Lat: -38.3475, Lon: -68.7842</p>
               </div>
            </div>
            <p className="mt-4 text-[10px] text-slate-500 leading-relaxed italic text-center uppercase tracking-tighter">
              Ubicación estratégica a 5km de los pozos de extracción activos.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}