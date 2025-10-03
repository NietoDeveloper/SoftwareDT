

const Footer = () => {
  return (
<footer className="bg-transparent backdrop-blur-[90%] flex justify-center">

    <div className="container mx-auto px-4 flex justify-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-8 text-black text-center">
            <div className="flex flex-col items-center">
                <div className="w-32 h-12 mb-4"></div>
                <ul>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">Proyectos</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">Servicios</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">Contacto</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="mailto:doradotech@outlook.com">doradotech@outlook.com</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <ul>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">FaceBook</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">Twitter</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">LinkedIn</a></li>
                    <li className="py-2 hover:text-yellow-400 transition-colors"><a href="#">Instagram</a></li>
                </ul>
                <p className="mt-4">Copyright 2025</p>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer