
import React from 'react';
import { StepData } from '../types';

interface StepBoxProps {
  step: StepData;
}

export const StepBox: React.FC<StepBoxProps> = ({ step }) => {
  return (
    <div className="flex border-[2px] border-indigo-900 min-h-[140px] break-inside-avoid print:min-h-[160px]">
      {/* Linke Seite: Info */}
      <div className="w-[35%] bg-indigo-50 border-r-[2px] border-indigo-900 p-3 flex flex-col gap-1 items-center justify-center text-center">
        <div className="text-4xl font-black text-indigo-900 mb-1 leading-none">
          {step.number}
        </div>
        <h2 className="text-[16px] font-black text-indigo-900 uppercase leading-tight">
          {step.title}
        </h2>
        <p className="text-[11px] text-indigo-700 font-bold italic leading-tight mt-1">
          {step.subtitle}
        </p>
        
        {/* Ampel Kreise nur in Schritt 5 */}
        {step.number === 5 && (
          <div className="mt-3 flex gap-2">
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">rot</div>
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">gelb</div>
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">grün</div>
          </div>
        )}
      </div>

      {/* Rechte Seite: Schreibbereich (Leer für Druck, Info für Digital) */}
      <div className="w-[65%] p-3 relative bg-white">
        <div className="no-print opacity-100">
           <p className="text-[10px] uppercase font-black text-indigo-300 mb-2">Hilfestellung:</p>
           <ul className="list-disc list-inside space-y-1">
             {step.points.slice(0, 2).map((p, i) => (
               <li key={i} className="text-[12px] text-slate-600 font-medium leading-tight">
                 {p}
               </li>
             ))}
           </ul>
           <div className="mt-3 border-t border-indigo-50 pt-2">
              <p className="text-[11px] text-indigo-800 italic font-bold">
                "{step.sentenceStarters[0]}"
              </p>
           </div>
        </div>
        
        {/* Hilfslinien für den Druck */}
        <div className="hidden print:block absolute inset-0 p-4">
           <div className="w-full h-full border-b border-indigo-100 mb-4"></div>
           <div className="w-full h-full border-b border-indigo-100 mb-4"></div>
           <div className="w-full h-full border-b border-indigo-100"></div>
        </div>
      </div>
    </div>
  );
};
