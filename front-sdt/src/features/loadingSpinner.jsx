const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50px]">
      
      {/* El corazón del Spinner: un div con bordes gruesos y redondeados.
        - w-12 h-12: Define el tamaño (12 = 3rem / 48px por defecto).

      <div 
        className="
          w-12 h-12 
          border-4 border-solid 
          rounded-full 
          border-gray-200 
          border-t-indigo-500 
          animate-spin
        "
      >
      </div>

    </div>
  );
}

export default Spinner;