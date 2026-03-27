/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Zap, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // 🛰️ Importamos el contexto

const Products = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext); // 🔑 Consumimos el token de sesión

  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ["products-db"],
    queryFn: async () => {
      try {
        const response = await fetch('https://back-softwaredt-production.up.railway.app/api/products', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'x-sdt-access': 'true' 
          }
        });

        if (!response.ok) throw new Error(`Datacenter Error: ${response.status}`);

        const res = await response.json();
        const responsePayload = res.data || res.products || (Array.isArray(res) ? res : []);
        
        if (!Array.isArray(responsePayload)) {
          console.error("❌ Formato de data no reconocido", res);
          return [];
        }

        return responsePayload.map(item => {
          const id = item._id || item.id;
          return {
            ...item,
            id: id,
            _id: id,
            title: item.name || item.title || "Solución DT",
            subtitle: item.category || item.subtitle || "Ingeniería Senior",
            content: item.description || item.content || "Arquitectura de alto impacto.",
            image: item.photo || item.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            price: item.price || 0
          };
        });
      } catch (error) {
        console.error("❌ SDT Critical Error:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false 
  });

  const handleAction = (item) => {
    const productId = item.id || item._id;
    
    if (!productId) {
      toast.error("ERROR TÉCNICO: ID DE NODO NO ENCONTRADO", {
        style: { border: '1px solid #FEB60D', background: '#000', color: '#fff' }
      });
      return;
    }

    const formattedPrice = `$ ${Number(item.price || 0).toLocaleString()}`;
    const fullAppointmentData = {
      productId,
      productName: item.title,
      productData: item, 
      serviceData: { title: item.title, price: formattedPrice }
    };

    // 🛰️ GUARDAMOS EL PRODUCTO EN STORAGE POR SI ACASO
    localStorage.setItem('sdt_pending_appointment', JSON.stringify(fullAppointmentData));

    // 🚦 LÓGICA DE FLUJO AUTENTICADO
    if (token) {
      navigate(`/book-appointment/${productId}`, { state: fullAppointmentData });
    } else {
      toast.success("🔑 INICIE SESIÓN PARA CONTINUAR LA RESERVA", {
        style: { border: '1px solid #FEB60D', background: '#000', color: '#fff', fontSize: '10px', fontWeight: 'bold' }
      });
      navigate("/login", { state: { from: `/book-appointment/${productId}` } });
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-black/5 rounded-full"></div>
          <div className="w-12 h-12 border-4 border-t-[#FEB60D] border-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
          Sincronizando <span className="text-[#FEB60D]">Datacenter</span>
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#DCDCDC] font-sans antialiased">
      <div className="max-w-[1600px] mx-auto px-6 py-12"> {/* pt reducido */}
        <header className="mb-20">
          <div className="flex items-center gap-3 text-[#FEB60D] mb-4">
            <Zap size={14} fill="currentColor" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/40">Industrial Grade Software</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none"
          >
            Productos <span className="text-[#FEB60D]">Software DT</span>
          </motion.h1>
          <div className="h-1 w-24 bg-black mt-6 mb-6"></div>
          <p className="text-black/60 font-bold uppercase text-[10px] tracking-[0.2em] max-w-lg">
            Sistemas unificados para el despliegue tecnológico de alto rendimiento en Colombia.
          </p>
        </header>

        {dbProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-black/10 rounded-sm bg-white/50">
            <AlertTriangle className="text-[#FEB60D] mb-4" size={32} />
            <p className="text-black font-black uppercase tracking-widest text-xs">
              Esperando respuesta del servidor...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dbProducts.map((service, index) => (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-black/5 flex flex-col h-[580px] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={service.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={service.title} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[#FEB60D] font-black text-[9px] uppercase tracking-[0.3em] mb-2">{service.subtitle}</span>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-black mb-4 leading-tight">{service.title}</h3>
                  <p className="text-black/50 text-[11px] font-bold uppercase leading-relaxed mb-6 line-clamp-4 tracking-wide">
                    {service.content}
                  </p>
                  
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="text-[8px] font-black text-black/30 uppercase tracking-widest mb-1">Inversión Nodo</p>
                      <p className="text-2xl font-black text-black tracking-tighter">
                        ${Number(service.price).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleAction(service)} 
                      className="w-14 h-14 bg-black text-[#FEB60D] flex items-center justify-center transition-all duration-300 hover:bg-[#FEB60D] hover:text-black active:scale-95"
                    >
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;