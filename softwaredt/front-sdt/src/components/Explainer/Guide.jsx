import {Link} from 'react-router-dom';
import equipo1 from '../../assets/images/equipo1.png';

const Guide = () => {
  return (
    <>
       <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row pb-8 lg:pb-[55px]">
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Agenda tu Cita,
                <br /> Uno de nuestros Desarrolladores de Software te Guiara.
              </h2>
              <ul className="pl-4">
                <li className="text_para">1. Escoje uno de nuestros Servicios</li>
                <li className="text_para">2. Asignacion Programador de Software, segun tu solicitud</li>
                <li className="text_para">
                  3. Seleciona la Hora y Fecha
                </li>
                <li className="text_para">4. Deja un Mensaje al Desarrollador de Software que asistira a tu cita</li>
              </ul>
              <Link to="/doctors">
                <button className="btn hover:bg-blue-500">Agenda una Cita</button>
              </Link>
            </div>

            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={equipo1}  alt="featuredoc" className="rounded-3xl lg:w-4/5" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Guide;