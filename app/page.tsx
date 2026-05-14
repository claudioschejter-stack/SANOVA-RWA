'use client';
import React, { useState } from 'react';

export default function TokenSettlement() {
  const [txHash, setTxHash] = useState('');
  const [status, setStatus] = useState('AWAITING_PAYMENT'); // Estados: AWAITING_PAYMENT, DETECTED, SUCCESS
  const [tokens, setTokens] = useState(10); 
  const corporateWallet = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const ticketPrice = 50;

  // FUNCIONES DEL SIMULADOR (Simulan la respuesta del Webhook de la Blockchain)
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
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 gap-8">
      
      {/* TERMINAL DEL INVERSOR */}
      <div className="w-full max-w-[480px] bg-[#0F0F0F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* HEADER */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Settlement Phase</span>
            <span className="text-[10px] font-mono text-gray-500">ID: SNV-ANL-001</span>
          </div>
          <h2 className="text-3xl font-light text-white tracking-tight uppercase">Terminal de <span className="font-bold text-emerald-500">Pago</span></h2>
        </div>

        <div className="p-8 space-y-8">
          {/* MONTO */}
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

          {/* ESTADOS AUTOMÁTICOS */}
          {status === 'AWAITING_PAYMENT' && (
            <div className="p-6 border border-amber-500/20 bg-amber-500/[0.02] rounded-2xl text-center space-y-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping mx-auto"></div>
              <p className="text-xs text-amber-400 font-mono uppercase tracking-wider">Esperando depósito on-chain...</p>
              <p className="text-[10px] text-gray-500">Envía los USDT a tu wallet corporativa registrada.</p>
            </div>
          )}

          {status === 'DETECTED' && (
            <div className="p-6 border border-blue-500/20 bg-blue-500/[0.02] rounded-2xl text-center space-y-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mx-auto"></div>
              <p className="text-xs text-blue-400 font-mono uppercase tracking-wider">¡Pago Detectado en Bloque!</p>
              <p className="text-[9px] font-mono text-gray-500 truncate">Hash: {txHash}</p>
              <p className="text-[10px] text-blue-300 animate-pulse">Procesando emisión fiduciaria (Ley 19.640)...</p>
            </div>
          )}

          {status === 'SUCCESS' && (
            <div className="p-6 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-2xl text-center space-y-3">
              <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-xs font-bold">✓</div>
              <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Inversión Consolidada</p>
              <p className="text-[10px] text-gray-400">Tokens asignados con éxito a tu wallet. Revisá tu email para el certificado de inversión.</p>
              <p className="text-[8px] font-mono text-gray-600 truncate">TXID: {txHash}</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-black border-t border-white/5 text-center">
          <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">Sanova Global Ledger Node v1.0</span>
        </div>
      </div>

      {/* PANEL DE CONTROL DEL ADMINISTRADOR (OCULTO/SIMULADOR) */}
      <div className="w-full max-w-[480px] bg-[#141414] border border-dashed border-white/10 rounded-2xl p-6 space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">⚙️ Panel de Simulación (Sanova Admin)</p>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={simularPagoDetectado}
            className="py-2.5 px-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[10px] font-bold rounded-xl border border-blue-500/20 transition-all"
          >
            1. Detectar Transferencia
          </button>
          <button 
            onClick={simularPagoExitoso}
            disabled={status !== 'DETECTED'}
            className={`py-2.5 px-2 text-[10px] font-bold rounded-xl border transition-all ${
              status === 'DETECTED' 
              ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border-emerald-500/20' 
              : 'bg-white/5 text-gray-600 border-transparent cursor-not-allowed'
            }`}
          >
            2. Confirmar Bloque (Mint)
          </button>
          <button 
            onClick={reiniciarSimulador}
            className="py-2.5 px-2 bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-bold rounded-xl border border-white/5 transition-all"
          >
            Reiniciar
          </button>
        </div>
        <p className="text-[9px] text-gray-500 text-center italic">
          Usa estos botones para simular cómo reacciona la interfaz cuando el Webhook automatizado procesa los datos en la blockchain de Polygon.
        </p>
      </div>

    </div>
  );
}