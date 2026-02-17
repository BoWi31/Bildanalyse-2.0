
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { STEPS, INSTRUCTION_HINT, AMPEL_FEEDBACK, CHECKPOINTS, DUMMY_IMAGE_URL } from './constants';
import { Infographic } from './components/Infographic';

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [showChallenge, setShowChallenge] = useState<null | 'eye-check' | 'timeline'>(null);
  const [showHints, setShowHints] = useState(false);
  const [showWritingHelp, setShowWritingHelp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fallback state for image
  const [imgSrc, setImgSrc] = useState(DUMMY_IMAGE_URL);
  const [imgError, setImgError] = useState(false);

  // Zoom & Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const [ampelChoice, setAmpelChoice] = useState<null | 'red' | 'yellow' | 'green'>(null);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('analyse_notizen') || '';
  });
  const [showNotebook, setShowNotebook] = useState(false);

  useEffect(() => {
    localStorage.setItem('analyse_notizen', notes);
  }, [notes]);

  const handlePrint = () => {
    window.print();
  };

  const currentStep = STEPS[activeStep];

  const toggleFoundItem = (id: string) => {
    setFoundItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Lightbox Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageError = () => {
    // Falls das Bild fehlschlägt, versuchen wir den Platzhalter
    if (!imgError) {
      console.warn("Bild 'freiheit-1830.jpg' konnte nicht geladen werden.");
      setImgSrc('placeholder_bild.svg');
      setImgError(true);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // Check if all correct items are found and no fake items are selected
  const correctIds = CHECKPOINTS.afterStep1.items.filter(i => !i.fake).map(i => i.id);
  const selectedFake = CHECKPOINTS.afterStep1.items.filter(i => i.fake && foundItems.includes(i.id));
  const allCorrectFound = correctIds.every(id => foundItems.includes(id));
  const canProceed = allCorrectFound && selectedFake.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 h-16 md:h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-900 text-white p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-sm uppercase tracking-tighter leading-none">Bild-Labor</h1>
            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">Geschichte Interaktiv</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => { setActiveStep(idx); setShowChallenge(null); setShowHints(false); }}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg font-black transition-all ${
                activeStep === idx ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-white text-slate-400 hover:text-indigo-600'
              }`}
            >
              {step.number}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowNotebook(!showNotebook)} className={`p-3 rounded-xl shadow-md transition-colors ${showNotebook ? 'bg-amber-400 text-amber-950' : 'bg-slate-200 text-slate-600'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={handlePrint} className="bg-indigo-900 text-white p-3 rounded-xl shadow-md hover:bg-black">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </button>
        </div>
      </nav>

      <div className="no-print bg-indigo-600 py-2 text-center text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] shadow-inner">
        {INSTRUCTION_HINT}
      </div>

      <div className="flex-grow flex flex-col lg:flex-row relative">
        <main className={`no-print flex-grow container mx-auto p-4 md:p-8 transition-all duration-500 ${showNotebook ? 'lg:mr-[350px]' : ''}`}>
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Bild-Sektion */}
            <div className="w-full lg:w-[45%]">
              <div className="sticky top-28 bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-200">
                <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-100 aspect-[4/5] cursor-zoom-in group" onClick={handleOpenModal}>
                  <img 
                    src={imgSrc} 
                    onError={handleImageError}
                    alt="Hauptquelle" 
                    className="w-full h-full object-contain" 
                  />
                  <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white px-6 py-3 rounded-full font-black uppercase text-xs shadow-xl tracking-widest">Bild analysieren</span>
                  </div>
                  {imgError && (
                    <div className="absolute top-4 left-4 right-4 bg-red-600 text-white p-2 rounded-lg text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">
                      DATEI 'FREIHEIT-1830.JPG' NICHT GEFUNDEN!
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Arbeitsblatt Schritt {currentStep.number}</span>
                  <h2 className="text-2xl font-black text-indigo-900 uppercase tracking-tight leading-none">{currentStep.title}</h2>
                </div>
              </div>
            </div>

            {/* Aufgaben & Interaktion */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 relative min-h-[650px] flex flex-col">
                
                {showChallenge === 'eye-check' && (
                  <div className="absolute inset-0 z-30 bg-indigo-900 text-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                    <h2 className="text-4xl font-black mb-4 italic tracking-tighter uppercase">Detektiv-Check!</h2>
                    <p className="mb-8 font-bold text-indigo-200 text-lg leading-tight">{CHECKPOINTS.afterStep1.task}</p>
                    <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                      {CHECKPOINTS.afterStep1.items.map(item => {
                        const isSelected = foundItems.includes(item.id);
                        let style = "bg-white/10 border-white/20 hover:bg-white/20";
                        let icon = null;

                        if (isSelected) {
                          if (item.fake) {
                            style = "bg-red-500 border-red-400 text-white scale-95 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                            icon = <span className="text-2xl font-black">✗</span>;
                          } else {
                            style = "bg-emerald-500 border-emerald-400 text-white scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]";
                            icon = <span className="text-2xl font-black">✓</span>;
                          }
                        }

                        return (
                          <button 
                            key={item.id} 
                            onClick={() => toggleFoundItem(item.id)} 
                            className={`p-5 rounded-2xl font-black border-2 transition-all flex justify-between items-center text-left ${style}`}
                          >
                            <span className="uppercase tracking-tight">{item.text}</span>
                            {icon}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="mt-8 h-8">
                      {selectedFake.length > 0 && (
                        <p className="text-red-300 font-black uppercase text-xs tracking-widest animate-pulse">
                          Achtung: Einige Dinge gehören nicht ins Bild!
                        </p>
                      )}
                      {allCorrectFound && selectedFake.length === 0 && (
                        <p className="text-emerald-300 font-black uppercase text-xs tracking-widest animate-bounce">
                          Spitze! Du hast alles Wichtige gefunden.
                        </p>
                      )}
                    </div>

                    <button 
                      disabled={!canProceed}
                      onClick={() => { setShowChallenge(null); setActiveStep(1); }} 
                      className={`mt-4 px-12 py-5 rounded-full font-black uppercase shadow-2xl transition-all ${canProceed ? 'bg-white text-indigo-900 hover:scale-105 active:scale-95' : 'bg-white/20 text-white/40 cursor-not-allowed'}`}
                    >
                      Weiter zu Schritt 2
                    </button>
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-black italic text-indigo-700 mb-6">"{currentStep.subtitle}"</h3>
                
                {/* Historischer Kontext (Schritt 3) */}
                {activeStep === 2 && (
                  <div className="mb-10 space-y-6">
                    <div className="bg-indigo-50 border-l-[10px] border-indigo-600 p-8 rounded-3xl shadow-inner animate-in slide-in-from-left duration-500">
                       <p className="text-xl font-bold text-indigo-950 leading-relaxed italic">"{currentStep.contextText}"</p>
                    </div>
                    
                    {/* Interaktive Timeline */}
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                      <h4 className="text-amber-400 font-black uppercase text-xs tracking-widest mb-6 text-center">Zeitleiste: Die Drei Glorreichen Tage</h4>
                      <div className="flex justify-between mb-8 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2"></div>
                        {CHECKPOINTS.timeline30.map((item, idx) => (
                          <button key={idx} onClick={() => setTimelineIndex(idx)} className={`relative z-10 w-12 h-12 rounded-full font-black flex items-center justify-center transition-all ${timelineIndex === idx ? 'bg-amber-400 text-amber-950 scale-125 shadow-xl' : 'bg-slate-700 text-white'}`}>{idx+1}</button>
                        ))}
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 min-h-[140px] flex flex-col justify-center animate-in fade-in duration-300">
                        <p className="text-amber-400 font-black text-xs uppercase mb-1 tracking-widest">{CHECKPOINTS.timeline30[timelineIndex].day}</p>
                        <p className="font-bold text-lg leading-snug">{CHECKPOINTS.timeline30[timelineIndex].event}</p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-lg md:text-xl font-bold text-slate-800 mb-8 leading-tight">{currentStep.description}</p>

                <div className="space-y-4 mb-auto">
                  {currentStep.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{i+1}</span>
                        <p className="text-base md:text-lg font-bold text-slate-900 leading-snug">{point}</p>
                    </div>
                  ))}
                </div>

                {/* Interaktive Ampel (Schritt 5) */}
                {activeStep === 4 && (
                  <div className="my-10 bg-slate-100 p-8 rounded-[3rem] border-4 border-slate-200 shadow-inner">
                    <h4 className="text-indigo-900 font-black uppercase text-center text-xs tracking-widest mb-10">Wie glaubwürdig ist dieses Bild?</h4>
                    <div className="flex justify-center gap-10 mb-10">
                       <button onClick={() => setAmpelChoice('red')} className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${ampelChoice === 'red' ? 'bg-red-600 border-indigo-900 scale-110 shadow-2xl' : 'bg-red-200 border-transparent opacity-40 grayscale hover:grayscale-0'}`}></button>
                       <button onClick={() => setAmpelChoice('yellow')} className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${ampelChoice === 'yellow' ? 'bg-yellow-400 border-indigo-900 scale-110 shadow-2xl' : 'bg-yellow-100 border-transparent opacity-40 grayscale hover:grayscale-0'}`}></button>
                       <button onClick={() => setAmpelChoice('green')} className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${ampelChoice === 'green' ? 'bg-green-500 border-indigo-900 scale-110 shadow-2xl' : 'bg-green-100 border-transparent opacity-40 grayscale hover:grayscale-0'}`}></button>
                    </div>
                    {ampelChoice && (
                      <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-indigo-100 animate-in zoom-in duration-300">
                        <p className="text-indigo-900 font-bold text-center text-lg italic">{AMPEL_FEEDBACK[ampelChoice]}</p>
                        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase text-center tracking-widest">Übertrage dein Urteil nun auf das Arbeitsblatt!</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-12 space-y-4">
                  <button onClick={() => setShowHints(!showHints)} className="w-full p-5 bg-amber-400 rounded-2xl font-black uppercase text-amber-950 flex justify-between items-center shadow-lg transition-all active:scale-95">
                    <span>🔍 Detektiv-Tipps</span>
                    <span className={`transition-transform duration-300 ${showHints ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {showHints && (
                    <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-left animate-in slide-in-from-top-2">
                      {currentStep.hints.map((h, i) => <p key={i} className="font-bold text-amber-900 mb-2 flex items-center gap-3"><span>★</span> {h}</p>)}
                    </div>
                  )}

                  <button onClick={() => setShowWritingHelp(!showWritingHelp)} className="w-full p-5 bg-indigo-600 rounded-2xl font-black uppercase text-white flex justify-between items-center shadow-lg transition-all active:scale-95">
                    <span>✍️ Schreib-Hilfe</span>
                    <span className={`transition-transform duration-300 ${showWritingHelp ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {showWritingHelp && (
                    <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200 text-left italic font-bold text-indigo-900 animate-in slide-in-from-top-2">
                      {currentStep.sentenceStarters.map((s, i) => <p key={i} className="mb-2">„{s}“</p>)}
                    </div>
                  )}
                </div>

                <div className="mt-12 flex justify-between items-center">
                  <button disabled={activeStep === 0} onClick={() => setActiveStep(a => a - 1)} className="px-8 py-4 bg-slate-200 text-slate-500 rounded-2xl font-black uppercase disabled:opacity-20 hover:bg-slate-300 transition-colors">Zurück</button>
                  {activeStep === 0 ? (
                    <button onClick={() => setShowChallenge('eye-check')} className="px-10 py-5 bg-amber-500 text-white rounded-2xl font-black uppercase shadow-xl animate-pulse">Checkpoint!</button>
                  ) : activeStep < 4 ? (
                    <button onClick={() => setActiveStep(a => a + 1)} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase shadow-xl hover:bg-indigo-700">Nächster Schritt</button>
                  ) : (
                    <button onClick={handlePrint} className="px-10 py-5 bg-green-600 text-white rounded-2xl font-black uppercase shadow-xl hover:bg-green-700 flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                      AB Drucken
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Notebook Sidebar */}
        <div className={`no-print fixed top-16 md:top-20 right-0 bottom-0 bg-white shadow-2xl border-l border-slate-200 transition-all duration-500 z-40 flex flex-col ${showNotebook ? 'w-full md:w-[350px]' : 'w-0 overflow-hidden'}`}>
          <div className="p-6 bg-amber-400 flex items-center justify-between shadow-md">
            <h3 className="font-black uppercase text-amber-950 flex items-center gap-2">Analyse-Protokoll</h3>
            <button onClick={() => setShowNotebook(false)} className="text-amber-950 p-2 hover:bg-amber-500 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-grow flex flex-col p-6 gap-4">
             <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notiere hier deine Ergebnisse..." className="flex-grow p-6 bg-amber-50 text-amber-950 font-bold text-lg outline-none border-2 border-amber-200 rounded-3xl transition-all resize-none shadow-inner" />
             <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase text-green-700 tracking-widest leading-none">Speichert automatisch...</span>
             </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal mit Zoom & Pan */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300 overflow-hidden" 
          onClick={() => setIsModalOpen(false)}
        >
          {/* Controls Overlay */}
          <div className="absolute top-6 left-6 flex gap-3 z-[110]" onClick={e => e.stopPropagation()}>
             <button onClick={handleZoomIn} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-90">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
             </button>
             <button onClick={handleZoomOut} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-90">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
             </button>
          </div>

          <div className="absolute top-6 right-6 z-[110]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="bg-red-600/80 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-md transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="absolute bottom-6 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-widest pointer-events-none">
            {scale > 1 ? "Ziehen zum Bewegen • Esc zum Schließen" : "Klicken zum Zoomen • Esc zum Schließen"}
          </div>

          {/* Image Container */}
          <div 
            className={`w-full h-full flex items-center justify-center ${scale > 1 ? 'cursor-move' : 'cursor-zoom-in'}`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              ref={imageRef}
              src={imgSrc} 
              alt="Vollbild" 
              className="transition-transform duration-75 ease-out select-none shadow-2xl max-h-[90vh] max-w-[90vw]"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
              onMouseDown={handleMouseDown}
              onClick={(e) => { 
                e.stopPropagation(); 
                if (scale === 1) handleZoomIn(); 
                else { setScale(1); setPosition({ x: 0, y: 0 }); }
              }}
            />
          </div>
        </div>
      )}

      {/* Print View */}
      <div className="hidden print:block">
        <Infographic />
      </div>
    </div>
  );
}
