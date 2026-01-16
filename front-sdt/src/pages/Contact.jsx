
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