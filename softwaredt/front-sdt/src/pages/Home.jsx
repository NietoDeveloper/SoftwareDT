import Herosection from "../components/Hero/Herosection.jsx"; // ⬅️ Extensión añadida
import About from "../components/About.jsx"; // ⬅️ Extensión añadida
import Services from "../components/Offerings/Services.jsx"; // ⬅️ Extensión añadida
import Medcare from "../components/Preview/Medcare.jsx"; // ⬅️ Extensión añadida
import Questions from "../components/Faq/Questions.jsx"; // ⬅️ Extensión añadida
import Guide from "../components/Explainer/Guide.jsx"; // ⬅️ Extensión añadida
import BogotaAir1 from "../assets/images/BogotaAir1.mp4"; // Este es un archivo, la extensión es correcta
import Footer from "../components/Footer/Footer.jsx"; // ⬅️ Extensión añadida

const Home = () => {
    return (
        <>
            {/* 🛑 AJUSTE DE ESTRUCTURA: Combinamos el video y la Herosection en una sola sección */}
            <section className={`hero_section h-[100vh] 2xl:h-[110vh] w-full relative flex items-center justify-center`}>
                {/* Video de Fondo */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute w-full h-full object-cover z-0"
                    src={BogotaAir1}
                />
                
                {/* Herosection (Encima del Video) */}
                <div className="container relative z-10">
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                            <Herosection />
                        </div>
                    </div>
                </div>
            </section>

            {/* El resto de las secciones se mantienen igual */}
            <Medcare />

            <About />

            <Services />

            <Guide />

            <Questions />

            <Footer />
        </>
    );
};

export default Home;