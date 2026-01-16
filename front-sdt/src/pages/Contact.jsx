

      <section className="py-28 bg-main px-6 flex flex-col items-center">
  <div className="w-full max-w-5xl">
    {/* Encabezado con Estilo de Ingeniería */}
    <div className="flex flex-col items-center text-center mb-16 space-y-4">
      <div className="flex items-center gap-2 px-4 py-1 bg-black rounded-full mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System Reviews v1.0</span>
      </div>

      <div className="flex gap-1.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={22} className="fill-yellowColor text-black stroke-[2.5px]" />
        ))}
      </div>

      <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-headingColor leading-none">
        Technical <span className="text-yellowColor">Feedback</span>
      </h2>
      
      <p className="text-gray-600 font-bold uppercase text-[10px] sm:text-[12px] tracking-[0.5em] max-w-prose">
        Validación de infraestructura y despliegue por líderes técnicos
      </p>

      {/* Divisor Neumórfico/Brutalista */}
      <div className="flex items-center gap-3 mt-6">
        <div className="w-12 h-[3px] bg-black"></div>
        <div className="w-3 h-3 border-[3px] border-black rotate-45"></div>
        <div className="w-12 h-[3px] bg-black"></div>
      </div>
    </div>
    
    {/* Contenedor del Formulario (Software DT Card Style) */}
    <div className="relative group">
      {/* Sombra sólida decorativa de fondo */}
      <div className="absolute inset-0 bg-yellowColor rounded-[3.5rem] translate-x-4 translate-y-4 border-[3px] border-black -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
      
      <div className="bg-card border-[4px] border-black rounded-[3.5rem] p-6 sm:p-12 overflow-hidden relative shadow-sm">
        {/* Decoración de esquina (Código) */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none hidden md:block">
          <pre className="text-[10px] font-mono font-bold text-black">
            {`{
  status: "verified",
  uptime: "99.9%",
  secure: true
}`}
          </pre>
        </div>

        <ReviewForm />
      </div>
    </div>

    {/* Footer de la sección */}
    <p className="mt-12 text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.6em]">
      End-to-End Encrypted Feedback Loop
    </p>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Contact;