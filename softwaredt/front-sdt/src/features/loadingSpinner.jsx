const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50px]">
      
      {/* El corazón del Spinner: un div con bordes gruesos y redondeados.
        - w-12 h-12: Define el tamaño (12 = 3rem / 48px por defecto).
        - border-4: Define el grosor del borde.
        - border-solid: Asegura que el borde es sólido.
        - rounded-full: Hace el div perfectamente circular.
        
        Las propiedades de color son clave:
        - border-gray-200: El color de fondo del círculo (la parte que no gira).
        - border-t-indigo-500: Define el color del cuarto de círculo superior que girará. 
                                 Aquí usamos un color de acento vibrante (índigo).
        
        La animación es lo que le da vida:
        - animate-spin: Clase predefinida de Tailwind que aplica la animación 'spin' 
                          (rotación infinita de 360 grados).
      */}
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
        {/* Este div está vacío, el efecto visual se logra completamente con los estilos de borde y la animación. */}
      </div>

    </div>
  );
}

export default Spinner;