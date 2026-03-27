/**
 * 🛰️ SOFTWARE DT - INDUSTRIAL LOADING NODE
 * S+ Tier UI Component | Production Ready
 */

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50px] font-sans">
      
      <div className="relative">
        {/* Capa de Base: Círculo de inercia en Gainsboro/Black-low-op */}
        <div 
          className="
            w-12 h-12 
            border-4 border-black/5 
            rounded-full
          "
        />
        
        {/* Capa Activa: Rotor de Sincronización en Gold (#FEB60D)
          - border-t-[#FEB60D]: Color de acento de la marca.
          - absolute top-0: Se superpone perfectamente a la base.
          - animate-spin: Rotación técnica infinita.
        */}
        <div 
          className="
            w-12 h-12 
            border-4 border-transparent 
            border-t-[#FEB60D] 
            rounded-full 
            animate-spin 
            absolute top-0 left-0
          "
        />
      </div>

    </div>
  );
}

export default Spinner;