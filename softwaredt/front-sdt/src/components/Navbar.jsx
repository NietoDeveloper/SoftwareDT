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
      name: "FALCON 9",
      url: "https://www.spacex.com/vehicles/falcon-9/",
    },
    {
      id: 2,
      name: "FALCON HEAVY",
      url: "https://www.spacex.com/vehicles/falcon-heavy/",
    },
    {
      id: 3,
      name: "DRAGON",
      url: "https://www.spacex.com/vehicles/dragon/",
    },
    {
      id: 4,
      name: "STARSHIP",
      url: "https://www.spacex.com/vehicles/starship/",
    },
    {
      id: 5,
      name: "HUMAN SPACEFLIGHT",
      url: "https://www.spacex.com/humanspaceflight/",
    },
    {
      id: 6,
      name: "RIDESHARE",
      url: "https://www.spacex.com/rideshare/",
    },
    {
      id: 7,
      name: "STARSHIELD",
      url: "https://www.spacex.com/starshield/",
    },
    {
      id: 8,
      name: "STARLINK",
      url: "https://www.starlink.com/",
    },
  ];

  return (
    <>
      <header
        className={`flex items-center justify-center fixed top-0 left-0 w-full h-24 z-20 px-8 2xl:px-28 transition-all duration-300 ease-out
    ${showNavbar ? "opacity-100" : "opacity-0"}
    ${blackBackground ? "bg-black" : ""}
    `}
      >
        <nav className="flex items-end gap-8 w-full text-white text-sm font-semibold font-custom justify-between xl:justify-start">
          <span className="static xl:hidden w-[40px]"></span>
          <img src="./logo.png" alt="logo" className="h-6 sm:h-8 pb-1" />

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
