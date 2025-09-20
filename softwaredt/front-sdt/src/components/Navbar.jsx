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
      name: "SOFTWARE EMPRESAS",
      url: "",
    },
    {
      id: 2,
      name: "DESARROLLO WEB",
      url: "",
    },
    {
      id: 3,
      name: "SOFTWARE PERSONALIZADO",
      url: "",
    },
    {
      id: 4,
      name: "INVESTIGACION",
      url: "",
    },
    {
      id: 5,
      name: "NOSOTROS",
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
      name: "CONTACTO",
      url: "",
    },
  ];

  return (
    <>
      <header
        className={`fixed flex items-center justify-center top-1 left-0 w-full h-28 z-20 px-3 2xl:px-28 transition-all duration-300 ease-out
    ${showNavbar ? "opacity-100" : "opacity-0"}
    ${blackBackground ? "bg-black" : ""}
    `}
      >
        <nav className="flex items-center gap-14 w-full text-black text-base font-semibold font-custom justify-between xl:justify-start">
          <span className="static xl:hidden w-[60px]"></span>
          <img src="./logo.png" alt="logo" className="h-20 mt-4 w-24 p-0" />

          <label
            className={`2xl:hidden burger items-center ${showNavbar ? "" : "disabled"}`}
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
                  className={`underline-custom hidden xl:block ${
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
          className={`fixed xl:hidden h-screen bg-black w-96 -right-96 top-0 transition duration-700 ease-out z-20 px-11 py-16
          ${isSidebarVisible ? "-translate-x-96" : "translate-x-0"} 
          `}
          id="sidebar"
        >
          <div className="w-full h-fit flex flex-col text-white text-end gap-2 mt-4">
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
