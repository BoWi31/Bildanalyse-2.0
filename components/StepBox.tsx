
import React from 'react';
import { StepData } from '../types';

interface StepBoxProps {
  step: StepData;
  studentNote?: string;
}

export const StepBox: React.FC<StepBoxProps> = ({ step, studentNote = '' }) => {
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
        
        {step.number === 5 && (
          <div className="mt-3 flex gap-2">
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">rot</div>
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">gelb</div>
            <div className="w-5 h-5 rounded-full border border-indigo-900 flex items-center justify-center text-[7px] font-bold">grün</div>
          </div>
        )}
      </div>

      {/* Rechte Seite: Schreibbereich */}
      <div className="w-[65%] p-3 relative bg-white flex flex-col">
        {/* Digital View Help */}
        <div className="no-print opacity-100 mb-2">
           <p className="text-[10px] uppercase font-black text-indigo-300 mb-1">Deine Notizen werden hier automatisch für den Druck gespeichert.</p>
           {studentNote ? (
             <p className="text-[13px] text-indigo-900 font-bold line-clamp-3">"{studentNote}"</p>
           ) : (
             <p className="text-[11px] text-slate-400 italic font-bold">Noch keine Notizen vorhanden...</p>
           )}
        </div>
        
        {/* Print View: Student input rendering */}
        <div className="hidden print:block flex-grow relative">
           {studentNote ? (
             <div className="text-[14px] text-indigo-950 font-bold leading-relaxed whitespace-pre-wrap p-1">
               {studentNote}
             </div>
           ) : (
             <div className="absolute inset-0 p-2 flex flex-col gap-5">
               <div className="w-full border-b border-indigo-100"></div>
               <div className="w-full border-b border-indigo-100"></div>
               <div className="w-full border-b border-indigo-100"></div>
               <div className="w-full border-b border-indigo-100"></div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
