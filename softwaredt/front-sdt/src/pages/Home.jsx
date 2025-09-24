import Herosection from "../components/Hero/Herosection";
import About from "../components/About";
import Services from "../components/Offerings/Services";
import Medcare from "../components/Preview/Medcare";
import Questions from "../components/Faq/Questions";
import Guide from "../components/Explainer/Guide";
import BogotaAir1 from "../assets/images/BogotaAir1.mp4";
import BogotaAir2 from "../assets/images/MonserrateDron1.mp4";

const Home = () => {
  return (
    <>
      <section className={`h-[108vh] w-full relative flex justify-center`}>
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          src={BogotaAir1}
        />
      </section>
      <section className="hero_section 2xl:h-[800px]">
        {/*Hero section */}
        <div className="container">
          <div className=" w-full">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              <Herosection />
            </div>
          </div>
        </div>
      </section>

      <Medcare />

      <About />

      <Services />

      <Guide />

      <Questions />

      <section className={`h-[108vh] w-full relative flex justify-center`}>
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          src={BogotaAir2}
        />
      </section>

    </>
  );
};

export default Home;
