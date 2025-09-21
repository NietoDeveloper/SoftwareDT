import { useState, useEffect } from "react";
import "../index.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [blackBackground, setBlackBackground] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= scrollPos);
      setBlackBackground(currentScrollY > 700 && currentScrollY <= scrollPos);

      if (currentScrollY > scrollPos) {
        setIsSidebarVisible(false);
      }

      setScrollPos(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const navigations = [
    {
      id: 1,
      name: "SOLUCIONES A EMPRESAS",
      url: "",
    },
    {
      id: 2,
      name: "DESARROLLO WEB Y APP'S",
      url: "",
    },
    {
      id: 3,
      name: "SOFTWARE PERSONALIZADO",
      url: "",
    },
    {
      id: 4,
      name: "CONTACTO",
      url: "",
    },
    {
      id: 5,
      name: "SOBRE NOSOTROS",
      url: "",
    },
    {
      id: 6,
      name: "LANZAMIENTOS",
      url: "",
    },
        {
      id: 7,
      name: "EVENTOS",
      url: "",
    },
        {
      id: 8,
      name: "NOTICIAS",
      url: "",
    },
  ];

  return (
    <>
      <header
        className={`flex items-center justify-center fixed top-0 left-0 w-full h-24 z-20 px-10 transition-all duration-300 ease-out
    ${showNavbar ? "opacity-100" : "opacity-0"}
    ${blackBackground ? "bg-black" : ""}
    `}
      >
        <nav className="flex items-end gap-12 w-full mt-[30px] text-black text-sm font-bold font-custom justify-between ">
          <span className="static xl:hidden w-[40px]"></span>
          <img src="./logo.png" alt="logo" className="h-20 w-30 sm:h-30 pb-1" />

          <label
            className={`xl:hidden burger ${showNavbar ? "" : "disabled"}`}
            htmlFor="burger"
          >
            <input
              type="checkbox"
              id="burger"
              checked={isSidebarVisible}
              onChange={handleCheckboxChange}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>

          {navigations &&
            navigations.map((navigation) => {
              return (
                <a
                  className={`underline-custom hidden md:block ${
                    showNavbar ? "" : "disabled"
                  }`}
                  key={navigation.id}
                  href="/"
                >
                  {navigation.name}
                </a>
              );
            })}
        </nav>

        <div
          className={`fixed top-0 right-0 bg-black transition-opacity duration-700 ease-out
          ${isSidebarVisible ? "w-screen h-screen opacity-50" : "opacity-0"} `}
        ></div>

        <div
          className={`fixed xl:hidden h-screen bg-blue-500 bg-opacity-30 backdrop-blur-md w-96 -right-96 top-0 transition duration-700 ease-out z-20 px-11 py-16
          ${isSidebarVisible ? "-translate-x-96" : "translate-x-0"} 
          `}
          id="sidebar"
        >
          <div className="w-full h-fit flex flex-col mt-[80px] text-white text-end gap-2 mt-4">
            {navigations &&
              navigations.map((navigation) => {
                return (
                  <>
                    <a
                      className="border-b border-white border-opacity-30 h-8 transition duration-500 ease-in-out hover:brightness-50"
                      key={navigation.id}
                      href="/"
                    >
                      {navigation.name}
                    </a>
                  </>
                );
              })}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
