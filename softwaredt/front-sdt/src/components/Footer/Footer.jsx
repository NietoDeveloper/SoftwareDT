

const Footer = () => {
  return (
    <footer className="bg-black ">
        <div className="container">
            <div className=" flex w-full flex-col md:flex-row flex-wrap justify-between items-center gap-[30px] lg:gap-[10px] py-6 text-white ">

                <div className="flex flex-col items-center">
                    <ul>
                        <li className="pb-1">Proyectos</li>
                        <li className="py-1">Servicios</li>
                        <li className="py-1">Contacto</li>
                        <li className="py-1">doradotech@outlook.com</li>
                    </ul>
                </div>

                <div className="flex flex-col justify-center items-center max-md:hidden">
                    <ul>
                        <li className="pb-1">FaceBook</li>
                        <li className="py-1">Twitter</li>
                        <li className="py-1">LinkendIn</li>
                        <li className="py-1">Instagram </li>
                    </ul>
                <p>Copyright 2024 developed by Eliud</p>
                </div>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer