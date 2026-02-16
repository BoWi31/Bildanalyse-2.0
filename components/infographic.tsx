
import React from 'react';
import { STEPS, DUMMY_IMAGE_URL } from '../constants';
import { StepBox } from './StepBox';

export const Infographic: React.FC = () => {
  return (
    <div className="print-area w-[210mm] h-[297mm] bg-white mx-auto overflow-hidden flex flex-col p-[12mm] text-indigo-900 border-[12px] border-slate-100 print:border-none">
      
      {/* Header mit Illustration-Stil */}
      <header className="flex justify-between items-start mb-8">
        <div className="w-2/3">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-indigo-900 text-white px-3 py-1 rounded text-xs font-black uppercase tracking-widest">Arbeitsblatt</span>
            <span className="text-slate-400 font-bold text-xs">Geschichte Klasse 7-9</span>
          </div>
          <h1 className="text-[42px] font-black tracking-tighter leading-none mb-4 uppercase">
            Historische Bildanalyse
          </h1>
          <div className="bg-indigo-50 p-4 rounded-2xl border-l-[8px] border-indigo-900">
            <p className="text-[14px] font-bold leading-tight">
              Untersuche das Revolutionsbild Schritt für Schritt. 
              <span className="block mt-1 text-indigo-700 italic">Nutze die digitale Hilfe für Tipps und Formulierungen!</span>
            </p>
          </div>
        </div>
        
        {/* Platzhalter für das gedruckte Bild */}
        <div className="w-[120px] h-[150px] border-4 border-indigo-900 rounded-2xl flex flex-col items-center justify-center p-2 bg-slate-50 relative rotate-2 shadow-xl overflow-hidden">
           <img src={DUMMY_IMAGE_URL} alt="Vorschau" className="w-full h-full object-cover opacity-20 grayscale" />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
             <div className="w-10 h-10 border-4 border-indigo-900 rounded-full mb-1"></div>
             <div className="text-[8px] font-black uppercase leading-none text-indigo-900">Hauptquelle hier einkleben</div>
           </div>
        </div>
      </header>

      {/* Main Table Structure */}
      <main className="flex-grow flex flex-col border-[2px] border-indigo-900 rounded-3xl overflow-hidden">
        {STEPS.map((step) => (
          <StepBox key={step.number} step={step} />
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-8 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-widest opacity-30">Name: __________________________</p>
          <p className="text-[11px] font-black uppercase tracking-widest opacity-30">Datum: __________________</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Erstellt mit dem Historischen Bild-Labor</p>
        </div>
      </footer>
    </div>
  );
};
