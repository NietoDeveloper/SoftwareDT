import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
link.id}>
                  <a href={link.href} target="_blank" rel="noreferrer"
                     onMouseEnter={() => handleMouseEnter(link.id)} onMouseLeave={handleMouseLeave}
                     style={getStyle(link.id)}
                     className="transition-all duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-white/30 w-full max-w-6xl flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
            <p onMouseEnter={() => handleMouseEnter('copy')} onMouseLeave={handleMouseLeave}
               style={getStyle('copy')}
               className="transition-colors duration-300 cursor-default text-lg sm:text-xl font-black uppercase tracking-[0.2em]">
              Copyright 2025 © Software DT
            </p>

            <div className="flex items-center gap-4 py-2 cursor-default"
                 onMouseEnter={() => handleMouseEnter('date')} onMouseLeave={handleMouseLeave}>
              <span className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_10px_#FFD700]"></span>
              <p style={getStyle('date')} className="transition-colors duration-300 text-lg sm:text-xl font-black uppercase tracking-tighter">
                {currentDateTime} <span style={{opacity: 0.5, color: '#FFF'}}>|</span> BOGOTÁ, COLOMBIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;