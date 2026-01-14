import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";

const Footer = () => {

              ))}
            </ul>
          </div>
        </div>

      
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