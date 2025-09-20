import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Section from "../components/Section"

const App = () => {

  const datas = [
    {
      "id" : 1,
      "asset" : "BogotaAir1.mp4",
      "headerStatus" : "DORADO TECHNOLOGIES",
      "headerTitle" : "SOFTWARE",
      "btnTarget" : "",
      "btnText" : "CONTACTO"
    },
    {
      "id" : 2,
      "asset" : "softwareempresas.mp4",
      "headerStatus" : "SOFTWARE COMPETITIVO",
      "headerTitle" : "NEGOCIOS Y EMPRESAS",
      "btnTarget" : "",
      "btnText" : "CONTACTO"
    },
    {
      "id" : 3,
      "asset" : "softwareappweb.mp4",
      "headerStatus" : "LAS MEJORES TECHNOLOGIAS",
      "headerTitle" : "APP'S Y WEBSITES",
      "btnTarget" : "",
      "btnText" : "CONTACTO"
    },
    {
      "id" : 4,
      "asset" : "MonserrateDron1.mp4",
      "headerStatus" : "PROGRAMAMOS PARA SERVIR",
      "headerTitle" : "TALENTO COLOMBIANO",
      "btnTarget" : "sion/?missionId=starship-flight-2",
      "btnText" : "SOBRE NOSOTROS"
    }
  ]

  return (
    <>
      <Navbar />

      {
        datas && datas.map((data) => {
          return (
            <Section 
              key={data.id}
              asset={data.asset}
              headerStatus={data.headerStatus}
              headerTitle={data.headerTitle}
              btnTarget={data.btnTarget}
              btnText={data.btnText}
            />
          )
        })
      }

      <Footer />
    </>
  )
}

export default App