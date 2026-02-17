
import React, { useState } from 'react';

interface MagnifierProps {
  src: string;
  width?: string | number;
  height?: string | number;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  onImageClick?: () => void;
  error?: boolean;
}

export const Magnifier: React.FC<MagnifierProps> = ({
  src,
  width = '100%',
  height = '100%',
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5,
  onImageClick,
  error = false
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: width,
        cursor: 'crosshair'
      }}
      className="rounded-[1.5rem] overflow-hidden"
    >
      <img
        src={src}
        style={{ height: height, width: width }}
        className="object-contain w-full h-full bg-slate-100"
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          if (!error) setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        onClick={onImageClick}
        alt="Magnifiable"
      />

      {showMagnifier && !error && (
        <div
          style={{
            display: showMagnifier ? '' : 'none',
            position: 'absolute',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: '1',
            border: '4px solid white',
            borderRadius: '50%',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 10
          }}
        />
      )}
      
      {/* Visual Indicator for the Lens */}
      {!showMagnifier && !error && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 pointer-events-none transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] font-black uppercase text-indigo-900 pr-1 tracking-wider">Lupe aktiv</span>
        </div>
      )}
    </div>
  );
};
